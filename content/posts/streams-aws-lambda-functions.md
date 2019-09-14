---
title: Streams in AWS Lambda Functions
slug: streams-aws-lambda-functions
date: '2019-01-18T00:00:00+00:00'
category: 'Code'
draft: true
template: 'post'
tags:
  - AWS
  - Serverless
  - JavaScript
  - Streams
---

## Introduction

In my experience with Node.js so far, I've found [Streams API](https://nodejs.org/api/stream.html) to be one of the trickiest and most brittle APIs in the platform. I agree with a quote from [a popular article](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93) that "Streams are Node’s best and most misunderstood idea.". Maybe for this reason, I [briefly got involved](/stream-adventure-triage) with [nodeschool](https://nodeschool.io/)'s [stream-adventure](https://github.com/workshopper/stream-adventure) few years ago, trying to understand them myself. In the time, I did learn a few [important fundamental concepts such as event emitters, callbacks](https://medium.com/@kalin.chernev/reflecting-on-node-js-design-patterns-6cc6eaa584), etc.

Streams failed me silently and seriously a few times when used in the toolchain of [serverless](https://serverless.com/) and [AWS Lambda](https://aws.amazon.com/lambda/). From issues like integrating them with promises or async/await syntax, to purely infrastructural issues related to specifics in AWS reusing streams between invocations and not being able to write after end.

This article is a set of shared painful experiences and tips whic helped me get through the pain.

### Making the small steps

In almost every context of a problem to solve, I always try to break down the bigger problem to smaller questions to answer before stepping on the abstractions which are frequently hard to debug without being absolutely certain about the smaller building blocks.

This is why I'll start by making things work from small to big, demonstrating where and why things break. This way, when you (or also I, again ...) have an issue with the abstractions not working properly, you will be able to debug the smaller building blocks first in order to progress effectively on your journey of solving issues with Streams in AWS Lambda.

### Introducing the example

For making the tutorial practical, I decided to develop a simple converter service which will be taking an input CSV file and output it's formatted version as an output.

For example data, I picked the [open beer database](https://data.opendatasoft.com/explore/dataset/open-beer-database%40public-us/table/).

The data pipeline will look like following:

- read
- parse
- transform
- write

Reading and writing will be achieved firstly by [fs](https://nodejs.org/api/fs.html) and later by [S3](https://aws.amazon.com/s3/) when deployed in the cloud.

Parsing will be done by `csv-parse`, formatting (transformation) by `stream-transform`.

### Developing locally

Let's start simple, by reading the input file from the local file system and write it back in the same place of the input file.

This could be achieved by this example:

```js
const converter = () => {
  const file = 'open-beer-database';
  const read = fs.createReadStream(path.resolve(`./${file}.csv`));
  const write = fs.createWriteStream(path.resolve(`./${file}.ndjson`));

  read
    .on('error', error => {
      console.error(`There was an error while reading ${file}.`);
    })
    .on('end', () => console.log(`${file} has been converted successfully`))
    .pipe(parser)
    .on('error', error => {
      console.error(`Parsing error: ${error.message}`);
    })
    .pipe(transformer)
    .on('error', error => {
      console.error(`Transform error: ${error.message}`);
    })
    .pipe(write);
};

converter();
```

The parser would be:

```js
const parse = require('csv-parse');

const parser = parse({ columns: true, delimiter: ';' });
```

And the tranformer:

```js
const transform = require('stream-transform');

const transformer = transform(
  (record, callback) => {
    try {
      const row = formatter(record);
      return callback(null, `${JSON.stringify(row)}\n`);
    } catch (e) {
      return callback(e);
    }
  },
  {
    parallel: 5,
  }
);
```

Where `formatter()` could be, for instance:

```js
const formatter = record => {
  const {
    Name: beer,
    id,
    Description: description,
    Style: style,
    Category: category,
  } = record;
  return { id, beer, description, style, category };
};
```

At this point, we have a simple `converter.js` script which reads `open-beer-database.csv` file containing

```csv
Name;id;brewery_id;cat_id;style_id;Alcohol By Volume;International Bitterness Units;Standard Reference Method;Universal Product Code;filepath;Description;add_user;last_mod;Style;Category;Brewer;Address;City;State;Country;Coordinates;Website
Scottish Ale;1495;347;1;15;5.8000001907;0;0;0;;;0;2010-07-22T23:00:00+03:00;Scotch Ale;British Ale;Carlyle Brewing;215 East State Street;Rockford;Illinois;United States;42.2689, -89.0907;
Het Kapittel Pater;1509;301;-1;-1;0.0;0;0;0;;;0;2010-07-22T23:00:00+03:00;;;Brouwerij Van Eecke;Douvieweg 2;Watou;West-Vlaanderen;Belgium;50.8612, 2.6615;
```

and outputs `open-beer-database.ndjson` containing:

```ndjson
{"id":"1495","beer":"Scottish Ale","description":"","style":"Scotch Ale","category":"British Ale"}
{"id":"1509","beer":"Het Kapittel Pater","description":"","style":"","category":""}
```

Later we can use this `ndjson` file to read records with streams and persist them to a database of choice.

The next step will take this working code and put it in the cloud.

### Moving to AWS cloud

To ensure you can follow along, please ensure you have already created an [AWS account](https://aws.amazon.com/account/) and you have enough permissions to work at least with S3, AWS Lambda, and Cloudformation. The list is not exhaustive, please ensure your account has sufficient permissions.

For this tutorial, we choose to work in Ireland region, i.e. `eu-west-1`, where we should manually create a bucket `converter-deployment`. The serverless framework will use this bucket to upload the necessary Cloudformation assets which will later create the necessary AWS resources such as the lambda function, its policies, SNS topics, etc.

Thus, we create a new `serverless.yml` file, where we define the service and its permissions to read and write to S3, as this is our new read/write medium.

```yml
service: converter-csv-ndjson

provider:
  name: aws
  runtime: nodejs8.10
  stage: ${opt:stage, env:SLS_AWS_STAGE, 'dev'}
  region: ${opt:region, env:SLS_AWS_REGION, 'eu-west-1'}
  deploymentBucket:
    name: converter-deployment
  iamRoleStatements:
    - Effect: 'Allow'
      Action:
        - 's3:Get*'
        - 's3:PutObject'
      Resource:
        Fn::Join:
          - ''
          - - 'arn:aws:s3:::'
            - converter-csv-ndjson
            - '/*'
```

Next, we create the function which will hold the logic:

```yml
functions:
  onFileForConversionCreated:
    handler: src/events/onFileForConversionCreated.handler
    name: onFileForConversionCreated
    timeout: 300
    events:
      - sns:
          arn:
            Fn::Join:
              - ''
              - - 'arn:aws:sns:'
                - Ref: 'AWS::Region'
                - ':'
                - Ref: 'AWS::AccountId'
                - ':file-for-conversion-created'
          topicName: file-for-conversion-created
```

This requires an exported function `handler`, which will be ran when there is a new message to `file-for-conversion-created` SNS topic.

Next, we create this topic:

```yml
resources:
  Resources:
    FileForConversionCreatedTopic:
      Type: AWS::SNS::Topic
      Properties:
        TopicName: file-for-conversion-created
    FilesEventsTopicPolicy:
      Type: AWS::SNS::TopicPolicy
      Properties:
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Principal: '*'
              Action: sns:Publish
              Resource: '*'
              Condition:
                ArnLike:
                  aws:SourceArn:
                    Fn::Join:
                      - ''
                      - - 'arn:aws:s3:::'
                        - converter-csv-ndjson
        Topics:
          - Ref: FileForConversionCreatedTopic
```

And we also create a new bucket where the files for conversion will be uploaded. We also attach the same SNS topic on the bucket in order to glue the process of the lambda function getting the notification for the newly created files.

```yml
resources:
  Resources:
    ConverterBucket:
      Type: AWS::S3::Bucket
      DependsOn: FilesEventsTopicPolicy
      Properties:
        BucketName: converter-csv-ndjson
        CorsConfiguration:
          CorsRules:
            - AllowedHeaders:
                - 'Authorization'
              AllowedMethods:
                - GET
              AllowedOrigins:
                - '*'
            - AllowedHeaders:
                - '*'
              AllowedMethods:
                - PUT
              AllowedOrigins:
                - '*'
        NotificationConfiguration:
          TopicConfigurations:
            - Event: s3:ObjectCreated:*
              Topic:
                Ref: FileForConversionCreatedTopic
    ConverterBucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        Bucket:
          Ref: ConverterBucket
        PolicyDocument:
          Statement:
            - Effect: Allow
              Principal: '*'
              Action: s3:GetObject
              Resource:
                Fn::Join:
                  - ''
                  - - 'arn:aws:s3:::'
                    - converter-csv-ndjson
                    - '/*'
```

So far we have the AWS resources created and glued together in order for our serverless function to get information about newly created files in `converter-csv-ndjson` S3 bucket and also write back to the same bucket the converted file.

Next, let's take the logic from `converter.js` and convert it to a lambda function:

```js
const AWS = require('aws-sdk');
const parse = require('csv-parse');
const stream = require('stream');
const transform = require('stream-transform');

exports.handler = (event, context, callback) => {
  // Extract useful information from AWS Lambda's event.
  const message = JSON.parse(event.Records[0].Sns.Message);
  const { s3 } = message.Records[0];
  const { name: bucket } = s3.bucket;
  const { key: file } = s3.object;

  const s3client = new AWS.S3();

  const parser = parse({ columns: true, delimiter: ';' });

  const formatter = record => {
    const {
      Name: beer,
      id,
      Description: description,
      Style: style,
      Category: category,
    } = record;
    return { id, beer, description, style, category };
  };

  const transformer = transform(
    (record, callback) => {
      try {
        const row = formatter(record);
        return callback(null, `${JSON.stringify(row)}\n`);
      } catch (e) {
        return callback(e);
      }
    },
    {
      parallel: 5,
    }
  );

  const read = s3client
    .getObject({ Bucket: bucket, Key: file })
    .createReadStream();

  const write = () => {
    const pass = new stream.PassThrough();

    const params = {
      Bucket: bucket,
      Key: `${file}.ndjson`,
      Body: pass,
      ContentType: 'application/x-ndjson',
    };

    s3client.upload(params, err => {
      if (err) callback(err);
    });

    return pass;
  };

  read
    .on('error', error => {
      callback(`Read error for ${file}: ${error.message}`);
    })
    .pipe(parser)
    .on('error', error => {
      callback(`Parsing error: ${error.message}`);
    })
    .pipe(transformer)
    .on('error', error => {
      callback(`Transform error: ${error.message}`);
    })
    .pipe(write())
    .on('error', error => {
      callback(`Write error: ${error.message}`);
    })
    .on('end', () => {
      callback(null, 'File has been converted successfully.');
    });
};
```

The differences are:

The read stream has changed from

```js
const read = fs.createReadStream(path.resolve(`./${file}.csv`));
```

to

```js
const read = s3client
  .getObject({ Bucket: bucket, Key: file })
  .createReadStream();
```

Also the write stream has changed from:

```js
const write = fs.createWriteStream(path.resolve(`./${file}.ndjson`));
```

to

```js
const write = () => {
  const pass = new stream.PassThrough();

  const params = {
    Bucket: bucket,
    Key: `${file}.ndjson`,
    Body: pass,
    ContentType: 'application/x-ndjson',
  };

  s3client.upload(params, err => {
    if (err) callback(err);
  });

  return pass;
};
```

And lastly, results are communicated via callback functions:

For errors, from;

```js
.on("error", error => console.error(`Parsing error: ${error.message}`))
```

to

```js
.on("error", error => callback(`Parsing error: ${error.message}`))
```

And success, from

```js
.on("end", () => console.log(`${file} has been converted successfully`))
```

to

```js
.on("end", () => callback(null, "File has been converted successfully."));
```

Callbacks are not modern and sexy, but it's important to [understnad them](https://medium.com/@kalin.chernev/reflecting-on-node-js-design-patterns-6cc6eaa584), especially when making the small steps. The callback style is the default one which AWS Lambda will suggest when you start creating functions from the AWS web console and it's also possible that you need to work with code which has them, so learn callback style if you haven't yet.

### Meta data is important

Our function works fine now and it's good enough if we want to use it once or twice every month or so, however usually converters are used more frequently.

The next logical step to make our converter service more realiable would be to add a meta data index containing information about the inventory and status of all the files the service is managing.

For this meta data store, we'll use [DynamoDB](https://aws.amazon.com/dynamodb/) because it's managed, and following [the patterns](https://www.jeremydaly.com/serverless-microservice-patterns-for-aws/) is easy with it.

---> the tricky part
Wrap the existing and working logic in a function with `async` in front. Things fail, unless the stream is wrapped in a `return new Promise()` and the callback for ending the process is replaced with the `resolve` or the `reject`.

### Move parser and transformer streams in separate modules

--> the tricky part
Making the script more readable, now the details about the specific operations applied on the data of the input file are delegated to separate modules. This gives the feeling of having plugins.

Run the script several times in a row with different files.

In the cloud, one will get "write after end".
