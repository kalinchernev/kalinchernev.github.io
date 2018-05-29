---
title: Qaulity assurance in GatsbyJS projects - linting and testing
slug: gatsbyjs-qa-linting-testing
date: 2018-05-27T00:00:00+00:00
tags:
- JAMStack
- JavaScript
- GatsbyJS
- TDD
---

## Introduction

The first few days after the release of [Building a personal blog with Gatsby.js](https://skl.sh/2HATDlg) were quite exciting because I received feedback which gave me perspectives I hadn't considered before talking about GatsbyJS.

For example, a recurring topic is the comparison between GatsbyJS and popular CMS. That is not completely unexpected, because CMS such as Drupal and WordPress have also been the first solution that would have come to my mind as well when it comes to site building.

A frequently asked question in many forms is whether GatsbyJS is as serious/mature product as WordPress and Drupal. Reality is that not only these products are incomparable in terms of features and main goal of existence, but also [the main concepts of site building with these tools are completely different](/learn-gatsbyjs). ([#JAMStack](/tags/jamstack))

Still, I believe there are two main aspects by which GatsbyJS could be compared to popular CMS - the quality of the site's source code and the quality of the final build delivered to the end user.

The quality of the final build delivered to the user is again a relatively controversial aspect to compare because of the difference in the way of thinking and tooling. Of course static sites will be faster, though there is much more to it which [CMS site builders don't even know](https://www.gatsbyjs.org/blog/2017-09-13-why-is-gatsby-so-fast/).

For me, the quality of the source code is the universal factor to compare whether a given solution is serious/mature enough.

> If code isn't clean, it can bring a development organization to its knees. - Robert C. Martin

Reality is, most of the developers won't go into the source code of the core system until they need to solve an unexpected problem. For this, communities are usually empowered to extend the core systems via plugins and themes.

### Researching quality standards in GatsbyJS starters

So, in order to be generally prepared to potential questions about seriousness of GatsbyJS in overall, I decided to have a look around popular GatsbyJS plugins and themes (starters) and research their quality standards.

After opening the [official starters](https://www.gatsbyjs.org/docs/gatsby-starters/) and a few community such, I realized that very few have integrated linting rules or tests. At best, just a few have [prettier](https://prettier.io/) configuration file. Few days after my initial research, @kripod97 shared his [starter with integrated quality tools](https://twitter.com/kripod97/status/996408272579104768).

Honestly, I have mixed feelings about this current state of GatsbyJS starters. On one side I'm happy to see people paying attention of missing quality standards. But I don't like having bigger number of starters compared to less of a number and higher of a quality. Like, honestly, even in one of the most popular starters [gatsby-starter-netlify-cms](https://github.com/AustinGreen/gatsby-starter-netlify-cms) there are no standards at the moment. Guess the most probable starting point for which starter would a CMS developer evaluating GatsbyJS.

What I'm trying to point out here is that if GatsbyJS is to be taken seriously, the examples and starting points in the community should have better standards. And I'm not saying the creators of the starters should always decide about the "first world problem" of trailing comma problem themselves, but at least provide defaults which are common sense.

In worst case, the developer starting off from the given starter will have to set his preferred rules in an existing eslint configuration file or tweak plugins/extends. In best-case scenario, the developer will step on the solid tool chain, accept common-sense defaults and focus on creation part.

At any case, a starting point of missing QA fundamentals is opening the door of bad practices, harder adoption and extension of starting code, [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding), nitpicking and all other sorts of horrible things for which developers will blame JavaScript :)

### QA base

Fortunately for us, JavaScript developers, there are plenty of good practices and tools enforcing quality. Let's discuss a few of them:

* automatic identation and organization of code with [prettier](https://prettier.io/)
* static code analysis /linting/ with [eslint](https://eslint.org/)
* automated tests with jest unit and integration (with pupeteer)

Implementing some basic quality standards in your project will make your code base more maintainable and more accessible for others to join and help you when project grows.

Also you will save time and energy from no-always-necessary discussions about code and will be able to focus on the important matters.

With the higher quality of your codebase, you will be a happier person who confidently modify important features even after holidays :)

#### Prettier

[Prettier](https://prettier.io/) is a tool which helps you format your code. Here's a [useful tutorial](https://swizec.com/blog/love-letter-prettier/swizec/7909) which describes well the benefits apart from the official documentation.

Setting up this tool is easy:

```sh
$ yarn add -D -E prettier
```

Then, add an [extension in your editor](https://prettier.io/docs/en/editors.html). This is not a required step, but will give you the benefits of the code formatting without hussle.

Lastly, you can add a [precommit hook](https://prettier.io/docs/en/precommit.html) or other means of CLI formatting code automatically.

#### ESlint

....

#### Tests

....
