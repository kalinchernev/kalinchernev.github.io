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

I decided to include story-telling part in this blog post, where I let myself reflect on how and why the MEAN stack got popular, about the JAM stack, Gatsby.js and there are also sprinkled thoughts about JavaScript and React.js.

I believe it's important to speak about the **why** and the facts how technologies evolve before I speak about the tools. Stories about how and way tools get popular, and the way of thinking about technology can be a good base for answering many "will technology x kill technology y" type of questions.

Of course, you can [jump directly to the practical part](#) at any time.

### Fast-forward story about the Web in the last decade

Web, and web development have evolved unimaginatively in the last decade. And much of it came from a closely related market of mobile phones and how the market changed in time. For example, watch this presentation for the first iPhone:

<iframe width="560" height="315" src="https://www.youtube.com/embed/e7EfxMOElBE?rel=0" frameborder="0" allowfullscreen></iframe>

Damn, that was only 10 years ago! Probably one of the first occasions when people like Steve Jobs and Eric Schmidt sell the idea about data, web services and cloud technologies to consumers!

In fact, recent history of mobile phones resemble to the web tech stacks. Nokia - imagine the LAMP stack - was slowly getting replaced or less favored by users for iPhone and smart phones - imagine MEAN stack.

The [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) being coined in 2013 (I know, only few years ago, right!) is a result of new emerging tools such as Node.js, Express.js, Angular.js and MongoDB. People started building more RESTful APIs and using JavaScript everywhere.

The MEAN stack became the new best practice because of the better user experience, like building better and more responsive UI, but also with a new promise - having 1 language in the front-end and the back-end.

Though, the MEAN stack still shares a lot of concepts and practices with the LAMP stack. For instance, having a clear separation between front-end (view) layer and a db (model) layer, which is managed by a back-end programming language. When you think about it, you will realize that we speak about same things LAMP and MEAN, with some major improvements in the view layer and a programming language many developers dislike but have to use: JavaScript.


### The rise of React.js

> How can you know what is coming up if you never looked back?

Let's focus on the historic years of the view layer in 2013-2015. Remember, the "A" in the MEAN stack was a rock-star project of Google called Angular. Nowadays, even when a project's back-end is API-driven, and only the view layer is more reactive with React.js, Vue, etc - the stack is still frequently called a MEAN stack!

What happened, however, is that Angular team shot themselves in the foot by announcing that Angular 2.0 will be a totally different project than Angular 1.0. On top of that, they were not able to say anything specific about the release planning of version of 2.0! Not to speak they virtually obliged developers to learn a new type JavaScript language to work with the framework.

![Crazy World of JavaScript](/images/js-crazy.jpg)

React.js was in the right moment and in the right place. People already knew that the DOM is slow and jQuery is not a good fit for building a nice non-blocking interfaces. Angular had already made the Single Page Applications (SPA) concepts popular.

React.js is very focused on solving a very specific problem - components. But make no mistake, the fact that it's used by millions of developers does not mean that it's replacing jQuery. They solve different problems, but are measured as if they solve same problems sometimes. Some projects such as Drupal and WordPress who use jQuery and Backbone because of a long-term analysis and long discussions will speculate on using React.js "in core" to take attention.

**React is a way of thinking.**

The JavaScript ecosystem does not work like Drupal and WordPress. The fact that you have a mass of developers and users today does not mean you will be able to keep your momentum for tomorrow. And, by the way, Dries knows that excellently because Drupal has also a long history of bold API changes and aggressively change through time.

There is no certainty that tool X will be the best (whatever that actually means) tool for more than 6 to 12 months and the Angular example shown above is only a well-known story part of a big sea of similar fates in JavaScript communities.

For using JavaScript most effectively (or to stay on top of the wave) one must be able to think and organize the whole stack differently.

### The JAM stack

"JAM" stands for JavaScript, APIs and Markup. We speak about static sites consisted of HTML, CSS and JavaScript without a server-side rendering.

<iframe height="400" width="100%" src="https://jamstack.org/#what"></iframe>

This makes JAM stack applications:
- faster - no server rendering
- more secure - security best practices delegated to APIs
- cheaper - as expensive as it is to host static assets
- a bit easier to develop

As [mentioned before](https://kalinchernev.github.io/tags/jam-stack/) this stack differs from the traditional LAMP/MEAN stacks in the A, where APIs replace back-end logic on a server. As simple as it may sound, it is a powerful concept where the database/persistence layer of the stack is taken out of the equation and delegated to external services.

A simple example would be making a contact form which normally needs a server to accept the request and process it with a mailing server. In a static site, this could be delegated to a [cloud function](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-action-lambda.html) using [services](https://codehabitude.com/2016/04/05/forms-to-emails-using-aws-lambda-api-gateway/) behind an [API](https://github.com/eleven41/aws-lambda-send-ses-email) endpoint.

Speaking of static site generators - the most popular are [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), the one I use currently for this blog. There are [plenty of options on the market](https://www.staticgen.com/). [Gatsby.js](https://www.gatsbyjs.org/) is the one which I currently investigate.

A related topic and trend in web development in the last few years is the so called ["headless" CMS](https://headlesscms.org/). In fact, this trend has been growing steadily in communities such as [Drupal](https://dri.es/drupal-looking-to-adopt-react) and [WordPress](https://snipcart.com/blog/reactjs-wordpress-rest-api-example). These are examples for the "A", APIs in the JAM stack.

Another great example for an API managing content in a JAM stack is the [NetlifyCMS](https://www.netlifycms.org/) which work has the architecture to work with github's API, but can virtually be plugged in to different providers of content.

Some videos to watch about these:

<iframe width="560" height="315" src="https://www.youtube.com/embed/p8PHe8Hv8uw?rel=0" frameborder="0" allowfullscreen></iframe>

And a more general one about the JAM stack:

<iframe width="560" height="315" src="https://www.youtube.com/embed/uWTMEDEPw8c?rel=0" frameborder="0" allowfullscreen></iframe>

### The rise of GraphQL

Together with the growth of the JAM stack, naturally the API part of the stack also grows with it. And that's where the [GraphQL](https://kalinchernev.github.io/graphql-guide-wish-found-before/) comes into play. GraphQL optimizes queries. It's a layer between the request/response layer where we can ask for and get information we need.

In static sites the optimization comes from bundling and delivering static assets without rendering. GraphQL can further optimize the communication part when it's still needed.

With GraphQL:
- you query for information
- you get exactly the information in the way you requested it
- you make 1 request and you get 1 response which optimizes the request <-> response
- you get a self-documenting API
- you get awesome tools around it

Long story short, it [fits very well in the JAM stack](https://thenewstack.io/emerging-graphql-serverless-stack-building-static-web-sites/) for a reason.

### The Serverless / The rise of cloud functions

And with the continuous optimizations on the API/server parts, the "Serverless" concept and practices came into being. Many call the same concept cloud functions which fits well into new ways we build SPA or virtually any type of apps calling external services.

I think the [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html) in combination with [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) was the first mainstream toolset of building APIs in new ways:
- no servers or containers to manage
- pay only for the resources being used
- pay much less than any other type of computing service

Good for developers, nowadays, the API part of a static site can also be developed locally with tools such as the [serverless framework](https://serverless.com/), each specific task being handled in a separate micro-service without too much of provisioning work - [user services for authentication and authorization, mailing](https://github.com/serverless/site/tree/master/backend), etc.

In fact, some patterns described in [Serverless Architectures on AWS](https://www.manning.com/books/serverless-architectures-on-aws) show how GraphQL can be the user-facing single endpoint in a serverless environment. As cool as this sounds, like having a "touch-based keyboard which can't be wrong", these bring [new problems to solve](https://www.youtube.com/watch?v=lnOIcKibKzc) such as resource exhaustion and complex resolvers to map information about various resolvers.

The problems of consolidating information from various sources and transforming it for various types of clients, are still there.

### The stack of today, the stack of tomorrow

As you see, the higher demands towards our way of working and our results, the better the tooling becomes. You can quote me here if I didn't sound like Yoda.

The server-side rendering in runtime got slowly out of the equation being replaced by RESTful APIs, GraphQL APIs or simply statically generated assets which don't have any server logic at all. Thus, GraphQL started to be seen as the magical language to get information from whatever sources in the way information is needed.

Understanding these trends deeply is not a matter of following a movement of cool development practices. These trends come as a result of the following facts:

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
