+++
author = ""
comments = true
date = "2017-07-11T22:40:00+00:00"
draft = true
image = ""
menu = ""
share = true
slug = "serverless-github-bot-aws-lambda-api-gateway-nodejs"
tags = ["Bots", "nodejs", "JavaScript", "serverless", "AWS"]
title = "Serverless github bot with AWS Lambda and API Gateway "

+++


If you've come to this article because you already have knowledge about the technical topics, you can skip the introductory parts and go directly to the part below with the more technical specifics.

## Goals

This tutorial will show you how to make a small bot application which watches for pull requests open by [greenkeeper.io](https://greenkeeper.io/), modifies the title to match conventions and adds some tags to the pull request. This scripting exercise can be useful in cases where you have strict conventions on the way pull requests are formed before merging in order to ensure good change logs, visibility on pull requests, and any type of task that can facilitate your work on pull requests by automation.

The script will actually be pretty small and simple, though there are quite some interesting technologies you might learn on the way ;)

## Going Serverless

[Serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) is a relatively new trend which is getting greater popularity after Amazon released their [AWS Lambda](https://aws.amazon.com/lambda/) service in the end of 2014. I published about this topic in a bit [more details earlier this year](https://kalinchernev.github.io/january-digest-2017/#cloud). In one sentence, serverless architectures (aka cloud functions) are getting traction in cases where high-level architecture control is sufficient for developers who delegate the details about the infrastructure management to a hidden underlying layer managed by a cloud provider.

In addition to the low maintenance efforts, pricing per resource is always a lucrative opportunity for app developers - at the moment the first 1 million requests to AWS Lambda are [free](https://aws.amazon.com/free/) - this is a lot! Later, pricing continues to be calculated based on actual usage. This means that applications cost money when they actually execute something. This offer is good for both up-scaling and down-scaling scenarios.

Here's a graphic from [acloud.guru](https://acloud.guru/) which explains this evolution step in simple terms, I think:

![](/uploads/2017/07/11/brief-history-of-cloud-acloud-guru.png)

Lastly, cloud functions such as AWS Lambda comes well into play in event-oriented designs. Here's a simplified list of some [official use cases](http://docs.aws.amazon.com/lambda/latest/dg/use-cases.html):

* event-driven services where the cloud function is run in response to other events - usually triggered by AWS S3, SNS, DynamoDB, etc.

* services responding to HTTP requests - triggered by Amazon API Gateway or other AWS clients.

The github bot app that I'm building here can be considered as a service from the second set of scenarios. The end result is an API endpoint responding to `POST` requests (events) from [github webhooks](events).

## Notes on the AWS serverless stack

Watching videos and reading tutorials on the topic can get you pretty excited. Here are some notes about steps which didn't go totally smooth during my journey, i.e. I want to prepare you for the reality before you start clicking and scripting things and get frustrated ;)

**1) The AWS services ain't that easy, especially if you're relatively new to AWS in overall**

For example:

* [AWS Lambda developer guide](https://aws.amazon.com/documentation/lambda/) - 300+ pages
* [Amazon API Gateway developer guide](https://aws.amazon.com/documentation/apigateway/) - 450+ pages
* [IAM documentation](https://aws.amazon.com/documentation/iam/) - I don't even want to check ...

In short - there's a lot of information and you have to carefully find your way through the important parts which will help you in the specific case.

For our case in this tutorial, let's assume we can follow the getting started guide and build a simple cloud function working behind an [API gateway endpoint](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html). If you want to do it right, you will have to have an idea about concepts such as: [mapping request and response data](http://docs.aws.amazon.com/apigateway/latest/developerguide/request-response-data-mappings.html), getting to know some new [template language for mapping variables](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html), etc. These are the basics of API Gateway to get you going with the request and response management over HTTP. Then come some fundamentals you'll need about the AWS Lambda too - knowing what is a [handler function](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html) (the cloud function), figure [the parameters of the handler](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html) and [reading logs](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html) from another AWS service.

In short, "keep calm and learn AWS services", at least the basics.

**2) We speak cloud abstraction here - it is not easily reproducible for local development**

I spent quite some time researching on ways to have the whole AWS API Gateway + AWS Lambda setup locally so that I can start hacking quickly on my computer, but I haven't found anything even relatively easy so far. If you have one or some in mind - please tell me!

**3) We still write JavaScript and Node.js - be ready for the regular hurdles you'll normally have**

The fact that you're delegating the infrastructure complexity to someone else out there doesn't mean that your code will automagically working, not in the Node.js world, not at the moment.

For example, sometimes you would receive errors [like this](https://forums.aws.amazon.com/thread.jspa?threadID=229528) and you will have to apply your JavaScript knowledge and patience to switch between versions of Node, transpile the code for the Lambda to be able to show you better error messages, etc.

For me, the [serverless](https://serverless.com/) tool worked pretty well in the deployment part. It definitely hid most of the complexity of understanding template languages and setting up boilerplate code for the function to work. More on this later in the practical section.

## Github side of the project

The setup on github is relatively simpler than AWS. First of all, you'll need to read about the [webhooks](https://developer.github.com/webhooks/). The documentation is without any doubt of great help - it walks you through all the stages from setting up a local dev environment, testing a hook, and also having a good knowledge of the structure of the payloads that the webhooks send along. If you read the documentation carefully and follow along, you will have 0 problems.

This is a high-level action plan:

* Have an account, a repo, etc.
* Generate a user token ([user can be a bot](https://help.github.com/articles/differences-between-user-and-organization-accounts/))
* Setup webhooks for a repository
* Enter information about the API Gateway endpoint which works with the cloud function, this is your bot