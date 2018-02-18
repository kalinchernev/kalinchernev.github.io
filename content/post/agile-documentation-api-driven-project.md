---
title: Agile documentation for your API-driven project
slug: agile-documentation-api-driven-project
date: 2017-01-22T00:00:00+02:00
tags:
- APIs
- web development
- Open APIs
- Swagger
- nodejs
- documentation
---

_Based on [Open API standards](https://www.openapis.org/)_

> “Documentation is like sex; when it’s good, it’s very, very good, and when it’s bad, it’s better than nothing.” — Dick Brandon

The goal of this article is to inspire improved workflows for building and maintaining documentation for API-driven projects. In the end of the story, you will hopefully try out new approaches of documenting your code. As such, it automatically increases the value of your work through making it more maintainable and re-usable in less time and efforts.

### Introduction

[Swagger](http://swagger.io/) is one of the most popular and widely adopted specifications for RESTful APIs. In fact, the specification got off so well that [numerous community tools](http://swagger.io/open-source-integrations/) are available. Also, the [Open API initiative](https://www.openapis.org/) was born as a result of successful projects that use these tools basing on this specification in one way or another.

With the [raise of popularity](https://www.google.com/trends/explore?q=swagger%20api) in 2016, leading experts started sharing advice on as [speeding the development phase with Swagger](https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger) and later making a [good documentation of an existing API](https://scotch.io/tutorials/document-your-already-existing-apis-with-swagger), again same spec being involved. These are few examples of well-written tutorials demonstrating benefits of having an API and a good toolchain, and documentation around it. There are [more](https://egghead.io/courses/build-node-js-apis-with-openapi-spec-swagger), of course, and I think this trend will stay solid for the next couple of years. That’s because the Open API specification makes sense just enough to empower developers and business people to have a common language of how an interface should work. It is as a contract of communication and data format between humans and machines.

In summary, the Swagger specification brings several clear advantages:

* We can [write project specification](http://editor.swagger.io/#/) in `yaml` or
  `json` formats. The `yaml` one is probably closer to humans, which is really nice.
  (Yes, there are UI programs for that as well ;)
* We can [generate server and client code automatically](http://swagger.io/swagger-codegen/), because when the specification is solid, the tools are solid too.
* We can also [generate live documentation](http://swagger.io/swagger-ui/) based on the same project specification. This is particularly useful and that’s why I’ll expand more on about this subject in this article.
* We can program in many languages and the result of our work will stay alive longer, because it conforms to a server <-> client “contract”. Meaning, as long as you can make a swagger specification out of you work, you can move from one technology stack to another.

Node.js is a popular choice for building the server part of applications, but it’s not the only one. The knowledge you can get from this article is transferable to almost any programming language.

### What makes a good API documentation

Let’s now expand on the subject of having an effective documentation. There are many ways to document your software (and API), still, there are few major points which you have to cover to make it right. There is a common denominator of what makes one documentation better than another.

![Picture telling you to stop documentation madness](./images/stop-documentation-madness.png)

#### Auto-generation

I think that is the most important one. Writing documentation should take the least amount of time and efforts, and should minimize the maintenance.

You have to find a good way to write the least amount of textual explanations for your API, which yields the highest value of practical guidelines for the user of the documentation.

#### Include examples

I speak from my personal experience here — it’s really pleasing when the documentation does not make me think too much. My advice: include some sample request objects, or some code samples, etc.

As a consumer or a developer of the API, I want to have a quick-gratification access to something that I use and it just works directly. Rarely I want to open my [advanced REST client](https://advancedrestclient.com/) or [curl](https://curl.haxx.se/docs/) while reading API documentation because it takes off my attention and is basically forcing me to get out of the page I’m reading in order to have “the real feeling” about how something works.

#### Portable

That is a feature I consider equally important for an effective piece of documentation. This is when the auto-generated code can be either displayed as a page or an embedded window of information. It also means that the result of your documentation is re-usable.

If you are a JavaScript developer reading this, you will know that how fascinating the number of possible view frameworks solutions are. One day we have to make a simple page with Bootstrap, then with React.js, Angular.js, Vue.js, etc. No matter the framework or the tool, integrating documentation in an app has to be as easy as an instantiation. (In order to keep the spirit of high productivity and low maintenance costs mentioned in one of the previous points)

#### Swagger UI comes to the rescue

![Image of the swagger ui taken as an example](./images/swagger-ui-example.png)

Swagger UI is a widely-adopted solution to the problems above. The only drawback being that the markup generated by the tool is not [BEM](http://getbem.com/introduction/)-ish or anything like this, thus preventing front-end developers to make really nice themes on top of the solution. (although it’s [partially going on](http://meostrander.com/swagger-ui-themes/))

When you look at the [demo](http://petstore.swagger.io/#/) (or the editor), you will notice that there are similarities in the information presented.

Each endpoint of the API that is documented contains:

* Short description (the textual explanation we usually over-do)
* Example samples of request bodies, options to change request types, etc.
* Opportunity to try out the request <-> response operation

On top of that, swagger-ui documentation is auto-generated based on a simple `yaml` or
`json` swagger specification file. That is super-nice, because the specification that a business person writes or configures through an UI can serve as both a contract AND live documentation!

### We can do better than that

Yes! Even after following popular tools and tutorials, I felt there is room for improvement. Mainly — writing the documentation itself.

See, the problem of writing a single specification file and then using tools to generate the documentation is easy until the maintenance comes into play. Imagine that the

yaml spec is maintained by the same developer or development team that is responsible for the API endpoints of the app server. Surely, there will be back and forth between the specification file and the code files that contain the actual implementation. It takes extra time and efforts to stay focused while jumping between editors and making sure that both resources are well-matched.

In my opinion, the process of “specification > development > documentation > implementation” can improve. Namely, it is possible to do all them at once.

How? By writing swagger specification in the documentation blocks of our code and plugging watch tasks in-between! Yes, the specification might still be in ownership of another one, not the developer. But even then — what if can just see live documentation based on the comments we’re placing in our code? Wouldn’t it be a motivating factor to write better in-code documentation? What is more, wouldn’t it be easier for developers to maintain both the code and the documentation of endpoints where the two are just next to each other?

Look at the following piece of code:

```js
/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
app.post('/login', (req, res) => {
  ...
});
```

As you might have already guessed, this is a sample from [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)which takes the contents of the text after
`@swagger` and parses the contents of the [jsdoc](http://usejsdoc.org/) documentation into a [swagger specification](http://swagger.io/specification/). This specification can be then visualised, for example, like this:

![A nice picture of swagger](./images/nice-swagger-ui-image.png)

It’s true that I made the screenshot from the built of the example, not from this tiny sample, but you get the point ;) (Continue reading and you will see much nicer interface of the same info)

Since I’m looking to improve this workflow even further (and make it more fun for developers to use the tool), I recently suggested a watch task in `swagger-jsdoc` command line tool that works just like this:

```bash
$ swagger-jsdoc -d swaggerDefinition.js routes.js routes2.js -w
```

In this case, after having a generated `swagger.json` the command line will continue listening for changes in `routes.js` and `routes2.js` and then re-generate the specification `swagger.json` on updates.

Also recently, the command line tool got a new feature to output `yaml` if the `-o` flag is used like this:

```bash
$ swagger-jsdoc -d swaggerDefinition.js apis.js -o swagger.yaml
```

In this case, `apis.js` will be searched for `@swagger` tags, but the parsed specification will be written to `swagger.yaml` file.

Having the `swagger.json` or `swagger.yaml` specification at this moment is a nice start. This file is the key re-usable resource that can be integrated with other tools such as `swagger-ui` which visualize the “soul” of the API in nice UI interfaces.

### Improved API documentation workflow

![Improved documentation workflow with swagger-jsdoc](./images/swagger-jsdoc-improves-documentation-workflow.png)

Some time ago, an article about [watching files changes with npm scripts got popular](https://javascriptkicks.com/stories/94009/watching-file-changes-with-npm-scripts). I believe there is a reason why comments are not possible under the original article, but never mind, it got me on the path of researching the [fs.watch()](https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener) and its behavior. After experimentation I reached to prefer [`chokidar`](https://www.npmjs.com/package/chokidar) which is a module improving the `fs.watch()` interface. In fact, I liked `chokidar` so much that I took the opportunity to suggest a [new feature in the CLI tool of](https://github.com/Surnet/swagger-jsdoc/releases/tag/v1.9.0) [`swagger-jsdoc`](https://github.com/Surnet/swagger-jsdoc/releases/tag/v1.9.0) which is, duh, a watch task working with the API files. (Briefly mentioned in the previous chapter)

The `chokidar` module is also an integral part of the [`browser-sync`](https://www.npmjs.com/package/browser-sync) module which, in turn, an already mature and battle-tested piece of software. It is widely adopted in various products and projects to increase development experience and productivity.

Having this understanding, I saw another opportunity — making a simple integration between instruments which integrate the `chokidar` module. I only needed a better understanding of [Swagger UI](http://swagger.io/swagger-ui/) which is the “glue”, or the “contract”, between the back-end server side (the API) and the front-end (client) side. I feel it’s comfortable (and smart) that the documentation pages are the first-hand client and consumer of the API. Also, I believe that this consumer should be easy to make and maintain, but still really nice-looking, so that there is something pleasant for our paying clients to see. With `browser-sync` Swagger UI got a bit more fun to work with.

In order to demonstrate the idea better in visual and kinesthetic way, I created a [supplementary repository](https://github.com/kalinchernev/agile-open-api-docs). It contains examples of the first approach that came to my mind keeping [the KISS principle](https://en.wikipedia.org/wiki/KISS_principle). Basically, there are few npm scripts that make the system work together.

First, you can have a look at [the](https://github.com/kalinchernev/agile-open-api-docs/blob/master/package.json) [`package.json`](https://github.com/kalinchernev/agile-open-api-docs/blob/master/package.json) [manifest](https://github.com/kalinchernev/agile-open-api-docs/blob/master/package.json). Tasks are separated in two main categories: tasks for the server side (the API) and tasks related to the documentation. For the API development part, `npm run api` fires a server with `nodemon` and `swagger-jsdoc` As a result, any changes in the `api/` folder trigger server restart and re-generation of `swagger.json` specification which goes to `api-docs/` folder.

Secondly, the `npm run docs:develop` task fires a `browser-sync` server for the client side serving the `api-docs/` folder which receives automatically updated `swagger.json` specification from the previous task. You can run those two tasks in separate terminal sessions or just create another parallel task following the examples of the `package.json` file with `npm-run-all`.

At this stage, you can freely update both the server and client sides of your project having near real-time feedback and results visible in the browser.

![Nice interface of the generated documentation](./images/better-swagger-documentation-interface.png)

You might be wondering — why isn’t this the interface of Swagger UI I am used to seeing around! What happened? Well, I used a [fork which looks nicer](https://github.com/jensoleg/swagger-ui). Here’s an [online demo](http://swaggerui.herokuapp.com/?url=http://petstore.swagger.io/v2/swagger.json#!/pet/addPet) which you can play with to get the feeling of what your documentation may look like after you enjoyably use `swagger-jsdoc` and `browser-sync` as shown in [this repository.](https://github.com/kalinchernev/agile-open-api-docs/blob/master/package.json)

The same workflow is possible with other file extensions such as `.php` just changing the input parameters and removing the binding to the `nodemon` server restart task, so that another standalone server is used instead. Here’s an example taken from a recent pull request which was included in `swagger-jsdoc` to parse swagger documentation to `yaml` output.

![Example of swagger-jsdoc with php projects](./images/example-swagger-jsdoc-php.png)

### Deployment

I have intentionally left out the deployment part out of this story, because I believe there are many good options on the market and it really depends on the personal preferences how to manage this part of the process. For example, you can follow the scotch.io tutorial mentioned earlier to place the docs on heroku, or you can also include an npm script which works with [`gh-pages`](https://github.com/tschaub/gh-pages) to deploy the assets directly to your repository, etc. The main thing is that the `api-docs` folder is already built and ready to be deployed as-is.

Myself, I plan to experiment with [Google Endpoints](https://cloudplatform.googleblog.com/2016/09/manage-your-APIs-with-Google-Cloud-Endpoints.html) in near future although it’s a new service. That’s because it supports the [Open API specification](https://cloud.google.com/endpoints/docs/open-api-spec) and provides flexible options on deployment for both the API and the documentation on reasonable terms. An interesting point to notice is that the service guidelines show deployment only of the swagger/openapi specification file which can be generated by the `swagger-jsdoc` This is a good example of re-using single specification for multiple purposes.

![Swagger to Open API specification transition](./images/transition-to-open-api.png)

### Conclusions

Writing this article and sharing some code around it, I’m integrating tools that solve problems which have already been under the radar of the [API Evangelist](https://medium.com/@apievangelist) such as [the need of better API documentation and UI deployment](https://apievangelist.com/2015/02/02/we-need-better-api-documentation-and-ui-deployment-options/) which was later followed up by findings about [improved Swagger UI design solution](https://apievangelist.com/2015/06/27/the-responsive-swagger-driven-version-of-slate-api-documentation-i-was-looking-for/). Few months ago, there was also a [reflection article about the success of Swagger UI](https://apievangelist.com/2016/09/16/learning-from-the-success-of-swagger-ui/).

I hope that this article has inspired you to consider some new ways to improve your documentation workflows for your API project. I know that the idea of automated documentation generation with swagger tools is not new. Rather, I aim to introduce some new ideas on solving the problems which have been around on topic for a while with the tools available today to improve productivity.

The tools shown in [the repository](https://github.com/kalinchernev/agile-open-api-docs) are free and vendor-neutral and the documentation build can be deployed to any place which serves you best. So, I encourage you to further experiment with the code and adapt it to work best for your specific needs.
