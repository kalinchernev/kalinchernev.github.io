---
title: Multilingual Gatsby.js
slug: multilingual-gatsbyjs
date: '2019-09-02T00:00:00+02:00'
category: 'Code'
template: 'post'
draft: false
tags:
  - i18n
  - l10n
  - JavaScript
  - GatsbyJS
description: 'Shared thoughts on building Gatsby.js sites in many languages.'
---

## Introduction

There are 24 official languages in the European Union. Creating a Gatsby.js website in so many languages is an edge case for which the [guide on localization and internationalization with Gatsby.js](https://www.gatsbyjs.org/docs/localization-i18n/) might not help.

In this article I'll reflect on the topic of i18n with Gatsby.js, the available plugins and core APIs. Mostly, how to use core APIs to create a scalable system for delivering multilingual static sites.

## Problem analysis

In my opinion, when evaluating approaches/tools for multilingualism with Gatsby.js, the solution should:

- Produce translated strings in both client/server rendered components.
- Follow best practices, using battle-tested utilities.
- Follow React.js patterns.

In short, the tool or the approach taken to solve the issue should be maintenable.

## Research

When working on a Gatsby.js project, a research phase would usually consist of browing the following sources:

- [Community plugins](https://www.gatsbyjs.org/plugins/)
- [Core plugins](https://github.com/gatsbyjs/gatsby/tree/master/packages)
- [Examples](https://github.com/gatsbyjs/gatsby/tree/master/examples)

When it comes to researching for "i18n":

![i18n plugins Gatsby.js](/media/i18n-plugins-gatsbyjs.png)

Trying to get information about the first one `gatsby-plugin-i18n`, it leads to Github search `https://github.com/search?q=gatsby-plugin-i18n` which shows several repositories, some of them are forks of a very close relation.

The first one [angeloocana/gatsby-plugin-i18n](https://github.com/angeloocana/gatsby-plugin-i18n) uses `react-intl` and `i18next`. Looks promising with over 210 stars and separate packages for per-topic solutions. However, it automatically goes out of the shortlist - it will not be ok to have 24 files for every single page. Imagine a site with 10 pages which will explode to managing 240 files for a simple site!

The second one [ikhudo/gatsby-i18n-plugin](https://github.com/ikhudo/gatsby-i18n-plugin) also uses `i18next`. Has an unofficial? mirror at [hupe1980/gatsby-i18n](https://github.com/hupe1980/gatsby-i18n). Looking at code of `gatsby-i18n` and `gatsby-plugin-i18next` packages we see that documentation is scarce and both haven't been updated very frequently.

That's confusing: `gatsby-plugin-18` vs `gatsby-18n-plugin`, first being a "no-no" and second one being "can't start the starters". 🤔

The third plugin in the list is [`wiziple/gatsby-plugin-intl`](https://github.com/wiziple/gatsby-plugin-intl) uses `react-intl`. Shares approach and issues mentioned in `angeloocana/gatsby-plugin-i18n`: we can't afford per-language page.

Lastly, checking whether any of the top (most downloaded) plugins is used in a [core plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages) or an [example](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n): the answer is no.

It's easy to see that `react-intl` and `i18next` are the go-to solutions in terms of using i18n frameworks, though at the same time

**top plugins are either not scalable or are not production-ready.**

Coming back to `wiziple/gatsby-plugin-intl` plugin which has a special [**WHY** section](https://github.com/wiziple/gatsby-plugin-intl#why):

> When you build multilingual sites, Google recommends using different URLs for each language version of a page rather than using cookies or browser settings to adjust the content language on the page.

Looking at the [example of using i18n](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n) it says:

> Example site that demonstrates how to build Gatsby sites with multiple languages (Internationalization / i18n) without any third-party plugins or packages. Per language a dedicated page is built (so no client-side translations) which is among other things important for SEO.

Having these and the awareness about the state of i18n plugins, it's natural to start on a new path of thinking: **HOW** to solve the problem without plugins?

## createPage() and pageContext

From the previous section we reached a point where we know that we can achieve i18n with functions from Gatsby.js's core. Let's make a short analysis of the [reference example](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n).

Starting from `gatsby-node.js`, the file where we can use [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/), we see [usage of `createPage()`](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-i18n/gatsby-node.js#L17-L39):

```javascript
Object.keys(locales).map(lang => {
  // Use the values defined in "locales" to construct the path
  const localizedPath = locales[lang].default
    ? page.path
    : `${locales[lang].path}${page.path}`;

  return createPage({
    // Pass on everything from the original page
    ...page,
    // Since page.path returns with a trailing slash (e.g. "/de/")
    // We want to remove that
    path: removeTrailingSlash(localizedPath),
    // Pass in the locale as context to every page
    // This context also gets passed to the src/components/layout file
    // This should ensure that the locale is available on every page
    context: {
      ...page.context,
      locale: lang,
    },
  });
});
```

This is already solving our issue with scalability, because we can define a list of 24 languages and loop through them, having a separate page for each language without creating physical files.

The part about `context` and `locale` is an example of how to [pass a variable to GraphQL queries in Gatsby.js](https://www.gatsbyjs.org/docs/gatsby-internals-terminology/#pagecontext), which can be seen in [code here](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-i18n/src/pages/index.js#L35).

At the same time, passing data to `context` is related to how [Gatsby.js creates pages](https://www.gatsbyjs.org/docs/write-pages/). For example, the `public/page-data/de/page-data.json` of the example will contain:

```json
{
  "componentChunkName": "component---src-pages-index-js",
  "path": "/de",
  "webpackCompilationHash": "ed7057ec19fc05f78011",
  "result": {
    "data": {},
    "pageContext": {
      "isCreatedByStatefulCreatePages": true,
      "locale": "de",
      "dateFormat": "DD.MM.YYYY"
    }
  }
}
```

I've skipped `result.data` to focus on `result.pageContext.locale` 😉.

The example implementation is already clearly stating:

> Usage of a custom hook with GraphQL to access translations. That part can be replaced with a i18n library

This means that the [`useTranslations()`](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-i18n/src/components/useTranslations.js)

having the following implementation might need reconsideration:

```javascript
const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            hello
            subline
            backToHome
          }
        }
      }
    }
  }
```

And you might already see a few potential drawbacks of this approach:

- Each field to be used needs to be query-ied. Could be ok for a few fields, but what happens with a page of 30+ strings?
- What about nested structures?
- Data is [sourced](https://www.gatsbyjs.org/docs/sourcing-from-the-filesystem/) which is ok for a use case of having a few files, but what happens on multiplication by 24?

Using sourcing and GraphQL for pulling data into components demonstrates a good pattern of enabling usage of data on SSR, though it might not be the most scalabale approach for the long term.

## i18n library

Let's try to implement an i18n library in the example. For the demonstration we'll select i18next.

Following the [quick start](https://react.i18next.com/guides/quick-start), the example would have a basic implementation [like this](https://github.com/kalinchernev/using-i18n/commit/84702c14343b12ed83e81624df7c3d6dacb3d116)

NB: `gatsby-plugin-layout` is used for convenience and simplification, not directly related to integration of i18next.

At this stage, a component can use `useTranslation` in the following way:

```javascript
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleContext } from '../layouts';

const Welcome = () => {
  const { locale } = useContext(LocaleContext);
  const { t, i18n } = useTranslation();

  i18n.changeLanguage(locale);

  return <div>{t('Using i18next')}</div>;
};

export default Welcome;
```

Yes, the `changeLanguage()` will be taken out to be more generic, as well as `LocaleContext` does not need stay in the `layout` any more, but we have a working example with 2 ways of translating content.

## Refactoring

As a [first step of refactoring](https://github.com/kalinchernev/using-i18n/commit/1600a7bb28bff0ddb3d888d7ca00a3d765e8df7e) the current implementation, we can do the following:

- Take out `resources` from the configuration file, as suggested in i18next quick start.
- Use [`I18nextProvider`](https://react.i18next.com/latest/i18nextprovider) to pass `i18n` instance down to children, rather than relying on `use(initReactI18next)` middleware.
- Change locale/language context from the layout component.

```javascript
useEffect(() => {
  i18n.changeLanguage(locale);
}, [locale]);
```

- The surface of implementation in components now works as following:

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();

  return <div>{t('Using i18next')}</div>;
};

export default Welcome;
```

We still make use of the [Context API](https://reactjs.org/docs/context.html) and we are able to access both `location` and `i18n` from components', regardless of their location in the hierarchy. No props drillin'.

However, after moving `resources` to an external file and `import`-ing it, we end up with:

![i18n client-side](/media/i18n-client-side.png)

Which is not ideal, because although we see translations in the browser on language switching, the resulting HTML pages are not having the translations in their corresponding languages, but in defaults. Translation happens client-side.

## Loading translations resources for server-side rendering (SSR)

After [second refactoring](https://github.com/kalinchernev/using-i18n/commit/27d4791b37e0f2bd9df49cdfd74fc35c88676fa4):

- The `localeContext` is taken out from the layout component and moved to a separate file in order to avoid circular dependencies.
- [`resources` are `require`-ed](https://github.com/kalinchernev/using-i18n/commit/27d4791b37e0f2bd9df49cdfd74fc35c88676fa4#diff-fda05457e393bada716f508859bfc604R9) in `gatsby-node.js` and information is passed through `context` again. Example: `public/page-data/de/page-data.json`

```javascript
{
  "componentChunkName": "component---src-pages-index-js",
  "path": "/de",
  "webpackCompilationHash": "723c1b4c311ddaa3bf91",
  "result": {
    "data": {},
    "pageContext": {
      "isCreatedByStatefulCreatePages": true,
      "locale": "de",
      "localeResources": {
        "translation": { "Using i18next": "Using i18next (DE)" }
      },
      "dateFormat": "DD.MM.YYYY"
    }
  }
}
```

- [i18next's initialization](https://github.com/kalinchernev/using-i18n/commit/27d4791b37e0f2bd9df49cdfd74fc35c88676fa4#diff-8be0da79bbc6e745de5b15ad04fefb43) moved to a separate file.
- A [HOC](https://reactjs.org/docs/higher-order-components.html) added, takes providers from layout component and passes `i18n` instance and `locale` to children. It's inspired by [this](https://github.com/ikhudo/gatsby-i18n-plugin/blob/master/packages/gatsby-plugin-i18next/src/withI18next.js)).

## Summary

The multilingual setup we end up with uses core functionalities without plugins: i18next, React patterns (HOC), Context API, hooks, and Gatsby's `createPage()`, which facilitate the data management.

Plugins do have their role into solving problems when they are in a specific scope or when they provide enough flexibility in terms of implementation. I think the reason the i18n plugins won't be the best fit for all types of multilingual sites is that they make assumptions which impose constraints on scalability of the project using them.

I hope this was a useful read for getting the way of thinking rather than the framework specifics.
