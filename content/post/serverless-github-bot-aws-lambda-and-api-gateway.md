---
title: 'Serverless github bot with AWS Lambda and API Gateway '
slug: serverless-github-bot-aws-lambda-api-gateway-nodejs
date: 2017-07-11T22:40:00+00:00
tags:
- Bots
- nodejs
- JavaScript
- Serverless
- AWS
---

This tutorial will show you how to build a small github bot app which is "listening" for pull requests' events on "open" and "reopen" by [greenkeeper.io](https://greenkeeper.io/). When the author is the greenkeeper bot, our bot will in turn, correct the title and the tags of the pull request to match conventions.

![Github bot correcting the greenkeeper bot](/uploads/2017/07/12/github_bot_correcting_greenkeeper-1.png)

If you've come to this article because you already have knowledge about the technical topics, but you are more interested in the concrete steps, you can skip the following introductory parts and go directly to the technical specifics below. To go to the technical details scroll down to the **"10 steps to make it happen"** section ;)

The script will actually be pretty small and simple, though there are quite some interesting ideas you might get on the way.

## Serverless

[Serverless computing](https://en.wikipedia.org/wiki/Serverless_computing) is a relatively new trend which is getting greater popularity after Amazon released their [AWS Lambda](https://aws.amazon.com/lambda/) service in the end of 2014. I published about this topic in a bit [more details earlier this year](/january-digest-2017/#cloud). In one sentence, serverless architectures (aka cloud functions) are getting traction in cases where high-level architecture control is sufficient for developers who delegate the details about the infrastructure management to a hidden underlying layer managed by a cloud provider.

In addition to the low maintenance efforts, pricing per resource is also a lucrative opportunity for app developers - at the moment 1 million requests to AWS Lambda are [free](https://aws.amazon.com/free/) - this is generous! Later, [pricing](https://aws.amazon.com/lambda/pricing/) continues to be calculated based on actual usage. This means that applications cost money when they actually compute. That's good for both up-scaling and down-scaling.

Here's a graphic from [acloud.guru](https://acloud.guru/) which explains this evolution step in simple terms, I think:

![Where is the serverless in the history of the cloud](/uploads/2017/07/11/brief-history-of-cloud-acloud-guru.png)

Lastly, cloud functions such as AWS Lambda come well into play in event-oriented designs. Here's a simplified list of some [official use cases](http://docs.aws.amazon.com/lambda/latest/dg/use-cases.html):

* event-driven services where the cloud function is run in response to other events - usually triggered by AWS S3, SNS, DynamoDB, etc.

* services responding to HTTP requests - triggered by Amazon API Gateway or other AWS clients.

A github bot app can be considered as a service from the second set of scenarios. The end result is an API endpoint responding to `POST` requests (events) from [github webhooks](https://developer.github.com/webhooks/).

## Notes on the AWS serverless stack

Watching videos and reading tutorials on the topic can get you pretty excited. Here are some notes about steps which didn't go totally smooth during my journey, i.e. I want to prepare you for the reality before you get frustrated ;)

**1) The AWS services ain't that easy, especially if you're relatively new to AWS in overall**

For example:

* [AWS Lambda developer guide](https://aws.amazon.com/documentation/lambda/) - 300+ pages

* [Amazon API Gateway developer guide](https://aws.amazon.com/documentation/apigateway/) - 450+ pages

* [IAM documentation](https://aws.amazon.com/documentation/iam/) - I don't even want to check ...

In short - there's a lot of information and you have to find your way through the important parts which will help you in the specific case.

For our case in this tutorial, let's assume we can follow the getting started guide and build a simple cloud function working behind an [API gateway endpoint](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html). If you want to do it right, you will have to have an idea about concepts such as: [mapping request and response data](http://docs.aws.amazon.com/apigateway/latest/developerguide/request-response-data-mappings.html), getting to know some new [template language for mapping variables](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html), etc. These are the basics of API Gateway to get you going with the request and response management. Then come some fundamentals you'll need about the AWS Lambda too - knowing what is a [handler function](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html) (the cloud function), figure [the parameters of the handler](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html) and [reading logs](http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html) from another AWS service.

In short, "keep calm and learn AWS services", at least the basics.

**2) We speak cloud abstraction here - it is not easily reproducible for local development**

I spent quite some time researching on ways to have the whole AWS API Gateway + AWS Lambda setup locally so that I can start hacking quickly on my computer, but I haven't found anything so far. If you have one or some in mind - please tell me!

**3) We still write JavaScript and Node.js - be ready for the regular hurdles you'll normally have**

The fact that you're delegating the infrastructure complexity to someone else out there doesn't mean that your code will automagically work, at least not in the Node.js world, not at the moment.

For example, sometimes you would receive errors [like this](https://forums.aws.amazon.com/thread.jspa?threadID=229528) and you will have to apply your JavaScript knowledge and patience to switch between versions of Node, transpile the code for the Lambda to be able to show you useful error messages ...

For me, the [serverless](https://serverless.com/) framework worked pretty well in the deployment part. It definitely hid most of the complexity of understanding template languages and setting up boilerplate code for the function to work.

## Notes on the [serverless](https://serverless.com/) framework

If you, like me, feel that the setup of the framework is a bit too much, then just go directly to the [example repository](https://github.com/serverless/examples) and get to know the [aws-node-github-webhook-listener](https://github.com/serverless/examples/tree/master/aws-node-github-webhook-listener).

By using this example boilerplate, you will need only 2 keys auth components to make the communication between services work:

* [Github user token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

* [AWS user tokens](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)

Try to keep the scope of permissions to a minimum to ensure best security in your applications. Both AWS and serverless provide other authentication options you might feel more comfortable with.

## Notes on the github part

The setup on github is simpler than AWS. Basically, you'll need to read about [webhooks](https://developer.github.com/webhooks/). The documentation is without a doubt - great - it walks you through all the stages from setting up a local dev environment, testing a hook, and also having a good knowledge of the structure of the webhooks' payloads.

This is a high-level action plan:

* Have an account, a repo, etc.

* Generate a user token. ([user can be a bot](https://help.github.com/articles/differences-between-user-and-organization-accounts/))

* Setup webhooks for a repository.

* Enter information about the API Gateway endpoint which works with the cloud function, this is your bot.

## 10 steps to make it happen

Ok, enough introductory talks, that's the more visual part of the article containing the main milestones making the things actually work.

**1. Create a user that can work with AWS Lambda and API Gateway services.**

![Creating an AWS user you can operate with](/uploads/2017/07/12/create_aws_user_lambda.gif)

For simplicity, I'm adding the user to the group of admins. Then I'm downloading the tokens for later use with the serverless framework.

**2. Go to your github profile settings page and [generate a user token](https://github.com/settings/tokens/new) by which the bot will act on your behalf.**

You can make a cool bot separate from your account, of course.

![Creating a new user token on github.com](/uploads/2017/07/12/new_user_token_github.png)

When you save this form, you will see the token, which you have to save somewhere with the same attention you would have to your password:

**3. [Generate a webhook secret](https://developer.github.com/webhooks/securing)**

![Generating a webhook on github.com](/uploads/2017/07/12/generate_webhook_secret-1.png)

**4. Input the user token and the webhook secret in the serverless config file**

![Saving configurations in the serverless framework config file](/uploads/2017/07/12/save_config.png)

**5. Put function code in the `handler.js` file**

![Editing the cloud function](/uploads/2017/07/12/handler.png)

**6. You can try to deploy the function:**

```
$ serverless deploy

```

Watch it fail ;)

![Failing deployment in the serverless framework](/uploads/2017/07/12/enter_credentials_serverless.png)

**7. Export your keys (which you downloaded in the `credentials.csv` files earlier as:**

```
$ export AWS_ACCESS_KEY_ID=
$ export AWS_SECRET_ACCESS_KEY=
# AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are now available for serverless to use
serverless deploy

```

**8. Run `serverless deploy` again and watch it succeeding**

![Showing a successful deployment of a function on AWS](/uploads/2017/07/12/serverless_deploy_success.gif)

**9. Take the provided URL and add it to the webhooks of your repository where you want the bot to take effect**

![Adding a new webhook on github.com](/uploads/2017/07/12/adding_webhook_github.png)

Few notes:

* This is the secret you previously generated via the command line

* It's a good practice to filter only the necessary events in order to minimize the load to the endpoint

**10. Trigger the webhook either by github or by closing and re-opening an existing pull request which has been opened by greenkeeper bot.**

That's an [example script](https://gist.github.com/kalinchernev/d1e79a7f883a4d37f50519d9b05df0c5.js) you can use.

## Extras

When you have this automated corrections on pull request titles and tags, you might also need to [update the lock files](https://github.com/greenkeeperio/greenkeeper-lockfile) of the pull request to make all ready for merging.
