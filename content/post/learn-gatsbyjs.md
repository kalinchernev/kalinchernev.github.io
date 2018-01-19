---
title: Learn Gatsby.js
slug: learn-gatsbyjs
date: 2017-10-03T23:33:31+00:00
tags:
- JAM stack
- JavaScript
- GatsbyJS
---

> “There are those that look at things the way they are, and ask why? I dream of things that never were, and ask why not?”

_Dedicated to all visionaries who move the Web forward_

## Introduction

In this article, I let myself write about various topics before I reach the essence. The story line goes from how and why the MEAN stack got popular, to the JAM stack, Gatsby.js and there are also sprinkled thoughts about JavaScript and React.js.

I believe it's important to speak about the **why** and the facts how technologies evolve in time before I speak about the tools themselves. Explaining the historic events and reasoning answer questions like "will technology X kill technology Y" before they are brought up.

At any time, you can [jump directly to the practical part](#gatsby-js-https-www-gatsbyjs-org).

### Fast-forward story about the Web in the last decade

Web, and web development have evolved unimaginatively in the last decade. And much of it came from a closely related market of mobile phones and how its market changed as well. For example, watch this presentation for the first iPhone:

<iframe title="Steve Jobs presenting the first iPhone" width="560" height="315" src="https://www.youtube.com/embed/e7EfxMOElBE?rel=0" frameborder="0" allowfullscreen></iframe>

Damn, that was only 10 years ago! Probably one of the first occasions when people like Steve Jobs and Eric Schmidt sell the idea about data, web services and cloud technologies to consumers!

In fact, recent history of mobile phones resemble the history of web stacks. Nokia - imagine the LAMP stack - was slowly getting replaced or less favored by users for iPhone and smart phones - imagine MEAN stack. Still both stacks are good for certain people and certain scenarios.

The [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) term was coined in 2013. It's a result of new emerging tools such as Node.js, Express.js, Angular.js and MongoDB. People started building more RESTful APIs and use JavaScript everywhere.

The MEAN stack became the new best practice because of the better user experience, like building better and more responsive UI, but also with a new promise - having 1 language in the front-end and the back-end.

Though, the MEAN stack still shares a lot of concepts and practices with the LAMP stack. For instance, having a clear separation between front-end (view) layer and a db (model) layer, which is managed by a back-end programming language. When you think about it, you will realize that we speak about same things LAMP and MEAN, with some major improvements in the view layer and the programming language: JavaScript.


### The rise of React.js

![The logo of React.js](./images/reactjs.png)

> How can you know what is coming up if you never looked back?

Let's focus on the historic years of the view layer in 2013-2015. Remember, the "A" in the MEAN stack was a rock-star project of Google called Angular. Nowadays, even when a project's back-end is API-driven, and only the view layer is more reactive with React.js, Vue, etc - the stack is still frequently called a MEAN stack!

What happened, however, is that Angular team shot themselves in the foot by announcing that Angular 2.0 will be a totally different project than Angular 1.0. On top of that, they were not able to say anything specific about the release planning of version of 2.0! Not to mention that they virtually obliged developers to learn and use a new Type of JavaScript.

![Crazy World of JavaScript](./images/js-crazy.jpg)

React.js was in the right place in the right time. People already knew that the DOM is slow and jQuery is not a great fit for building a nice non-blocking interfaces. Angular had already made the Single Page Applications (SPA) concepts popular.

React.js is very focused on solving a very specific problem - components. But make no mistake, the fact that it's used by millions of developers does not mean that it's replacing jQuery. They solve different problems in different ways. It's crazy when big projects try to evaluate these tools with similar procedures. Some projects like Drupal use jQuery and Backbone because of a long-term goals. Nowadays, communities will need speculate on using React.js "in core" to take attention.

Probably the experienced users of React.js will be solving different problems at the some time - like deciding upon a state management package, offline capabilities, build tools, and many other questions in addition to the view layer.

**React is a way of thinking.**

The JavaScript ecosystem does not work in the same way like Drupal. The fact that you have a mass followers today does not mean you will be able to keep your momentum for tomorrow. However, as long as Facebook team does not make a stupid mistake like Google in the past, and keep actually using React.js for solving their real projects, the tool will surely stay for years to come.

When the fear or the craziness for selecting a tool pass, developers will hopefully understand that the real questions with JavaScript is not for how long, but how effectively. For using JavaScript most effectively (or to stay on top of the wave) one must be able to think and organize the whole stack differently.

### The rise of the JAM stack

"JAM" stands for JavaScript, APIs and Markup. We speak about static sites consisted of HTML, CSS and JavaScript without a server-side rendering.

<iframe title="Embedded website for the JAM stack" height="400" width="100%" src="https://jamstack.org/#what"></iframe>

This makes JAM stack applications:

- faster - no server rendering
- more secure - security best practices delegated to APIs
- cheaper - as expensive as it is to host static assets
- a bit easier to develop

As [mentioned before](/tags/jam-stack/) this stack differs from the traditional LAMP/MEAN stacks in the A, where APIs replace back-end logic on a server. As simple as it may sound, it is a powerful concept where the database/persistence layer of the stack is taken out of the equation and delegated to external services.

A simple example would be making a contact form which normally needs a server to accept the request and process it with a mailing server. In a static site, this could be delegated to a [cloud function](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-action-lambda.html) using [services](https://codehabitude.com/2016/04/05/forms-to-emails-using-aws-lambda-api-gateway/) behind an [API](https://github.com/eleven41/aws-lambda-send-ses-email) endpoint.

If you're coming from a LAMP stack background, you would have certainly already heard about the ["headless" CMS](https://headlesscms.org/) trend. In fact, this trend has been growing steadily in communities such as [Drupal](https://dri.es/drupal-looking-to-adopt-react) and [WordPress](https://snipcart.com/blog/reactjs-wordpress-rest-api-example).

**Mature content management systems contribute to the rise of the JAM stack.**

Another great example for an API-driven CMS which is highly focused on the principles of the JAM stack is the [NetlifyCMS](https://www.netlifycms.org/). It currently works almost solely with the Github's API, but can also be plugged in to different providers of content.

Also, static site generators contribute to the JAM stack. The most popular static site generators are [Jekyll](https://jekyllrb.com/) and [Hugo](https://gohugo.io/). There are [plenty of options on the market](https://www.staticgen.com/). [Gatsby.js](https://www.gatsbyjs.org/) is the one which I currently study to be my number 1 :)

One of my favorite pull requests recently was the one adding [documentation about the integration between Gatsby.js and NetlifyCMS](https://github.com/netlify/netlify-cms/pull/527). With this integration, you can easily provide a nice-looking [admin UI for your static site](/admin-ui-gatsby-static-site-generator).

Some recommended videos:

<iframe title="Video about how Smashing Magazine adopts the JAM stack" width="560" height="315" src="https://www.youtube.com/embed/p8PHe8Hv8uw?rel=0" frameborder="0" allowfullscreen></iframe>

And a more general one about the JAM stack:

<iframe title="Introdctory video about the JAM stack" width="560" height="315" src="https://www.youtube.com/embed/uWTMEDEPw8c?rel=0" frameborder="0" allowfullscreen></iframe>

### The rise of GraphQL

![The logo of GraphQL](./images/graphql_logo.png)

Together with the growth of the JAM stack, naturally the API part of the stack also grows with it. And that's where the [GraphQL](/graphql-guide-wish-found-before) comes into play. GraphQL optimizes queries.

In static sites the optimization comes from bundling and delivering static assets without rendering. GraphQL can further optimize the communication part when it's still needed.

With GraphQL:

- you query for information
- you get exactly the information in the way you requested it
- you make 1 request and you get 1 response which optimizes the request <-> response
- you get a self-documenting API
- you get awesome tools around it

Long story short, it [fits very well in the JAM stack](https://thenewstack.io/emerging-graphql-serverless-stack-building-static-web-sites/) for a reason.

### The rise of cloud functions

![The logo of AWS Lambda](./images/aws_lambda.png)

And with the continuous optimizations on the API, the "Serverless" concept and practices came into being. Many call the same concept cloud functions which fits well into new ways we build SPA or virtually any type of apps calling external services.

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

### [Gatsby.js](https://www.gatsbyjs.org/)

![Gatsby.js](./images/gatsby.jpg)

Gatsby.js consists of React.js, GraphQL, Webpack and other modern technologies. It follows the "no build configurations" principle, This means that if you are a PHP developer who wants to learn React.js or GraphQL you can go for it and do it without losing your time and motivation into learning build tools. You can install the project and continue building prototypes and products. To an extend, Gatsby.js is similar to [create-react-app](https://github.com/facebookincubator/create-react-app) and  [Meteor.js](https://www.meteor.com/).

What separates Gatsby.js from the others is the way it handles data. In Gatsby.js data could come from several types of files in the project - markdown, CSV, JSON, or it could come from external services like NetlifyCMS, Medium, or even CMS like Drupal and Wordpress.

![Visualization of the concept of multiple data sources in Gatsby.js](./images/gatsby-netlify-cover.png)

#### The benefits of leaning Gatsby.js

Here's a short list of benefits I personally see to why to spend the time learning Gatsby.js:

- Learn modern front-end technologies gradually.
- Learn React in an easy way - no Webpack configurations necessary for starters.
- Learn how to query GraphQL API servers.
- Easy to extend.
- Data: I love the idea of multiple unified data sources.
- Prototyping: works well with typography.js.
- Good DX.
- Can have literally any Admin UI.
- PWA on the fingertips. (plugins)
- JavaScript everywhere - transferable skill.

#### Why data and GraphQL is such a big deal?

Because a lot of the [heavy-weight lifting](https://github.com/gatsbyjs/gatsby/issues/420) of [building resolvers](https://www.youtube.com/watch?v=lAJWHHUz8_8) is done for you!

The the process of building pages and components using data in Gatsby.js can be summarized in the following few steps:

- Define data source
- Prepare/transform the data
- Querying the data with GraphQL
- Place the result of the query within a React component
- Display the information

### Practice time: building a website about Belgian beers

After going through the [official tutorial](https://www.gatsbyjs.org/tutorial/) I managed to make this project about [Belgian beers](/belgian-beers/). As you might see from its Github [repository](https://github.com/kalinchernev/belgian-beers) the code is very little.

If you feel like following more visual tutorial before reading forward, I found some [video tutorials about Gatsby.js](https://www.youtube.com/playlist?list=PLLnpHn493BHHfoINKLELxDch3uJlSapxg) for you. At the moment of writing this article there aren't any other alternatives for video lessons.

The official documentation is good and the [examples](https://github.com/gatsbyjs/gatsby/tree/master/examples) can take you long way.

The approach for building the website:

- I take information about Belgian Beers from [open data](http://data.visitflanders.org/datatank/dataset/435/download).
- I use some plugins to read files and transform CSV and Markdown files in to a GraphQL API.
- I take information from the build-time GraphQL endpoint and make some pages.
- Build and deploy the result as a static site working as a SPA.

**1) Initiate your project**

This includes:

- setup dependencies
- select and configure linters
- make at least 1 working page

Here, for example, I [start off with 3 data sources](https://github.com/kalinchernev/belgian-beers/commit/800934df6b1bb8fdffa7758793dc6a26d2d88a5e).

By the end of this step you must have a working environment and a GraphQL endpoint:

![Starting Gatsby.js](./images/starting_gatsbyjs.png)

**2) Make a simple deployment**

In [my example](https://github.com/kalinchernev/belgian-beers/commit/b33592a5e63dc7a5bc4460632614bf0c32810d98) I'm using [Github Pages](https://pages.github.com/).

Needless to say: the hosting is free for static sites.

By the end of this step, you will have the confidence that your work will get easily online and you will be able to show your results when you're ready.

**3) Query for data**

Open the GraphQL endpoint and learn how to query information - it's fun!

![Making a GraphQL query to get information about Belgian Beers](./images/graphql-beers-query.gif)

The information you see in the interface is coming from this [CSV file](https://github.com/kalinchernev/belgian-beers/tree/master/src/pages/beers) being transformed by [`gatsby-transformer-csv`](https://www.npmjs.com/package/gatsby-transformer-csv) working after [`gatsby-source-filesystem`](https://www.npmjs.com/package/gatsby-source-filesystem).

You don't have to build any resolvers or define any interfaces to receive this data after the work of the plugins.

**4) Use the query into React components**

When you're ready with the query, [just drop it in a React component](https://github.com/kalinchernev/belgian-beers/commit/b598d2c943c7cf834cb98cbfec3644d848a99af1#diff-511c0c2282c4ed52e620a9e92c03e1b5R1).

If you have a markdown source, you will get information in the form of HTML, which you might want to inject with `dangerouslySetInnerHTML` like [this](https://github.com/kalinchernev/belgian-beers/commit/71626b9819334d50fa8cc9a1d0160f690c4410cf#diff-94732222a5ce144156005f06e7d70c56R8). It's very scary this method.

**5) Create content with templates**

Although we speak React here, the concept of templates is still there and it's possible to [create content automatically](https://www.gatsbyjs.org/tutorial/part-four/#programatically-creating-pages-from-data) using templates before the project build starts listening for changes. Some of the methods here are still a bit unclear to me, but a good exercise with the beers would be to create an inner page for each beer.

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

### Last words

As my closing thoughts in the article I will be honest with you. There are similar stack setups as Gatsby.js - such as [this](https://github.com/clintonwoo/hackernews-react-graphql/tree/master/src). They are, however, harder to start with and they require more knowledge about the separate elements of the stack.

I hope that you've managed to find some interesting ideas to experiment with in your next project. I believe that Gatsby.js serves very well for building landing pages, blogs and sites which can be static.

Enjoy!
