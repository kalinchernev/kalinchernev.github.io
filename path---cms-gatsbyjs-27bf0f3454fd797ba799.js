webpackJsonp([0x8f1377e8a259],{435:function(e,t){e.exports={data:{markdownRemark:{frontmatter:{title:"Having a CMS for GatsbyJS - easier than ever!",date:"2018-01-19T00:00:00.000Z",tags:["JAM stack","JavaScript","GatsbyJS"]},timeToRead:5,html:'<h2 id="introduction"><a href="#introduction" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Introduction</h2>\n<p>As I have previously mentioned, <a href="/admin-ui-gatsby-static-site-generator">NetlifyCMS is one of the most flexible "CMS" applications</a> on the market at the moment. In the past you had to tweak both GatsbyJS and Netlify service configurations, so that the output of first was useful for the second. I shared about these details in a <a href="https://www.gatsbyjs.org/blog/2017-11-06-migrate-hugo-gatsby/#admin-panel">story about migrating from Hugo to GatsbyJS</a>. Few weeks after these shared stories, Netlify released <a href="https://www.netlify.com/blog/2017/12/07/open-source-netlify-cms-hits-1.0-bringing-git-based-content-management-to-static-sites-everywhere/">NetlifyCMS 1.0</a>. I think this release is a big milestone for the project because it involved a lot of work on <a href="https://github.com/netlify/netlify-cms/issues?q=is%3Aissue+is%3Aopen+sort%3Acomments-desc+label%3A%22area%3A+design%22">design perspective</a> but also on authentication and integration parts which make the product easier to adopt.</p>\n<p>A bit more than a month after this release, I have the feeling not many know about the improvements available. I blame the holiday season of December :)  And so in this blog post I\'ll share my personal impressions. I believe NetlifyCMS is still one of the best tools to have together with a static site generator, and it\'s also well-integrated with another great service - Netlify.</p>\n<h3 id="starting-a-project"><a href="#starting-a-project" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Starting a project</h3>\n<p>When I published my thoughts on using NetlifyCMS and GatsbyJS together to make a modern web site with an admin panel, I started to get questions on twitter how I made a given project and how I organised a repository. My reply was always pointing to <a href="https://github.com/kalinchernev/kalinchernev.github.io">the repository storing the github pages for my username</a>. A friendly way to say RTFM - the blog posts were the documentation I thought - just fork the repo and tweak it!</p>\n<p>Some people succeeded taking an example, others didn\'t. The ones who didn\'t, didn\'t because making websites can be the job of a site builders and not developers. Being a site builder with experience and good expectation management with the client is good. So, starting a project should be easy. A successful WCMS product sometimes means starting with a visually appealing base, and being able to involve developers, where and when necessary on a later stage. WordPress with wordpress.com is an example of that. Start small, build a prototype, demo it, get trust for more work on a project, succeed, that\'s what I mean :)</p>\n<p>And there\'s the first good news - starting with GatsbyJS and adding an administration panel hasn\'t been easier!</p>\n<ol>\n<li>Go and <a href="https://www.netlifycms.org/docs/start-with-a-template/">select the right starter</a>:</li>\n</ol>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-9b205.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 49.4933749025721%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAAB/klEQVQoz12Sy27aUBCG/RiFLKqgKIQsKkWqqnSTqps+Qx+hL9KX6aqqCpgQpVI3lbpDKTfb+H47xtjGNjRAyt85B+gli0+e8X/mnzljS1evrnB5+RLPLhp4enyESqWK6hE9q1XBk0oFx7UaTut11M84ZyJunJ8TDdROTvH8zTu8fvsetcYLSHLnBju6aLZkweemjLbcxV/tBt3uraAtX6PV5nQEzdY12p0vgia9l+5XW5TLNYpyjfUGWK2BzQPApikMy8PEcOAHMRTNgqbbWK1+YUPn1oIt8uUc+SLD/eqBareQZkmBgEVQ9BFs30AYMcRJBsv2MRxPMFI1aIaKsTYiNJgeg0maaXsC3bTheD5mSY54NoeUZiWSNIfj2zAdHX7ok+EMXjClCV0wNkMUxdQohu+F8Hp9eH6EgHSOiMMYO59iZzglZ8dlJCQkLPaUgokb4G5iwqWi+XKD4scQybfvGJD5QLfA4gzzfCnM+Hkpmy/AogQjRac9GaJjkhXISOTaV8PCh7shek6IsvgpikMW49NYxce+AjtKkT82DMmQLzyg6x2EkGLbCeBSA8cNaU8MFuU2TWxR7lLO4Wd4/X9X5hMqmimK0v1kfPE9mqw/VDEYa6KhRlfkX12lFfD8ENvU4I9h9o9hRL/KQeDwL8fhMW+S7ffK4/RRfLjZb172sZZoGnRfAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="Select the GatsbyJS starter"\n        title=""\n        src="/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-dc858.png"\n        srcset="/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-7483c.png 180w,\n/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-5bc93.png 360w,\n/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-dc858.png 720w,\n/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-ca142.png 1080w,\n/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-f0a69.png 1440w,\n/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-1a9ac.png 2160w,\n/static/netlifycms-gatsbyjs-starter-eb16966fb80a713b698da64c620b034a-9b205.png 2566w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<ol start="2">\n<li>Give your project a name</li>\n</ol>\n<p><img src="/gatsbyjs-starter-progress-f5d9f6cb0aba54886c68678d9a3d81db.gif" alt="Naming your project"></p>\n<ol start="3">\n<li>Accept invitation</li>\n</ol>\n<p>When you start the creation of a new project, the new identity service of Netlify will create your user 1, and will send you an invite for it, just accept it :)</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-c1901.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 35.76732673267327%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAABYlAAAWJQFJUiTwAAABAElEQVQoz6VRUW6FIBD0/pfqCXoGa+0TFC3gU1EQprvwakz6WZLJLMrMsEu1LAtGpaC1xjiOGdM0oe/7AllYCAHJkBIhBOz7TudGOPWOXb4hBocEoDqOIwuapkHXdZfptm1Z6L3/gxhjRghUnweZbUi0TymhKkkTrLXg27IRg2sW8eKDd8SXuACIGeV75ZzDPM9Y1xXP53KZKhpDoNuQHYmKAdKtvgXhFlTxDykFHl8tPuoabduiJuYgTvYhwp+J+AWqQzhz6/eR/HZTsXOvND4fA0Svcvs8Q20sBu0hvj0ksSTupiPvtV1hjM5j4sc0xoDf4jLUS8RgTziPfy32+gHTrh91HD1fGQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="Accept Netlify invite"\n        title=""\n        src="/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-dc858.png"\n        srcset="/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-7483c.png 180w,\n/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-5bc93.png 360w,\n/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-dc858.png 720w,\n/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-ca142.png 1080w,\n/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-f0a69.png 1440w,\n/static/accept-netlify-invite-bd87e499fde82ad4298b6f4dc77b5d7b-c1901.png 1616w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<ol start="4">\n<li>Set credentials</li>\n</ol>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-a6fb4.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 58.0952380952381%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAABZklEQVQoz41Ty0oDQRDcn9TEJPt+Jdm8NCr+ihcJKBgUiRhE/AUlEb2JQtCDejXnQNndu7NOYI05FD3T01PdXdNj2PUWBH4EK4hhRQmhCYd9cSL2L6hzjjfDhqwNdVB2Q2zaPkpOkBOuItKh+w2HnZyFMlhBHTUCZ1PBvK5p0KsvIjbUgq0iM7kFAl+Ou300t/dyBK1eIZmCoWdzMnKXfUQW0uXZ2zu+53N8fH5hsVhgfHMrsnjNTqGevxUSQc2LUPVCsWXSkwmnj0+4nzzgbjLF88srRuNrbJhuKkUmkS5DTmiRrXhxGkTBFSKNOjs4v7zC4OQUx8MzDC9GODwaYMuN5LKVybJWywzex0Ta3j1A0t8X6yfdlSO0/Ch+LO3moNms0DiV7ICqCqXq/OE0FLZsZy1X/VSXaqaPDjXAKwmdejqH0rYcFPyORpvQWevXLFVocssEk76grLlSsvxgbtKT4f+vwh9QbR1SPpe2dAAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="NetlifyCMS accepting the invite and setting personal credentials"\n        title=""\n        src="/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-dc858.png"\n        srcset="/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-7483c.png 180w,\n/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-5bc93.png 360w,\n/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-dc858.png 720w,\n/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-ca142.png 1080w,\n/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-f0a69.png 1440w,\n/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-1a9ac.png 2160w,\n/static/netlifycms-set-credentials-ad28900e6e18dedf56f042283daac745-a6fb4.png 3360w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>If you want to invite others to contribute to your new website, or you want to change your email, you can use Netlify Identity console to manage users.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-44d4b.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 60.921366163621926%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAABt0lEQVQoz62RyU4bQRCGWyB2FHaDDXgBGQ9CAsS+Kg/AibfINZe8RKRIGIgUIMqrcEC8ARwwCHFCPmAPnh7PdPfM/KnusAVG4pCU+lNVa7r/+ruGJWZXkZqaQ9KawWBhGhMLaygsrlNeh7W8icz0ArqzBfSOWfiQzr+hK5NHWzKL/PwKrKUNsJZkDo39I2gcGEVD3zCaE2k0JUbROpRBeyqHzpFxsJ4kWFfC1N3ZCRJ5TR49uQJhgX36/AXFH4f4treD3YOfVB/9gWq93zv6hX3ia/G7cds8mDbCHcNjf6Gba9jxySlMhDbei49b2+b5qclZDNF44mDlSgVl7uC2xnFTucOtbYNzDofg3DVZSAkhBErXNzi7KOG8dEVcPnPxnJlUCveOg5rLIcMAYZy1KKIVQQYhxDswXvdQczhq5MT3BZQKoJvEUafvrufD9V9Ae+55JjukxVyvjrtqBVX7ngT9B0PRG+Jcm9GHIbjrkhEFX0iwarkOu+xCKGEcPl5+KaSzbqZnqS9qkbjGHs2Z+Z6E9BVUoMzhOHeaIAie0ILRK0EdnnYYhCH+VxhBPWhdaLv/hjQ/5jeN8gljIqkjRQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="Netlify identity management console"\n        title=""\n        src="/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-dc858.png"\n        srcset="/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-7483c.png 180w,\n/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-5bc93.png 360w,\n/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-dc858.png 720w,\n/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-ca142.png 1080w,\n/static/netlify-identity-management-efd21bc58c13ff4e743a26d09c895f08-44d4b.png 1259w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<ol start="5">\n<li>Enjoy your CMS :)</li>\n</ol>\n<p>You will be automatically redirected the administration pages of your new site! Enjoy! :)</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-87efd.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 35.587431693989075%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAABBElEQVQoz3VQy2rEMAzM//9VL70thZ5KaWmhp2waO34ofiZTydlswkIFw1gPDyN1xmdQKPA0I8aMUipSLkipHJyOPOe9nhEZpS74/PrBy+sbnCN0WmsMw4AsAzFBT6Z9WpYFldG4Vki8f3zj6fmC/qp5zmPUDqNysC6AKLVa148OPRcNZViKCCE2l4VFhEU8l+3t/YxfZaEmwmSoCQhUE7aNu6sOcLEisAkfMg9abiqGxjyHtpqcw3tiFzPnqbHMSX87VYKxtAlOk4PAGN8gTvY113Vl5rWZ5S114X1mvdUFd0GlxfJmW+xL8xwi+Bhy28e4C57vIOy8rHHA8d3O+X+1XeMP35MewF8Y1roAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="NetlifyCMS administration pages"\n        title=""\n        src="/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-dc858.png"\n        srcset="/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-7483c.png 180w,\n/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-5bc93.png 360w,\n/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-dc858.png 720w,\n/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-ca142.png 1080w,\n/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-f0a69.png 1440w,\n/static/netlifycms-admin-pages-1cca45673ad8ab2d04c10184429cbc4f-87efd.png 1464w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h3 id="the-administration-panel"><a href="#the-administration-panel" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>The administration panel</h3>\n<p>One would expect that going to the <a href="https://www.netlifycms.org/docs/">official docs</a>, there would be a short overview or a tutorial about the features of the product. However, this is not the case, most probably because it\'s so simple :)</p>\n<h4 id="content-management"><a href="#content-management" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Content management</h4>\n<p><img src="/netlifycms-create-blog-post-403d59530315f51be9197c2db7d2d819.gif" alt="Create a post"></p>\n<p>Clicking on "Publish" will put the content in the main branch of the repository and will trigger the build.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-1ca91.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 74.818401937046%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAACuUlEQVQ4y22TWU9TURSFb4wKzgOIWEHmUSORqFHkyfjiT/DdmPjmg79AlEQREDX+IBOHxBAJiYlSiC0thQ63d+idp+U6h4IVucmXA+fss8/aa+8qbdcmkLo8jtTIGM4PXcXA9QkM3ZzE4I07GObaP34bJy8N4EzPME51DeJEZ7/8v5HjHX1o7R/FrXv3oTSlenDwXAcOtXVKmtu70XyhG0cv9uIIz8SeSHKgJSX3T3cPycT7cbZ3BMqjJ0/xcuE9ns++wQsy9XoeUzPzePZqDtNzC5ieJfNvMfPuA8Ym7+Jw/QGhai/HKEL5+PkLkiSG47qwHUeuURQhjmOIL5vNYml5GWq1igcPH6OpvQttA1fQ0jf6H61EKZbLqNVqMEwTJhGry6QioUicXc/h58oK8hsF/PiVxqdvi/i6uES+74vihyFcP4Dj+bBdT65eEMg9QRjFCJlcxIVxAqE7SvaAvyiaWYNumPJCnCSwHBdpqlrLbWAlS3W/MyhUVGi2IzF4/g8UYdhcLVuiqIaBYrHIpIYs0/M8qJubUAsFVLmaJVpSqUhs+ujpBtw68m9Ng1uz4AahrE6xbBtlBmuaLkv16Wctk4HBR2wmAxsFxggSnsWNWBZ4EVBV2UDhuWJTtslDhxcDlu2xKVU2QJQnPBGebfHBDT5Q0XVUaY9KZVXGqaKBvBdzX8QFFKSIUTFYrk0FcpPytew6ikziij0+UuYkOEIhLWmE84ZYjBljIyTwRUKXdQtl4mPDENJkfW0NpdVVuPQwYTmldBp6JotaLgeTDdte12EQN59HTG+jRoWCnUEO6YPofJGJLL4expEsOb+1BV34W48XCP+F71F9ZqVCMXtuw+x5RGeikm2h6nvQiBr40MNgG8Yl2PMlya4YpeZ4fNWVmMRmclP4yK7v/ARjrtEusby4Hz5H5w8rtOOjS8Qf/gAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="Netlify build settings"\n        title=""\n        src="/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-dc858.png"\n        srcset="/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-7483c.png 180w,\n/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-5bc93.png 360w,\n/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-dc858.png 720w,\n/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-ca142.png 1080w,\n/static/netlify-build-settings-5c903d449b44ffc552f84a4f9c15aa87-1ca91.png 1239w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>If you rather have an additional moderation step before content lands into production, you use the <a href="https://www.netlifycms.org/docs/configuration-options/#publish-mode"><code class="language-text">publish_mode</code></a>. For this, you\'ll need to change the code of the repository (the starter) created under your Github username.</p>\n<h4 id="other-settings"><a href="#other-settings" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Other settings</h4>\n<p>Content management features being quite straight-forward, by default the starter provides defaults which are common sense. For more advanced features and configurations options in the administration pages, you\'ll need to <a href="https://www.netlifycms.org/docs/configuration-options/">use the <code class="language-text">config.yml</code></a> file in the repository as described in the docs.</p>\n<p>In terms of GatsbyJS, this file should always be placed in the <code class="language-text">static/admin</code> folder in order to be accessible by <code class="language-text">window.netlifyIdentity</code>. Documentation pages already describe <a href="https://www.gatsbyjs.org/docs/caching/#static-files">how static files are handled</a>.</p>\n<h3 id="github"><a href="#github" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Github</h3>\n<p>Although there\'s the NetlifyCMS for providing eye-candy and easy UI for content management, one can still use the "regular" content management workflows developers have - using the repository on Github to add new content and change existing content :)</p>\n<h4 id="deploying-changes"><a href="#deploying-changes" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Deploying changes</h4>\n<p>Pushing changes to main branch (master by default) will trigger the Netlify service to run another build of the project:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-ca46d.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 720px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 61.7124394184168%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAACYElEQVQoz21SS0iUURj9IbIXltKgY+nojJqDEVJRGEbrWtSifZugXdAiIgTpgUNGRkX7ltE20jamRYybMimi2jtW8/hn5p+Z//08nXtTM/XyH7773cc55z9cJTY0jPjhY+hID6F94AhSR4eRPnkaAydGJPqPn0Jrz4DEvu5DaO7qw95E/5Y4c+4ClNbUIHYf7EVTewLb27qwqyOJnR09rMSBJPdS7JPYFuvEjng3WgQxLwvyjYj1DUK5eOkyJh49xVjmPm7deyDrnYlJjE8+RubhE9y8PY6rN0YxejeDkbPn0dSWkG6aO3s3YQ/FlWfPX0CMkqFDs21ULBNmFGJ1TE2/xsupabwirly7jqZ4D/b3DqIlmd4EEYuS+/kLlmOjruswSdgwDDl3HEcSLnxaxLfvP/BxcRGfv3xFdmYW87NvMT8zJ2tWzN/MIfvuPbIfFqD4EWDysoAfhjAEqWnC8X0EKy5l5R6qVURBiEi00RbgumJqNTRKJdQKRWj5PIxyFSEJfbr0Gzq8RgMuq819s1KF4bgwLQuu58OlqLcOrudBcZaXUVdVSVb9neelImDphE1YgOsioGCgG9JpIJwHwVrGiCJ+kawhoVhLS6iXy3RYgEEHUU1F0NDo0kLIPENG4NOdV6/DI5FHF75wQyHhSJKtjJCxKAbJKnSp5nJQRRUu1TJ8EqzC0zQY/O18sYhCsYQCHZf4V2JuUNRm/g4FpEObahYbi4s2FW38DXf9EL14AWqlghozFa9AvAZdvAjREzrXpEMR5n8j+pfLWjY8aFJUtS1UXAdVz4VGRBuFee4PqfX5eHl6RHcAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="Netlify build settings"\n        title=""\n        src="/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-dc858.png"\n        srcset="/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-7483c.png 180w,\n/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-5bc93.png 360w,\n/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-dc858.png 720w,\n/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-ca142.png 1080w,\n/static/netlify-listening-repository-changes-df05cb0a19279ee703310995b8c418e9-ca46d.png 1238w"\n        sizes="(max-width: 720px) 100vw, 720px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>This workflow is similar to Heroku or other PaaS solutions.</p>\n<h4 id="previewing-changes"><a href="#previewing-changes" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Previewing changes</h4>\n<p>When moderation workflows are enabled, creating a draft from NetlifyCMS administration pages means that the tool will create a new pull request to the main branch on your behalf. You can do the same just as you are used to do working with the repository directly - creating a new branch locally and pushing it to a branch for a pull request.</p>\n<p><a href="https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/">Netlify previews</a> are a popular useful feature <a href="https://github.com/gatsbyjs/gatsby/blob/936c33a262eba0d3e053e67396079c34507f5cb8/docs/docs/deploy-gatsby.md">used by GatsbyJS project</a> and many others.</p>\n<h3 id="conclusions"><a href="#conclusions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Conclusions</h3>\n<p>I hope this short tutorial would be useful to those searching for an Admin UI for a static site generator, and most specifically GatsbyJS. The process has been greatly simplified which hopefully will further increase the adoption of the JAM stack.</p>\n<p>The Gatsby Starter is welcoming, easy to get a GatsbyJS site up and running, so why not use this opportunity?</p>'}},pathContext:{slug:"cms-gatsbyjs"}}}});
//# sourceMappingURL=path---cms-gatsbyjs-27bf0f3454fd797ba799.js.map