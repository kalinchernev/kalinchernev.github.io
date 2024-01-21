---
title: Getting better with GraphQL
slug: "/getting-better-with-graphql"
date: "2018-04-15T00:00:00+02:00"
category: "Code"
template: "post"
draft: false
tags:
  - GraphQL
  - WebDev
description: "Sharing after coding event."
socialImage: "../defaultSocialImage.jpg"
---

## Introduction

It's a bit more than an year since I've jotted [about GraphQL](/graphql-guide-wish-found-before). During this time, I haven't had the opportunity to use GraphQL in production. Rather, like with other tools on the market, I've only followed up reading articles and doing some (quite rare) queries while [working on my Gatsby blog](https://www.gatsbyjs.org/blog/2017-11-06-migrate-hugo-gatsby/).

As I joined the [GraphQL day](https://www.graphqlday.org/) yesterday, I feel it's worth making another small article for people like me who are willing to be in the game with GraphQL, but don't play it full time yet.

### Market leaders

They are [Apollo](https://github.com/apollographql), [Graphcool](https://github.com/graphcool) and [Scaphold](https://github.com/scaphold-io). There are certainly others, though these are the most prominent leaders you need to follow in order to stay up-to-date.

### Tools

My personal high-level impression is that tools are divided into the following categories:

- **Server**: anything which help you manage GraphQL servers. Could be low-level implementation, express.js middleware, abstraction on top of it, etc.
- **Client**: answer for carrying out queries towards the server, i.e. tools that will fetch data. The question how you fetch and use data from the server can be as low-level of making an abstraction of post requests to esoteric (to my opinion) declarative ways around React components.
- **Caching**: anything from saving repetitive queries to memory, to using stores of state managers and others. As resolver functions are [granular execution points](https://graphql.org/learn/execution/) of a query, it seems to me caching problem is a "sweet" problem to solve in the community.
- **Reporting/logging/monitoring**: anything which will help you trace information on what's going on in the resolvers and other critical parts of the app. As GraphQL tools are mostly used for building API gateways, using monitoring SaaS is vital for serious production apps.
- **IDE**: GraphQL's introspection and self-documentation features are huge wins. Naturally, graphiql is love at first sight for API experts. There are others worth trying as well - such as [graphql-playground](https://github.com/graphcool/graphql-playground).
- Abstraction **helpers** around the GraphQL spec and other tools.

### Continuous learning

[How to GraphQL](https://www.howtographql.com/) is enough of a resource to know, just follow along the contributors around this project and you will be good to go :)

For lower-level, follow the [working group](https://github.com/graphql/graphql-wg) and specification updates.

### Conclusions

GraphQL is here to stay. Community has been growing, just as the number and quality of tools to facilitate adoption.
