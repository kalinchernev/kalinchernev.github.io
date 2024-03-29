---
title: swagger-jsdoc v6
date: "2020-12-23T00:00:00+02:00"
template: "post"
draft: false
slug: "/swagger-jsdoc-6"
category: "Code"
tags:
  - JavaScript
  - Tools
description: "Short overview of a new major version."
socialImage: "../defaultSocialImage.jpg"
---

## Introduction

[`swagger-jsdoc`](https://github.com/Surnet/swagger-jsdoc) is an open source project I've been trying to maintain in the last couple of years. [My first commit](https://github.com/Surnet/swagger-jsdoc/pull/27) was a suggestion for adding a CLI. As a full-time PHP developer in 2016 it was a struggle to wrap my head around Node.js-specific concepts, but my free time spent on the project paid off well later.

More than 4 years later, a lot of things have changed. I use JavaScript full-time and Node.js has been introducing new concepts, functionalities and tools, etc. It's been crazy. Or rather - normal for the JavaScript community :)

At any case, since I started maintaining `swagger-jsdoc` little after my first commit, the library was mostly in maintenance mode. Several improvements were introduced by community-driven pull requests and dozens of bug fixes were merged. Still, I think the real feature-milestone until 2020 was the added [support for OpenAPI specification](https://github.com/Surnet/swagger-jsdoc/pull/122). I'm assuming basing on the raise of [0-~64k monthly downloads in the first period](https://npm-stat.com/charts.html?package=swagger-jsdoc&from=2016-02-08&to=2018-01-08) compared to [~60k to ~820k](https://npm-stat.com/charts.html?package=swagger-jsdoc&from=2018-01-08&to=2020-12-23) in the second period after v3.

`swagger-jsdoc` is getting close to 1m (like million) monthly downloads and 1k (like thousand) github starts in the end of 2020. For me, as a maintainer of the project, this means a lot. In order to say "thank you" back to the people putting their trust in the project, I've been doing some refactoring since October 2020 for which I'll share more in the following sections.

## For users

The following section is targeted for people downloading and using `swagger-jsdoc`.

- added support for coffeescript style jsDoc comments
- added support for yaml anchors and references between separate documents
- added support for custom encoding which is not utf8 in input files
- added support for `x-webhooks` extension

## For maintainers

If you are a maintainer of the project, or you maintain a project closely related to `swagger-jsdoc`, have in mind the following changes:

- `lts/erbium` is now used instead of `lts/dubnium`
- Continuation-passing style (using callbacks) have been replaced by sync functions for consistency.
- Promises and async/await has been used whenever possible.
- [eemeli/yaml](https://github.com/eemeli/yaml) is now used instead of [nodeca/yaml](https://github.com/nodeca/js-yaml) as `eemeli/yaml` provides low-level APIs which were necessary for handling yaml references between separate documents.
- CLI has been simplified and commander has become a bit reduntant
- Tests have been reorganized to match their corresponding module under test or an application.
- Jest is now used instead of Mocha.
- Github actions running tests instead of Circle CI.
- Changelog has been autogenerated to facilitate tracking changes in history.
- Many helpers have been moved inline in order to make specific functions more domain-focused.
- JsDoc annotations have been updated.
- Documentation has been updated.

## Breaking changes

Here are a few scenarios in which you should pay extra attention.

Regarding previously exposed helper functions `createSpecification()`, `parseApiFileContent()`, `updateSpecificationObject()`, `finalizeSpecificationObject()`, which have been exported from the main module until v5 - the following changes have been applied:

- none of them will be exported from the main module anymore
- `createSpecification()` has been renamed to `prepare()` and is part of `src/specification.js`. Can be swapped without any changes in the input data structure. In short, change to `const { build } = require('swagger-jsdoc/src/specification');` and invoke in the same way as before.
- `parseApiFileContent()` has been renamed to `extractAnnotations()` and is part of `src/utils.js`. It has a new signature `function extractAnnotations(filePath, encoding = 'utf8') {}` which makes it more useful directly passing a `filePath` rather than a `fileConents`. Returns the same data structure.
- `updateSpecificationObject()` has been removed in favor of `src/specification/build` function which prepares and corrects all annotations before they get organized in a specification.
- `finalizeSpecificationObject()` has been renamed to `finalize()`. See migration notes for `prepare()` from above.

With regards to working with yaml: keep in mind that the parser has been changed to [eemeli/yaml](https://github.com/eemeli/yaml) instead of [nodeca/yaml](https://github.com/nodeca/js-yaml). That was necessary in order to be able to handle "yaml copy/paste" anchors/references between separate documents. As a result of this change in parsing library, no errors will be thrown from v6 on, as they will be only reported in the end of the specifiction creation. Basing on existing tests in `swagger-jsdoc` it's unlikely that new errors appear due to parser change, but if there are: please [report them](https://github.com/Surnet/swagger-jsdoc/issues).

The way CLI is used can also cause breaking changes when `apis` information has been added in the `swaggerDefinition`. This object has been wrongly accepting information from the `apis` property which you might have been warned about if inheriting types from OpenAPI definitions. The solution: take the value of `apis` and pass it to the CLI as arguments. Here's [an example](https://github.com/Surnet/swagger-jsdoc/releases/tag/v6.0.0-rc.4).

## Conclusions

Many thanks to all contributors helping with issue reports, documentation, code changes and suggestions in overall! I hope the new version 6 will mark a new more accessible and more maintainable version of `swagger-jsdoc` which has proven to be a useful tool for so many people!
