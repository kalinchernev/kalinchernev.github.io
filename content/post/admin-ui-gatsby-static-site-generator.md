+++
author = "Kalin Chernev"
comments = true
date = "2017-08-16T23:33:31+00:00"
image = ""
menu = ""
share = true
slug = "admin-ui-gatsby-static-site-generator"
tags = ["JAM stack", "JavaScript", "Gatsby.js"]
title = "Admin UI for Gatsby static site generator"

+++
## Introduction

Recently I was looking into [Gatsby.js](https://www.gatsbyjs.org/) as a generator for a blog site. As many others, I one of the first steps into using the system as other popular CMS solutions, I started to look around for an online back-end UI for the content creation part. I found this list of [headless CMS options](https://headlesscms.org/) and since [forestry](forestry.io) (the service I use for my blog) does not support Gatsby, I decided to try [NetlifyCMS](https://www.netlifycms.org/). This tutorial will be about it :)

I'm not going into details on the separate services and software packages, their advantages and super features. Rather, I will keep the tutorial concise on how to integrate the systems within few steps.

If, on the other hand, you like more background about the JAM stack, you can see previous mentions [here](https://kalinchernev.github.io/march-digest-2017/#jam-stack) and [here](https://kalinchernev.github.io/releasing-new-blog/) ;)

### Start

For the tutorial, assume I'm speaking about [gatsby advanced starterkit](https://github.com/Vagr9K/gatsby-advanced-starter) although same principles can be applied to which-ever starterkit or gatsby setup. The important part is to have markdown as data source, as well as well-defined front-matter which is parsed by [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) and exposed to a GraphQL API within the Gatsby. In short, make sure you have markdown files so that the information you write could be understood by NetlifyCMS and Gatsby, and many others actually.

### NetlifyCMS

NetlifyCMS is an open source decoupled back-end built on React, which [integrates with Github API](https://www.netlifycms.org/docs/intro/). I personally really like this idea, because publishing workflows actually translate to steps developers already take on code repositories.

To use this admin UI application easily, you can [integrate it with the Netlify service](https://github.com/netlify/netlify-cms/blob/master/docs/quick-start.md) which will watch for changes in your github repository and do the necessary builds, previews and deploys.

In order to make Gatsby work with this tutorial, you will need to:

* make a [page component](https://www.gatsbyjs.org/docs/building-with-components/#page-components) for the admin page, this should include the scripts loading the NetlifyCMS app

* include the `config.yml`<span style="font-size: 1rem;">​ file in&nbsp;</span>`static`<span style="font-size: 1rem;">​ folder of Gatsby, as it does not need to be optimized by webpack</span>

If you have configured Netlify service to take your master branch and execute `npm run build` on new deployments, a new push will already give you access to the admin UI app.

### Gatsby

This side might seem a bit more complex compared to copy-paste and rework to a React component of few lines of code, but it's actually a simple process.

* move all markdown files into 1 folder, you need a flat structure, otherwise NetlifyCMS won't be able to list the existing content in the dashboard

* configure the `SiteConfig.js`<span style="font-size: 1rem;">​to point to this folder containing the files</span>

* configure also, by the way, configure also the `config.yml` of Netlify to be the same target

Check if all works, and if yes, just make another deployment to the your repository. I personally removed all the unnecessary content manually and had to flush the cache of the last deploy in the console.

### The result

You have a modern toolchain of React, GraphQL, webpack and similar called Getsby, and you have a working Admin UI to manage your content when you're lazy to open your editor ;)

Here's a [video to demonstrate the process](https://github.com/kalinchernev/kalinchernev.github.io/blob/blog/static/videos/netlify-cms-gatsby.mp4) from making a draft which is a pull request, opening a preview and then publishing the change which gets automatically deployed on the site.

![](/uploads/2017/08/16/Aug%2017%202017%2012-41%20AM.mp4)