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

Although this article is meant to be an overview of several topics regarding quality assurance in GatsbyJS projects, same principles and tools apply to any professional JavaScript project.

When a project grows, standards play bigger and more important role in ensuring problems remain manageable, i.e. the codebase of the given project remains sane to maintain. When applied and followed properly, standards facilitate developers' cooperation and efficiency.

Hopefully you already believe that QA is important, because this time I haven't gone too deep into explaining the **why**, but rather the **how-with-what**. The concepts you will learn here are common sense and are easy to follow and implement.

My goal for you by the end of this article - you will not only understand what could be done to improve the quality of your project, but you will also act upon it, if you still haven't done so already.

My main motivation to write the essay - share a point of view how JavaScript developers can add a sprinkle of QA automation to their projects in order to make their creations rock-solid useful for professional projects.

And by developers I mean - open source contributors sharing their GatsbyJS starters, JavaScript developers sharing tools on npm and last, but not least, team members who want to raise the efficiency of their team in general.

## The story behind

The first few days after the release of [Building a personal blog with Gatsby.js](https://skl.sh/2HATDlg) were quite exciting because I received feedback which gave me perspectives I hadn't considered before talking about the topic.

For example, a recurring subject of discussions is the comparison between GatsbyJS and popular CMS. Not so surprising - Drupal and WordPress also come to my mind when speaking site building. I can put myself into the perspective of looking at GatsbyJS from a new point of view sort-of comparing it to PHP CMS-s.

What surprised me was the lack of opinionated quality assurance in community tools around GatsbyJS. When I was at the point of comparing plugins and themes I expected more-or-less equal quality coming from the JavaScript community.

Why? Because there are many mature industry best practices when it comes to quality assurance in JavaScript projects.

_So coming back to the various points of view with valid questions ..._

A frequently asked question I get in many forms is whether GatsbyJS is as serious/mature product as WordPress and Drupal. Reality is that not only these products are incomparable in terms of features and main goal of existence, but also [the main concepts of site building with these tools are completely different](/learn-gatsbyjs). ([#JAMStack](/tags/jamstack))

Still, I believe there are two main aspects by which GatsbyJS could be compared to popular CMS - the quality of the site's source code and the quality of the final build delivered to the end user.

The quality of the final build delivered to the user is again a relatively controversial aspect to compare because of the difference in the way of thinking and tooling. Of course static sites will be faster, though there is much more to it which [CMS site builders don't even know](https://www.gatsbyjs.org/blog/2017-09-13-why-is-gatsby-so-fast/).

For me, the quality of the source code is the universal factor to compare whether a given solution is serious/mature enough.

> If code isn't clean, it can bring a development organization to its knees. - Robert C. Martin

Reality is, most of the developers won't go into the source code of the core system until they need to solve an unexpected problem.

For this, communities are usually empowered to extend the core systems via plugins and themes.

_Which brought me to ..._

### Researching quality standards in GatsbyJS starters

So, in order to be generally prepared to potential questions about "seriousness" of GatsbyJS in overall, I decided to have a look around popular GatsbyJS plugins and themes (starters) and research their quality standards.

After opening the [official starters](https://www.gatsbyjs.org/docs/gatsby-starters/) and a few community such, I realized that very few have integrated linting rules or tests. At best, just a few have [prettier](https://prettier.io/) configuration file. Few days after my initial research, @kripod97 shared his [starter with integrated quality tools](https://twitter.com/kripod97/status/996408272579104768).

Honestly, I have mixed feelings about this current state of GatsbyJS starters. On one side I'm happy to see people paying attention of missing quality standards.

But I don't like having bigger number of starters compared to less of a number and higher of a quality. Like, honestly, even in one of the most popular starters [gatsby-starter-netlify-cms](https://github.com/AustinGreen/gatsby-starter-netlify-cms) there are no standards at the moment.

_Guess the most probable starting point for a PHP CMS developer to start evaluating GatsbyJS as an alternative ..._

What I'm trying to point out here is that if GatsbyJS is to be taken seriously, the examples and starting points in the community should have better standards. And I'm not saying the creators of the starters should always decide about the "first world problem" of trailing comma problem themselves, but at least provide defaults which are common sense.

In worst case, the developer starting off from the given starter will have to set his preferred rules in an existing eslint configuration file or tweak plugins/extends. In best-case scenario, the developer will step on the solid tool chain, accept common-sense defaults and focus on creation part.

At any case, a starting point of missing QA fundamentals is opening the door of bad practices, harder adoption and extension of starting code, [bikeshedding](https://en.wiktionary.org/wiki/bikeshedding), nitpicking and all other sorts of horrible things for which developers will blame JavaScript :)

## QA base

Fortunately for us, JavaScript developers, there are plenty of good and best practices and tools enforcing quality. Let's discuss few of them:

- Add default settings for your editor with [EditorConfig](https://editorconfig.org/).
- Automatic code formatting with [Prettier](https://prettier.io/).
- Static code analysis /linting/ with [ESlint](https://eslint.org/).
- Automated tests with Jest, unit and integration.

Implementing some basic quality standards in your project will make your code base more maintainable and more accessible for others to join and help you when the project grows. Also you will save time and energy from no-always-necessary discussions about code and will be able to focus on what's important.

### [EditorConfig](https://editorconfig.org/)

This one is a low-hanging fruits you can implement super easily. Here's something you can paste in `.editorconfig` in the root of your project:

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

With configurations like these, you ensure that the fundamental formatting rules are followed consistently regardless of the editor of choice.

### Prettier

[Prettier](https://prettier.io/) is a tool which helps you with automatic code formatting. If you haven't read the official documentation yet, you can read this [tutorial](https://swizec.com/blog/love-letter-prettier/swizec/7909) which describes well the benefits of Prettier, in an informal and narrative way.

Setting up this tool is easy:

```sh
$ yarn add -D -E prettier  
```

You can add an [extension in your editor](https://prettier.io/docs/en/editors.html). This is not a required step, but it will give you the benefits of the code formatting without hassle. Also, you can add a [precommit hook](https://prettier.io/docs/en/precommit.html) or other means of CLI formatting code automatically.

Lastly, if you still want to change defaults, [create a configuration file](https://prettier.io/docs/en/configuration.html), although [options are limited for a reason](https://prettier.io/docs/en/option-philosophy.html).

### ESlint

[ESlint](https://eslint.org/) is naturally the tool to use in combination with Prettier. In fact, you can skip Prettier, but you shouldn't skip the linting part. ESlint gives you static code analysis which prevents you from making dummy mistakes which could be discovered even before executing a given piece of code.

ESlint has a [`--fix` command](https://eslint.org/docs/3.0.0/user-guide/migrating-from-jscs#--fix) which acts similarly to Prettier when fixing formatting issues. However, ESlint has features for catching and fixing code quality issues as well, which are far move important to alleviate. If you come from PHP background, you can imagine ESlint as being [PHP Codesniffer](https://github.com/squizlabs/PHP_CodeSniffer).

Before going into implementation details, make sure you either prepare your code repository or start off from an [example repo which could be improved](https://github.com/gatsbyjs/gatsby-starter-default), so that you learn the following concepts with practical experience.

#### Install dependencies

```sh
$ yarn add -D -E eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react
```

Adding so many packages surely looks scary, but don't worry - they are used in development phase only, they will by no means make your site bigger or slower.

#### Configure ESlint

To configure ESlint, create a file **.eslintrc.json** in the root folder of your project. Here's an example:

```json
{
  "root": true,
  "extends": ["airbnb", "plugin:prettier/recommended"],
  "settings": {
    "import/core-modules": ["gatsby"]
  },
  "globals": {
    "graphql": true
  },
  "rules": {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }
    ]
  }
}
```

These settings:

- Communicate that the configuration is located in the root folder of the project.
- Take recommended configurations for [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and [prettier](https://github.com/prettier/eslint-config-prettier) presets, which saves time for a start.
- Communicate that `gatsby` is a core module which could be imported without raising error flags unnecessarily.
- Communicate that `graphql` is a global, because GatsbyJS makes it so.
- Include an example rule for the accessibility of the Link component.

At this stage, you can already run `npx eslint` to get feedback from the linter.

Do not forget to add an `.eslintignore` file with the following contents:

```
node_modules
public
```

Where `node_modules` you already know and `public` is a folder created by GatsbyJS which contains generated code which doesn't need linting.

Possible fine-touch would be to also install and use the `gatsby-plugin-eslint` which will give you feedback about linting issues while developing your project.

#### Understanding ESlint

If you are interested into tweaking the recommended configurations from the previous point, knowing the following fundamentals will help you google your way through the right tweaks:

- [Configuration files specify rules, environments and globals](https://eslint.org/docs/user-guide/configuring).
- [Plugins implement specifications about these rules, environments and globals](https://eslint.org/docs/3.0.0/developer-guide/working-with-plugins).
- Both configurations and plugins are shareable pieces of code which you can find on npm.

In overall, plugins are collections of rules distributed as npm packages. Configs are presets of rules (either default or plugin based). Plugins can include shareable configs, however configs can’t include plugin rules. Plugins contain definitions for custom rules, and configs explain whether those rules should be enabled or disabled and how they should be configured.

### Tests

Automated tests could have many forms and goals. The most popular types are unit and functional tests. Unit tests are ensuring the quality of lower-level logic, whereas functional tests ensure a given application supports a given functionality on a higher-level, not necessarily knowing anything about the lower-level logic.

In this section, I will focus on functional tests for GatsbyJS websites using [Jest](https://facebook.github.io/jest/). In a previous article I showed some [example unit tests](/tdd-serverless-jest). The main difference this time will come from the additional tool I'll add in the game called [puppeteer](https://github.com/GoogleChrome/puppeteer).

Puppeteer is a tool which will enable you to click around your website in an automated way and validate a given set of functionalities work well as if you were clicking yourself manually.

#### Installing dependencies

```sh
$ yarn add -D -E jest jest-config puppeteer jest-puppeteer eslint-plugin-jest
```

Briefly:

- jest - core Jest
- jest-config - contains defaults we reuse in our project-specific jest configurations
- puppeteer - headless Chrome browser to do the clicking for you
- jest-puppeteer - integrates the puppeteer lower level APIs with Jest so that you can include puppeteer abstractions in your tests
- eslint-plugin-jest - sets new [ESlint rules](https://www.npmjs.com/package/eslint-plugin-jest#rules) for your project

#### Configuration

Jest will be able to run tests by default without any configurations. In our concrete case, we use `jest-puppeteer` and that's why we'll create `jest.config.js` with the following contents:

```javascript
const { defaults } = require('jest-config');

module.exports = {
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.cache'],
  verbose: true,
};
```

In short, we add the `.cache` folder generated by GatsbyJS in the list of ignored locations.

Next, you can create also `jest-puppeteer.config.js` which contains:

```javascript
module.exports = {
  server: {
    command: './node_modules/.bin/gatsby serve',
    port: 9000,
  },
};
```

This will start a GatsbyJS server on port `9000` following this [useful feature](https://github.com/smooth-code/jest-puppeteer#start-a-server) of `jest-puppeteer`.

#### Simple test

In my case, I decided to start small and create `test/homepage.spec.js` test file with the following:

```javascript
const puppeteer = require('puppeteer');
const { port } = require('../jest-puppeteer.config').server;

const siteRoot = `http://localhost:${port}`;

describe('Homepage', () => {
  let browser = '';
  let page = '';

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });

    await page.goto(`${siteRoot}/`);
  });

  afterAll(async () => {
    browser.close();
  });

  test('Site title is visible', async () => {
    await page.waitForSelector('h1');

    const html = await page.$eval('h1 a', e => e.innerHTML);
    expect(html).toBe('Kalin Chernev');
  });

  test('Older blog posts are accessible', async () => {
    // Yes, that's a very broad selector, test ids?
    await page.waitForSelector('#___gatsby');

    const html = await page.$eval('#___gatsby', e => e.innerHTML);
    expect(html).toContain('Older posts');
  });
});
```

I think the code is self-explanatory, these are 2 basic assertions that the site title and pager are available.

For more functionalities, familiarize yourself with the [documentation](https://github.com/smooth-code/jest-puppeteer/blob/master/packages/expect-puppeteer/README.md#api). Also, there are quite a few resources online already with more examples. I personally like some ideas from this [article](https://ropig.com/blog/end-end-tests-dont-suck-puppeteer/).

### Integrating with CI

There are many free solutions for open source projects, as well as premium such for private projects, so again - I won't give too many opinions here, but simply share my own simplified setup.

Here's what you can do with [CircleCI](https://circleci.com/) for example:

- Create a new folder `.circleci` .
- Create a new file `setup_puppeteer.sh`
- Create also `config.yml`

Both files are obviously in the folder `.circleci`.

In the script file, you can use this example I copied myself from the internet:

```sh
#!/bin/bash

sudo apt-get update
sudo apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

This is ensuring that the container used for the tests can provide the necessary dependencies for the headless browser.

Whereas the yaml file could be:

```yaml
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:carbon-browsers
    working_directory: ~/repo

    steps:
      - checkout:
          post:
          - git checkout blog

      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "package.json" }}
          # fallback to using the latest cache if no exact match is found
          - v1-dependencies-

      - run:
          name: Workaround for GoogleChrome/puppeteer#290
          command: 'sh .circleci/setup_puppeteer.sh'

      - run: yarn install

      - save_cache:
          paths:
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}

      - run: yarn build
      - run: yarn test
```

The interesting parts which are not necessarily obvious from the documentation are that `carbon-browsers` [image](https://circleci.com/docs/2.0/circleci-images/) is used and the script we created in the previous step is meant to be a temporary workaround.

### Revising `package.json`

To have a feeling of completeness, let's make a quick revision on the updates which happened in `package.json`.

Script tags:

```json
"scripts": {
  ...
  "lint:js": "eslint \"**/*.{js,jsx}\"",
  "lint": "run-p lint:*",
  "precommit": "lint-staged",
  "test-write": "jest --watch",
  "test": "run-p test:* -cn",
  "test:lint": "npm run lint",
  "test:functional": "jest"
  ...
},
```

All dependencies we need are in `dev`:

```json
{
  "devDependencies": {
    ...
    "eslint": "^4.9.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "^2.9.0",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-import": "^2.12.0",
    "eslint-plugin-jest": "^21.15.2",
    "eslint-plugin-jsx-a11y": "^6.0.3",
    "eslint-plugin-prettier": "^2.6.0",
    "eslint-plugin-react": "^7.8.2",
    "gatsby-plugin-eslint": "^1.0.3",
    "jest": "^23.0.0",
    "jest-config": "^23.0.0",
    "jest-puppeteer": "^3.0.1",
    "lint-staged": "^7.1.0",
    "prettier": "^1.12.1",
    "puppeteer": "^1.4.0",
    ...
  }
}
```

And last, but not least:

```json
"lint-staged": {
  "*.{js,json,css,md}": ["prettier --write", "git add"]
}
```
