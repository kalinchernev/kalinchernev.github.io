+++
comments = true
date = "2017-07-04T22:55:34+02:00"
tags = ["github", "Bots", "AWS", "microservices"]
slug = "github-bot-aws-services"
image = ""
share = true
title = "Building a github bot with aws services"
+++

## Introduction

Bots - a new fancy tech buzzword which frequently mean writing automation scripts which help us in mundane tasks. In this article, I'll be writing about building a bot which automates reviews on pull requests on github.com.

### Github bot

Github's [user documentation](https://help.github.com/articles/differences-between-user-and-organization-accounts/), it says:

> User accounts are intended for humans, but you can give one to a robot, such as a continuous integration bot, if necessary.

So, the bot can be as basic as a regular user which has a token and access permissions to take some actions on our behalf during automation.

### API on AWS

Getting started with the [Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-intro.html)



### API back-end service

Lambda, "server-less".
options:
- https://github.com/motdotla/node-lambda
- https://serverless.com/

### Communication flow

Webhooks

### Enforcing rules on pull requests

danger.js
