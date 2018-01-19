---
title: Drupal 8 on Cloud9 IDE
slug: drupal8-cloud9-ide
date: 2016-09-15T00:00:00+02:00
tags:
- php
- web development
- Drupal
---

> "You see things; and you say, 'Why?' But I dream things that never were; and I say, 'Why not?" — George Bernard Shaw

[Drupal 8][1] will soon celebrate 1 year since its release. One interesting fact about this version of the popular PHP CMS is that the [release cycles][2] are smaller and feature-focused. This makes everybody happier than previous major versions and I will focus on developers' experience. It's been steadily improving since the focused adoption of popular and well-maintained projects from the wide PHP community. [Composer][3], [Drupal Console][4] (an implementation of Symfony Console) and adopting PHP OOP design patterns in overall are some of the highlights in this article.

On the other hand, [Cloud9 Editor][5] is an interesting project to my personal experience as a developer. I've shared some enthusiasm about it before, summarizing [some of my favorite features][6], and going deeper into [debugging applications in the cloud][7]. At this step, I start to dream about scenarios where this cloud editor will be THE editor for massive amount of open source contributors, experimenters and agile practitioners alike. I also visualize scenarios where it could fill in the gap in the hearts of many who use tools like [dreditor][8]. Dreditor on steroids: git, drush, mysql, php, etc — all the tools a developer needs to start, test, develop and deploy!

### Repository based development environment

Drupal Composer's drupal-project seems like a really interesting repository which can enable me to start a Drupal 8 project and make an installation. Also it will provide me with a door of opportunities to manage all my project-global dependencies via composer.

Here's what I can do to start a [Cloud9 workspace][10] linked my own fork repository of the drupal-project.

* Forked the original repo to my profile.
* Create a new workspace pointing to the my fork repo.
* Selecting template "The popular stack in shiny cloud wrappings: Apache, PHP5 and MySQL pre-configured" seems ok for the moment.

This should look similar to:

![][12]

Creating my new development environment

At the end of this process, I have an [Ubuntu][13]-based [docker][14] container. In it, there is a local repository linked to my upstream repository on the origin. I'm ready to use the tools I know in Linux because composer, npm, node, etc. are already installed, and I also have a command line interface to run or install anything I need on top of this initial setup. As a side note, [custom templates][15] will soon make this initial setup even more flexible and personalized.

As the terminal is already open for you, run `git remote -v` to ensure this origin linking if you like.

### Selecting Drupal 8

Now that the workspace is ready, you have to select a branch for the Drupal version you are going to work with. I'm going to do `git checkout 8.x` in the ternimal to use the 8.x version of the the repository files in the container machine. When you do that, you'll see the files in the tree.

![][16]

Drupal 8 branch of the repository

These are the source files I can use to build the project with the dependencies and the tools of my personal preference.

### Building project dependencies

The dependencies can be [managed globally for the project][17] via the composer.json file. What interests me the most are the Drupal, Drupal Console and Drush which are already [required][18].

![][19]

Drupal-specific initial dependencies.

As the readme file of the repo points out, additional dependencies can be added later by [installing dependencies through the composer][20].

Run `composer install` in the terminal to download all the dependencies and run all the composer special things defined in the composer.json file.

When all downloads are finished — you can just run the Run button and start the apache server in the machine to open the project in the project browser or your own browser:

![][21]

Open the project in the browser after the dependencies installation.

If you resist your perfectionist nature and expectations on domain names, now you can open the project at [https://{projectname}-{username}.c9users.io/web/core/install.php][22] replacing the variables of course. And there you go, you have Drupal 8 ready for your install!

![][23]

Yep, the wizard is ready!

### Installing the project

I deliberately left this out from the previous one. You can, of course, continue with the installation in the most user-friendly way with the wizard above. Classical and easy and you don't worry even for file permissions. If you are a databases guy, probably you'll be interested to check the tutorial for [setting up mysql][24] and/or [setting up a database][25].

Another option for making the installation is using the command line interface and Drupal Console. If you're a non-idealist developer, you can directly run the binary from the vendor folder like `/vendor/bin/drupal`.

![][26]

Drupal Console initialization

This will hint you to run an initial setup for the tool, just do it and then you can have [`vendor/bin/drupal site:install`][27].

For more ideas around this installation step, check [this tutorial][28] which also includes steps to download the project if it was not done by Composer.

Shooting some ideas of a quick-start yml file for the [`chain][29]`.

```yaml    
commands:
# Install Drupal
  - command: site:install
    options:
      langcode: 'en'
      db-type: '%{{db_type|mysql}}'
      db-host: '%{{db_host|127.0.0.1}}'
      db-name: '%{{db_name|c9}}'
      db-user: '%{{db_user|root}}'
      db-pass: '%{{db_pass|}}'
      db-port: '%{{db_port|3306}}'
      site-name: 'Drupal 8 site'
      site-mail: 'admin@example.org' # default email
      account-name: 'admin' # default account
      account-mail: 'admin@example.org' # default email
      account-pass: 'admin' # default pass
    arguments:
      profile: 'standard'
```

### Debugging

A small helper subject after the setup — since xdebug is available in the docker in "Apache &amp; PHP" runner, there is a way to debug apps.

* Start "Apache &amp; PHP" runner with debugger on:

![][31]

The green debugger button is the important detail to notice.

* Set a break-point and open the application to trigger a request:

![][32]

The app can be run either in preview in the IDE or in another tab.

* Inspect the state of the system and profit from deeper understanding :)

![][33]

Use the inspector for observing both global and local scopes.

Note that the runner properties can be edited:

![][34]

Runners are editable.

```   
// This file overrides the built-in Apache httpd (PHP, HTML) runner
// For more information see http://docs.c9.io:8080/#!/api/run-method-run
{
  "cmd": [
    "run-apache2",
    "${debug?debug}"
  ],
  "cmdStop": [
    "run-apache2",
    "stop"
  ],
  "debugger": "xdebug",
  "debugport": 9000,
  "$debugDefaultState": false,
  "selector": "^.*\\.(php|phtml|html|shtml)$",
  "env": {
    "XDEBUG_CONFIG": "xdebug.remote_enable=1 idekey=cloud9ide remote_host=localhost remote_port=9000 remote_mode=req"
  },
  "info": "Starting Apache httpd, serving \\033[01;34m$hostname_path\\033[00m."
}
```

### Conclusions

It's an ambitious initiative/dream to work with Drupal 8 projects in the cloud but you see that it's possible and easy. In the end of this tutorial you have a working instance built out of a composer-based dependency management system, your custom repository, and the vital tools to help you develop well: Drupal Console, Drush and any other script you can think of that run on an Ubuntu machine.

Now it's up to you to use these tools to your best interest: teaching Drupal 8 interactively, pair-programming, [triage][35] issues by making/testing patches or just experimenting with features you're interested in anywhere, anytime.

[1]: https://www.drupal.org/8
[2]: https://www.drupal.org/core/release-cycle-overview
[3]: https://getcomposer.org/
[4]: https://drupalconsole.com/
[5]: http://c9.io
[6]: https://medium.com/@kalin.chernev/cloud9-ide-6e26940c6130#.nxqgf2ree
[7]: https://medium.com/@kalin.chernev/debugging-node-js-in-cloud9-ide-59712c043fb2#.tknem3kcp
[8]: https://dreditor.org/
[10]: https://docs.c9.io/docs/getting-started
[12]: https://cdn-images-1.medium.com/max/800/1*nbj-D9ufx-wlGZ-MdBj6Jw.png
[13]: http://www.ubuntu.com/
[14]: https://www.docker.com/
[15]: https://c9.io/community/templates
[16]: https://cdn-images-1.medium.com/max/800/1*Eoo2-TstzN_2AtY1m4kagw.png
[17]: https://getcomposer.org/doc/00-intro.md#dependency-management
[18]: https://getcomposer.org/doc/01-basic-usage.md#the-require-key
[19]: https://cdn-images-1.medium.com/max/800/1*3AcZBLBGsVdelfdFPJcmMw.png
[20]: https://getcomposer.org/doc/01-basic-usage.md#installing-dependencies
[21]: https://cdn-images-1.medium.com/max/800/1*Wk4VtthU1g6TbvI70Q7u3Q.png
[22]: https://%7Bprojectname%7D-%7Busername%7D.c9users.io/web/core/install.php
[23]: https://cdn-images-1.medium.com/max/800/1*ZOtYTj11S-Mi9h_894NoMA.png
[24]: https://community.c9.io/t/setting-up-mysql/1718
[25]: https://docs.c9.io/docs/setup-a-database
[26]: https://cdn-images-1.medium.com/max/800/1*dx0IRYUqpwRv512zYSBGJg.png
[27]: https://hechoendrupal.gitbooks.io/drupal-console/content/en/commands/site-install.html
[28]: https://drupalconsole.com/articles/how-to-download-and-install-drupal-8-using-drupal-console
[29]: https://docs.drupalconsole.com/en/commands/chain.html
[30]: mailto:admin%40example.org
[31]: https://cdn-images-1.medium.com/max/800/1*ksgXbNGH5Lp_HtVdLoQWMA.png
[32]: https://cdn-images-1.medium.com/max/800/1*26fDzn9eaCW1fwMcB9BSEQ.png
[33]: https://cdn-images-1.medium.com/max/800/1*lfPKCwwocB8NkegBzv7fOA.png
[34]: https://cdn-images-1.medium.com/max/800/1*m1WawXoob6Jg7DiUIlN9hg.png
[35]: https://www.drupal.org/contributor-tasks/triage-novice-issues
