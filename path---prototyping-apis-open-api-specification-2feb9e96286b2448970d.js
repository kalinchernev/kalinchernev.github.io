webpackJsonp([78022607812443],{562:function(e,t){e.exports={data:{markdownRemark:{frontmatter:{title:"Prototyping APIs with Open API Specification and Node.js",date:"2017-03-09T22:00:00.000Z",tags:["JavaScript","APIs","Open APIs","nodejs","Prototyping","documentation"]},timeToRead:5,html:'<p>A story about using Node.js community-built tools effectively in order to speed up the prototyping phase of your API project. In the whole article, <a href="https://github.com/OAI/OpenAPI-Specification">Open API specification</a> (which recently reached a RC on version 3) refers to version 2, also known as <a href="http://swagger.io/">Swagger specification</a>.</p>\n<p>In this article I’ll briefly demonstrate how you can to make use of few community-driven tools which I came across recently and I definitely recommend: <a href="https://medium.com/@typicode">Typicode</a>’s <a href="https://github.com/typicode/json-server">json-server</a> and <a href="https://medium.com/@Rebilly">Rebilly</a>’s <a href="https://github.com/Rebilly/generator-openapi-repo">Open API generator</a>. By using a combination of them, you can quickly achieve a mock API server with really nice and useful documentation based in short deadlines.</p>\n<h3 id="the-open-api-generator-specification-is-first"><a href="#the-open-api-generator-specification-is-first" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>The Open API generator: specification is first</h3>\n<p>I think it’s better to start with the specification as it answers many questions, even before making any real or fake data for the API.</p>\n<p>The <a href="https://github.com/Rebilly/generator-openapi-repo/blob/master/README.md">official documentation</a> is sufficient to get started. There’s really no need for detailed tutorial here on how to use the tool in order to make a working project — just follow the steps. (And maybe push an empty commit on the <code class="language-text">gh-pages</code> branch before first deploy just to make sure)</p>\n<p>More importantly, you have to know why this generator is good and why I recommend it 😌</p>\n<ul>\n<li>It works with <a href="http://swagger.io/swagger-editor/"><strong>swagger editor</strong></a> out of the box, which feels like having a back-end for building your specification and documentation</li>\n<li>Your specification (aka swagger spec) can be split into several files, which makes the project more manageable and mainteanable</li>\n<li>Sleek documentation with <a href="http://swagger.io/redoc-openapi-powered-documentation/"><strong>ReDoc</strong></a> (though <a href="http://swagger.io/swagger-ui/">swagger-ui</a> is also generated) I think ReDoc is excellent in following the API documentation trends.</li>\n<li>The results of your work can easily be deployed to <a href="https://pages.github.com/"><strong>github pages</strong></a>. It’s possible to make requests from here to external API server like the one we’ll have with json-server, as it supports CORS out of the box. Basically, as long as the server can accept requests from your github pages, these server really effectively as living documentation.</li>\n<li>Continuous integration with <strong>Travis</strong> comes out of the box. Every time you push an update in the specification on the master branch, Travis checks for errors and deploys to github pages if everything is ok.</li>\n</ul>\n<p>When you follow the steps correctly, you’ll end up with a simplified version of <a href="https://github.com/Rebilly/RebillyAPI">RebillyAPI repository</a>. That’s the final outcome that’ll motivate you to try the generator now, if you haven’t already done so 😊</p>\n<p>Probably you might find other similar tools such as <a href="https://github.com/sourcey/spectacle">spectacle</a>, however this tool worked really well for me and it covers everything I think one might need during a prototyping phase of an API project.</p>\n<p>Thus, you have a tool to develop an Open API specification and deploy its documentation to github pages, making it nice and accessible for the public. With this Open API specification, you can later generate server/client code with <a href="http://swagger.io/swagger-codegen/">Codegen</a>, or just deploy the spec to services such as <a href="https://cloud.google.com/endpoints/docs/open-api-spec">Cloud Endpoints</a> or any other that will soon come with similar integration.</p>\n<p>Basically, there are many opportunities available for you when you have the specification. Next step is to generate a server with mock data which matches the specification’s “contract” with the documentation or just any front-end app meant to work with the specification.</p>\n<h3 id="the-json-server-generator-fake-it-till-you-make-it"><a href="#the-json-server-generator-fake-it-till-you-make-it" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>The JSON server generator: fake it till you make it</h3>\n<p>The <a href="https://github.com/typicode/json-server/blob/master/README.md">JSON server tool</a> is not really a generator per se, however it’s easy to integrate it as such in your toolchain. What I mean is, the tool is based on <a href="https://expressjs.com/">express.js</a> and its popular middleware. You won’t need the express generator as you focus on the server. The endpoints are automatically discovered out of JSON files and you do not need express’ sophisticated templates views, routes, etc.</p>\n<p>A simple <a href="https://github.com/typicode/json-server/blob/master/README.md#generate-random-data">function</a> in a script run by a npm task can easily do for having a generator for the server part. Also, <a href="https://www.npmjs.com/package/faker">faker</a> plays really well with this “generator” function. (no word play intended here) <a href="https://coligo.io/create-mock-rest-api-with-json-server/">Check an example</a>.</p>\n<p>The main ideas you should understand with JSON server:</p>\n<ul>\n<li>It’s an easy start out of an example or existing JSON files</li>\n<li>It’s easy to make a generator script to work with the tool</li>\n</ul>\n<p>Also, another benefit is that the server can be easily deployed. For example, if you decide to deploy on heroku, you’ll only need to update your server to use <code class="language-text">process.env.IP</code> and <code class="language-text">process.env.PORT</code>. The documentation points to the <a href="http://jsonplaceholder.typicode.com/">jsonplaceholder</a> example, but surely <a href="http://hook.io/">hook.io</a> or a similar cloud service will work just fine. Just keep it simple and working — the main idea of using this tool is to move fast and effectively.</p>\n<p>Another option for generating a server on top of an existing specification is the <a href="https://www.npmjs.com/package/swagger-server">swagger-server</a> package which also integrates with express.js, however does not necessarily provide the ready filters, sorts, etc. that json-server does.</p>\n<h3 id="additional-ideas"><a href="#additional-ideas" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Additional ideas</h3>\n<p>I personally separated both tools in 2 repositories for the following reasons:</p>\n<ul>\n<li>The mock API server can be managed and deployed independently</li>\n<li>Data from the mock server can be easily fetched from the github pages documentation, as JSON Server comes with CORS enabled by default</li>\n<li>This same mock API server can be just thrown away when the real server comes into place to work with the documentation and/or application</li>\n<li>It’s also good to have the documentation repository separate to make it easier to manage in a similar way as the server. Good example is how both swagger ui, swagger editor and ReDoc are integrated into a single project focusing on developing specification and documentation</li>\n</ul>\n<h3 id="further-notes"><a href="#further-notes" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Further notes</h3>\n<p>That was a brief article sharing some love about open source projects which deserve an applause for being simple and effective helpers for developers.</p>\n<p>If this article gets any positive feedback, I will make a follow-up story to this one showing few tips to improve the workflow of editing and publishing specification to documentation to a working API.</p>\n<p>At any case, the search of more effective and well-integrated API prototyping, documentation and deployment continues.</p>'}},pathContext:{slug:"prototyping-apis-open-api-specification"}}}});
//# sourceMappingURL=path---prototyping-apis-open-api-specification-2feb9e96286b2448970d.js.map