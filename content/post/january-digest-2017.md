---
title: January Digest 2017
slug: january-digest-2017
date: 2017-02-01T00:00:00+02:00
tags:
- JavaScript
- nodejs
- Cloud
---

I’ve prepared a warm-up digest for those of you who made a resolution to improve their JavaScript skills in 2017, so let’s get it started!

### Stories

I published 2 articles this month and I enjoyed writing both of them.

[Problem-first problem-solving](https://medium.com/@kalin.chernev/problem-first-problem-solving-87369b84551f#.zg5l97itd) — don’t be mislead by the title, it’s about positive concepts going randomly through my brain.

[Agile documentation for your API-driven project](https://restful.io/agile-documentation-for-your-api-driven-project-based-on-open-api-standards-11e54d4326bb#.jaw6kcohk) — this got a tweet from the community few minutes after being published. So, the spread started before I make a tweet about the new publication myself. Nothing makes me happier than that as a writer.

I got enthusiastic to write this article after release 1.9.0 of [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) which introduced 2 new features. Both of them being focused on developers’ experience and productivity.

### JavaScript

It’s just the beginning of 2017, so let’s warm up right for it!

*   [The 21 Most Awesome Awesome Lists for Node.js Developers](https://nodesource.com/blog/the-21-most-awesome-awesome-lists-for-node-js-developers)
*   [2016 rising stars](https://risingstars2016.js.org/)
*   [Node.JS Top 10 Articles of the Year (v.2017)](https://medium.mybridge.co/node-js-top-10-articles-of-the-year-v-2017-79df8269d0f3#.naz5q020y)
*   [Node.js Async Best Practices & Avoiding Callback Hell — Node.js at Scale](https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/) — this article is full of advertisements just as a typical American TV show. It’s also as good as such because it shows you problems and solutions that you might actually have in your real life.

And one more which is not only about JavaScript but the broader spectrum of front-end development: [Front-End Developer Handbook 2017](https://www.gitbook.com/book/frontendmasters/front-end-handbook-2017/details).

### Cloud

I feel that video gives a useful overview of one of the new hypes: serverless.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Dh_UXXtSvjQ?rel=0" frameborder="0" allowfullscreen></iframe>

In addition, this feels down-to-earth about production usage:

<iframe width="560" height="315" src="https://www.youtube.com/embed/c4rvh_Iq6LE?rel=0" frameborder="0" allowfullscreen></iframe>

In my personal opinion, this “serverless” hype is not a ground-breaking new technology, but a smooth transition towards customer-oriented architectures and services. Containers could be considered as a ground-breaking thing which solve problems in infrastructure management, and they will probably be still the background “hidden” behind serverless.

When I visualize a transition towards customer-oriented API architectures and services, I imagine services like [SwaggerHub](http://swagger.io/go-serverless-with-swaggerhub-and-amazon/) which hide complexity of infrastructure management and let’s the user focus on building products.</span> I also imagine that at some point Amazon will be in a position to offer amazing user AND developers experience directly in the cloud when [Cloud9 comes move integrated](http://www.forbes.com/sites/janakirammsv/2016/07/18/the-master-plan-behind-amazons-acquisition-of-cloud9-ide/#6e580c0028db).

At some point, AWS (? will ?) be the de-facto platform for building cloud applications where the user starts off easily — just clicking here and there and making configurations which integrate what-ever is necessary, where-ever necessary. And when super-specific tweak is necessary, code editor with all [debugging capabilities](https://medium.com/@kalin.chernev/debugging-node-js-in-cloud9-ide-59712c043fb2) will be at hand. Thus, covering scenarios from small startup projects that don’t want to focus on infrastructure, to enterprise which is there because of the fine control over the server side.

### Trends

On a similar note about trends, [Apiary got acquired by Oracle](https://www.oracle.com/corporate/acquisitions/apiary/index.html). Though I’m not a pro at understanding mergers, it’s obvious that API economy companies are on success reaping wave. Only few months ago [Apigee was in the news in a similar way](http://www.forbes.com/sites/greatspeculations/2016/09/13/heres-why-google-is-acquiring-apigee/#52eceafc693f), and there is a compelling reason for these trending acquisitions.

### Time-saving tricks

#### PHPStorm convert between array syntax

Laugh at me, but I still sometimes see `array()` syntax during my work (and not `[]`) It appeared to be an easy thing to change automatically in the editor.

1.  `Code | Inspect Code...` — run it on your files. One of the inspections called **"Traditional syntax array literal detected"**.
2.  Alternatively just run that specific inspection only via `Code | Run Inspection by Name...`
3.  Once done, you will see a list with results. Find that particular inspection in results (in case if 1st option was used (all inspections)).
4.  From there you can apply “Fix it” action on all (or individual) results of that inspection.

![php storm converting array syntax](https://cdn-images-1.medium.com/max/800/1*t5kfn0iW_I3uC3mWxA5Ntg.png)

**Checking the daily ebook by** [**Packt’s Free Leaning campaign**](https://www.packtpub.com/packt/offers/free-learning)

There’s an option to subscribe for updates via twitter or facebook, which is understandable. This is a good way to have leads and metrics of the campaign. However, it’s not very practical to open the website and see it every day, thus I made a lazy-logic implementation to be able to check this from the command line like this:

```bash
$ node ~/scripts/freeEbook.js
```

There’s the gist for it (it’s super-lazy)

```js
#!/usr/bin/env node

'use strict';

var https = require('https');
var cheerio = require('cheerio');

var base = 'https://www.packtpub.com/'
var freeEbookURL = base + 'packt/offers/free-learning';

console.time('checking free ebook');

https.get(freeEbookURL, (res) => {
  res.on('data', (d) => {
    var $ = cheerio.load(d);
    var title = $('.dotd-title').text().trim();
    var CAB = $('.twelve-days-claim').attr('href');

    if (title && CAB) {
        console.log(`Today's free ebook from Packtpub is ${title}.`);
        console.log(`To claim it, click here ${base + CAB}.`);
        console.timeEnd('checking free ebook');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
```

This script is just the basic concept that can be integrated with internal cron tasks or cloud services to automate the check. For example, I imagine that with some investigation it will be possible to work out an [integration with IFTTT](https://auth0.com/blog/if-this-then-node-dot-js-extending-ifttt-with-webtask-dot-io/) or a similar service.
