---
title: One year of experience with Vue.js
date: "2022-01-11T00:00:00+02:00"
template: "post"
draft: false
slug: "/one-year-using-vuejs"
category: "Code"
tags:
  - JavaScript
  - VueJs
description: "After using Vue.js for production level applications in 2021, I decided to share my main takeaways from the point of view of someone who already knows React.js."
socialImage: "../defaultSocialImage.jpg"
---

![The logo of Vue.js](/media/vuejs_logo.png)

## Introduction

Both Vue.js and React.js are magnificent [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) libraries. Both are handy for developers who acknowledge the limitations of jQuery and working with the DOM directly. One of the problems such libraries solve is that it's hard to build large interactive applications with imperative code. In fact, 2021 was the first year in which [the majority of developers chose React.js over jQuery](https://insights.stackoverflow.com/survey/2021).

In another [2021 JavaScript Rising Stars](https://risingstars.js.org/2021/en#section-framework) survey Vue.js is effectively the leader when version 3 is considered. If you are curious and open-minded like me and you would consider Vue.js as an alternative to React.js, this article is for you.

For brevity I'll use React and Vue without extensions from now on. And "Vue" refers to "Vue 2" if not specified otherwise.

## Impressions

[![Vue.js meme](/media/vue_distracted_boyfriend_meme.jpeg)](https://twitter.com/vuejsdevelopers/status/902419113737314304/photo/1)

I believe that both Vue and React provide excellent ecosystems of supporting tools which facilitate adoption in any team who wants to learn and use these types of front-end technologies.

I like them both now, but I did struggle at first for a few months to be as effecitve in Vue as I am with React. This article contains a few reflections I find worth sharing so that readers can learn Vue more smoothly without struggles.

### Tooling

JavaScript tooling is wild. 🤪 It's been a never-ending evolution in various aspects.

All popular libraries and frameworks such as React, Vue, Angular, Svelte and others have involving communities of bright and hard-working open-source developers who contribute massively. That's why there has been continous evolution and innovation in this space.

In overall, I'm impressed with the Vue tooling ecosystem.

I start with this topic because it's important, althought boring for some. Every production-ready application needs code optimisation and/or transformation. There are numerous open-source and battle-tested solutions on the market and Vue provides integrations for any need and level of expertise.

To start with the easiest, I really like the onboarding experience of the [Vue CLI](https://cli.vuejs.org/). It's well-maintained and has plugins for the most important tasks such as compiling/transpiling, testing with jest, linting with eslint, etc. Comparing it with the [CRA](https://reactjs.org/docs/create-a-new-react-app.html) I like the Vue CLI's DX better.

Another easy option is the [Laravel Mix](https://laravel.com/docs/8.x/mix#vue). It's an abstraction on top of [Webpack](https://webpack.js.org/) which allows users to get started quickly and get their job done without caring too much about configurations' details. Deep tweaks are possible, of course, through progressive disclosure of [Webpack complexity](https://indepth.dev/posts/1482/an-in-depth-perspective-on-webpacks-bundling-process): experienced Webpack users can adjust specifics progressively through time without starting from scratch or ejecting.

Laravel Mix plays well with projects bootstrapped with the Vue CLI, as long as babel/eslint/jest configurations are maintained properly. [Laravel](https://laravel.com/) combined with Laravel Mix is an effective toolchain for PHP developers and that's why frequently Vue developers will be specialized in the PHP (LAMP) stack rather than JavaScript (MEAN-ish) stacks.

![The logo of Vite](/media/vite.svg)

For experts, [Vite](https://vitejs.dev/) has been a trending project in the last couple of months. It's not included on the main Vue site and is not as tightly integrated and focused on Vue only. It is future-proof, [keeping up with the non-JavaScript tooling trend](https://leerob.io/blog/rust) for a [good reason](https://vitejs.dev/guide/why.html).

### IDE and browser devtools

VS code is not as good at undertanding Vue code as React code out of the box. Autocomplete suggestions and references between code definitions and usage are not always helpful, but it's not a big problem.

The extension I recommend is [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) which covers for almost all necessary features. The only other Vue-related additional extension I use is [Sarah Drasner's Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets).

When it comes to browser integration, [Vue Devtools](https://devtools.vuejs.org/) is the go-to solution. It's great: components' tree view is clean and without clutter. There are out-of-the-box integrations for Vuex and Vue Router.

![Vue devtools](/media/vue-devtools.jpg)

### Templates

This section is dedicated to the topic of code writing style and syntax in Vue. These will depend on choices from [the tooling section](#tooling) and their configurations. For the following paragraphs I'll assume that the reader already follows the [single file component](https://vuejs.org/v2/guide/single-file-components.html) approach.

![Vue devtools](/media/vue-component.png)

#### History

React introduced [JSX](https://reactjs.org/docs/introducing-jsx.html). It's been battle-tested and preferred by many development teams regardless of the initial criticism. JSX is "just javascript" and with this there's high focus on component-oriented development and composition. After all, a React component is "just a function". The JSX style fits well in teams with deeper JavaScript knowledge, on top of jQuery, and the [ES6+ features](https://www.freecodecamp.org/news/write-less-do-more-with-javascript-es6-5fd4a8e50ee2/).

**Forget about JSX when working with Vue.**

When it comes to Vue, web developers with experience in PHP and jQuery appreciate [Vue syntax](https://vuejs.org/v2/guide/syntax.html), because Vue templates are more about HTML rather than JavaScript. So, yeah, when you work with developers who are used to make dynamic HTML templates with inline variables, control statements and loops, Vue is more appealing and understandable.

An interesting fact from history is that Vue's default syntax is inspired by Angular 1, not PHP templating. [Angular 1 just entered EOL (End of Life phase)](https://docs.angularjs.org/misc/version-support-status) but it played a key role in making the [MEAN stack](<https://en.wikipedia.org/wiki/MEAN_(solution_stack)>) a viable alternative to the [LAMP stack](<https://en.wikipedia.org/wiki/LAMP_(software_bundle)>) a decade ago.

> Google Creative Labs was where Evan first started his work on Vue. As the project grew, the team started to use Angular 1. it had too many features that they didn't need. Evan also didn't like some of the design decisions that Angular 1 had. So, Evan started to work on a templating library just for his personal use. After six months, in February 2014, he officially released it as Vue.js. ([source](https://egghead.io/podcasts/evan-you-creator-of-vue-js))

Knowing a bit of history is nice, but what are the key concepts to grasp in order smoothen the learning curve when it comes to Vue templates?

#### Key features and concepts

🔧 Attributes [[documentation](https://vuejs.org/v2/guide/syntax.html#Attributes)]

Elements in HTML have attributes; these are additional values that configure the elements or adjust their behavior in various ways to meet the criteria the users want. ([source](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes))

- Dynamic attributes are marked with `v-bind` or simply `:`. Most frequently used fo [class and style attributes](https://vuejs.org/v2/guide/class-and-style.html).
- [Event handlers](https://vuejs.org/v2/guide/events.html) are marked with `v-on` or simply `@`.
- `is` is an attribute used in [dynamic components](https://vuejs.org/v2/guide/components-dynamic-async.html). This feature is quite unique and handy! 🪄
- use [`v-model`](https://vuejs.org/v2/guide/#Handling-User-Input) for data binding. Pay attention to [emitting `input` events](https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model).

🧩 Slots [[documentation](https://vuejs.org/v2/guide/components-slots.html)]

Another unique feature of Vue which resembles (more or less) [`children` prop is in React](https://reactjs.org/docs/composition-vs-inheritance.html) facilitating components' inheritance and composition. In the PHP world, this would translate (more or less) to [extends and blocks in twig](https://twig.symfony.com/doc/3.x/tags/extends.html).

Slots are a must-read and a must-understand feature which provides code flexibility and reusability.

🔗 Refs [[documentation](https://vuejs.org/v2/api/#vm-refs)]

These are similar to other [refs](https://reactjs.org/docs/refs-and-the-dom.html), yes. They should be used carefully because it's easy to introduce fishy code through lack of understanding of boundaries between the DOM and Vue.

Refs in Vue return an object of DOM elements and component instances. This means that there is a combination of different APIs. There are no limitations with regards to breaking the boundaries I just mentioned, so it could happend that Vue methods are invoked (instead of DOM such) causing unintentional and hard to debug changes in data.

**Refs should be used for [focus management](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_refs_focus_management), not state management.**

The last important piece of advice I'd share for this topic is about [how to safely access Vue refs without getting undefined](https://jefrydco.id/en/blog/safe-access-vue-refs-undefined/).

### Props

When it comes to defining components' properties and their validations, I sometimes miss the features and possible strictness which React provides.

[`PropTypes`](https://reactjs.org/docs/typechecking-with-proptypes.html) and sometimes TypeScript on top allow for defining shapes and validations in details whereas Vue's [props](https://vuejs.org/v2/guide/components-props.html) validations are [less strict](https://vuejs.org/v2/guide/components-props.html#Prop-Validation).

Important note coming to mind here is that it's impossible to use [`props's`](https://vuejs.org/v2/api/#props) values in Vue component file without defining the `props` object property.

### State management

The concept of state is not as prominent in Vue as it is in React. For a refresher, React provides [`setState()`](https://reactjs.org/docs/faq-state.html#what-does-setstate-do) function which does exactly what it is named after. Each change in state triggers re-rendering.

Vue provides [`data()`](https://vuejs.org/v2/api/#data) function which returns **reactive** variables. [Reactivity](https://vuejs.org/v2/guide/reactivity.html) was the hardest to wrap my head around. Nested objects remain reactive and keep track of changes when passed around with default assignment operations. This is the best and worst feature of Vue in my personal opinion.

Therefore, my first recommendation to anyone experiencing issues with reactivity in nested objects: [justjavascript.com](https://justjavascript.com/). It's a great resource for deeply understanding objects in JavaScript. In increased complexity of nested components and data structures in Vue, the knowledge on how to "break reference" to avoid unintentional state changes is vital.

And when discussing complexity, here's my second recommendation: consider carefully [state management in Vue](https://vuejs.org/v2/guide/state-management.html) and [Vuex](https://vuex.vuejs.org/). It's not adding extra complexity and it's also inspired by Flux similarly to Redux.

![Vuex flow](/media/vuex.png)

Vuex is more accessible than Redux and I'd definitely start with it in any new greenfield project. It's way easier to scale up a Vue project with clearly managed state following battle-tested patterns.

Recently, I came across [Pinia](https://pinia.vuejs.org/), but I haven't tried or used it. And by the way, Vue 3 uses proxies which is a [different approach to reactivity](https://v3.vuejs.org/guide/reactivity.html) compared to Vue 2.

**Managing reactive state is the most important skill to acquire.**

### Computed properties

[Computed properties](https://vuejs.org/v2/guide/computed.html) are a unique feature of Vue. They facilitate caching of reactive variables. I've deliberately kept them for the end, because they are an optimisation technique which is easy to grasp when `data()` and methods concepts are mastered properly.

### Ecosystem

Vue provides excellent ecosystem of ready solutions:

- [Vue CLI](https://cli.vuejs.org/) or [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/) or [Pinia](https://pinia.vuejs.org/) for scalable state management
- [Server-side rendering](https://ssr.vuejs.org/)
- [Nuxt](https://nuxtjs.org/) or [Vue Next](https://github.com/vuejs/vue-next) as alternatives to Next.js

All of these are easier to learn and adopt when compared to React alternatives.

## Learning resources

Although every single developer has a unique approach to learning new technologies, the [Vue Mastery](https://www.vuemastery.com/) platform is what I'd recommend as a first step in anyone's journey, to mastery 😉.

Solid team of experienced professionals with excellent teaching approach similar to CodeSchool. Additional motivational factor, at least for me, is that the platform contributes back to the Vue project financially.

Of course, there are also a few other very useful resources out there:

- 😎 [Awesome Vue](https://github.com/vuejs/awesome-vue)
- 🤓 [Vue Patterns](https://github.com/learn-vuejs/vue-patterns)
- 📚 [Vue Style Guide](https://github.com/pablohpsilva/vuejs-component-style-guide)

## Conclusions

I hope this article is useful for anyone interested in learning Vue.js from scratch. Previous knowledge of React.js is helpful because I make several comparisons and associations.

The key points to take away would be still the same even if I'd discard all of the comparison.

Vue.js is a delightful library and its community and ecosystem of supporting tools make onboarding and adoption a breeze for new or existing projects.
