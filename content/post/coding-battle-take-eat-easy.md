---
title: Coding battle at Take Eat Easy
slug: coding-battle-take-eat-easy
date: 2016-06-09T00:00:00+02:00
tags:
- JavaScript
- Programming
- hack events
- coding competitions
---

Short retrospective on my second coding competition with JavaScript. Lessons learned and thoughts on how to improve for the future.

#### Introduction

[Take Eat Easy][1] and [Philos][2] organized this coding competition.

Similarly to [the first coding battle][3], good news from [Max][4] came right from the beginning: the event was part of a hack league. For developers, this means that we can hope for continuity of the coding battles: more play, plus more opportunities to interact and share with others from the [JavaScript community in Belgium][5]. Few other cities have benefited from similar coding competitions: [Paris][6] and [London][7] recently, I am looking forward to see how the wave will grow even further :)

After this intro, Jean-Christophe Libbrecht presented what Take Eat Easy is in simple words: delivery on time. [The technical challenge][9] was presented with focus on the same company values: optimal delivery management. I gotta say that I had a flashback to my university discipline of [operations research][10] for a minute, when thinking about routes and shortest distance. Luckily, the challenge was easier to understand than the academic subject!

The overall atmosphere was agréable et la majorité parlèrent en français. Positive support and guidance was coming all the time.

#### The challenge

Quoting an abstract from the problem definition:

> You play one of TEE's bike courier

> Your goal is to make as much € as you can

> You compete with other couriers in the city

![][11]

So, participants had to program a courier bot, which plays with other courier bots in an imaginary city. Taking and delivering orders in an optimal way.

An example [node client bot][12] was given. I find it to be a good boilerplate for a start. Most importantly it's clear where to include the custom logic and what are the tools to use to take actions.

Another positive prerequisite was **the sample state object**, which contained enough structure to understand the data that will be received by the client on every turn of the game. Note some important concepts are pretty obvious, I think: **orders, possible actions and score**.

```json
{
  "state": {
    "couriers": [
      {
        "id": 1,
        "position": {
          "x": 1,
          "y": 3
        },
        "name": "name",
        "score": 0,
        "fighter": false,
        "electric": false
      }
      ...
    ],
    "orders": [
      {
        "from": {
          "x": 22,
          "y": 11
        },
        "to": {
          "x": 28,
          "y": 1
        },
        "id": 27,
        "status": 0,
        "idCourier": 0,
        "value": 18
      },
     ...
    ],
    "turn": 223
  },
  "possibleActions": [
    {
      "action": "MOVE_DOWN",
      "idCourier": 1,
      "turn": 223
    },
    {
      "action": "MOVE_UP",
      "idCourier": 1,
      "turn": 223
    }
  ],
  "idCourier": 1,
  "score": 0
}
```

**All possible actions** that the bots were able to play with: moving up/down/left/right, pick order, drop order. There were 2 advanced actions: upgrade fighter (be able to kick other players) and upgrade electric (move doubled).

I will repeat this again, I was content with the organizers. Help was kindly provided, with hints and advice all the way during the game. That made it fun to play. (No matter the fact that my team didn't manage to get points :)

![][13]

#### Lessons learned

I got a good [pair][14] for the event. ([Gregoirevda][15]) I think we got along easily and we had good time working together. Here are some highlights of the informal retrospective we did after the game.

**1. Visualize the end result (expectation) before going in the code**

We never ran the server "city" to see how our bot moves. That was not a clear problem until the end of the competition until when we were still working on the details on how to move our courier. [Grep][16]-ing the continuously changing state object helped us get some ideas about the dynamics, but honestly it was not easy to imagine how the courier bot is actually moving on the map without the real picture.

Now I believe it's important to run the server (mock) locally during development just to understand and visualize the dynamics as they will be in the real game.

**2. Learn and understand the start examples and code samples**

In my first competition I made the mistake to try to understand the logic of the core engine (server) running the game, but this time was better focusing on the sample code. Yet, I think we missed useful points and functions that we could have utilized in our favor without thinking too much.

More specifically, the head of the function that was invoked in every turn of the game contained the following:

```js    
// Fetch my courier and possible order from the state  
var state = data.state;  
var possibleActions = data.possibleActions;  
var myCourier;  
var myOrder;
```

And guess what? That was prepared for us before-hand so that we could use these variables "as-is". I have to say, I was mixing the `data` and `state` variables pretty much, but that's another topic.

Another part of the code contained this line:

```js
// Sample response.
respond(getDirection(data.possibleActions,myCourier.position,{x:1,y:2}));
```

`getDirection()` returns the best move depending on the current position and possible actions.

`respond()` is the function to invoke in order to take actions.

The `respond()` took us away, because we decided to focus on the actions, and somehow it was pretty late in the game when we figured the getDirection() function for possible re-use.

**3. Strategy and task separation**

Probably the most complex part of all.

Even though we didn't have clear strategy while developing the bot, it surely would have helped. For example, we started implementing functions for the bonus skills like having an electric bike and kicking other players before deciding how to move and take orders :D

But seriously, possible strategy for this challenge could probably be to separate the approach in 2: functions for working with distance, and such for working with actions. Though we didn't manage to have a complete combination of actions based on distance and value, we spoke about the fact that we were not clear about the order of combined actions we need to take. We took a delivery and then we were just standing at a place, since the next step was not foreseen. However, we prepared to be able to kick other players just standing there with our delivery in our hands! (we never got the points for the advanced action of kicking)

I feel that breaking down a challenge into small tasks plays an important role in problem solving, especially in short-time hack event. Also, event handling actions with state management seem to be recurring patterns, so it's worth getting some more practice there too.

#### Coming up

Many developers don't go to competitions because they believe they are not good enough with JavaScript or they will not perform well in hack events under stress. Even though there is positive stress, with this retrospective and code samples I hope that I've managed to demonstrate that the challenge itself was doable and fun to do.

The [next coding battle will be at Microsoft][17] and the event is open for registrations. I'd recommend you to grab the opportunity to broaden your experience.

Lastly, consider inviting your colleagues to join you too. As you can imagine, the short hacking time will naturally give you ideas on how to communicate effectively with your colleagues when you work together in different environment. Also, you will see new ways to break down tasks and problem solve by observing and sharing with other developers you meet at the event.

#### What do you think?

I'm really interested to hear feedback on my thoughts and ideas about the code and the highlights. Maybe you have a different point of view? Share it in the comments!

[1]: http://www.takeeateasy.fr/
[2]: https://www.philos.io/
[3]: https://medium.com/@kalin.chernev/the-first-coding-battle-in-belgium-d4f4285ffb32#.ses1gau0l
[4]: https://twitter.com/maxczet
[5]: https://twitter.com/jsl4b
[6]: https://twitter.com/maxczet/status/725623059344986112
[7]: https://twitter.com/maxczet/status/728555974672449536
[9]: https://github.com/TakeEatEasy/hack-league
[10]: https://en.wikipedia.org/wiki/Operations_research
[11]: https://cdn-images-1.medium.com/max/800/1*zt3n7YspKUDLmP8Q4lN5qw.png
[12]: https://github.com/TakeEatEasy/hack-league/tree/master/node-client
[13]: https://cdn-images-1.medium.com/max/800/1*641YUOoQZYNKW5N2d4G-kw.jpeg
[14]: https://en.wikipedia.org/wiki/Pair_programming
[15]: https://github.com/Gregoirevda
[16]: https://en.wikipedia.org/wiki/Grep
[17]: https://www.eventbrite.com/e/coding-battle-microsoft-innovation-center-brussels-carasap-tickets-25839985091
