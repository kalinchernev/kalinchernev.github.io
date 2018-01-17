---
title: Debugging node.js in Cloud9 IDE
slug: debugging-nodejs-in-cloud9-ide
date: 2016-09-04T00:00:00+02:00
tags:
- nodejs
- JavaScript
- Debugging
---

In this article I'll be sharing some of my level-up experience learning how to debug node.js apps. It was not easy at first, but once I got it, I felt empowered that now I can work with any code base.

Debugging is useful for solving vague problems in other people's code and it's also useful for learning how something actually works. The article might be particularly useful for those used to having debugger experience in WebStorm or similar IDEs.

### Quick reference

That article is meant to be more like a cheat sheet rather than too detailed step by step guide, here's a go-to list of techniques:

### Node debugger

Let's start by the basics — using the [node's native debugger][1].

For example, [this app][2] contains a simple server returning a JSON object which is a [swagger specification][3] and I need to debug and see its value. So, in this example, I'll follow this steps to see the contents of the variable:

* Set a break point with `debugger`
* Run the script with `node debug example/app.js`
* Work with the controls of the debugger to reach a good value: `c` to continue and `n` for next
* Use `repl` to execute some code which access current state of the system

![][4]

### Simple script

* Add a break point
* Press the Run button to execute the default node runner (ensure the debugger is enabled — [more info][5])

![][6]

### Mocha tests

This is an [experimental feature][7].

![][8]

* Enable 'Tests" from the editor settings
* Refresh the page and see the panel
* Put a break point in the test
* Enable debugging in the "Test" panel
* Run the test suite or scenario

This feature actually worked for me, I felt just the same way when I made my first [animality in MK3][9].

![][10]

### Command-line apps

In fact it's almost identical to debugging a simple script, the only detail you have to notice is an input box where you put the actual command as if ran in the command line.

* Open the command-line app and place a break point
* Use the Run menu to start the process in debug more
* Change the input process name and restart the runner

![][11]





[1]: https://nodejs.org/api/debugger.html
[2]: https://github.com/Surnet/swagger-jsdoc/blob/master/example/app.js
[3]: https://www.google.be/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;uact=8&amp;ved=0ahUKEwiG4Pi0qfbOAhUEOhQKHaQICOAQFggcMAA&amp;url=http%3A%2F%2Fswagger.io%2Fspecification%2F&amp;usg=AFQjCNH_jZB7rkJVVCg-JHFmeLAHwMnUfw&amp;sig2=R2rG7_9EH1ctFeFwtJ7cPw&amp;bvm=bv.131783435,d.d24
[4]: https://cdn-images-1.medium.com/max/800/1*CHRmYU912yZDRmqz7Z490w.gif
[5]: https://docs.c9.io/docs/debugging-your-code
[6]: https://cdn-images-1.medium.com/max/800/1*I-mVNLptBFDG-EaJpLR6rQ.gif
[7]: https://docs.c9.io/docs/experimental-features
[8]: https://cdn-images-1.medium.com/max/800/1*-8oDjYBTEU4-G8H5_vw5lg.png
[9]: http://mortalkombat.wikia.com/wiki/Animality
[10]: https://cdn-images-1.medium.com/max/800/1*OHINaf_jcvN75EN1M0ozlQ.gif
[11]: https://cdn-images-1.medium.com/max/800/1*V9xHSnqzwCasqzHiHyBD5Q.gif
