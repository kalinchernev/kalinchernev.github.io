---
title: Migrate from Hugo to GatsbyJS
date: 2017-10-29T22:01:41.113Z
slug: migrate-hugo-gatsby
tags:
  - JavaScript
  - JAM Stack
  - GatsbyJS
---
After the recent [migration from Medium to Hugo](/releasing-new-blog) I continued digging into the [JAM stack](/tags/jam-stack) and [GatsbyJS](/tags/gatsbyjs), as having a statically generated site for my blog is working well so far.

I could have taken a ready template to mimic design and keep content and make another quick release. Though, for this migration, I spent time taking concrete steps I consider reusable:
- Content migration with minimum efforts
- Programatic content creation workflow in GatsbyJS
- Make pagination, pages with and for tags, etc.
- Add admin panel with [NetlifyCMS](https://www.netlifycms.org/)

This article will highlight lessons learned about these steps with the aim to provide high-level guidelines about patterns which can be re-used in migrations with other generators to GatsbyJS.

## Background before you start

[Hugo](https://gohugo.io/) is a really super fast, convenient and well-supported tool for working with static sites. I think today it's still more mature and closer to classical CMS ways than GatsbyJS workflow-wise. For a developer who knows WordPress, for example, it will be way easier and probably more effective to work with Hugo.

Whereas, GatsbyJS is based on React, GraphQL, Webpack and the way of thinking is closer to how a developer from MEAN/SPA stack would approach problems.

If you have landed at this article researching on options for a potential project, take a look at [comparisons](https://www.slant.co/versus/1016/18503/~hugo_vs_gatsby-js) and keep in mind that selecting a [stack](https://stackshare.io/stackups/gatsby-vs-hugo) boils down to being effective with the it, not using it for the sake of experimenting like me on my blog ;)

At this very moment, for my project under question, GatsbyJS has been a [valuable learning experience](/learn-gatsbyjs) and it has also been so easy to work with, it feels "unfair".

