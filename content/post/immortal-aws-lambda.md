---
title: Solve AWS Lambda timeout limitations
slug: solve-aws-lambda-timeout-limitations
date: 2018-10-26T00:00:00+02:00
tags:
- AWS
- Serverless
- Docker
- ECS
- JavaScript
---

As I've been drafting a strategy to [solve the AWS Lambda timeout limitations](/solving-aws-lambda-timeouts-fargate) I felt I'm getting closer to solving an issue which keeps me away from sleeping well sometimes. True that there are known patterns for [reaching higher scalability using SQS](https://www.jeremydaly.com/serverless-microservice-patterns-for-aws/) though the problems at hand were not easy to solve with either of those when the AWS Lambda is used as a core compute service.

During the same period of me focusing on the timeout limitations issue, [AWS raised the limit to 15 minutes](https://aws.amazon.com/about-aws/whats-new/2018/10/aws-lambda-supports-functions-that-can-run-up-to-15-minutes/). Although this is surely a useful change, I still preferred to polish my draft strategy of using a non-lambda compute which will not have a limit at all. When the safety-net-compute is also based on a per-demand pricing model, this forms a real solution to the problem. In reality, sometimes it's impossible to predict load up front and maxing out limits is not the ultimate solution.

## Notable improvements

Here's a short overview of the most important improvements I've made between draft implementation and current one:

- [unzip](https://www.npmjs.com/package/unzip) has been swapped to [unzipper](https://www.npmjs.com/package/unzipper) for a [good reason](https://github.com/EvanOxfeld/node-unzip/issues/120). API is same.
- Logic gluing primary and secondary lambda handlers has been changed. Instead of using naming conventions which are an easy to mistake constraint, I've put in place a mapping "cheatsheet".
- [serverless-plugin-lambda-dead-letter](https://github.com/gmetzker/serverless-plugin-lambda-dead-letter) dependency, which looked promising, was removed in favour of native functionalities of CloudFormation. Main reason: [issues with intrinsic functions](https://github.com/gmetzker/serverless-plugin-lambda-dead-letter/issues/37).
- `event` and `context` from primary handler have been moved to environment variables passed through [ContainerOverride](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_ContainerOverride.html) API because information from original JSON objects was getting dropped during the process of executing [runTask](https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html). This is also an improvement in terms of consistency of managing environment variables.
- Use original environment variables from primary handler through the same [GetFunction](https://docs.aws.amazon.com/lambda/latest/dg/API_GetFunction.html) which yields this [configuration](https://docs.aws.amazon.com/lambda/latest/dg/API_EnvironmentResponse.html?shortFooter=true) together with the location of the source of the primary handler already fetched.
- A helper to handle varying `event` structures has been added. Appears that an SNS event changes from a bucket to bucket depending on the way files are managed within bucket.

Skeleton of the end implementation can be seen in this [repository](https://github.com/kalinchernev/immortal-aws-lambda).

## Implementation

So how does the current implementation look like after the before-mentioned improvements?

From a bird's-eye view, structure and main ideas are the same:

```sh
immortal-aws-lambda
├── container
│   ├── Dockerfile
│   ├── package.json
│   ├── README.md
│   └── runner.js
└── serverless
    ├── package.json
    ├── README.md
    ├── serverless.yml
    ├── src
    │   ├── events
    │   │   └── onFailure.js
    │   └── lib
    │       ├── extractors.js
    │       ├── getHandlerData.js
    │       └── snsTopicToHandlerMap.js
    └── webpack.config.js

5 directories, 12 files
```

### [Immortal AWS Lambda: Container Service](https://github.com/kalinchernev/immortal-aws-lambda/tree/master/container)

Probably you'll want to create the ECS task in AWS console first and take some settings you'll need for the serverless service.

The sole goal of this service is to put a `runner.js` script in a container and run it remotely from the dead letter queue service.

The contents of the script is actually ultra-thin and is comprised of 3 main steps:

1.  Take initial source code of a lambda handler
2.  Take environment variables of the same handler
3.  Run the handler

All settings are dynamic variables.

And the source is ultra-simple:

```javascript
#!/usr/bin/env node

const path = require('path');
const https = require('https');

const AWS = require('aws-sdk');
const promisePipe = require('promisepipe');
const unzip = require('unzipper');

const runner = async () => {
  const {
    REGION,
    AWS_LAMBDA_HANDLER_EVENT,
    AWS_LAMBDA_HANDLER_CONTEXT,
    AWS_LAMBDA_HANDLER_NAME,
    AWS_LAMBDA_HANDLER_PATH,
  } = process.env;

  try {
    const event = JSON.parse(AWS_LAMBDA_HANDLER_EVENT);
    const context = JSON.parse(AWS_LAMBDA_HANDLER_CONTEXT);

    const lambda = new AWS.Lambda({ region: REGION });

    const lambdaInfo = await lambda
      .getFunction({ FunctionName: AWS_LAMBDA_HANDLER_NAME })
      .promise();

    const sourceCodeSignedUrl = lambdaInfo.Code.Location;

    return https.get(sourceCodeSignedUrl, async res => {
      // Download source from cloud and extract it at the current directory at the same time.
      await promisePipe(res, unzip.Extract({ path: __dirname }));

      const pathToHandler = path.resolve(
        `${__dirname}/${AWS_LAMBDA_HANDLER_PATH}`
      );

      // eslint-disable-next-line
      const handler = require(pathToHandler);

      // Merge environment variables.
      process.env = Object.assign(
        {},
        process.env,
        lambdaInfo.Configuration.Environment.Variables
      );

      const result = await handler.handler(event, context);
      return console.log(result);
    });
  } catch (err) {
    return console.error(err.message);
  }
};

runner();
```

### [Immortal AWS Lambda: Serverless Service](https://github.com/kalinchernev/immortal-aws-lambda/tree/master/serverless)

This is the serverless service to deploy. It's as simple and independent as it could be:

- Provides a dead letter queue `LambdaFailureQueue` to which others can push messages when failing.
- Exports the ARN of the queue in order for other services to be able to import the value of the ARN. ([docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html))
- All the other details about the `iamRoleStatements`, `events` subscriptions and settings remain the same as before.

Helpers in `lib` are your responsibility to implement as `event` structures in your case will be different. (most probably)

Still, the main point of having this service is still to run an ECS task starting a container:

```javascript
const runParams = {
  taskDefinition: RUNNER,
  launchType: "FARGATE",
  networkConfiguration: {
    awsvpcConfiguration: {
      assignPublicIp: "ENABLED",
      subnets: [SUBNET]
    }
  },
  overrides: {
    containerOverrides: [
      {
        environment: [
          {
            name: "AWS_LAMBDA_HANDLER_EVENT",
            value: JSON.stringify(initialMessage)
          },
          {
            name: "AWS_LAMBDA_HANDLER_CONTEXT",
            value: JSON.stringify(context)
          },
          {
            name: "AWS_LAMBDA_HANDLER_NAME",
            value: handlerData.name
          },
          {
            name: "AWS_LAMBDA_HANDLER_PATH",
            value: handlerData.path
          }
        ],
        name: RUNNER
      }
    ]
  }
};

await ecs.runTask(runParams).promise();
```

Don't forget to take these settings from the AWS Console and set them in your `serverless.yaml` configuration file.

### Integrating services in the workflow

"Attaching" other serverless services and handlers to this workflow boils down the following:

1.  Allow the service to push messages to the SQS dead letter queue:

```yaml
iamRoleStatements:
  # Allow queueing messages to the DLQ https://docs.aws.amazon.com/lambda/latest/dg/dlq.html
  - Effect: 'Allow'
    Action:
      - sqs:SendMessage
    Resource: '*'
```

2.  Add ARN information about the SQS queue from `Resources` section

```yaml
resources:
  Resources:
    fooFunction:
      Type: "AWS::Lambda::Function"
      Properties:
        DeadLetterConfig:
          TargetArn:
            Fn::ImportValue: immortal-aws-lambda:LambdaFailureQueue
```

This is because the serverless framework does not yet support [`onError`](https://www.trek10.com/blog/dead-letter-config/) properly. Thanks to [Siva Kommuri](https://github.com/neowulf) for [suggesting this workaround](https://github.com/neowulf).

Now, when your service fails, the error will be queued to the dead letter queue provided by the immortal aws lambda service, the immortal service will take this message, find the right handler and call it via the container service.

## Final thoughts

My path to finding this solution was not easy.

The tools involved are having rough edges.

Also, the process of triggering and reproducing failures because of a timeout, rebuilding the container, etc. is a lenghtly procedure on each iteration. For instance, every time something fails because of a missing character or spelling mistake, I needed to redeploy the non-bundles and non-optimized code of the lambda function to the cloud in order to get merely adequate error message for debugging in the logs of the ECS. (crazy!)

Working with streams and promises in Node is still very painful and hard to debug by the way ...

So I hope that having these very thin layers of variables which communicate to each other will be a feasible solution for solving the timeout limitations in AWS Lambda for months ahead.
