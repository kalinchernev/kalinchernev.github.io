---
title: Python functions in the cloud
slug: "/python-functions-cloud"
date: "2018-03-18T00:00:00+00:00"
category: "Code"
draft: true
template: "post"
tags:
  - Python
  - Serverless
  - SAM
  - AWS
socialImage: "../defaultSocialImage.jpg"
---

## Introduction

In this article, I will share some of my experiments developing cloud functions in Python and deploying them on AWS.

Disclaimer: Python is not my everyday language, neither are NLP and NLU my subjects of expertise. Also, AWS is still a maze of services, discovering new ways to work in the cloud. So when I choose to use SAM/SAM local over the [serverless framework](https://serverless.com/) (which I know better) please understand that I do all that for learning purposes :)

I have to say this up-front as well - there are faster ways to achieve results in NLP/NLU by using the [Amazon Comprehend](https://aws.amazon.com/comprehend/) and/or [Amazon Lex](https://aws.amazon.com/lex/) services. Personally, I wanted to learn how to work with Python mainly, because I am so far aware of at least 2 Python tools: [NLTK](https://www.nltk.org/) and [rasa_nlu](https://github.com/RasaHQ/rasa_nlu).

### Python basics and local environment

Coming from the `node`/`npm` world, the first thing I had to do is get going locally. This wasn't as easy as I expected, on Mac at least, because the OS comes with v2 of Python installed by default, whereas I feel most of the modern/cool things happen in v3. Oh well, at least the [NLTK book](http://www.nltk.org/book/) states that v3 it will be in the beginning.

I will not go into detailed explanations why you should install Python 3 or how, I'm new here, but these are the corner stones I had to go through to reach a decent working environment:

- Use `brew`.
- Install `python` package (`brew install python`), which installs v3, with pip and others.
- Use `pip3` (yeah ...) to get [`pipenv`](https://github.com/pypa/pipenv). Probably `virtualenv` will also do just fine. `pipenv` helps me move forward, as it works similarly to `npm` which is ok for me at the moment.
- Persist 2 environment variables `LANG=en_US.UTF-8` and `LC_ALL=en_US.UTF-8` in whichever shell-specific config you have: `~/.bash_profile`, `~/.zshenv`, `~/.config/fish/config.fish`, etc. Without these, `pipenv` won't work.
- Ensure paths are correctly set so both versions are working. Just in case you need Python 2, you will have a choice.
- Learn the basic commands to init/start/switch virtual environments, install and remove dependencies, etc.
- [Configure PyCharm to use the interpreter](https://www.jetbrains.com/help/pycharm/configuring-python-interpreter.html) for a given virtual environment. Not obligatory, but I still spent time with it, being able to debug code is learning experience for me.

For the rest, like variables, functions, and other language features and constructs, find what best works for you. Personally, I google and read the docs for the specifics I find different than the other languages I know.

By the end of this section, you would have a similar setup working:

![NLTK hello world](/media/python-setup-ready.png)

### SAM and SAM local

#### SAM specification

SAM stands for Serverless Application Model and surprisingly not Sam Kroonenburg. AWS SAM was a topic in my AWS Certified Developer – Associate beta exam, so I decided to read about it. After experimenting a bit with it, I would describe it like an extension of [AWS CloudFormation](https://aws.amazon.com/cloudformation/).

Having a brief experience with serverless framework, when taking a read of [the spec](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md) I can highlight these:

- [`CodeUri`](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#s3-location-object) points to an S3 bucket containing the package.
- APIs are defined in [swagger](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessapi)
- No [variables beauty](https://serverless.com/framework/docs/providers/aws/guide/variables/)
- [Intrinsic functions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html) are supported.

In complement to the SAM specification, comes the [SAM local](https://github.com/awslabs/aws-sam-local#usage) CLI application.

In my eyes, these are the interesting points of the tool in comparison with the serverless framework:

- Written in Golang, whereas serverless framework is written in JavaScript. Official docs are yet suggesting installation to happen like this:

```
$ npm install -g aws-sam-local
```

Indeed, `npm` is the node package manager.

- Running functions locally is emulated with the help of [Docker](https://hub.docker.com/r/cnadiminti/aws-sam-local/). Seems less flexible local emulation than some alternatives such as [`serverless-offline`](https://github.com/dherault/serverless-offline)
- Mostly wraps around `cloudformation` CLI commands from `awscli`

#### SAM Local

- [Setup AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) (`aws configure` is easy way)
- Create a bucket for your deployments on S3
- Validate [SAM template](https://github.com/awslabs/aws-sam-local#validate-sam-templates)
- [Package and deploy](https://github.com/awslabs/aws-sam-local#package-and-deploy-to-lambda)

Myself, I made my first deployment based off of [something simple](https://github.com/awslabs/aws-sam-local/tree/develop/samples/hello-world/python). Although the repository of the spec contains far [more examples](https://github.com/awslabs/serverless-application-model/tree/master/examples). An interesting sample is the one about [Python with external dependencies](https://github.com/awslabs/aws-sam-local/tree/7b496590bcd4b326e39b07eb33667015ec9094e2/samples/python-with-packages).

#### Deploying Python functions with external dependencies

Packaging NLTK
