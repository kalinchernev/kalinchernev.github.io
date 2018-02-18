---
title: Prototyping APIs with Open API Specification and Node.js
slug: prototyping-apis-open-api-specification
date: 2017-03-10T00:00:00+02:00
tags:
- JavaScript
- APIs
- Open APIs
- nodejs
- Prototyping
- documentation
---

A story about using Node.js community-built tools effectively in order to speed up the prototyping phase of your API project. In the whole article, [Open API specification](https://github.com/OAI/OpenAPI-Specification) (which recently reached a RC on version 3) refers to version 2, also known as [Swagger specification](http://swagger.io/).

In this article I’ll briefly demonstrate how you can to make use of few community-driven tools which I came across recently and I definitely recommend: [Typicode](https://medium.com/@typicode)’s [json-server](https://github.com/typicode/json-server) and [Rebilly](https://medium.com/@Rebilly)’s [Open API generator](https://github.com/Rebilly/generator-openapi-repo). By using a combination of them, you can quickly achieve a mock API server with really nice and useful documentation based in short deadlines.

### The Open API generator: specification is first

I think it’s better to start with the specification as it answers many questions, even before making any real or fake data for the API.

The [official documentation](https://github.com/Rebilly/generator-openapi-repo/blob/master/README.md) is sufficient to get started. There’s really no need for detailed tutorial here on how to use the tool in order to make a working project — just follow the steps. (And maybe push an empty commit on the `gh-pages` branch before first deploy just to make sure)

More importantly, you have to know why this generator is good and why I recommend it 😌

* It works with [**swagger editor**](http://swagger.io/swagger-editor/) out of the box, which feels like having a back-end for building your specification and documentation
* Your specification (aka swagger spec) can be split into several files, which makes the project more manageable and mainteanable
* Sleek documentation with [**ReDoc**](http://swagger.io/redoc-openapi-powered-documentation/) (though [swagger-ui](http://swagger.io/swagger-ui/) is also generated) I think ReDoc is excellent in following the API documentation trends.
* The results of your work can easily be deployed to [**github pages**](https://pages.github.com/). It’s possible to make requests from here to external API server like the one we’ll have with json-server, as it supports CORS out of the box. Basically, as long as the server can accept requests from your github pages, these server really effectively as living documentation.
* Continuous integration with **Travis** comes out of the box. Every time you push an update in the specification on the master branch, Travis checks for errors and deploys to github pages if everything is ok.

When you follow the steps correctly, you’ll end up with a simplified version of [RebillyAPI repository](https://github.com/Rebilly/RebillyAPI). That’s the final outcome that’ll motivate you to try the generator now, if you haven’t already done so 😊

Probably you might find other similar tools such as [spectacle](https://github.com/sourcey/spectacle), however this tool worked really well for me and it covers everything I think one might need during a prototyping phase of an API project.

Thus, you have a tool to develop an Open API specification and deploy its documentation to github pages, making it nice and accessible for the public. With this Open API specification, you can later generate server/client code with [Codegen](http://swagger.io/swagger-codegen/), or just deploy the spec to services such as [Cloud Endpoints](https://cloud.google.com/endpoints/docs/open-api-spec) or any other that will soon come with similar integration.

Basically, there are many opportunities available for you when you have the specification. Next step is to generate a server with mock data which matches the specification’s “contract” with the documentation or just any front-end app meant to work with the specification.

### The JSON server generator: fake it till you make it

The [JSON server tool](https://github.com/typicode/json-server/blob/master/README.md) is not really a generator per se, however it’s easy to integrate it as such in your toolchain. What I mean is, the tool is based on [express.js](https://expressjs.com/) and its popular middleware. You won’t need the express generator as you focus on the server. The endpoints are automatically discovered out of JSON files and you do not need express’ sophisticated templates views, routes, etc.

A simple [function](https://github.com/typicode/json-server/blob/master/README.md#generate-random-data) in a script run by a npm task can easily do for having a generator for the server part. Also, [faker](https://www.npmjs.com/package/faker) plays really well with this “generator” function. (no word play intended here) [Check an example](https://coligo.io/create-mock-rest-api-with-json-server/).

The main ideas you should understand with JSON server:

* It’s an easy start out of an example or existing JSON files
* It’s easy to make a generator script to work with the tool

Also, another benefit is that the server can be easily deployed. For example, if you decide to deploy on heroku, you’ll only need to update your server to use `process.env.IP` and `process.env.PORT`. The documentation points to the [jsonplaceholder](http://jsonplaceholder.typicode.com/) example, but surely [hook.io](http://hook.io/) or a similar cloud service will work just fine. Just keep it simple and working — the main idea of using this tool is to move fast and effectively.

Another option for generating a server on top of an existing specification is the [swagger-server](https://www.npmjs.com/package/swagger-server) package which also integrates with express.js, however does not necessarily provide the ready filters, sorts, etc. that json-server does.

### Additional ideas

I personally separated both tools in 2 repositories for the following reasons:

* The mock API server can be managed and deployed independently
* Data from the mock server can be easily fetched from the github pages documentation, as JSON Server comes with CORS enabled by default
* This same mock API server can be just thrown away when the real server comes into place to work with the documentation and/or application
* It’s also good to have the documentation repository separate to make it easier to manage in a similar way as the server. Good example is how both swagger ui, swagger editor and ReDoc are integrated into a single project focusing on developing specification and documentation

### Further notes

That was a brief article sharing some love about open source projects which deserve an applause for being simple and effective helpers for developers.

If this article gets any positive feedback, I will make a follow-up story to this one showing few tips to improve the workflow of editing and publishing specification to documentation to a working API.

At any case, the search of more effective and well-integrated API prototyping, documentation and deployment continues.
