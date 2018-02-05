---
title: March digest 2017
slug: march-digest-2017
date: 2017-03-31T00:00:00+02:00
tags:
- Web Development
- JavaScript
- JAM stack
- Medium
---

This one will be on various personal thoughts on Medium, the JAM stack, the OpenAPI specification, and coding katas.

### Medium

If you’re a regular reader or writer on Medium, you already know about the [latest changes](https://medium.com/3minread). Together with the new features, a [partner program](https://help.medium.com/hc/en-us/articles/115004750267-Medium-Membership-Partner-Program-FAQ) came into play, where companies and vendors will be more motivated to publish content about their products and services.

Being a small fish without financial interests in blogging (at least here and now), I decided to research new channels of communicating my ideas out of Medium. As a casual happy writer, I really wish Medium best of luck in their search of even more and better ways of monetizing their great platform and continue connecting deep thinkers.

Medium is aiming to solve problems at large scale for businesses and important individuals in the mission of un-breaking the internet and the publishing again. As a technical blogger, I’m interested in achieving smaller goals:

*   **I want to share about my wider “deep” thinking working with various technologies and tools**. I am not vendor-interested in this communication channel. I’m more into experimenting with many tools and using only a few, later sharing my findings from hands-on work. For this, I can place my thoughts anywhere I decide to — I lately admire [dev.to](https://dev.to/) which feels like “the right place to be” — but the editor is not as easy as in Medium. So yeah, I can just do the markdowns in a static site generator and re-post wherever …
*   **I want to be part of a community somehow.** Here at Medium, things tend to happen naturally. For example, I post [a story about GraphQL](https://medium.com/@kalin.chernev/the-guide-to-learn-graphql-i-wish-i-found-few-months-go-97f9d9ca6f12) which reaches 1.5k visitors, 7 of which come [dev-blog.apollodata.com](http://dev-blog.apollodata.com/ "dev-blog.apollodata.com"). I mean, that’s amazing — If I hadn’t shared my short notes on Medium, no-one using or reading about Apollo would have ever have visited my blog post. For this, I plan on [disqus](https://disqus.com/) integration which seems straight-forward and covering this “business requirement”.
*   **I want my code to look really good, and I want it to be more interactive.** This comes simply from the fact that I write mostly about code, so I want it to look nice. Medium allows effective snippets placement and github gists, yet there are many nice-looking styling options for code parsed out of markdown. Having control over the parsed version of your writing is an advantage in some aspects.
*   **I want to have statistics.** Medium provides stats on each story and it’s really useful to have a global idea what’s going on. For the same GraphQL article I mentioned above, over 1k of the visits come from flipboard.com. That’s all I know as my application request to have a publication with Google Analytics required a payment I got informed a month after making the application. No Google Analytics on Medium unless you are having business goals. I think I’ll manage to integrate Google Analytics in my new stack without 70 dollars for the infrastructure.

At the moment, I’ve jotted just a few high-level milestones in the upcoming digital transformation …

### JAM stack

As Medium evolves, as my interests into improving the ways of expressing my casual tech thoughts in writing. Researching on some of the nerdiest ways I can make a blog for myself — the JAM stack came into light. The [JAM stack](https://jamstack.org/) is an acronym of having JavaScript, APIs and Markup. It’s absolutely revolutionary — I mean — nobody ever though so far in history that the web could handle HTML, CSS and JavaScript in such ways. (That’s ironic) The stack is tightly related to the topic of [static sites generators](https://www.staticgen.com/).

*   The **J** will maybe be in React. At this stage, I’ve found a decent [book to follow](https://www.packtpub.com/web-development/mastering-react) on the way. At any case, investing into learning React will pay much better for me rather than writing new articles on a platform which can change its business goals tomorrow and just go offline.
*   The **A** will be the [github API](https://developer.github.com/v3/). With inspirations from [netlifycms](https://www.netlifycms.org/), a well-known [git flow translates to my upcoming publishing workflow](https://www.netlifycms.org/docs/configuration-options/#publish-mode).
*   The **M** part of the stack — I didn’t manage to decide upon this yet as the trends are moving too fast.

So cool this is, google will show you a [kickstarter campaign for the jam stack](https://www.kickstarter.com/projects/846364129/jamstack-the-worlds-first-attachable-guitar-amplif?lang=fr) and there is a song to play while working:

<iframe width="560" height="315" src="https://www.youtube.com/embed/oFRbZJXjWIA?rel=0" frameborder="0" allowfullscreen></iframe>

### Open API specification

In this month, I wrote a story about [prototyping with the OpenAPI specifcation](https://restful.io/prototyping-your-api-project-with-the-open-api-specification-and-node-js-tools-7cb19f47f72d). It’s describing some techniques using the [generator-openapi](https://github.com/Rebilly/generator-openapi-repo) — made by the team of [APIs.guru](https://apis.guru/) — really nice product to use!

I’m personally impressed by the community progress made around v3 of the latest spec. A release candidate was published in the beginning of the month, and various software packages literally sprouted in weeks.

I think there are mainly few links to follow the fast progress:

*   [OpenAPI toolbox](http://openapi.toolbox.apievangelist.com/)
*   [Unofficial awesome list](https://github.com/mermade/awesome-openapi3)
*   [The github repository](https://github.com/OAI/OpenAPI-Specification)

In the awesome list, there are few tools I hadn’t seen before. They seem to be made in quite a different way than the swagger-ui and swagger-editor, etc. that still keep popular positions in the toolbox.

Another good news this month for fans of the OpenAPI initiative was the [v3 release of the swagger-editor](https://github.com/swagger-api/swagger-editor/releases/tag/v3.0.0) which brought a warmly-welcomed auto-suggest feature:

![Nice autocomplete feature of the swagger editor](https://cdn-images-1.medium.com/max/800/1*n9qpZymZykXOuG9zxdUryQ.png)

### Coding katas

The first competitive learning event (coding battle) from the Hack League team took place.

![An image from the hack event](https://cdn-images-1.medium.com/max/800/1*aqpQIY4DURgBoYGJTDyIQg.jpeg)

It was my first event since a very long time, so I could see some new people and technologies during the event :)

I think (and I feel) that the problems are not the most complex thing you can see as a developer, but they definitely get closer to testing developers’ shape in solving problems fast and with confidence in the small steps.

As I really suck at making small steps really fast, I’m trying to get into the habit making regular exercise at [codewars.com](https://www.codewars.com) with the idea of improving shape through [katas](https://en.wikipedia.org/wiki/Kata). This is not a radically new idea for me, as there are the [ES6katas](http://es6katas.org/) teaching TDD as codewards and [nodeschool](https://nodeschool.io/) which provides various exercises for developers. (If you really enjoy them, you can give me a hand at the [stream-adventure workshopper](https://github.com/workshopper/stream-adventure/issues) and I promise quick reviews and quick contribution gratification)

I believe in the important of taking care of my coding shape. I think it’s similar to doing sports and exercising or playing musical instruments. The tricky part being that [programmers tend to overthink it sometimes](https://hackhands.com/dont-code-katas/) …
