webpackJsonp([0x906195e4f328],{564:function(n,s){n.exports={data:{markdownRemark:{frontmatter:{title:"Reflecting on node.js design patterns",date:"2017-02-03T22:00:00.000Z",tags:["JavaScript","nodejs","Design Patterns"]},timeToRead:7,html:'<p>Once upon on a time, there was a designer …</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*o-Igk7ZgpSz2Zu4syTG3-A.jpeg" alt="funny JavaScript image"></p>\n<p>No matter if the story is true or not, working with JavaScript on the server with Node.js at the moment is a very different experience compared to working with Python, Ruby or PHP. I’d personally say that the advantage of working with a single language everywhere comes with the price of having to learn different design patterns in order to use the language effectively.</p>\n<p>One of these fundamental concepts to learn is the asynchronous programming. There are many articles in the Node.js/JavaScript community about asynchronous programming in terms of what callbacks are and how to <a href="https://www.npmjs.com/package/async">solve problems of control flow with a library</a>, a <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise">promise</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">async/await</a>, etc. These are useful when the question is generally:</p>\n<blockquote>\n<p>How to use node modules in a good way?</p>\n</blockquote>\n<p>And although it’s important to learn and follow best practices in implementation, I sometimes miss articles which answer another question:</p>\n<blockquote>\n<p>How to organize my code in node modules in a good way?</p>\n</blockquote>\n<p>In this story I’ll be reflecting on few patterns which answer the latter.</p>\n<h3 id="continuation-passing-style-pattern"><a href="#continuation-passing-style-pattern" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Continuation-passing style pattern</h3>\n<p>This is an easy concept to understand, but really fundamental for working with asynchronous code</p>\n<p><strong>Synopsis</strong>: In your continuation-passing style function (CPS):</p>\n<ul>\n<li>Use <code class="language-text">cb(null, data)</code> instead of <code class="language-text">return</code> to pass on result.</li>\n<li>Use <code class="language-text">return cb(err)</code> to pass on an error and exit the function.</li>\n<li>Communicate one single outcome from the function.</li>\n</ul>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Synchronous</span>\n<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Asynchronous</span>\n<span class="token keyword">function</span> <span class="token function">addAsync</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">cb</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">addAsync</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>That’s it! Honestly, the first time I saw this type of snippet, I already felt an eye-opening moment. If you know this already, give yourself a tap on the shoulder! Good job!</p>\n<p>For aesthetics, you can re-factor the last function as:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token function">addAsync</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> result <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Of even:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token function">addAsync</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> console<span class="token punctuation">.</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>The important take-away here is that functions can be passed as arguments to other functions. These are <strong>functions acting like a return statement</strong>.</p>\n<p>Node.js, conventions say that when you’re writing such CPS you must <a href="https://nodejs.org/api/errors.html#errors_error_propagation_and_interception">send the error to the first argument</a> of the callback function.</p>\n<p>Let’s do something a bit more practical — define a function which takes a list of files. If there are files, just return them, but if no files are supplied, return an error message.</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">readFiles</span> <span class="token punctuation">(</span>files<span class="token punctuation">,</span> cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>files<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">cb</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> files<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token function">cb</span><span class="token punctuation">(</span><span class="token string">\'no files supplied\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>This function will then be consumed in this way:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token function">readFiles</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>I highly encourage you to test this if you’re not sure how it works. If you are lazy to open a terminal session, just fire a <a href="https://runkit.com/home">RunKit</a> and copy-paste these in the browser ;)</p>\n<p>Notice the <code class="language-text">return</code> is used in the case of an error to exit the function. This pattern is very popular and comes handy for almost any case where the consumer of your module needs to do one single thing and get a result.</p>\n<h3 id="observer-pattern-with-eventemitter"><a href="#observer-pattern-with-eventemitter" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Observer pattern with EventEmitter</h3>\n<p>Node.js developers use the <a href="https://nodejs.org/api/events.html#events_emitter_on_eventname_listener">EventEmitter</a> interface from day one as it’s “under the hood” of almost all node core modules. Especially when we speak about functions which take time to finish.</p>\n<p><strong>Synopsis</strong>: Using the event emitter:</p>\n<ul>\n<li>You create observable objects with <em>multiple listeners,</em> where each listener is a callable function, i.e each <em>listener is a possible outcome.</em></li>\n<li>Use <code class="language-text">emitter.emit(eventName[, …args])</code> instead of <code class="language-text">cb(null, data)</code>to pass on a result on listener function.</li>\n<li>Use <code class="language-text">emit(&#39;error&#39;, err)</code> to pass on an error and exit.</li>\n<li>Communicate multiple possible outcomes from your function.</li>\n</ul>\n<p>The EventEmitter provides a popular <code class="language-text">on()</code> method which “hooks” functions on an object. Then, it invokes them synchronously one by one when a given event happens. This approach provides more granularity and control than CPS which gives one outcome per function.</p>\n<p>Let’s expand our previous function <code class="language-text">readFiles()</code> to <code class="language-text">filterFiles()</code> in order to provide a way to message all subscriber consumers on the event of finding a file during a search.</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Give a list of files all of them which match an extension</span>\n<span class="token keyword">function</span> <span class="token function">findFiles</span> <span class="token punctuation">(</span>files<span class="token punctuation">,</span> extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> emitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>files<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// yield an error</span>\n    emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> <span class="token string">\'no files supplied\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Check for matches</span>\n  <span class="token keyword">function</span> <span class="token function">checkFiles</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    files<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>file <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">===</span> extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// yield a result</span>\n        emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">\'match\'</span><span class="token punctuation">,</span> file<span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Ask the event loop to loop through our loop ...</span>\n  process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span>checkFiles<span class="token punctuation">)</span>\n\n  <span class="token comment">// For chainability on on()</span>\n  <span class="token keyword">return</span> emitter\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Then, in order to use this function, we’ll have an implementation like:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token function">findFiles</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">\'.js\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'match\'</span><span class="token punctuation">,</span> file <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>file <span class="token operator">+</span> <span class="token string">\' is a match\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> err <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Error emitted: \'</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>We can also use some sugar to make the same functionality sweeter:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token string">\'use strict\'</span>\n\n<span class="token comment">// Dependencies</span>\n<span class="token keyword">const</span> EventEmitter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'events\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>EventEmitter\n<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span>\n\n<span class="token comment">// Definition</span>\n<span class="token keyword">class</span> <span class="token class-name">FindFiles</span> <span class="token keyword">extends</span> <span class="token class-name">EventEmitter</span> <span class="token punctuation">{</span>\n\n  <span class="token function">constructor</span> <span class="token punctuation">(</span>extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>extension <span class="token operator">=</span> extension\n    <span class="token keyword">this</span><span class="token punctuation">.</span>files <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">addFile</span> <span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>files<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Check for matches</span>\n  <span class="token function">findFiles</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>files<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>file <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">\'match\'</span><span class="token punctuation">,</span> file<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Instantiation of observable object</span>\n<span class="token keyword">const</span> FindFilesSearcher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FindFiles</span><span class="token punctuation">(</span><span class="token string">\'.js\'</span><span class="token punctuation">)</span>\n\n<span class="token comment">// Implementation</span>\nFindFilesSearcher\n  <span class="token punctuation">.</span><span class="token function">addFile</span><span class="token punctuation">(</span><span class="token string">\'file1.js\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">addFile</span><span class="token punctuation">(</span><span class="token string">\'file2.md\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">addFile</span><span class="token punctuation">(</span><span class="token string">\'file3.js\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">findFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'match\'</span><span class="token punctuation">,</span> console<span class="token punctuation">.</span>log<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> err <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>If you’ve visited the chapter about the observer patterns in the <a href="https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented-ebook/dp/B000SEIBB8">famous design patterns book</a> you must already see a big difference in the way how you can implement the pattern. I like “the node-way” better — it’s simpler and you can express same ideas with less code. And honestly, if I were to teach this pattern to web developers, I am sure that I’d have a better chance of success relating on familiarity of jQuery’s popular <code class="language-text">.on()</code> method, without too much talking about abstractions and interfaces.</p>\n<h3 id="combining-cps-and-observer-patterns"><a href="#combining-cps-and-observer-patterns" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Combining CPS and Observer patterns</h3>\n<p>Our new function <code class="language-text">findFiles()</code> is definitely more flexible than <code class="language-text">readFiles()</code>.</p>\n<p><code class="language-text">findFiles()</code> provides a way for the user to listen to events during the processing of each file, which could give useful control of the processing.</p>\n<p>But what if we want to make it even more flexible, like letting the user choose whether he wants this control or not? What if the user is not actually interested in each file, but wants to get only the final result?</p>\n<p>Well, let’s make our event emitter function CPS-friendly!</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token string">\'use strict\'</span>\n\n<span class="token comment">// Dependencies</span>\n<span class="token keyword">const</span> EventEmitter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'events\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>EventEmitter\n<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span>\n\n<span class="token comment">// Definition</span>\n<span class="token keyword">function</span> <span class="token function">findFiles</span> <span class="token punctuation">(</span>files<span class="token punctuation">,</span> extension<span class="token punctuation">,</span> cb <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> emitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token keyword">const</span> errorMessage <span class="token operator">=</span> <span class="token string">\'no files supplied\'</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>files<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">cb</span><span class="token punctuation">(</span>errorMessage<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> errorMessage<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// cps</span>\n    <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span>files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">===</span> extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">cb</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token comment">// event emitter style</span>\n    process<span class="token punctuation">.</span><span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      files<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>file <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">extname</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span> <span class="token operator">===</span> extension<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">\'match\'</span><span class="token punctuation">,</span> file<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">return</span> emitter\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Implementation with a callback</span>\n<span class="token function">findFiles</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">\'.js\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> result<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`All in one: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>result<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">// Implementation with an event emitter</span>\n<span class="token function">findFiles</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">\'.js\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'match\'</span><span class="token punctuation">,</span> file <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>file <span class="token operator">+</span> <span class="token string">\' is a match\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'error\'</span><span class="token punctuation">,</span> err <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Error emitted: \'</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>This is only a demo implementation which you should not copy-paste into your code without including better checks on the various edge cases of the input, etc. However, the example gives a basic idea on how to make the callback argument optional and use it depending on the scenario.</p>\n<h3 id="conclusions"><a href="#conclusions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Conclusions</h3>\n<p>I hope that in the end of this article you have some useful high-level ideas about few options you have when designing your node modules. It’s good to start with the end in mind, imagining how you want your modules to be used. This will help you balance your decisions better between the level of flexibility and easiness of use that you want to provide to your users.</p>\n<p>And remember — in most cases your choice of a programming language to use is less important than the way you use the programming language.</p>'
}},pathContext:{slug:"reflecting-nodejs-design-patterns"}}}});
//# sourceMappingURL=path---reflecting-nodejs-design-patterns-e9093ec7163f67c067be.js.map