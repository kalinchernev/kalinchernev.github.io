---
title: Solving the AWS Lambda timeout limitation with Amazon ECS Fargate
slug: solving-aws-lambda-timeouts-fargate
date: 2018-09-03T00:00:00+02:00
draft: false
template: post
tags:
  - AWS
  - Serverless
  - Docker
  - ECS
  - JavaScript
socialImage: "../defaultSocialImage.jpg"
---

Recently, I read an article about [using Fargate for long-running processes](https://serverless.com/blog/serverless-application-for-long-running-process-fargate-lambda). The article explains the fundamentals well, though in my view it's not touching upon a few important details I expected to see. So in this article I'll build upon this article and reflect on some possible tweaks.

The next ideas will be demonstrated with Node.js, though any other runtime would work just as fine. In the end, the background APIs used are same - AWS's Lambda, ECS, etc.

## Reflections

For me, the main point of reading the article about the long-running processes was to see details about solving the 5 minutes limitation in AWS Lambda, similar to this [older one](https://serifandsemaphore.io/aws-lambda-going-beyond-5-minutes-34e381e71231). Instead, it was focused on the ECS setup and there wasn't much about the integration reasoning. Also, the example of [runTask](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html) was a useful start, though it's not immediately obvious how the environment variables can act as dynamic parameters.

Also, reading around the topic of integrating AWS Lambda with ECS Fargate, I was surprised [getFunction](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#getFunction-property) wasn't used in any of the implementations. (At least I didn't find one) This function returns an address to a signed URL holding a zip archive to a given lambda handler. This handler is the code which could be executed in the container. In my opinion, that information and resource would enable a far thinner implementation approach in the container.

Keep in mind that with [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) you can package your handlers, libraries and others into a single file containing all dependencies.

## Ideas about implementation

After the above-mentioned research and reflections, I came to the following ideas about possible implementation strategy:

- Have the primary AWS Lambda handler. This is the business critical handler which should not fail because of timeout limitations
- Have a secondary AWS Lambda handler which is plugged to the primary via a [dead letter queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html). Not only [SQS is a valid trigger nowadays](https://aws.amazon.com/blogs/aws/aws-lambda-adds-amazon-simple-queue-service-to-supported-event-sources/) but it's also better to start the Fargate service only and if it's necessary. More specifically, the [retry behavior](https://docs.aws.amazon.com/lambda/latest/dg/retries-on-errors.html) in case of timeout will try to re-run the handler 3 times. If 3 attempts fail, then and only then the secondary handler being a safety net will trigger the container for a long-running task.
- Run the ECS Fargate Docker container when primary handler fails. The container's wrapper around the primary handler should be as thin as fetching original handler and passing down the original `event` and `context` without any mutations.

## Implementation notes

### Update the `serverless` service

Because services are based on the `serverless` framework, I used [this dead letter queue plugin](https://www.npmjs.com/package/serverless-plugin-lambda-dead-letter) in order to attach the secondary handler to the primary one.

This means that, inside your `serverless.yaml` file:

1.  Enable the DLQ plugin

```yaml
plugins:
  - serverless-plugin-lambda-dead-letter
```

2.  Create the dead letter queue in `Resources`

```yaml
SQSFailureQueue:
  Type: AWS::SQS::Queue
  Properties:
    QueueName: sqs-failure-queue
    MessageRetentionPeriod: "1209600"
    VisibilityTimeout: "60"
```

If you haven't created this section yet, follow the [documentation](https://serverless.com/framework/docs/providers/aws/guide/resources/).

3.  Attach the secondary handler to the SQS queue:

```yaml
  secondaryHandler:
    handler: path/to/immortal-handlerDlq.handler
    name: immortal-handlerDql
    environment:
      REGION: eu-west-1
      # ECS task to execute handler without timeout limitations
      RUNNER: runner
      # Required for runTask API call, preliminary created on AWS.
      SUBNET: subnet-xxxxxxxx
      ...
    events:
      - sqs:
          arn:
            Fn::GetAtt:
              - SQSFailureQueue
              - Arn
```

4.  Attach the secondary handler to the primary one:

```yaml
functions:
  primaryHandler:
    handler: path/to/immortal-handler.handler
    name: immortal-handler
    deadLetter:
      targetArn:
        GetResourceArn: SQSFailureQueue
```

5.  Update IAM role statement of the service

```yaml
  iamRoleStatements:
    ...
    # Allow running AWS Fargate containers when AWS Lambda timeout cannot be bypassed.
    - Effect: 'Allow'
      Action:
        - ecs:RunTask
      Resource: '*'
    - Effect: Allow
      Action:
        - iam:PassRole
      Resource:
        Fn::Join:
          - ''
          - - 'arn:aws:iam::'
            - Ref: 'AWS::AccountId'
            - ':role/ecsTaskExecutionRole'
    # ecsTaskExecutionRole is the name of the default role created by ECS,
    ...
    # Allow queueing messages to the DLQ https://docs.aws.amazon.com/lambda/latest/dg/dlq.html
    - Effect: 'Allow'
      Action:
        - sqs:SendMessage
      Resource: '*'
```

Details are available in [the article which inspired me](https://serverless.com/blog/serverless-application-for-long-running-process-fargate-lambda/#iam-roles). Keep in mind that once you [override defaults](https://serverless.com/framework/docs/providers/aws/guide/iam/) you might need to specify additional permissions which are not related only to the task at hand here.

### Create the secondary handler

Here's an example focused on the ECS's code implementation

```javascript
import AWS from 'aws-sdk';

export const handler = async (event, context, callback) => {
  // Coming from environment variables setup in your `serverless.yaml` file
  // See https://serverless.com/framework/docs/providers/aws/guide/variables/#referencing-environment-variables
  const { RUNNER, SUBNET } = process.env;
  const ecs = new AWS.ECS();

  // Some other logic specific to your case here ...

  try {
    const runParams = {
      taskDefinition: RUNNER,
      launchType: 'FARGATE',
      networkConfiguration: {
        awsvpcConfiguration: {
          assignPublicIp: 'ENABLED',
          subnets: [SUBNET],
        },
      },
      overrides: {
        containerOverrides: [
          {
            environment: [
              {
                name: 'AWS_LAMBDA_FUNCTION_EVENT',
                value: JSON.stringify(event),
              },
              // Help the runner locate the handler to run inside a container.
              {
                name: 'AWS_LAMBDA_HANDLER_PATH',
                // Matches path/to/immortal-handler.handler
                value: 'path/to/immortal-handler.js',
              },
              {
                name: 'AWS_LAMBDA_FUNCTION_CONTEXT',
                value: JSON.stringify(context),
              },
              ...
            ],
            name: RUNNER,
          },
        ],
      },
    };

    const result = await ecs.runTask(runParams).promise();
    // Returns null
    return callback(null, result);
  } catch (e) {
    return callback(e);
  }
};

export default handler;
```

As you can notice, the most interesting part is where you pass environment variables from the secondary handler to the container.

The container will take these variables and start the corresponding handler with the same `event` and `context`.

### Create Docker container and deploy it

0.  AWS ECS setup

Similar the [prerequisites section here](https://serverless.com/blog/serverless-application-for-long-running-process-fargate-lambda/#pre-requisite-resources) you will need to setup the ECS task on AWS's console. When you use the console with the defaults, 2 new roles will be created: `AWSServiceRoleForECS` and `ecsTaskExecutionRole`. Use these roles and attach the necessary policy privileges onto them depending on which resources you'd like to manage from the container.

For instance you can attach `AWSLambdaFullAccess`, `AmazonS3FullAccess` and `AmazonECSTaskExecutionRolePolicy` (AWS managed policies) on `ecsTaskExecutionRole` for a start. Later, you can limit `AWSLambdaFullAccess` to `lambda:getFunction` for example.

1.  `Dockerfile` definition

This could be very simple, exposing 2 variable more clearly:

```
FROM node:8

# Environment variables acting as parameters of the runner.
ENV AWS_LAMBDA_FUNCTION_EVENT {}
ENV AWS_LAMBDA_FUNCTION_CONTEXT {}

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

# Parameters are named arguments extracted later with yargs or something else working on argv.
CMD ["sh", "-c", "./runner.js --event ${AWS_LAMBDA_FUNCTION_EVENT} --context ${AWS_LAMBDA_FUNCTION_CONTEXT}"]
```

This assumes that your `serverless` service is based on [Node.js 8.10 runtime](https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/).

2.  Create a `runner.js` file which will execute the primary handler inside the container

```javascript
#!/usr/bin/env node

const path = require("path");
const https = require("https");

const AWS = require("aws-sdk");
const promisePipe = require("promisepipe");
const unzip = require("unzip");
const { argv } = require("yargs");

const runner = async () => {
  const { REGION, AWS_LAMBDA_HANDLER_PATH } = process.env;
  // Required as strings by the API: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_TaskOverride.html?shortFooter=true
  const { event: e, context: c } = argv;
  const context = JSON.parse(c);
  const event = JSON.parse(e);

  if (!context.functionName) {
    return console.error("Required function name not found in context.");
  }

  const invoking = context.functionName;
  // Assumes dead letter queue lambda functions are suffixed with Dlq
  const originalInvoking = invoking.substring(0, invoking.indexOf("Dlq"));

  try {
    const lambda = new AWS.Lambda({ region: REGION });

    const lambdaInfo = await lambda
      .getFunction({ FunctionName: originalInvoking })
      .promise();

    const sourceCodeSignedUrl = lambdaInfo.Code.Location;

    return https.get(sourceCodeSignedUrl, async (res) => {
      // Download source from cloud and extract it at the current directory at the same time.
      await promisePipe(res, unzip.Extract({ path: __dirname }));

      const pathToHandler = path.resolve(
        `${__dirname}/${AWS_LAMBDA_HANDLER_PATH}`,
      );
      const handler = require(pathToHandler);
      // Run the taget handler's code.
      // handler.handler is the default export of webpack's bundle file
      const result = await handler.handler(event, context);
      return console.log(result);
    });
  } catch (err) {
    return console.error(err.message);
  }
};

runner();
```

Don't forget to make this file executable:

```sh
$ chmod +x runner.js
```

3.  Create a repository for the image on ECS

The process is similar to creating a repository on Github. Check this [documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_Console_Repositories.html) for having an idea about it.

4.  Build the image

```sh
$ docker build -t runner .
```

5.  Tag it

```sh
$ docker tag runner:latest {accountId}.dkr.ecr.eu-central-1.amazonaws.com/runner:latest
```

You'd normally get the information about the tag when you have created the repository at ECS.

For more details on tagging the image, see this [tutorial](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html).

6.  Push the latest image to the repository

```sh
$ docker push {accountId}.dkr.ecr.eu-central-1.amazonaws.com/runner:latest
```

If you experience issues with credentials, you can run the following command to re-take temporary credentials and use them directly without copy-paste:

```
$ aws ecr get-login --no-include-email | source /dev/stdin
```

At this point, if you have configured your ECS task to use this container from this repository, running the container will run the `runner.js` which on its part will run the primary handler.

## Win

Now you have a setup where:

- Primary lambda function can possibly fail because of a timeout issue.
- A secondary lambda function gets triggered with initial `event` and `context` from the primary.
- Secondary lambda function starts a docker container on Fargate with these `event` and `context` and adds some more information about the location of the handler to run in the container.
- The container's `runner.js` gets executed without any timeout limitations and runs the primary lambda function for as long as it's necessary for the process to complete successfully.
