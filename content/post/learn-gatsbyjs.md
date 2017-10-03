+++
author = "Kalin Chernev"
comments = true
date = "2017-10-03T23:33:31+00:00"
share = true
slug = "learn-gatsbyjs"
tags = ["JAM stack", "JavaScript", "Gatsby.js"]
title = "Learn Gatsby.js"

+++

## Introduction

In this article I decided to start by looking back to the history of Web and web/website development in the last decade. I let myself reflect on how and why the MEAN stack got popular, about the JAM stack, Gatsby.js and there are sprinkled thoughts about JavaScript and React here and there.

I believe that it's important to speak about the **why** and the facts how technologies evolve before I speak about tools itself. Hopefully, the story-telling part will help visualize the benefits of the tools better.

Of course, you can [jump directly to the practical part](#) at any time.

### How can you know what is coming up if you never looked back?

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

There are many front-end technologies which come, stay and mature such as Ember, Vue, Web Components, browser APIs, etc. but somehow they don't get the popularity and the traction of React. A tool can change popularity drastically, but that's now what should drive your decision to try it and use it or not.

### The JAM stack

JAM stands for JavaScript, APIs and Markup. We speak about static sites consisted of HTML, CSS and JavaScript without a server-side rendering.

This makes JAM stack applications:
- faster - no server rendering
- more secure - security best practices delegated to APIs
- cheaper - as expensive as it is to host static assets
- a bit easier to develop

As [mentioned before](https://kalinchernev.github.io/tags/jam-stack/) this stack differs from the traditional LAMP/MEAN stacks in the A, which stands for APIs. As simple as it may sound, it is a powerful concept where the database/persistence layer of the stack is taken out of the equation and delegated to external services.

A simple example would be making a contact form which normally needs a server to accept the request and process it with a mailing server. In a static site, this could be delegated to a [cloud function](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-action-lambda.html) using [services](https://codehabitude.com/2016/04/05/forms-to-emails-using-aws-lambda-api-gateway/) behind an [API](https://github.com/eleven41/aws-lambda-send-ses-email) endpoint.

The most popular static site generators are [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), the one I use currently for this blog, though there are [plenty of options on the market](https://www.staticgen.com/). [Gatsby.js](https://www.gatsbyjs.org/) is the one which currently gains more popularity and I believe there is a good reason for that. Read on to see why.

A related topic and trend in web development in the last few years is the so called ["headless" CMS](https://headlesscms.org/). In fact, this trend has been growing steadily in communities such as [Drupal](https://dri.es/drupal-looking-to-adopt-react) and [WordPress](https://snipcart.com/blog/reactjs-wordpress-rest-api-example). These are examples for the "A", APIs in the JAM stack.

Another great example for an API managing content in a JAM stack is the [NetlifyCMS](https://www.netlifycms.org/) which work has the architecture to work with github's API, but can virtually be plugged in to different providers of content.

Here's a short video that probably summarizes the reasons for the rise of the JAM stack:

<iframe width="560" height="315" src="https://www.youtube.com/embed/uWTMEDEPw8c?rel=0" frameborder="0" allowfullscreen></iframe>

### The rise of GraphQL

Together with the growth of the JAM stack, naturally the API part of the stack also grows with it. And that's where the [GraphQL](https://kalinchernev.github.io/graphql-guide-wish-found-before/) comes into play. With this tool we optimize the ways we make queries for information we need, in the same way the other part of the stack optimize the way we bundle and deliver assets for the client side for better performance.

With GraphQL:
- you query for information
- you get exactly the information in the way you requested it
- you make 1 request and you get 1 response which optimizes the request <-> response
- you get a self-documenting API
- you get awesome tools around it

Long story short, it [fits very well in the JAM stack](https://thenewstack.io/emerging-graphql-serverless-stack-building-static-web-sites/) for a reason.

### Serverless

And with the continues optimizations on the API/server part of applications, the "Serverless" concept and practices came into being. Many call the same concept cloud functions which fit well into new ways we build SPA or virtually any type of apps calling external services.

I think the [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html) in combination with [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) was the first mainstream toolset of building APIs in new ways:
- no servers or containers to manage
- payed only for the resources being used
- many times cheaper than managing EC2 instances or similar

Nowadays, the API part of a static site can also be developed locally with tools such as the [serverless framework](https://serverless.com/), each specific task being handled in a separate micro-service without too much of provisioning work - [user services for authentication and authorization, mailing](https://github.com/serverless/site/tree/master/backend), etc.

In fact, some patterns described in [Serverless Architectures on AWS](https://www.manning.com/books/serverless-architectures-on-aws) show how GraphQL can be the user-facing single endpoint in a serverless environment. As cool as this sound, like having a "touch-based keyboard which can't be wrong", these brings [new problems to solve](https://www.youtube.com/watch?v=lnOIcKibKzc) such as resource exhaustion and complex resolvers to map information about various resolvers.

### The stack of today, the stack of tomorrow

So far we spoke about the LAMP and MEAN stacks which gained popularity by solving complex problems in simple ways and making single page applications and Web prettier and more attractive in various devices which appeared in the market in the last decade.

With the higher demands for easier development and maintenance of complex UIs and interactions, and in the search of nice and smooth responsive (non-blocking) interfaces, view-layer specific libraries gained popularity and will surely stay on the market as long as they make developers live easier.

The server-rendering got slowly out of the equation being replaced by RESTful APIs, GraphQL APIs or simply statically generated assets which don't have any server logic at all. GraphQL started to be seen as the magical language to get information from whatever sources in the way information is needed.

Understanding these trends deeply is not a matter of following a movement of cool development practices. (Not only at least). These trends come as a result of the following facts:

- Users will use your app with all sorts of devices with access to Web and Internet.
- Your application will have to work with multiple data sources.
- Users will expect faster and smoother interactions
- Your application will have to be working offline.
- Your client expects his application to withstand peaked traffic from Hacker News home page.
- Your stack will have to continuously reduce costs.
- Your stack will have to continuously perform faster.
- Your stack will have to stay (or at least try to) easily maintainable.

**The stack of today, and the stack of tomorrow will always focus on better performance, multiple data sources, best possible tooling and, of course, lowest possible costs of development and maintenance.**

### Gatsby.js

Ok, it was a looong way reaching here to point of the article, wasn't it? Or you skipped all the details because you know and feel there's something with Gatsby.js that you are hungry to learn about? At any case, welcome to the essential part of the post where you are going to learn how to benefit from all the good parts mentioned in the previous sections. They were meant to build up momentum for the great value Gatsby.js gives you.

#### What's inside?

Gatsby.js consists of React.js, GraphQL, Webpack and other modern technologies. It follows the "no build configurations" principle, This means that if you are a PHP developer who wants to learn React.js or GraphQL you can go for it and do it without losing your time and motivation into learning build tools. You can install the project and continue building prototypes and products. To an extend, Gatsby.js is similar to [create-react-app](https://github.com/facebookincubator/create-react-app) and  [Meteor.js](https://www.meteor.com/).

What separates Gatsby.js from the others, however, is the way it handles data. In Gatsby.js data could come from several types of files in the project - markdown, CSV, JSON, or it could come from external services or CMS like Drupal and Wordpress.

![Visualization of the concept of multiple data sources in Gatsby.js](/images/gatsby-netlify-cover.png)

#### The benefits of leaning Gatsby.js

Here's a short list of benefits I personally see to why to spend the time learning Gatsby.js:

- Learn modern front-end technologies gradually
- Learn React in an easy way - no Webpack configurations necessary for starters
- Learn how to query GraphQL API servers
- Easy to extend: I really like the plugin architecture, it's close to what site builders know from Drupal, Wordpress, etc.
- Data: I love the idea of multiple but still unified data source
- Prototyping: I like the simplicity of making something nice quickly with typography.js
- Easy deployment: The end result is a static site -> cheap, still SPA + performance
- Can have literally any Admin UI for a back end if any
- PWA on the fingertips (plugins)
- JavaScript everywhere - transferable skill

#### Why data and GraphQL is such a big deal?

Because a lot of the [heavy-weight lifting](https://github.com/gatsbyjs/gatsby/issues/420) of [building resolvers](https://www.youtube.com/watch?v=lAJWHHUz8_8) is done for you!

The the process of building pages and components using data in Gatsby.js can be summarized in the following few steps:

- Define data source
- Prepare/tranform the data
- Querying the data with GraphQL
- Place the result of the query within a React component
- Display the information

This [official tutorial about data sources in Gatsby.js](https://www.gatsbyjs.org/tutorial/part-four/) is a very useful resource if you want to preliminary read about the main concepts shown in the tutorial part.

### Making a website for Belgian beers

### Staying focused

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

### Alternatives

https://github.com/clintonwoo/hackernews-react-graphql/tree/master/src
