---
title: One year of experience with Vue.js
date: '2022-01-10T00:00:00+02:00'
template: 'post'
draft: false
slug: one-year-using-vuejs
category: 'Code'
tags:
  - JavaScript
  - VueJs
description: 'After using Vue.js for production level applications in 2021, I decided to share my main takeaways from the point of view of someone who already knows React.js.'
---

![The logo of Vue.js](/media/vuejs_logo.png)

## Introduction

Both Vue.js and React.js are magnificent [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) libraries. Both are handy for developers who acknowledge the limitations of jQuery and working with the DOM directly. One of the problems such libraries solve is that it's hard to build large interactive applications with imperative code. In fact, 2021 was the first year in which [the majority of developers chose React.js over jQuery](https://insights.stackoverflow.com/survey/2021).

From another survey taking a close look at [2021 JavaScript Rising Stars](https://risingstars.js.org/2021/en#section-framework) we see that Vue.js is effectively the leader. If you are curious and open-minded like me and you would consider Vue.js as an alternative to React.js, this article is for you.

For brevity I'll use React and Vue without extensions from now on.

## Impressions

[![Vue.js meme](/media/vue_distracted_boyfriend_meme.jpeg)](https://twitter.com/vuejsdevelopers/status/902419113737314304/photo/1)

I believe that both Vue and React provide excellent ecosystems of supporting tools which facilitate adoption in any team who wants to learn and use these types of front-end technologies.

I like them both now, but I did struggle for in the first few months to be as effecitve in Vue as I were in React. So I decided to write about a few reflections I find worth sharing from my journey.

### Tooling

JavaScript tooling is like Web3. It's wild 😜. It's been a never-ending evolution in various aspects.

All popular libraries and frameworks such as React, Vue, Angular, Svelte and others have involving communities of bright and hard-working open-source developers who contribute massively. That's why there has been continous evolution in tooling through time regardless of your pick between the popular choices.

In overall, I'm impressed with the Vue tooling ecosystem.

I start with this topic because it's important, althought boring for some. Every production-ready application needs code optimisation and/or transformation. There are numerous open-source and battle-tested solutions on the market and Vue provides integrations for any need and level of expertise.

To start with the easiest, I really like the onboarding experience of the [Vue CLI](https://cli.vuejs.org/). It's well-maintained and has plugins for the most important tasks such as compiling/transpiling, testing with jest, linting with eslint, etc. Comparing it with the [CRA](https://reactjs.org/docs/create-a-new-react-app.html) I like the Vue CLI's DX more.

Another easy option is the [Laravel Mix](https://laravel.com/docs/8.x/mix#vue). It's an abstraction on top of [Webpack](https://webpack.js.org/) which allows users to get started quickly and get their job done without caring too much about toolchain configurations. Deep configurations are possible, of course, through progressive disclosure of [Webpack complexity](https://indepth.dev/posts/1482/an-in-depth-perspective-on-webpacks-bundling-process): experienced Webpack configurators can tweak specifics progressively through time without starting from scratch or ejecting.

Laravel Mix plays well with projects bootstrapped with the Vue CLI, as long as babel/eslint/jest configurations are maintained properly. [Laravel](https://laravel.com/) combined with Laravel Mix is an effective toolchain for PHP developers and that's why frequently Vue developers will in PHP (LAMP) stack rather than JavaScript (MEAN-ish) stacks.

For experts, it's worth mentioning that [Vite](https://vitejs.dev/) has been a trending project in the last couple of months. It's not included on the main Vue site and is not as tightly integrated and focused on Vue-only. It is future-proof, [keeping up with the non-JavaScript tooling trend](https://leerob.io/blog/rust) for a [good reason](https://vitejs.dev/guide/why.html).

### IDEs and browser devtools

Editors are not so good at undertanding Vue code as React code. Recommended VS code extensions.

A few words on browser extensions for devtools: React devtools is cluttered compared to Vue devtools.

### Templates

This section is dedicated to the topic of code writing style and syntax in Vue. These will depend on choices from [the bundlers' section](#bundling) and their configurations. For the following paragraphs I'll assume the adoption of the most frequently recommended [single file component](https://vuejs.org/v2/guide/single-file-components.html) approach.

#### History

React introduced [JSX](https://reactjs.org/docs/introducing-jsx.html). It's been battle-tested and preferred by many development teams regardless of the initial criticism. JSX is "just javascript" and with this there's high focus on component-oriented development and composition. After all, a React component is "just a function". The JSX style fits better in teams with deeper JavaScript knowledge, on top of jQuery, and the [ES6+ features](https://www.freecodecamp.org/news/write-less-do-more-with-javascript-es6-5fd4a8e50ee2/).

**Forget about JSX when working with Vue.**

When it comes to Vue, web developers with experience in PHP and jQuery appreciate [Vue syntax](https://vuejs.org/v2/guide/syntax.html), because Vue templates are more about HTML rather than JavaScript. So, yeah, when you work with developers who are used to make dynamic HTML templates with inline variables, control statements and loops, Vue is more appealing and understandable.

An interesting fact from the history is that Vue's default syntax is inspired by Angular 1, not PHP templating. Angular 1 is old, but not deprecated 😎. (Did I just write that?) It played a key role in making the [MEAN stack](<https://en.wikipedia.org/wiki/MEAN_(solution_stack)>) a viable alternative to the [LAMP stack](<https://en.wikipedia.org/wiki/LAMP_(software_bundle)>).

> Google Creative Labs was where Evan first started his work on Vue. As the project grew, the team started to use Angular 1. it had too many features that they didn't need. Evan also didn't like some of the design decisions that Angular 1 had. So, Evan started to work on a templating library just for his personal use. After six months, in February 2014, he officially released it as Vue.js. ([source](https://egghead.io/podcasts/evan-you-creator-of-vue-js))

Knowing a bit of history is nice, but what are the key concepts to grasp in order smoothen the learning curve when it comes to Vue templates?

#### Concepts

🔧 Attributes [[documentation](https://vuejs.org/v2/guide/syntax.html#Attributes)]

Elements in HTML have attributes; these are additional values that configure the elements or adjust their behavior in various ways to meet the criteria the users want. ([source](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes))

- Dynamic attributes are marked with `v-bind` or simply `:`. Most frequently used fo [class and style attributes](https://vuejs.org/v2/guide/class-and-style.html).
- [Event handlers](https://vuejs.org/v2/guide/events.html) are marked with `v-on` or simply `@`.
- `is` is attribute used in [dynamic components](https://vuejs.org/v2/guide/components-dynamic-async.html). This feature is quite unique and handy! 🪄

🧩 Slots [[documentation](https://vuejs.org/v2/guide/components-slots.html)]

Another unique feature of Vue which resembles (more or less) [`children` prop is in React](https://reactjs.org/docs/composition-vs-inheritance.html) facilitating components' inheritance and composition. In the PHP world, this would translate (more or less) to [extends and blocks in twig](https://twig.symfony.com/doc/3.x/tags/extends.html).

Slots are a must-read and must-understand feature which provides code flexibility and reusability.

🔗 Refs [[documentation](https://vuejs.org/v2/api/#vm-refs)]

These are similar to other [refs](https://reactjs.org/docs/refs-and-the-dom.html), yes. They should be used carefully because it's easy to introduce fishy code through lack of understanding of boundaries between the DOM and Vue.

Refs in Vue are always a DOM node AND a Vue component and the methods on resulting objects are a mixture of different APIs. There are no limitations with regards to breaking the boundaries I just mentioned, so sometimes it happends that a contributor uses refs to get a DOM node and invoke Vue methods causing unintented (and hard to debug) changes in data.

**Refs should be used for [focus management](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management), not state management.**

The last important piece of advice I'd share for this topic is about [how to safely access Vue refs without getting undefined](https://jefrydco.id/en/blog/safe-access-vue-refs-undefined/).

### Props validation

`PropTypes` and TypeScript vs Vue's [props](https://vuejs.org/v2/guide/components-props.html) which are [less strict](https://vuejs.org/v2/guide/components-props.html#Prop-Validation).

### State management

The concent of state is not so prominent in Vue as in React.

https://vuejs.org/v2/guide/state-management.html

https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class

https://reactjs.org/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live

https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow

setState vs emit

the struggle with reactivity in objects and arrays

### Ecosystem

Router, Vuex, etc.

## Resources

vuemastery and some repositories with patterns and ready to use solutions

## Conclusions
