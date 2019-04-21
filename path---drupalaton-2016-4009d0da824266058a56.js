webpackJsonp([0xcd3957b3bb02],{541:function(e,t){e.exports={data:{markdownRemark:{frontmatter:{title:"Drupalaton 2016",date:"2016-08-21T22:00:00.000Z",tags:["Drupal","GraphQL","Progressive Web Apps","JavaScript"]},timeToRead:7,html:'<h3 id="introduction"><a href="#introduction" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Introduction</h3>\n<p>Recently, I joined an event on <a href="http://drupal.org">Drupal</a> in Hungary — the <a href="http://drupalaton.hu">Drupalaton</a>. It is one of the most exciting yearly Drupal events in Europe, organized by the local community. It gathers hundreds of contributors who collaborate on Drupal issues, share knowledge and have fun together :)</p>\n<p>I really enjoyed this year\'s event since it covered a lot of my favorite topics. (discussed shortly after) Good sessions, pleasant talks with the community, and also — a lot of new things to learn. The event took place at the shore of the biggest warm-water lake in Europe, at Lake Balaton.</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*ME6rgg3pXT8oid14R5RNVg.jpeg"></p>\n<h3 id="sessions"><a href="#sessions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sessions</h3>\n<p>Sure enough, sessions were covering important <a href="https://www.drupal.org/8">Drupal 8</a> features. There were several tracks, as well as sprints, where participants were able to collaborate.</p>\n<p>I visited mainly the workshops related to the <a href="http://buytaert.net/a-roadmap-for-making-drupal-more-api-first">API-first initiative</a>. This is a futuristic initiative, involving many JavaScript tools and modern concepts and practices for building service-oriented apps, not only websites.</p>\n<p>It\'s a vital initiative for Drupal as a platform for the future. Presently, Drupal is one of the best systems for content modelling, querying, and building websites in general. This means that normal people can make websites with complex information structures with very little or no programming.</p>\n<p>The API-first initiative could potentially take Drupal into a place where <strong>the content modelling and querying becomes data modelling and querying, enabling non-developers to build complex APIs for the next generation apps.</strong></p>\n<p>Apart from these, there were also sessions about Drupal-specific modules being upgraded between Drupal 7 and 8. In overall, I think we\'ll see more "good stuff" of <a href="https://symfony.com/">Symfony</a>, PHP OOP, design patterns, etc topics during next Drupal events.</p>\n<h3 id="workshops"><a href="#workshops" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Workshops</h3>\n<p>This is my humble list of highlighted sessions I focused on.</p>\n<p><a href="http://2016.drupalaton.hu/schedule#speaker-166"><strong>REST APIs</strong></a> by Pieter Frenssen (<a href="https://www.drupal.org/u/pfrenssen">pfrenssen</a>)</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*4o8SJ8Q9EhrUt4fkz8DKpQ.jpeg"></p>\n<p>Well-formed, step-by-step guide, covering all important concepts of having Drupal as both server and/or a client in <a href="http://www.restapitutorial.com/">REST API architectures</a>. If you want to skip the details in this section, check <a href="https://www.drupal.org/developing/api/8/rest#practical">Drupal REST API docs</a> which covers great amount of information around the topic.</p>\n<p>The beginning was a general information about what REST actually is. This included status codes, methods, design patterns, etc.</p>\n<p>After presenting the basics, the next step was to use Drupal as a client, fetching data from <a href="https://www.drupal.org/drupalorg/docs/api">drupal.org REST API</a> and displaying it in a block.</p>\n<p><a href="https://hechoendrupal.gitbooks.io/drupal-console/content/en/commands/generate-plugin-block.html">Creating a block with Drupal Console</a> was super-easy. That was a really neat way to demonstrate injecting the <a href="https://api.drupal.org/api/drupal/core%21lib%21Drupal.php/function/Drupal%3A%3AhttpClient/8.2.x">http_client service</a> via the cli from the <a href="https://api.drupal.org/api/drupal/core!core.api.php/group/container/8.2.x">container</a>.</p>\n<p>There was also a demo of using the <a href="https://www.drupal.org/documentation/modules/rest">core REST API module</a>, which transforms Drupal into an API server. <a href="https://www.drupal.org/project/restui">REST UI module</a> was demonstrated as a site builders\' tool to manage the configurations which are otherwise <a href="https://www.chapterthree.com/blog/custom-restful-api-drupal-8">managed through .yml files</a>. Here, it\'s important to note, that the endpoints of the REST API are controllers. Developers have the freedom to choose which format of data to return and via which components. For example, one can use the <a href="https://github.com/symfony/http-foundation">Symfony\'s HttpFoundation</a> and its JsonResponse instance.</p>\n<p>In short, there was a lot of good advice, both about REST APIs in general, and Drupal-specific implementations, in combination with third-party tools and components.</p>\n<p><a href="http://2016.drupalaton.hu/schedule#speaker-171"><strong>Headless Drupal</strong></a> by Ruben Teijeiro (<a href="https://www.drupal.org/u/rteijeiro">rteijeiro</a>)</p>\n<p>Even though I did not attend the workshop, it was still part of the Drupal API-first series of topics. <a href="https://github.com/rteijeiro/headless-drupal8">Code of the session</a>.</p>\n<p><a href="http://2016.drupalaton.hu/schedule#speaker-106"><strong>Progressive web apps</strong></a> by Théodore Biadala (<a href="https://www.drupal.org/u/nod_">nod_</a>)</p>\n<p>That was an intermediate-level session. <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promises</a> were in the core of all code snippets and demonstrations. Highlight APIs: <a href="https://developer.mozilla.org/en/docs/Web/API/Fetch_API">Fetch API</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Cache">Cache</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers">Service Workers</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/API">Web APIs</a> in general. The main idea was to demonstrate how modern web APIs can be used to build web apps, having functionalities very similar to native apps.</p>\n<p><a href="https://github.com/theodoreb/pwa-workshop">The repository</a> of the workshop is public, so go and check it for further details in case you\'re interested into the interface implementations.</p>\n<p>It\'s interesting to note the example of <a href="https://github.com/theodoreb/pwa-workshop/blob/master/js/1-promise.js#L12">promise-based</a> <a href="https://www.drupal.org/node/756722#behaviors">behaviors system</a>. A modernized implementation of classic concept on managing JavaScript.</p>\n<p><a href="http://2016.drupalaton.hu/schedule#speaker-111"><strong>GraphQL</strong></a> by Sebastian Siemssen (<a href="https://www.drupal.org/u/fubhy">fubhy</a>)</p>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/hashtag/GraphQL?src=hash">#GraphQL</a> workshop w/ <a href="https://twitter.com/thefubhy">@thefubhy</a>  at <a href="https://twitter.com/hashtag/Drupalaton?src=hash">#Drupalaton</a> <a href="https://t.co/AgfQGzCq81">pic.twitter.com/AgfQGzCq81</a></p>&mdash; Kalin Chernev (@kalinchernev) <a href="https://twitter.com/kalinchernev/status/764072778773344256">August 12, 2016</a></blockquote>\n<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>\n<p>Needless to say, that was the "cherry" session. It was about the <a href="http://graphql.org/docs/getting-started/">Facebook\'s GraphQL</a>, which developers were ready to understand, after touching upon REST APIs, JavaScript Frameworks, knowing what is a server and a client in general in the previous sessions.</p>\n<p>I personally enjoyed the workshop. In fact, I was even able follow along with the live coding on the main screen. It was also nice that it made a clear association between specification and language implementation. This means that same concepts of data architecture were demonstrated and practices with <a href="https://github.com/graphql/express-graphql">JavaScript</a> and <a href="https://github.com/Youshido/GraphQL">PHP</a>.</p>\n<p>In the first part, the <a href="https://github.com/graphql/swapi-graphql">Star Wars API</a> was used with the <a href="http://graphql.org/swapi-graphql/">GraphiQL</a> — a hands-on tutorial to <a href="http://slides.com/sebastiansiemssen/graphql-meets-drupal-dd#/3/7">understand the basic concepts</a> like queries, fragments, variables, sub selections, etc.</p>\n<p>Second was the usage of node.js app with express, express-graphql, graphiql, graphql and other popular modules to transpile ES6 code. In this playground, the building part started. Various types were used: GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, etc. That was my first time to actually write something working out of the <a href="https://learngraphql.com/">learngraphql.com</a> online tutorials.</p>\n<p>There was a demo of Relay in-between, as a bonus, to grab a general understanding of the additional features provided on top of the fundamental specification.</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*tpPTqCyZnfPqhb1er6ECpw.jpeg"></p>\n<p>After the GraphQL implementation in JavaScript was getting convenient, then we continued using the same concepts, but to build a server in PHP and the <a href="https://www.drupal.org/project/graphql">Drupal GraphQL module</a>. Sure enough, the approach was similar, but this time extending SchemaProviderBase and implementing framework-specific EntityTypeManager (<a href="https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Entity%21EntityTypeManagerInterface.php/interface/EntityTypeManagerInterface/8.2.x">Interface</a>) to manage <a href="https://www.drupal.org/node/2192175">Content Entity</a> items.</p>\n<h3 id="conclusions"><a href="#conclusions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Conclusions</h3>\n<p>The event was awesome, the people were great, and the sessions were truly useful. I feel somehow privileged with the opportunity to attend such a good series of sessions related to API-s in the Drupal community!</p>\n<p>There are a lot of new technologies and tools to learn and play with. I hope the summary above is a good starter for anyone enthusiastic about the future of the tools mentioned.</p>\n<h3 id="community"><a href="#community" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Community</h3>\n<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">End of the first day at <a href="https://twitter.com/drupalaton">@drupalaton</a> we have a great dinner. <a href="https://t.co/CN795wXixz">pic.twitter.com/CN795wXixz</a></p>&mdash; 5NET Interactive (@5NEThu) <a href="https://twitter.com/5NEThu/status/763818240954998789">August 11, 2016</a></blockquote>\n<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>\n<p>Many thanks to the local Drupal community in Hungary! :)</p>'}},pathContext:{slug:"drupalaton-2016"}}}});
//# sourceMappingURL=path---drupalaton-2016-4009d0da824266058a56.js.map