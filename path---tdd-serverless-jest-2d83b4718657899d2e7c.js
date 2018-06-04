webpackJsonp([57645018698791],{609:function(n,s){n.exports={data:{markdownRemark:{frontmatter:{title:"TDD for AWS Lambda with Serverless framework and Jest",date:"2017-10-15T00:00:00.000Z",tags:["TDD","Serverless","JavaScript","nodejs","AWS"]},timeToRead:9,html:'<h2 id="introduction"><a href="#introduction" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Introduction</h2>\n<p>The <a href="https://serverless.com/">serverless framework</a> makes it easy to develop and deploy cloud functions. In this article I\'ll cover the <a href="https://serverless.com/framework/docs/providers/aws/">AWS</a> provider of the framework, although the principles should be very similar for the other providers, especially given the fact the serverless team works hard for a truly multi-provider framework.</p>\n<p>There is a good document with guidelines for <a href="https://serverless.com/framework/docs/providers/aws/guide/testing/">writing tests in serverless</a> already. Also, there is another <a href="https://serverless.com/blog/tdd-serverless/">blog post about the basics</a>. However, currently there\'s no much information on using <a href="https://facebook.github.io/jest/">Jest</a> which is trending in the community.</p>\n<p>By the end of this article, you will:</p>\n<ul>\n<li>have a working development environment with modern JavaScript (ES2005 and up)</li>\n<li>be able to use Jest effectively</li>\n<li>know how to test your library code - the helpers used by lambda functions</li>\n<li>be able to test lambda functions without killing yourself with abstractions</li>\n<li>learn how to use test doubles for AWS services</li>\n</ul>\n<h2 id="project-setup"><a href="#project-setup" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Project setup</h2>\n<p>Before going into the testing framework and the details about the testing itself, it\'s worth spending some time configuring your environment so that you work effectively.</p>\n<p>Here\'s a high-level overview of the file structure for the tutorial:</p>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">├── config.example.json --&gt; Copy and configure as config.json\n├── package.json\n├── README.md\n├── serverless.yml --&gt; Check if you want to tweak it\n├── src --&gt; You store your functions here, 1 file per each\n│   └── upload.js --&gt; the lambda function\n├── test\n│   └── upload.spec.js --&gt; the test for the lambda function\n├── webpack.config.js\n└── yarn.lock</code></pre>\n      </div>\n<p>The full code for the tutorial can be seen in <a href="https://github.com/kalinchernev/aws-node-signed-uploads">this repository</a>.</p>\n<h3 id="tools"><a href="#tools" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tools</h3>\n<p>Here\'s a list of the package used in this tutorial:</p>\n<ul>\n<li><code class="language-text">serverless</code> with <code class="language-text">webpack</code> and <code class="language-text">serverless-webpack</code></li>\n<li><code class="language-text">babel</code> with some add-ons, mainly <code class="language-text">babel-preset-env</code></li>\n<li><code class="language-text">eslint</code> with more add-ons, and <code class="language-text">prettier</code></li>\n<li><code class="language-text">aws-sdk</code> and <code class="language-text">aws-sdk-mock</code></li>\n<li><code class="language-text">jest</code></li>\n</ul>\n<h3 id="optimizations"><a href="#optimizations" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Optimizations</h3>\n<p>Although this topic is not directly related to writing tests, it\'s always good to consider any possible optimizations you can have in your stack.</p>\n<p><code class="language-text">babel-preset-env</code> with its <code class="language-text">babel-*</code> related packages. By using the <code class="language-text">env</code> <a href="http://babeljs.io/env">preset</a> you both gain in less configurations and less amount of code necessary after transpilations for a given target runtime platform. For example, delivering a bundle targeting <a href="http://docs.aws.amazon.com/lambda/latest/dg/programming-model.html">node 6.x</a> will be lighter than the one for earlier versions, because the runtime supports more features natively.</p>\n<p><code class="language-text">serverless-webpack</code> with its webpack settings can further optimize functions when they are <a href="https://github.com/serverless-heaven/serverless-webpack#optimization--individual-packaging-per-function">bundled individually</a>. Also, a configuration for external resources make the bundled upload lighter, excluding dependencies to <a href="http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html"><code class="language-text">aws-sdk</code> already available</a> on AWS premises.</p>\n<h3 id="configurations"><a href="#configurations" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Configurations</h3>\n<p>In the example project linked to this article you can have a look at the configurations necessary to have modern JavaScript running with serverless and Jest.</p>\n<h2 id="jest"><a href="#jest" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Jest</h2>\n<p>To learn about the test framework, read the official <a href="https://facebook.github.io/jest/">documentation site</a>.</p>\n<p>My high-level impressions:</p>\n<ul>\n<li>Working with promises is natural.</li>\n<li>There\'s the watch mode.</li>\n<li>There\'s also an integrated code coverage reporting.</li>\n<li>Snapshot testing for comparing and asserting differences in structures.</li>\n</ul>\n<p>In general, Jest is a full-fledged framework with all necessary features for testing. It\'s easy to learn and it has good documentation.</p>\n<h2 id="unit-testing"><a href="#unit-testing" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Unit testing</h2>\n<p>Organizing code in <a href="https://claudiajs.com/tutorials/designing-testable-lambdas.html">testable chunks</a> is the the most challenging and important step before anything else.</p>\n<p>In the context of lambda functions and the serverless framework, unit testing is useful for covering mainly 2 types of code: library (helper) functions and the lambda functions in a given service. If you\'re using the serverless framework only with <code class="language-text">serverless.yml</code> file in order to make your Cloud Formation templates more manageable, you don\'t need unit testing. It\'s only uesful when there is logic in the service.</p>\n<h2 id="testing-a-library-used-by-a-lambda-function"><a href="#testing-a-library-used-by-a-lambda-function" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Testing a library used by a lambda function</h2>\n<p>Let\'s imagine that our lambda function signature and beginning is the following:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">handler</span> <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token punctuation">,</span> context<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> bucket <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BUCKET</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> region <span class="token operator">=</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">REGION</span><span class="token punctuation">;</span>\n\n  <span class="token operator">...</span>\n\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Because we will most probably need to make checks about the input arguments of environment variables several times, we can make a <a href="https://github.com/kalinchernev/aws-node-signed-uploads/blob/master/src/lib/envVarsChecker.js">simple helper</a> which takes an object of the <code class="language-text">process.env</code> and returns a list of required keys for the function to work.</p>\n<p>This scenario is easy, we can assert for various of useful edge cases like:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> checker <span class="token keyword">from</span> <span class="token string">\'../../src/lib/envVarsChecker\'</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Utility library envVarsChecker`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">test</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`The helper exists`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>checker<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeTruthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">test</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Asks for both BUCKET and REGION environment variables`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">checker</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'BUCKET\'</span><span class="token punctuation">,</span> <span class="token string">\'REGION\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">test</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Asks for a missing BUCKET environment variables`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token punctuation">{</span>\n      <span class="token constant">REGION</span><span class="token punctuation">:</span> <span class="token string">\'foo\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">checker</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'BUCKET\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">test</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Asks for a missing REGION environment variables`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token punctuation">{</span>\n      <span class="token constant">BUCKET</span><span class="token punctuation">:</span> <span class="token string">\'foo\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">checker</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'REGION\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>When functions are simple, but yet reusable for several lambda functions, we can test these helpers in a conventional way.</p>\n<h2 id="testing-a-lambda-function"><a href="#testing-a-lambda-function" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Testing a lambda function</h2>\n<p>The lambda functions can be considered as a more complex piece of code to test.</p>\n<p>Initially, I started by spawning processes and running the serverless CLI and asserting for results. This didn\'t work efficiently because every unresolved promise in the serverless framework abstraction is impossible to handle in a convenient way in the test suite.</p>\n<p>Since the original process of the lambda function was not easy to get done with, I also tried the <code class="language-text">serverless-jest-plugin</code> which was mentioned in the beginners article about TDD in serverless. As I already knew it\'s ineffective to test against cli processes, I used the plugin programmatically to wrap the original lambda functions invocation. This also didn\'t work well enough.</p>\n<p>In the end of a long day I finally decided to treat lambda functions as normal functions and just wrap them in promises in order to make them more convenient for the Jest runner.</p>\n<p>Like this:</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> promisify <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"util"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> lambda <span class="token keyword">from</span> <span class="token string">"../src/upload"</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token function">promisify</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Service aws-node-singned-uploads`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">test</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Require environment variables`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">handler</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    result\n      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token function">expect</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeFalsy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>e <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token function">expect</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span>\n          <span class="token template-string"><span class="token string">`Missing required environment variables: BUCKET, REGION`</span></span>\n        <span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>This approach does the job ok and keeps things relatively simple. It handles the lambda handler as a normal exported function which takes the arguments as described in the official signature of the function, and wraps it all in a promise, for Jest.</p>\n<p>The <a href="https://facebook.github.io/jest/docs/en/asynchronous.html#resolves-rejects">syntax of promise assertions</a> can be prettier, by the way.</p>\n<h2 id="mocking-aws-services"><a href="#mocking-aws-services" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Mocking AWS services</h2>\n<p>Testing lambda functions with the assumption that they are just functions can take you long way if the logic inside these functions is relatively simple. However, the real reason for lambda functions to be, is that they are the glue between AWS services.</p>\n<p>So, sooner or later you will have to find a way to mock AWS services in your tests :)</p>\n<p>For us, the <code class="language-text">aws-sdk-mock</code> package works well so far. It supports mocking constructors and nested methods, it can restore originals. <a href="https://www.npmjs.com/package/aws-sdk-mock">Documentation</a> and support seem mature.</p>\n<p>Together with mocking AWS services, we also take <a href="http://docs.aws.amazon.com/lambda/latest/dg/eventsources.html">examples for events from the official AWS documentation</a>. These can serve as a fast-track to creating stubs for the <code class="language-text">event</code> argument of a lambda function.</p>\n<div class="gatsby-highlight" data-language="javascript">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token constant">AWS</span> <span class="token keyword">from</span> <span class="token string">"aws-sdk-mock"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> promisify <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"util"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> lambda <span class="token keyword">from</span> <span class="token string">"../src/upload"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> eventStub <span class="token keyword">from</span> <span class="token string">"./stubs/eventHttpApiGateway.json"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> handler <span class="token operator">=</span> <span class="token function">promisify</span><span class="token punctuation">(</span>lambda<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">describe</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Service aws-node-singned-uploads: S3 mock for successful operations`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">beforeAll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token constant">AWS</span><span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token string">"S3"</span><span class="token punctuation">,</span> <span class="token string">"getSignedUrl"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>method<span class="token punctuation">,</span> _<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        data<span class="token punctuation">:</span> <span class="token string">"https://example.com"</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">delete</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BUCKET</span><span class="token punctuation">;</span>\n    <span class="token keyword">delete</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">REGION</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">afterAll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token constant">AWS</span><span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span><span class="token string">"S3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token function">test</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Replies back with a JSON for a signed upload on success`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BUCKET</span> <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>\n    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">REGION</span> <span class="token operator">=</span> <span class="token string">"bar"</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> event <span class="token operator">=</span> eventStub<span class="token punctuation">;</span>\n    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">handler</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">expect</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span>resolves<span class="token punctuation">.</span><span class="token function">toMatchSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>As you can see, the <code class="language-text">beforeAll</code> life cycle setups the AWS S3 mock for the <code class="language-text">getSignedUrl</code> method. <code class="language-text">afterEach</code> environment variables are reset and <code class="language-text">afterAll</code> the original S3 service is restored so that it operates to the AWS API after the test suite has finished.</p>\n<h2 id="snapshot-testing"><a href="#snapshot-testing" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Snapshot testing</h2>\n<p>Maybe you\'ve noticed this line already <code class="language-text">expect(result).resolves.toMatchSnapshot();</code>.\nThis is how you use the Jest snapshot feature:</p>\n<div>\n          <div\n            class="gatsby-resp-iframe-wrapper"\n            style="padding-bottom: 56.25%; position: relative; height: 0; overflow: hidden;"\n          >\n            <iframe title="Video about Jest testing framework" src="https://www.youtube.com/embed/HAuXJVI_bUs?rel=0" frameborder="0" allowfullscreen style="\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n          "></iframe>\n          </div>\n          </div>\n<p>This feature helps you test structures in a simple way.</p>\n<h3 id="further-resources"><a href="#further-resources" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Further resources</h3>\n<p>This tutorial covers mostly techniques with Jest on making unit tests. As you can see, to an extend we can say that testing lambda functions can be seen as a <a href="https://read.acloud.guru/testing-and-the-serverless-approach-495cef7495ea">simple</a> process.</p>\n<p>However, mocking AWS services can get tricky and there are vocal opinions <a href="http://theburningmonk.com/2017/02/yubls-road-to-serverless-architecture-part-2/">against</a> this practice for a reason.</p>\n<p>More specifically, take the <a href="https://github.com/kalinchernev/aws-node-signed-uploads">aws-node-signed-uploads</a> package as an example. The unit tests and the mocks are showing 100% test coverage for the code which gets executed by Jest and this is really encouraging.</p>\n<p>Do the following for me as an exercise after this tutorial:</p>\n<ul>\n<li>Clone the repository.</li>\n<li>Install the dependencies.</li>\n<li>Reconfigure the serverless settings.</li>\n<li>Make a deployment to your AWS account.</li>\n<li>Run <code class="language-text">yarn start</code>.</li>\n</ul>\n<p>You will see a server running and waiting for your requests. You can make an example request with <a href="https://www.getpostman.com/">Postman</a> which will show you the same issues as tested in the unit tests :)\nAnd if you manage to get your header key correctly, you\'ll be even able to upload a large file to an S3 bucket.</p>\n<p>Now make the same test on the deployed service. You will get an error message for access denied because there is a specific configuration on the upload endpoint:</p>\n<div class="gatsby-highlight" data-language="yml">\n      <pre class="language-yml"><code class="language-yml">functions:\n  upsert-objects:\n    handler: src/upload.handler\n    name: ${self:provider.stage}-${self:service}-upload\n    memorySize: 128\n    events:\n      - http:\n          path: upload\n          method: put\n          private: true\n          cors: true</code></pre>\n      </div>\n<p>Which is <code class="language-text">private: true</code>. When deployed on real AWS premises, the endpoint will require an API key in the header, which neither <code class="language-text">serverless</code> nor <code class="language-text">serverless-offline</code>, nor tests will warn you about.</p>\n<p>Mocking AWS services however, will give you the basic safely net that your lambda functions are handling positive and negative scenarios and invoke the correct callbacks in the correct scenarios.</p>\n<p>Also, using Jest for testing the independent logic and making snapshot make an excellent addition to secure the very vital behaviors of your cloud functions even when working independently from the AWS service.</p>'
}},pathContext:{slug:"tdd-serverless-jest"}}}});
//# sourceMappingURL=path---tdd-serverless-jest-2d83b4718657899d2e7c.js.map