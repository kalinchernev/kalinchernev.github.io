---
title: Holidays digest 2016
slug: holiday-digest-2016
date: 2017-01-07T00:00:00+02:00
tags:
- JavaScript
- web development
---

[Source](https://medium.com/digital-beer/holidays-digest-68ecc2b115a8 "Permalink to Holidays digest – Digital Beer – Medium")

I decided to try a new format of writing a story — a "digest" one. In this format, I'll be able to mix subjects and share about things I find interesting. Although I don't plan to follow a strict structure, topics will be divided into sections to make it easy to jump between without having to read it all.

### Medium

Certainly, the trending topic in the context of this blog is the story about [Renewing Medium's focus][1]. I think there are few really good points about the "why" and I hope that Medium will find the new way to provide the value they want for publishers.

### Kadira

On a similar note, [Kadira: Shutting Down][2] was an expected story from [Arunoda Susiripala][3]. The decision is understandable from a business point of view. In a more global view, I feel that this story is a historic event for the JavaScript community in overall. It's a reminder of how fierce the competition in the JavaScript ecosystem is and how important it is for vendors like MDG to manage their relations with driving contributors.

### Progressive Web Apps

My last post was about [thinking about apps, not websites][4]. My goal was to start a collection of good examples of making modern apps. I had plans to continue on this story-line by making a case study of an app with information about first aid that works offline, demonstrating both the technical and informational side.

To find a re-usable information about first aid was a tougher cookie that I thought. First, information on the web is not well structured. I was looking for a topical steps on how to help in a given urgent situation, but couldn't find anything organized. Secondly — the information was copyright and it would have taken a massive amount of waiting time to get information for a demo case study. I managed to find some open information in [wiki books][5], which got me started on the content. Finding free photos I could use was a bit easier as [Vladimir Vassilev][6] suggested me a source collection of [free stock photos][7].

By the time I got my content prepared, the team of [Auth0][8] had already published 2 great articles on the same subject! :D

The first one (actually the second one), which continued on the same story line as I aimed to, was about [instant loading and storage][9]. At the same time, I was testing [sw-precache][10] more thoroughly and I had issues with the offline storage that erased the cache in an unpredictable ways on my mobile phone. Seeing that article during my work on the first aid case study, just discarded much of the things I wanted to share, as the article of [Auth0][11] is much more thorough and deeper explained.

Then, just before NY, came the second nice article from the same team, this time about [push notifications][12]. With this, I decided that it's better to recommend these, rather than writing or trying to complete the first aid app. Mainly because I don't believe it will be of any value added.

Anyway, if you read this and still consider it's a good idea to make a progressive web app for first aid, then I'd recommend you check the [wikibooks REST API][13] to get the information about the book I linked earlier, following the [guidelines][14]. From the little experience making the app, I'd recommend [page.js][15] and reading [Krasimir Tsonev][16]'s [Deep dive into client-side routing][17], that's of course if you want to keep it simple, rather than using React (w/ react router) or Angular, etc.

### [Pishi Kur][18]

That's a tiny project that I released around Christmas. It's just taking an example app from [Firebase][19] and has some changed strings here and there. The idea of the project is to entertain Bulgarians travelling or living abroad by collecting pictures of a word. The idea came along in [Plovdiv][20] when few Bulgarians shared that they see that word in France, Germany, in the mountains, etc. The project will not be translated in Bulgarian and will not encourage vandalism, or anything like this. It's rather a surrealistic platform of sharing funny moments while being in special places around the world.

It's also my first time to use Firebase. My impressions so far are positive: it was easy to setup the social authentication and deploy the app. The developer experience is close to what Meteor was about an year ago — easy development, ready plugin-like functionalities, etc. Only that, Meteor killed a lot of its interest by making Galaxy nothing more than a place to host your app, not providing a lot of services around it. With Firebase, Google services are easy to integrate at the finger tips of the developer.

So far, there are more than 30 registered users, average of 30 visits per day. If this grows organically, it will be an interesting case study to work with Firebase tools to scale and tweak the platform. Otherwise, I don't plan to push advertising or any type of campaigns to make it bigger than that :)

### APIs

Feeling that I strayed a bit from this topic in the last few months, I renewed reading and researching ways to get my hands back on things about APIs.

The "[How I made a SaaS webservice earning $1000 monthly profit][21]" is a motivating piece about taking small steps towards monetization of a service.

Another interesting piece of information is the [ProgrammableWeb's Most Interesting APIs in 2016: Application Development and Developer Tools][22]. I really love the idea of website to API tools like the [Jam API][23] mentioned. It reminds me of [Kimono Labs][24] who got acquired almost an year ago.

The [swagger-jsdoc][25] module that I sometimes work on in my free time continue on its path of wider adoption:

![][26]

Based on data from <https: npm-stat.com="">

It might be that the CLI tool played an important role in August. And because the module targets the developers' audience, I plan to work on a feature to "watch" for changes in the input files.

I believe it's worth investing in learning and doing more of swagger apis this year, mainly for 2 reasons:

Trends look good:

![][27]

Taken from [Google Trends][28]

Adoption of [Open API specification][29] also looks positive, and also the big players also support it. It's hard to say what exactly will happen in 2017 after some of the [acquisitions of 2016][30]. Nevertheless, my gut feeling is that having a solid specification (with such adoption) is a key to having the true interoperability to other specifications and solutions such as GraphQL, in potential interest [moving existing API from REST to GraphQL][31].

### [My chat bot story][32] became my best story of 2016 because of [Chatbots Life][33] publication

Being published on 1st December, and being one my last articles for 2016, the "Building a chat bot who understands emotions though your selfies" story grew to be my best story of the year, thanks to [Stefan Kojouharov][34] including it in a publication.

![][35]

The only story that could have been a competition in fame to this one was the "[Drupal 8 on Cloud9 IDE][36]" which got more views because of being included in the [Weekly Drop issue 258][37], but didn't reach as many number of reads and recommends.

[1]: https://blog.medium.com/renewing-mediums-focus-98f374a960be#.yuaggxs6c
[2]: https://voice.kadira.io/kadira-shutting-down-7d35994db85d#.mmph3hury
[3]: https://medium.com/@arunoda
[4]: https://medium.com/@kalin.chernev/think-about-apps-not-websites-13757f9736de#.5v5yhw1p3
[5]: https://en.wikibooks.org/wiki/First_Aid
[6]: https://medium.com/@disastacre
[7]: http://re-wp.com/stock-photos/
[8]: https://medium.com/@auth0
[9]: https://auth0.com/blog/introduction-to-progressive-web-apps-instant-loading-part-2/
[10]: https://github.com/GoogleChrome/sw-precache
[11]: https://auth0.com/
[12]: https://auth0.com/blog/introduction-to-progressive-web-apps-push-notifications-part-3/
[13]: https://www.mediawiki.org/wiki/API:Main_page
[14]: https://wikimediafoundation.org/wiki/Developer_app_guidelines
[15]: https://visionmedia.github.io/page.js/
[16]: https://medium.com/@krasimirtsonev
[17]: http://krasimirtsonev.com/blog/article/deep-dive-into-client-side-routing-navigo-pushstate-hash
[18]: https://pishikur.com/
[19]: https://firebase.google.com/
[20]: https://en.wikipedia.org/wiki/Plovdiv
[21]: https://hackernoon.com/how-i-made-a-saas-webservice-earning-1000-monthly-profit-6d2b782b95c8#.jrv7pfxuz
[22]: https://www.programmableweb.com/news/programmablewebs-most-interesting-apis-2016-application-development-and-developer-tools/brief/2016/12/23
[23]: https://www.jamapi.xyz/
[24]: https://medium.com/@kimonolabs
[25]: https://www.npmjs.com/package/swagger-jsdoc
[26]: https://cdn-images-1.medium.com/max/800/1*yJ4w5B4sAANmTqrJlHpcFw.png
[27]: https://cdn-images-1.medium.com/max/800/1*bVdbmTcQZsE4tYunE7Jh5Q.png
[28]: https://www.google.com/trends/explore?q=swagger%20api
[29]: https://www.openapis.org/
[30]: https://medium.com/the-era-of-apis/over-500m-invested-in-api-companies-in-2016-with-16-acquisitions-cc4f3d2beef8#.99codaicj
[31]: https://medium.com/@raxwunter/moving-existing-api-from-rest-to-graphql-205bab22c184#.h6rctdrxm
[32]: https://chatbotslife.com/building-a-chat-bot-who-understands-emotions-though-your-selfies-e9fa7cc4b627#.rgfcezwnz
[33]: https://medium.com/@ChatBotsLife
[34]: https://medium.com/@kojouharov
[35]: https://cdn-images-1.medium.com/max/800/1*HgTPQnk-aW0wxKdFitxtzg.png
[36]: https://medium.com/@kalin.chernev/drupal-8-on-cloud9-ide-1a294328e1aa#.g3a7u6t68
[37]: http://www.theweeklydrop.com/archive/issue-258
