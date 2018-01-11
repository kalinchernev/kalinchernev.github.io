---
title: Escape button in Macbook Pro without using toucbar
date: 2018-01-11T23:00:00+01:00
slug: escaping-macbook-pro-touchbar
tags:
  - Macbook
  - MacOS
  - Productivity
  - Keyboard
---
The fact that you have opened this article means that you are already aware of one the biggest problems of Macbook Pro 2016+ models - the [touchbar](https://developer.apple.com/macos/touch-bar/).

The touchbar is something Apple have decided to enforce on users as part of their keyboards. It's not a problem per-se for most users and certainly the bar can serve as a good tool if used properly. The bar becomes a problem for developers, system administrators and all other power users who need a physical key for the `Esc` (escape).

I personally understand Apple to an extend - how do you force someone to use the touchbar? You force him to NEED to do something with it, otherwise he will continue with old habits.

I mean, let's be honest, the trackpad in 2016+ models is HUGE. Realistically, it could be a bit tighter to let the Fn keys and its row just be there with no problems!

And back to the question of adding an `Esc` key on a physical place you expect and want it to be?

## How to add `Esc` - 3 possible ways

### Solution 1: Change modifier keys

![Adding escape key in MacOS by conventional means](./images/macos-escape-conventional.png)

It's the [official solution](https://support.apple.com/kb/PH25240?locale=en_IE) which you'll find first on Google. No problems with it as long as you're ok to let go of the `Caps Lock`. Who needs it anyway, they said?

### Solution 2: Find software to map keys

Natural reflex to find an app which extends on an existing system API. Appears that at some point of time, quite [important changes](https://developer.apple.com/library/content/technotes/tn2450/_index.html#//apple_ref/doc/uid/DTS40017618-CH1-KEY_TABLE_USAGES) happened and that's why you'll see controversial opinions on [Karabiner](https://pqrs.org/osx/karabiner/) "before and after".

So, apart from the app under question, you can go advanced with [BetterTouchTool](https://www.boastr.net/) and similar premium solutions.

In short, there are apps on the market - you can spend time searching and trying and evaluating how much it worths spending money on mapping a key or two if that is your goal ...

### Solution 3: Go low-level

There's [hidutil](http://www.manpagez.com/man/1/hidutil/) and the IOKit HID APIs. Probably there are more, these are the initial options I came upon reading the technical note mentioned earlier. You get the idea here - you do it lightly and your way on the experimentation path.

## What worked for me

To save you time, I'm giving you this right away: [Karabiner](https://pqrs.org/osx/karabiner/).

Basically, my scenario was trickier than standard keyboards because on the left of 1 I have the key for new paragraph (ISO) and not the tilde (ANSI). The discussion in [this issue](https://github.com/tekezo/Karabiner-Elements/issues/931) could already be a hint for you what we're going to do.

Select to the right layout of keyboard:

![Setting up the keyboard](./images/macos-escape-set-keyboard.png)

In my case, I had to select `ANSI` instead of `ISO`, even though the actual hardware keyboard is `ISO`. If you are honest here, as soon as you map the `Esc` on the `non_us_backslack`, your new paragraph key will go on the tilde ... Not cool. Just as in the issue on github.

Then, just do the mapping as you would do if you didn't know about any of the possible edge cases described above ;)

![Setting up the mapping for escape key in MacOS](./images/macos-escape-set-mapping.png)

And that's it! Now that physical key next to the fancy touchbar will be your `Esc` as normal :)
