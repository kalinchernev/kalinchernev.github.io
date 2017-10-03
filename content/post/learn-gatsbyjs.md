+++
author = "Kalin Chernev"
draft = true
comments = true
date = "2017-10-03T23:33:31+00:00"
image = "images/gatsby-netlify-cover.png"
menu = ""
share = true
slug = "learn-gatsby"
tags = ["JAM stack", "JavaScript", "Gatsby.js"]
title = "Learn Gatsby"

+++

## Introduction

In this article, I decided to write more elaborately on thoughts before I actually go into the details of the subject itself. I let myself reflect on how and why the MEAN stack got popular, about the JAM stack, Gatsby and there are sprinkled words about JavaScript and React here and there.

So, instead of quickly copying and pasting some good features of Gatsby and showing you how to do things, instead I speak about the **why** I think the tool introduces good new ideas and how these ideas contribute to the magnificent evolution of Web.

You can skip the long part and go directly to the practical part.

### Trends

Web, and web development have evolved unimaginatively in the last decade. For example. Let's imagine a timeline since the presentation of the first iPhone:

<iframe width="560" height="315" src="https://www.youtube.com/embed/e7EfxMOElBE?rel=0" frameborder="0" allowfullscreen></iframe>

When I watch this video, I always have this feeling of: "Damn, that was only 10 years ago!" Probably one of the first occasions when people like Steve Jobs and Eric Schmidt sell the idea about data, web services, cloud, etc.

The history of mobile phones has somewhat resemblance to the technology stacks we tend to use as web developers. Nokia (imagine LAMP stack) was slowly getting replaced or less favored by users for iPhone and smart phones - imagine MEAN stack.

The [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) being coined in 2013 (I know, only few years ago, right!) was a result of new tools getting popular - Node.js, Express.js, Angular.js and MongoDB. People started building more RESTful APIs and using JavaScript everywhere.

The MEAN stack became the new sexy thing because of the better user experience, like building better and more responsive UI, but also with a new promise - having 1 language in the front-end and the back-end.

Though, the MEAN stack still shares a lot of concepts with the MEAN stack - having a front-end
(view) layer, a db (model) layer, and a programming language to move all these,
all these were same as the fact that the [Nokia 9110i communicator](http://www.gsmarena.com/nokia_9110i_communicator-pictures-18.php)
was on the market way before iPhone and covered a lot of the computer features
the iPhone did :) On the other side, the MEAN stack solves real problems such as real-time, reactive and responsive interfaces which is what people love about Web, in a similar way
that smart phones are solving problems older phones didn't - multitasking being an example.

If we focus on the view layer, the years around 2013-2015 were interesting too. Google shot themselves in the foot by announcing that Angular 2.0 will have nothing to do with Angular 1.0 and in fact, they didn't even know when exactly the 2.0 will come out.

![Crazy World of JavaScript](/images/js-crazy.jpg)

React.js was in the right moment and in the right place. People already knew that
the DOM is slow and jQuery is not a good fit for building a nice non-blocking interface.
Angular had already made the Single Page Applications (SPA) concepts popular.

React.js is not only about the MEAN stack or the SPA or "bundled" though, it's only managing components. The tool is still a good player on the market not only because of the good marketing, but also because of the programming concepts and methodologies and easiness of use it brings to the market.

There are many technologies which come, stay and mature such as Ember, Vue, Web Components, browser APIs, etc. but somehow they don't get the popularity and the traction of React. A tool can change popularity drastically, but that's now what should drive your decision to try it and use it or not.

### Staying focused as a developer

Tools are just tools. They come and go, and the way you can really benefit from a tool or a framework regardless of the time you spend with it is asking yourself:
- Why does this tool exist in the first place?
- What are the problems it's solving?
- What are the skills I can learn with it?
- Which concepts are transferable to other tools?
- Is this tool really optimizing my work?
- Is it optimizing costs for hosting and maintenance?
- Do you enjoy working with the tool?

In short, when working with a new tool, framework or a library, think about the new concepts and approaches to solve problems you are going to learn and how you can reuse them in your career.

If you optimize time, performance, budget or processes using a tool while learning reusable skills, that's a golden place to be in the JavaScript community (and not only) that will stand in time regardless of the current modern fashion trends.

### The JAM stack

JAM stands for JavaScript, APIs and Markup. We speak about static sites consisted of HTML, CSS and JavaScript without a server-side rendering.

This makes JAM stack applications:
- faster - no server rendering
- more secure - security best practices delegated to APIs
- cheaper - as expensive as it is to host static assets
- a bit easier to develop

As [mentioned before](https://kalinchernev.github.io/tags/jam-stack/) this stack differs from the traditional LAMP/MEAN stacks in the A, which stands for APIs. As simple as it may sound, it is a powerful concept where the database/persistence layer of the stack is taken out of the equation and delegated to external services.

A simple example would be making a contact form which normally needs a server to accept the request and process it with a mailing server. In a static site, this could be delegated to a [cloud function](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-action-lambda.html) using [services](https://codehabitude.com/2016/04/05/forms-to-emails-using-aws-lambda-api-gateway/) behind an [API](https://github.com/eleven41/aws-lambda-send-ses-email) endpoint.

The most popular static site generators are [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), the one I use currently for this blog, though there are [plenty of options on the market](https://www.staticgen.com/). [Gatsby](https://www.gatsbyjs.org/) is the one which currently gains more popularity and I believe there is a good reason for that. Read on to see why.

A related topic and trend in web development in the last few years is the so called ["headless" CMS](https://headlesscms.org/). In fact, this trend has been growing steadily in communities such as [Drupal](https://dri.es/drupal-looking-to-adopt-react) and [WordPress](https://snipcart.com/blog/reactjs-wordpress-rest-api-example). These are examples for the "A", APIs in the JAM stack.

Another great example for an API managing content in a JAM stack is the [NetlifyCMS](https://www.netlifycms.org/) which work has the architecture to work with github's API, but can virtually be plugged in to different providers of content.

Here's a short video that probably summarizes the reasons for the rise of the JAM stack:

<iframe width="560" height="315" src="https://www.youtube.com/embed/uWTMEDEPw8c?rel=0" frameborder="0" allowfullscreen></iframe>

### The rise of GraphQL

I believe that the JAM stack is not really a completely new concept or practice, to be honest. It's a result of the evolution of Web, as described in the first section of this article. Because of the growing demands to our results, we need different ways to solve problems in the front-end, making UI more responsive (and that's why React is a key tool as well)

Together with the growth of the JAM stack, naturally the API part of the stack also grows with it. And that's where the [GraphQL](https://kalinchernev.github.io/graphql-guide-wish-found-before/) comes into play. With this tool we optimize the ways we make queries for information we need, in the same way the other part of the stack optimize the way we bundle and deliver assets for the client side for better performance.

With GraphQL:
- you query for information
- you get exactly the information in the way you requested it
- you make 1 request and you get 1 response which optimizes the request <-> response
- you get a self-documenting API
- you get awesome tools around it

Long story short, it [fits very well in the JAM stack](https://thenewstack.io/emerging-graphql-serverless-stack-building-static-web-sites/) for a reason.

### Gatsby

It was a long way to reach to this point in the article (or not? :) but I wanted to show the reasoning why Gatsby is the tool worth trying.

- Easy to develop: work with React/GraphQL/Webpack, etc. without configurations - similar concept as in create react app and meteor I have tried before.
- Easy to extend: I really like the plugin architecture, it's close to what site builders know from Drupal, Wordpress, etc.
- Data: I love the idea of multiple but still unified data source
- Prototyping: I like the simplicity of making something nice quickly with typography.js
- Easy deployment: The end result is a static site -> cheap, still SPA + performance
- Can have literally any Admin UI for a back end if any
- PWA on the fingertips

It's like what Drupal was for the LAMP stack in 2009 - new concepts which make a difference in the way we build modern web applications without too much of a hustle on setup, development and deployment.

### The benefits of leaning Gatsby.js

- Learn modern front-end technologies gradually
- Learn React in an easy way (no setup)
- Learn GraphQL query part, the interesting and sweet part :)
- JavaScript everywhere - transferable skill

### Benefits for businesses

- Fast prototyping (I liked that in Meteor in the past)
- No hosting or cheap hosting (no databases)
- Any Admin UI, or Netlify CMS as a start
- Easy to find JavaScript developers on the market
- Landing pages which can withstand high-peak traffic (no databases)
- Tricky functions can be delegated to APIs (Lambda functions)
