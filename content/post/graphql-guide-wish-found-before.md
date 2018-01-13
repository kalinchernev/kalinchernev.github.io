---
title: The guide to learn GraphQL I wish I found few months go
slug: graphql-guide-wish-found-before
date: 2017-02-16T00:00:00+02:00
tags:
- GraphQL
- JavaScript
---

Although I consider myself an intermediate JavaScript developer, I struggled for weeks to understand fundamental concepts which are obvious for those living in the React.js ecosystem. So, this is a list of things I now see which I consider to be not documented or explained well enough for people like myself — those who like the ideas behind GraphQL and want to use it, but not necessarily having any experience with the React.js toolchain.

The list will follow the style of [Dave Ceddia](https://medium.com/@dceddia) who made [a timeline to learn React](https://daveceddia.com/timeline-for-learning-react/). It was really handy when I was experimenting with React few months ago, because it’s splitting the topics clearly and logically, smoothing the learning curve for newcomers. (At least it smoothed mine)

### 0. Introduction

As a most fundamental start of everything, you have to have an idea what GraphQL is, and what it’s not.

Get motivated:

<iframe title="Introductory video about GraphQL" width="560" height="315" src="https://www.youtube.com/embed/UBGzsb2UkeY?rel=0" frameborder="0" allowfullscreen></iframe>

Get the basic concepts:

<iframe title="Exploring GraphQL video" width="560" height="315" src="https://www.youtube.com/embed/WQLzZf34FJ8?rel=0" frameborder="0" allowfullscreen></iframe>

For me, there are few reasons to invest time in learning GraphQL, even if I’m not a React developer, but an API enthusiast:

*   Less round trips to the server
*   Declare what you want, get exactly what you need
*   Introspection is convenient and useful
*   [GraphiQL IDE](http://graphql.org/swapi-graphql/) is amazing
*   Building proxy servers on top of existing REST APIs

GraphQL is a specification, it’s language independent, yet the most popular one is the JavaScript one. So, it’s useful to be comfortable with JavaScript for understanding the official documentation. (More or this later)

### 1. Languages

First, you have to be comfortable with at least one programming language and the concepts behind the GraphQL query language. Regardless of the language of choice, you have to be OK with 2 languages.

### 2. Syntax

Assuming that you follow the official track of [learning GraphQL](http://graphql.org/learn/) you will get some ideas about the syntax of GraphQL. You can improve your skills with it following [an online hands-on course](https://learngraphql.com/) as a complementary. By the end of these two, you will feel the power of querying information in a declarative way, which is as special as writing declarative components in React.

Then, if you follow the [graphql.js](http://graphql.org/graphql-js/) track of the official website, which is something that I did, you will have to be comfortable with the following:

*   JavaScript syntax
*   [ES6](http://es6katas.org/) syntax
*   [Flow](https://flowtype.org/) syntax

The majority of developers will get around the ES6 for sure, but the Flow part was really problematic for me. Why? Because, it’s natural to head directly to the [types](http://graphql.org/graphql-js/type/) section as you already know that everything goes around types, but the syntax is nothing you have seen before. (I hadn’t)

So, after a while, you will most probably end up on a higher-level scenario of using graphql.js with express, reading about [GraphQLObjectType](http://graphql.org/graphql-js/type/#graphqlobjecttype). The documentation is highly concise on types and what is what and what is where, etc. Without having an idea that it’s written in Flow syntax (with ES6), you will be guessing a lot.

The first eye-opening moment of syntax difference could be that you can [build types in several ways](http://graphql.org/graphql-js/constructing-types/). The second one could be that [context, fields and resolvers](http://graphql.org/learn/execution/#root-fields-resolvers) start to speak to you. It’s one thing to follow the tutorials and achieving results mimicking the example code, but it’s a totally different thing when you can read the documentation and see that you can work with promises, globals, and how to work with fields in circular dependencies.

At the moment of writing this article there is no single mentioning of Flow in the official documentation on the website.

### 3. Resolve()

If you come from React, `resolve()` will maybe ring an association with `render()` It serves a totally different purpose, as it’s basically answering the question of what a given field should consider part of the given type, but for me it bears a similar simplicity and importance to the declarative nature.

Again, the documentation is good in giving a [simple explanation what you can do with these](http://graphql.org/learn/execution/#root-fields-resolvers), however it took me some time to decipher the following:

```
fields: GraphQLFieldConfigMapThunk | GraphQLFieldConfigMap;
```

It was not easy to understand that `GraphQLFieldConfigMapThunk` is used when fields should be able to handle circular dependencies.

I have to be honest, it also took me more time to understand what are the magical parameters that go in this function. Different tutorials follow different ways to get the arguments they need, such as using `_` for first arg (to skip using it), or using the [destructing assignment](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to get part of the context, etc. Again, understanding documentation with Flow helps more than the `console.log(...args)` I was using to figure them out.

### 4. Relay

Relay is the tool that loosely couples with GraphQL. You need it for more sophisticated scenarios when you need caching, pagination, etc. I haven’t used it yet, as I’m on the fundamentals of GraphQL, but I know it’s out there and I will use it when “relay compliance” is necessary in bigger projects or special client scenarios.

Not required to learn GraphQL.

### 5. Apollo

I follow it even more than relay, (because of [MDG](https://www.meteor.com/)) but I haven’t had the reasons to use it until now. From aside, it seems shiny and well supported. I think this is the direction to go when using non-React toolchain and when you need more sophisticated solutions with MDG-level of quality and coolness :)

Also not required to learn GraphQL.

### Conclusions

I think that React.js developers are in a better position of understanding and working with GraphQL at this time. That is normal, as little by little I start to see how the different tools work together to solve problems in specific ways that come naturally by understanding concepts behind the declarative ways of thinking in facebook products at the moment.

So, if you are a developer that does not know all the facebook products, like me, start small by understanding the syntax and the documentation well, experiment with small projects, and use the variety of more sophisticated tools when your projects grow and require more control and flexibility.

Think client-first approach. The client as your consumer of the API, and the client who wants to get something done. There must be a reason why the documentation of GraphQL does not mention inter-related and more sophisticated tools directly — you use them when you need them.
