---
title: Theming documentation.js
slug: theming-documentationjs
date: 2018-02-18T00:00:00+00:00
tags:
- documentation
- JavaScript
- DocumentationJs
---

## Introduction

Using [Flow](https://flow.org/) in a project to define types and interfaces is a beneficial practice for improving consistency and productivity. Tickling with the CLI, I noticed an `ast` comman and wondered whether it will be possible to re-use the information from Flow to generate documentation or specification. With [my previous experience](/agile-documentation-api-driven-project) of generating [OpenAPI specification](https://www.openapis.org/) out of code annotations in [JSDoc](http://usejsdoc.org/) I searched a way to take existing types and annotations in code and generate living documentation/specification.

The tool which came into light is called [documentation.js](http://documentation.js.org/). The project is almost 3 years old (`curl https://api.github.com/repos/documentationjs/documentation`) and mature enough to serve my purpose. Best part, it [supports both Flow and JSDoc at the same time](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md).

The documentation about documentation.js, however, is not too much. In fact, the [theming guide](https://github.com/documentationjs/documentation/blob/master/docs/THEMING.md) is merely 2 paragraphs wrapping an existing types annotations which are in code. As understandable this is, the most useful starting point in reality is the [default theme](https://github.com/documentationjs/documentation/tree/master/src/default_theme).

With this article, I will share some high-level thoughts on how to approach the creation of a theme for documentation.js and hopefully it will serve as a complementary resource to those in need of some deeper knowledge about the theming system on top of the annotations.

### Development environment

If you start from the default theme, you will have few [lodash templates](https://lodash.com/docs/4.17.5#template) and all other assets, like highlight.js styles and anchor.js scripts are stored in the theme. From here, it's up to you to improve and make things move convenient for yourself.

These worked well for me:

* Separate the theme out of the documentation.js repository and make an npm project creating a `package.json`.
* Add `webpack` or any other bundler of choice in the stack, that will improve assets.
* Take out vendor dependencies out of the repository and add them as development dependencies to the project.
* Find a tool to hot reload your browser during development in a given folder.
* Create a folder with an example where you put code with Flow types and JSDoc annotations.

You can get **the setup which worked for me** from [this project](https://github.com/kalinchernev/documentation-theme-ecl).

### What documentation.js does

As briefly pointed out in the Node API documentation, there are 2 main tools that are used: [build](https://github.com/documentationjs/documentation/blob/master/docs/NODE_API.md#build) and [formats](https://github.com/documentationjs/documentation/blob/master/docs/NODE_API.md#formats). Take note - they are still separate!

This means that when you have created Flow types and JSDoc annotations, running the build command will give you something like:

```json
[
  { ...
  { ...
  { ...
  {
    "description": {
      "type": "root",
      "children": [ ...
      "position": { ...
    },
    "tags": [
      {
        "title": "name",
        "description": null,
        "lineNumber": 3,
        "name": "ProjectModuleExample"
      },
      {
        "title": "param",
        "description": "Some object to work with",
        "lineNumber": 4,
        "type": { ...
        "name": "input"
      },
      {
        "title": "returns",
        "description": "JSON matching the type fields.",
        "lineNumber": 5,
        "type": { ...
      }
    ],
    "loc": { ...
    "context": { ...
    "augments": [],
    "examples": [],
    "params": [ ...
    "properties": [],
    "returns": [ ...
    "sees": [],
    "throws": [],
    "todos": [],
    "name": "ProjectModuleExample",
    "members": { ...
    "path": [ ...
    "namespace": "ProjectModuleExample"
  }
]
```

This information provided by documentation.js is the most useful part of the whole story. Later, you pass this information down to another system which will `format` the data structure into a nice visualization.

This is what the [formats](https://github.com/documentationjs/documentation/blob/master/docs/NODE_API.md#formatshtml) function does. And the default theme implementation shows an example of how to use a lodash template to render this information.

Obviously, you can choose another way to render the information - it's up to you. You might want to use the build task with another formatter.

### Conclusions

Documentation is important and being able to re-use code annotations and types from your repository to generate further assets and specifications is a great opportunity. The documentation.js tool gives you a good way to build a tree of this information which you can later theme with a branding and rendering system of your choice.

Enjoy!
