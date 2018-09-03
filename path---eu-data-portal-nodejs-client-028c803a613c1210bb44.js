webpackJsonp([57738659755549],{541:function(a,n){a.exports={data:{markdownRemark:{frontmatter:{title:"Building a node.js client for the EU Open Data Portal",date:"2016-10-02T10:10:11.000Z",tags:["JavaScript","nodejs","open data"]},timeToRead:1,html:'<p>Planning to make an open data GraphQL server, it was natural to first build a small abstraction wrapper which can be re-used in other projects. Basically, the <a href="https://www.npmjs.com/package/odp">odp library</a> I\'m going to talk about is just a simplified client for fetching data from the EU Open Data Portal.</p>\n<h3 id="getting-the-library"><a href="#getting-the-library" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Getting the library</h3>\n<p>When you have <a href="https://nodejs.org/en/">node.js</a>, the module can be installed by npm:</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash">$ <span class="token function">npm</span> <span class="token function">install</span> odp</code></pre>\n      </div>\n<h3 id="library-api"><a href="#library-api" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Library API</h3>\n<p>The API of the module is pretty simple:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Get a range of the whole list of datasets:</span>\nodp<span class="token punctuation">.</span><span class="token function">getDatasets</span><span class="token punctuation">(</span><span class="token punctuation">{</span>query<span class="token punctuation">:</span> <span class="token punctuation">{</span>limit<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> offset<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Currently, there are 4 methods which match the brief information from the <a href="https://data.europa.eu/euodp/en/developerscorner">developers\' corner</a>. Methods are: <code class="language-text">getDatasets()</code>, <code class="language-text">getTags()</code>, <code class="language-text">getDataset()</code> and <code class="language-text">datasetSearch()</code>. It could be that there are more options than that in the API, but these are all I know so far as user of the website.</p>\n<p>An <a href="https://github.com/kalinchernev/odp/blob/master/README.md#examples">Examples section</a> is included in the README file for further details.</p>\n<h3 id="resources"><a href="#resources" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Resources</h3>\n<p>Suggestions and pull requests are welcome at the <a href="https://github.com/kalinchernev/odp">github page of the project</a>.</p>\n<p>For inspirations of use, more information about the data or introduction training of the benefits of using open data, visit the <a href="https://www.europeandataportal.eu/">europeandataportal.eu</a>.</p>'}},pathContext:{slug:"eu-data-portal-nodejs-client"}}}});
//# sourceMappingURL=path---eu-data-portal-nodejs-client-028c803a613c1210bb44.js.map