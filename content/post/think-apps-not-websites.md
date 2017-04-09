+++
menu = ""
title = "Think about apps, not websites"
tags = ["web development", "mobile", "JavaScript", "Progressive Web Apps"]
draft = false
author = ""
slug = "think-about-apps-not-websites"
date = "2017-12-13T00:00:00+02:00"
share = true
comments = true
image = ""

+++

### **Create a manifest&nbsp;file**

The manifest file should comply to a [specification][1] which serves a similar purpose as of the [Chrome Platform API manifest file][2] — it's a set of definitions. [The installation of a web app][3] is more engaging than the one of a native app, i.e. one doesn't need to go to a "store", but take it right away. Note that a service worker file should be loaded (and activated, etc.) to achieve this interaction.

![][4]

Image taken from&nbsp;[here][3].

At the time of writing this article, these are the criteria:

* definition manifest file is present
* the manifest file contains at least the following properties: `short_name` and `144x144` PNG icon with its corresponding mime type meta info
* app is served over HTTPS
* The user has visited your site at least twice, with at least five minutes between visits

By the way, this year [instant apps][5] were announced. They are something similar for Android native apps. It seems like a unified direction into making the content and functionalities more accessible for the user. For the install, If you have a native app, and you want to suggest it to the user, [use the manifest for this][6], [do NOT advertise the native app via a push notification][7].

To try and experiment with this basic step, take either any of the tutorials in [codelabs][8] or by use [sample snippets][9] (don't really know if it's the same as [chrome samples][10]), or just clone [this branch][11]. I'm personally using [cloud9 editor][12] for development, as it serves the applications over HTTPS by default, which is really convenient to just go and try things. There are many alternatives for both the editor and server: just choose what works best for you and don't over-think or over-prepare, focus on the doing.

By the end of this, you must already have a feeling of achievement! Creating a manifest file that loads some assets and an empty JavaScript file is easy, but rewarding enough to keep your momentum to continue further.

If you are like me, testing the behavior of "Add to homescreen" in both the desktop browser and the mobile phone, you will surely notice that "homescreen" of the browser is the browser's home of apps:

![][13]

add to homescreen behavior on your desktop&nbsp;browser

Depending on the [`display mode][14]` the app can run in a separate standalone window that looks like a desktop app (and in mobile it looks like mobile), by hiding the address bar. This is how [Chrome Apps][15] should be build in the future too, not only websites.

![][16]

The same app open in a normal browser and in a standalone window

The same code (HTML+CSS+manifest file and an empty JavaScript file loaded as a service worker) produce good mobile experience:

![][17]

Add to home screen is same as installing the app on the&nbsp;device

Then, the icon is added to the desktop as expected:

![][18]

and when the icon is clicked, the user gets a nice welcoming screen, colors defined as `theme_color` and `background_color` properties in the manifest.

![][19]

Lastly, in standalone display mode, no URL address bar is visible. Use a [good front-end framework][20] to make the look and feel of your web page as a native app — the user will be delighted!&nbsp;:)

### The app&nbsp;shell

It's mostly conceptual yet important task to think about: in order to deliver good user experience, it's useful to have access to fundamental assets offline in order to react well in case of a network going offline. So, when you build and develop your web site, consider it's a real shell that stays the same and only the contents is changing. This article gives good [concept overview][21].

It's not something super-new for people who are used to thinking about apps already, or developers of [SPAs][22]. It's just something to always have in the back of your mind when you look at your own website — what resources are important to deliver to the user even when he's offline? What are the repetitive elements of my web pages? Normally these are the navigation and its surroundings. All these become the "shell", being cached on the device for easy access, and the content is dynamically fetched when available.

![][23]

[Image credits][21]

In order to implement this strategy for saving resources, one must know how to use the [Cache API][24] through a service worker. The API can also be accessed through the global `window` object as well, but working through a SW, we can "hook" into the events in the worker's life-cycle, i.e. we can validate cache when network connection toggles.

### Creating a service&nbsp;worker

&gt; Rich offline experiences, periodic background syncs, push notifications — functionality that would normally require a native application — are coming to the web. Service workers provide the technical foundation that all these features rely on. — taken from "[Service Workers: an Introduction][25]"

In basic terms, the service worker is a proxy layer between your stack (HTML+CSS+JS) and the network. The API of service workers boost the functionality of your otherwise normal web pages.

A good starting point could be the sample for [Service Worker Sample: Custom Offline Page Sample][26]. If the amount of code seems too much, have a look at the [tools section][27] where some libraries are already published to make these functionalities more accessible. For example, if your project uses a task runner, you can implement [`sw-precache][28]` ([tutorial][29] is also available&nbsp;;)

For me, personally, it was fun to play a bit with the service worker file, not having access to the DOM directly, but yet having a Web API that should communicate with it was an interesting thing. In the end, I used the example code provided in the [demo][30] of `sw-precache` because I'm really lazy.

By the end of the exercise, I have this branch for [the basics of caching the application shell][31]. What I really like as a side-effect of stealing the gulp file of the demo above is that now I have a basic build system. That helps me in generating a comparatively sophisticated service-worker handling the offline behavior of my web app. Also, it gives me a nicely working [gh-pages website][32] that can be accessed by anyone over HTTPS on <https: kalinchernev.github.io="" pwa=""> This makes me really happy, because of several reasons:

1. I already have a self-hosted, manageable (easy to update and deploy), modern web app, that looks like a mobile app. It can be viewed and installed on a mobile device, and later opened in a "shell", i.e. not showing broken pages offline mode.
2. Having a task runner like [gulp][33] opens a door of opportunities to make my development life even easier than before: I can integrate live reload, include any preprocessing of LESS/SASS, can include babel to turn my ES6 code in ES5 for older browsers, etc.
3. Using the `sw-precache` even as simple as it is right now, provides me with benefits of easier asset management, as I don't have to go too much into the details of the Cache API if I don't want to, and the mechanism of implementing the worker is easier to update in the future, as I believe the project will be well maintained. So, my task for future maintenance will be to re-generate the worker which is already included on the page.

I hope that you already see more opportunities than before. In particular, next time you want to publish information that is important and useful for your users when, say, they travel, consider these options. Imagine you want to provide accessible guides and documentation — just follow the same steps and provide enhanced experience, I'm sure it'll pay off.

### Push notification

Let me briefly indicate some resources that I consider useful for the topic, without going into details, as this feature is going a bit beyond the browser and won't be as beginner-friendly as I'd like it to be. This topic deserves another separate article.

For a start, you can start with [Adding Push Notifications to a Web App][34]. It can be well-complemented with [Using the Push API][35] and [Designing a Web Push Service][36] by [Paul Kinlan][37].

### The future

Apart from being bright, it will be filled with advancements and further variety in the developers' toolbox. Having in mind that browsers have always been an inconsistent environment, it will be vital to keep the following resources at hand and get fresh information every now and then.

It's important to underline, that [Progressive Web Apps isn't a Google-only thing][38] although many of the references in this article are going to resources authored by community contributions to Google documentation. This is mainly because the dedication and organization of knowledge seems to the best at the moment. [Microsoft are also supporters of PWA][39]. In fact, [manifoldjs][40] is an interesting project you will probably meet should you decide to make PWA that works as a nice app in Windows.

In general, Web APIs will surely continue to evolve. You can bookmark the good ol' [caniuse.com][41] to verify whether an API you want to use is supported natively or you'll have to search for a shim/polyfill and similar. Of course, there are many existing libraries and frameworks which are already taking developers attention (causing fatigue&nbsp;:)

Here I speak about experimental features that will change, but I firmly believe that browser vendors are on a good way of collaborating to support native APIs more consistently rapidly in very near future, so these features will be standard before you realize it. Knowing the standards helps you produce more maintainable code and gives you a good idea about the direction of Web, regardless of the popularity and influence of vendor frameworks and libraries.

### Conclusions

There are simple steps that anyone can take in order to convert their existing websites and web pages in progressive web apps, i.e. pages with HTML+CSS+JavaScript which act like native apps for important functionalities. Installation, caching and push notifications are a growing trend for a reason — they increase user engagement and provide great experience.

So, during the upcoming holidays, have a look at the following Web APIs, and hopefully play with them, provide more value via your web pages:

* create a `manifest.json` file describing your app with its assets
* implement caching for the vital assets necessary when offline
* make a simple push notification for events of new content on your pages

Hopefully, using native Web APIs will be fun during this experimentation, as [Chrome supports a lot of ES6 features][42] and there is no need for you to transpile your code to see immediate results of your work.

Enjoy and good luck!&nbsp;:)

[1]: https://w3c.github.io/manifest/
[2]: https://developer.chrome.com/extensions/manifest
[3]: https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android
[4]: https://cdn-images-1.medium.com/max/800/1*DYjPm6A9VuxueEU7mD_lPQ.gif
[5]: https://developer.android.com/topic/instant-apps/index.html
[6]: https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android#native
[7]: https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/good-notification#dont-advertise-native
[8]: https://codelabs.developers.google.com/
[9]: https://googlesamples.github.io/
[10]: https://www.chromestatus.com/samples
[11]: https://github.com/kalinchernev/pwa/tree/basics/manifest
[12]: https://medium.com/@kalin.chernev/cloud9-ide-6e26940c6130#.cotqpyn8b
[13]: https://cdn-images-1.medium.com/max/800/1*L63xgn3aL-6YTv7LnpwpVQ.png
[14]: https://www.w3.org/TR/appmanifest/#dfn-display-mode
[15]: https://developer.chrome.com/apps/about_apps
[16]: https://cdn-images-1.medium.com/max/800/1*mowO5VIVEwFBcOJcXY4OUQ.png
[17]: https://cdn-images-1.medium.com/max/800/1*qDNI5CsWyWWPty5qcM6KaA.png
[18]: https://cdn-images-1.medium.com/max/800/1*u1QOfgyz4iEdl1dZ2zrDPg.png
[19]: https://cdn-images-1.medium.com/max/800/1*HLOcyRrmJu2AvKN4aqrlCQ.png
[20]: https://www.google.com/search?q=best+mobile-first+CSS+frameworks+today
[21]: https://developers.google.com/web/fundamentals/architecture/app-shell
[22]: https://en.wikipedia.org/wiki/Single-page_application
[23]: https://cdn-images-1.medium.com/max/800/1*dEvx7lPNJT-r-tKjqvAXxg.png
[24]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[25]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[26]: https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html
[27]: https://developers.google.com/web/tools/service-worker-libraries/
[28]: https://github.com/GoogleChrome/sw-precache#install
[29]: https://codelabs.developers.google.com/codelabs/sw-precache/#0
[30]: https://github.com/GoogleChrome/sw-precache/tree/master/demo
[31]: https://github.com/kalinchernev/pwa/tree/basics/caching
[32]: https://pages.github.com/
[33]: http://gulpjs.com/
[34]: https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/
[35]: https://developer.mozilla.org/en/docs/Web/API/Push_API/Using_the_Push_API
[36]: https://medium.com/dev-channel/designing-a-web-push-service-3076c0599f3e#.6xi4d77ds
[37]: https://medium.com/@paul_kinlan
[38]: https://medium.com/@nekrtemplar/progressive-web-apps-aint-google-s-thing-31ca581e7a1#.faazl83yx
[39]: https://blogs.windows.com/msedgedev/2016/07/08/the-progress-of-web-apps/#ZeJAshXJM2BuqDRB.97
[40]: http://manifoldjs.com
[41]: http://caniuse.com/#search=push
[42]: http://kangax.github.io/compat-table/es6/
