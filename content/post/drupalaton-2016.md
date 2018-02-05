---
title: Drupalaton 2016
slug: drupalaton-2016
date: 2016-08-22T00:00:00+02:00
tags:
- Drupal
- GraphQL
- Progressive Web Apps
- JavaScript
---

### Introduction

Recently, I joined an event on [Drupal][1] in Hungary — the [Drupalaton][2]. It is one of the most exciting yearly Drupal events in Europe, organized by the local community. It gathers hundreds of contributors who collaborate on Drupal issues, share knowledge and have fun together :)

I really enjoyed this year's event since it covered a lot of my favorite topics. (discussed shortly after) Good sessions, pleasant talks with the community, and also — a lot of new things to learn. The event took place at the shore of the biggest warm-water lake in Europe, at Lake Balaton.

![][3]

### Sessions

Sure enough, sessions were covering important [Drupal 8][4] features. There were several tracks, as well as sprints, where participants were able to collaborate.

I visited mainly the workshops related to the [API-first initiative][5]. This is a futuristic initiative, involving many JavaScript tools and modern concepts and practices for building service-oriented apps, not only websites.

It's a vital initiative for Drupal as a platform for the future. Presently, Drupal is one of the best systems for content modelling, querying, and building websites in general. This means that normal people can make websites with complex information structures with very little or no programming.

The API-first initiative could potentially take Drupal into a place where **the content modelling and querying becomes data modelling and querying, enabling non-developers to build complex APIs for the next generation apps.**

Apart from these, there were also sessions about Drupal-specific modules being upgraded between Drupal 7 and 8. In overall, I think we'll see more "good stuff" of [Symfony][6], PHP OOP, design patterns, etc topics during next Drupal events.

### Workshops

This is my humble list of highlighted sessions I focused on.

[**REST APIs**][7] by Pieter Frenssen ([pfrenssen][8])

![][9]

Well-formed, step-by-step guide, covering all important concepts of having Drupal as both server and/or a client in [REST API architectures][10]. If you want to skip the details in this section, check [Drupal REST API docs][11] which covers great amount of information around the topic.

The beginning was a general information about what REST actually is. This included status codes, methods, design patterns, etc.

After presenting the basics, the next step was to use Drupal as a client, fetching data from [drupal.org REST API][12] and displaying it in a block.

[Creating a block with Drupal Console][13] was super-easy. That was a really neat way to demonstrate injecting the [http_client service][14] via the cli from the [container][15].

There was also a demo of using the [core REST API module][16], which transforms Drupal into an API server. [REST UI module][17] was demonstrated as a site builders' tool to manage the configurations which are otherwise [managed through .yml files][18]. Here, it's important to note, that the endpoints of the REST API are controllers. Developers have the freedom to choose which format of data to return and via which components. For example, one can use the [Symfony's HttpFoundation][19] and its JsonResponse instance.

In short, there was a lot of good advice, both about REST APIs in general, and Drupal-specific implementations, in combination with third-party tools and components.

[**Headless Drupal**][20] by Ruben Teijeiro ([rteijeiro][21])

Even though I did not attend the workshop, it was still part of the Drupal API-first series of topics. [Code of the session][22].

[**Progressive web apps**][23] by Théodore Biadala ([nod_][24])

That was an intermediate-level session. [Promises][25] were in the core of all code snippets and demonstrations. Highlight APIs: [Fetch API][26], [Cache][27], [Service Workers][28], and [Web APIs][29] in general. The main idea was to demonstrate how modern web APIs can be used to build web apps, having functionalities very similar to native apps.

[The repository][30] of the workshop is public, so go and check it for further details in case you're interested into the interface implementations.

It's interesting to note the example of [promise-based][31] [behaviors system][32]. A modernized implementation of classic concept on managing JavaScript.

[**GraphQL**][33] by Sebastian Siemssen ([fubhy][34])

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/hashtag/GraphQL?src=hash">#GraphQL</a> workshop w/ <a href="https://twitter.com/thefubhy">@thefubhy</a>  at <a href="https://twitter.com/hashtag/Drupalaton?src=hash">#Drupalaton</a> <a href="https://t.co/AgfQGzCq81">pic.twitter.com/AgfQGzCq81</a></p>&mdash; Kalin Chernev (@kalinchernev) <a href="https://twitter.com/kalinchernev/status/764072778773344256">August 12, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Needless to say, that was the "cherry" session. It was about the [Facebook's GraphQL][35], which developers were ready to understand, after touching upon REST APIs, JavaScript Frameworks, knowing what is a server and a client in general in the previous sessions.

I personally enjoyed the workshop. In fact, I was even able follow along with the live coding on the main screen. It was also nice that it made a clear association between specification and language implementation. This means that same concepts of data architecture were demonstrated and practices with [JavaScript][36] and [PHP][37].

In the first part, the [Star Wars API][38] was used with the [GraphiQL][39] — a hands-on tutorial to [understand the basic concepts][40] like queries, fragments, variables, sub selections, etc.

Second was the usage of node.js app with express, express-graphql, graphiql, graphql and other popular modules to transpile ES6 code. In this playground, the building part started. Various types were used: GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, etc. That was my first time to actually write something working out of the [learngraphql.com][41] online tutorials.

There was a demo of Relay in-between, as a bonus, to grab a general understanding of the additional features provided on top of the fundamental specification.

![][42]

After the GraphQL implementation in JavaScript was getting convenient, then we continued using the same concepts, but to build a server in PHP and the [Drupal GraphQL module][43]. Sure enough, the approach was similar, but this time extending SchemaProviderBase and implementing framework-specific EntityTypeManager ([Interface][44]) to manage [Content Entity][45] items.

### Conclusions

The event was awesome, the people were great, and the sessions were truly useful. I feel somehow privileged with the opportunity to attend such a good series of sessions related to API-s in the Drupal community!

There are a lot of new technologies and tools to learn and play with. I hope the summary above is a good starter for anyone enthusiastic about the future of the tools mentioned.

### Community

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">End of the first day at <a href="https://twitter.com/drupalaton">@drupalaton</a> we have a great dinner. <a href="https://t.co/CN795wXixz">pic.twitter.com/CN795wXixz</a></p>&mdash; 5NET Interactive (@5NEThu) <a href="https://twitter.com/5NEThu/status/763818240954998789">August 11, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Many thanks to the local Drupal community in Hungary! :)

[1]: http://drupal.org
[2]: http://drupalaton.hu
[3]: https://cdn-images-1.medium.com/max/800/1*ME6rgg3pXT8oid14R5RNVg.jpeg
[4]: https://www.drupal.org/8
[5]: http://buytaert.net/a-roadmap-for-making-drupal-more-api-first
[6]: https://symfony.com/
[7]: http://2016.drupalaton.hu/schedule#speaker-166
[8]: https://www.drupal.org/u/pfrenssen
[9]: https://cdn-images-1.medium.com/max/800/1*4o8SJ8Q9EhrUt4fkz8DKpQ.jpeg
[10]: http://www.restapitutorial.com/
[11]: https://www.drupal.org/developing/api/8/rest#practical
[12]: https://www.drupal.org/drupalorg/docs/api
[13]: https://hechoendrupal.gitbooks.io/drupal-console/content/en/commands/generate-plugin-block.html
[14]: https://api.drupal.org/api/drupal/core%21lib%21Drupal.php/function/Drupal%3A%3AhttpClient/8.2.x
[15]: https://api.drupal.org/api/drupal/core!core.api.php/group/container/8.2.x
[16]: https://www.drupal.org/documentation/modules/rest
[17]: https://www.drupal.org/project/restui
[18]: https://www.chapterthree.com/blog/custom-restful-api-drupal-8
[19]: https://github.com/symfony/http-foundation
[20]: http://2016.drupalaton.hu/schedule#speaker-171
[21]: https://www.drupal.org/u/rteijeiro
[22]: https://github.com/rteijeiro/headless-drupal8
[23]: http://2016.drupalaton.hu/schedule#speaker-106
[24]: https://www.drupal.org/u/nod_
[25]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
[26]: https://developer.mozilla.org/en/docs/Web/API/Fetch_API
[27]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[28]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[29]: https://developer.mozilla.org/en-US/docs/Web/API
[30]: https://github.com/theodoreb/pwa-workshop
[31]: https://github.com/theodoreb/pwa-workshop/blob/master/js/1-promise.js#L12
[32]: https://www.drupal.org/node/756722#behaviors
[33]: http://2016.drupalaton.hu/schedule#speaker-111
[34]: https://www.drupal.org/u/fubhy
[35]: http://graphql.org/docs/getting-started/
[36]: https://github.com/graphql/express-graphql
[37]: https://github.com/Youshido/GraphQL
[38]: https://github.com/graphql/swapi-graphql
[39]: http://graphql.org/swapi-graphql/
[40]: http://slides.com/sebastiansiemssen/graphql-meets-drupal-dd#/3/7
[41]: https://learngraphql.com/
[42]: https://cdn-images-1.medium.com/max/800/1*tpPTqCyZnfPqhb1er6ECpw.jpeg
[43]: https://www.drupal.org/project/graphql
[44]: https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Entity%21EntityTypeManagerInterface.php/interface/EntityTypeManagerInterface/8.2.x
[45]: https://www.drupal.org/node/2192175
