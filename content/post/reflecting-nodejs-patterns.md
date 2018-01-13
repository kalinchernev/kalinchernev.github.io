---
title: Reflecting on node.js design patterns
slug: reflecting-nodejs-design-patterns
date: 2017-02-04T00:00:00+02:00
tags:
- JavaScript
- nodejs
- Design Patterns
---

Once upon on a time, there was a designer …

![funny JavaScript image](https://cdn-images-1.medium.com/max/800/1*o-Igk7ZgpSz2Zu4syTG3-A.jpeg)

No matter if the story is true or not, working with JavaScript on the server with Node.js at the moment is a very different experience compared to working with Python, Ruby or PHP. I’d personally say that the advantage of working with a single language everywhere comes with the price of having to learn different design patterns in order to use the language effectively.

One of these fundamental concepts to learn is the asynchronous programming. There are many articles in the Node.js/JavaScript community about asynchronous programming in terms of what callbacks are and how to [solve problems of control flow with a library](https://www.npmjs.com/package/async), a [promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), etc. These are useful when the question is generally:

> How to use node modules in a good way?

And although it’s important to learn and follow best practices in implementation, I sometimes miss articles which answer another question:

> How to organize my code in node modules in a good way?

In this story I’ll be reflecting on few patterns which answer the latter.

### Continuation-passing style pattern

This is an easy concept to understand, but really fundamental for working with asynchronous code

**Synopsis**: In your continuation-passing style function (CPS):

*   Use `cb(null, data)` instead of `return` to pass on result.
*   Use `return cb(err)` to pass on an error and exit the function.
*   Communicate one single outcome from the function.

```js
// Synchronous
function add(a, b) {
  return a + b;
}

console.log(add(2, 2));

// Asynchronous
function addAsync(a, b, cb) {
  cb(a + b);
}

addAsync(2, 2, function add(result) {
  console.log(result);
});
```

That’s it! Honestly, the first time I saw this type of snippet, I already felt an eye-opening moment. If you know this already, give yourself a tap on the shoulder! Good job!

For aesthetics, you can re-factor the last function as:

```js
addAsync(2, 2, result => console.log(result));
```

Of even:

```js
addAsync(2, 2, console.log);
```
The important take-away here is that functions can be passed as arguments to other functions. These are **functions acting like a return statement**.

Node.js, conventions say that when you’re writing such CPS you must [send the error to the first argument](https://nodejs.org/api/errors.html#errors_error_propagation_and_interception) of the callback function.

Let’s do something a bit more practical — define a function which takes a list of files. If there are files, just return them, but if no files are supplied, return an error message.

```js
function readFiles (files, cb) {
  if (files.length) {
    cb(null, files)
  } else {
    cb('no files supplied')
  }
}
```

This function will then be consumed in this way:

```js
readFiles(process.argv.slice(2), (err, data) => {
  if (err) return console.error(err)
  console.log(data)
})
```

I highly encourage you to test this if you’re not sure how it works. If you are lazy to open a terminal session, just fire a [RunKit](https://runkit.com/home) and copy-paste these in the browser ;)

Notice the `return` is used in the case of an error to exit the function. This pattern is very popular and comes handy for almost any case where the consumer of your module needs to do one single thing and get a result.

### Observer pattern with EventEmitter

Node.js developers use the [EventEmitter](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) interface from day one as it’s “under the hood” of almost all node core modules. Especially when we speak about functions which take time to finish.

**Synopsis**: Using the event emitter:

*   You create observable objects with _multiple listeners,_ where each listener is a callable function, i.e each _listener is a possible outcome._
*   Use `emitter.emit(eventName[, …args])` instead of `cb(null, data)`to pass on a result on listener function.
*   Use `emit('error', err)` to pass on an error and exit.
*   Communicate multiple possible outcomes from your function.

The EventEmitter provides a popular `on()` method which “hooks” functions on an object. Then, it invokes them synchronously one by one when a given event happens. This approach provides more granularity and control than CPS which gives one outcome per function.

Let’s expand our previous function `readFiles()` to `filterFiles()` in order to provide a way to message all subscriber consumers on the event of finding a file during a search.

```js
// Give a list of files all of them which match an extension
function findFiles (files, extension) {
  const emitter = new EventEmitter()

  if (files.length === 0) {
    // yield an error
    emitter.emit('error', 'no files supplied')
  }

  // Check for matches
  function checkFiles () {
    files.forEach(file => {
      if (path.extname(file) === extension) {
        // yield a result
        emitter.emit('match', file)
      }
    })
  }

  // Ask the event loop to loop through our loop ...
  process.nextTick(checkFiles)

  // For chainability on on()
  return emitter
}
```

Then, in order to use this function, we’ll have an implementation like:

```js
findFiles(process.argv.slice(2), '.js')
  .on('match', file => console.log(file + ' is a match'))
  .on('error', err => console.log('Error emitted: ' + err.message))
```

We can also use some sugar to make the same functionality sweeter:

```js
'use strict'

// Dependencies
const EventEmitter = require('events').EventEmitter
const path = require('path')

// Definition
class FindFiles extends EventEmitter {

  constructor (extension) {
    super()
    this.extension = extension
    this.files = []
  }

  addFile (file) {
    this.files.push(file)
    return this
  }

  // Check for matches
  findFiles () {
    process.nextTick(() => {
      this.files.forEach(file => {
        if (path.extname(file) === this.extension) {
          this.emit('match', file)
        }
      })
    })
    return this
  }
}

// Instantiation of observable object
const FindFilesSearcher = new FindFiles('.js')

// Implementation
FindFilesSearcher
  .addFile('file1.js')
  .addFile('file2.md')
  .addFile('file3.js')
  .findFiles()
  .on('match', console.log)
  .on('error', err => {
    return console.error(err)
  })
```

If you’ve visited the chapter about the observer patterns in the [famous design patterns book](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented-ebook/dp/B000SEIBB8) you must already see a big difference in the way how you can implement the pattern. I like “the node-way” better — it’s simpler and you can express same ideas with less code. And honestly, if I were to teach this pattern to web developers, I am sure that I’d have a better chance of success relating on familiarity of jQuery’s popular `.on()` method, without too much talking about abstractions and interfaces.

### Combining CPS and Observer patterns

Our new function `findFiles()` is definitely more flexible than `readFiles()`.

`findFiles()` provides a way for the user to listen to events during the processing of each file, which could give useful control of the processing.

But what if we want to make it even more flexible, like letting the user choose whether he wants this control or not? What if the user is not actually interested in each file, but wants to get only the final result?

Well, let’s make our event emitter function CPS-friendly!

```js
'use strict'

// Dependencies
const EventEmitter = require('events').EventEmitter
const path = require('path')

// Definition
function findFiles (files, extension, cb = null) {
  const emitter = new EventEmitter()
  const errorMessage = 'no files supplied';

  if (files.length === 0) {
    if (cb) {
      cb(errorMessage)
    }
    emitter.emit('error', errorMessage)
  }

  if (cb) {
    // cps
    let result = []
    for (let i = 0; i < files.length; ++i) {
      if (path.extname(files[i]) === extension) {
        result.push(files[i])
      }
    }
    cb(null, result)
  } else {
    // event emitter style
    process.nextTick(() => {
      files.forEach(file => {
        if (path.extname(file) === extension) {
          emitter.emit('match', file)
        }
      })
    })

    return emitter
  }
}

// Implementation with a callback
findFiles(process.argv.slice(2), '.js', (err, result) => {
  if (err) return console.error(err)
  console.log(`All in one: ${result}`)
})

// Implementation with an event emitter
findFiles(process.argv.slice(2), '.js')
  .on('match', file => console.log(file + ' is a match'))
  .on('error', err => console.log('Error emitted: ' + err.message))
```

This is only a demo implementation which you should not copy-paste into your code without including better checks on the various edge cases of the input, etc. However, the example gives a basic idea on how to make the callback argument optional and use it depending on the scenario.

### Conclusions

I hope that in the end of this article you have some useful high-level ideas about few options you have when designing your node modules. It’s good to start with the end in mind, imagining how you want your modules to be used. This will help you balance your decisions better between the level of flexibility and easiness of use that you want to provide to your users.

And remember — in most cases your choice of a programming language to use is less important than the way you use the programming language.
