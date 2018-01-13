---
title: Fixing my mobile phone
slug: fixing-mobile-phone
date: 2017-09-29T23:33:31+00:00
tags:
- Misc
---

## Introduction

One of the most popular requests I get around Christmas when I meet family
is to fix mobile phones - you name it - some issues with different SIM cards,
mobile Internet, optimizing space and memory, etc. I personally don't like
modifying my own phone and try to be really honest with people that I just don't
know a lot about mobile technologies which are out of the scope of making apps.

During my holidays this year I started to have struggles with my
ALE-L21: I was never able to share Internet from mobile data via hotspot,
the welcome screen was getting sluggish, and all Google apps were getting
slower. For me, that's uncomfortable since we speak about a phone which,
although the not-so-high-end-specs, has always been practical enough for me.
I researched the latest phones in a similar model range, and my conclusion was
that this time I will have to find a way to tweak the phone a bit, rather than
buying a new one because "this one is getting old".

### Losing a few kilos is easy

In the beginning, cleaning some app cache, removing unnecessary apps and things
like this helped a bit to speed up the performance, but the gains were mainly
in the freed storage space. For example, [Facebook Lite](https://play.google.com/store/apps/details?id=com.facebook.lite&hl=en)
combines both main and messenger apps in less than 2MB, which is x70 times less
than 84MB + 56MB for both otherwise. And btw, the user experience is still good.

### The factory reset

In ALE-L21 there are regular updates to the official EMUI. Normally, making a
hard reset means a clean start in a comparatively safe way after a backup.
Though, I had bad experience figuring that the factory version of Google Play Services
under the last official update of the EMUI was simply [unable to log me in](Cannot connect or communicate with Google servers).
Particularly nasty when I needed to install the Google Authenticator
to be able to pass 2FA to a service which I had to demo during the day. The way
I managed to solve this problem was installing the latest version of the service
from [the mirror](https://www.apkmirror.com/apk/google-inc/google-play-services/).

The factory reset was a huge performance gain. After it, even the welcome screen
does not freeze or slow down any more. Together with cache reset, the phone feels
like new.

### Mobile operator drama

Interestingly enough, other problems I had, such as not being able to share mobile
data, appeared to be purely operator-specific. With a bit of phone-blame, of course.

For Mobile Vikings, it appeared that a simple difference between `supl` and `default, supl`
[configurations](https://mobilevikings.be/en/v2/setup/?page=device/huawei/p8-lite/topic/internet/manual-configuration/14)
is telling the phone apart from being able to use some services or not. In addition,
[debugging](https://forums.lenovo.com/t5/Moto-G4-Moto-G4-Plus-Moto-G4/Moto-G-mobile-hotspot-no-internet-connection/m-p/3666348#M23145) the reason why an APN of my homeland Vivacom would work on SIM2, reglarless of the SIM slot, in
hotspot sharing, and Mobile Viking wouldn't - it appeared that the default APN
of another mobile operator was the non-active first option which was messing around.
Resetting these settings and modifying the settings a bit enabled both mobile
operators to be equally good hotspot providers.

### Conclusions

I don't feel like a specialist in tweaking my mobile phone, as I am a dumb
user who don't want to root his phone, change ROM, etc. for speeding up a bit.
I'm happy reviving a 2-year-old phone and being able to maximize its use
for the functions I need.

I also still don't think that developers are to be expected to be able to fix
any technical problem at hand. Though, going through all these issues
and having my final positive result at hand, I tend to believe that anyone
with enough interest of debugging and optimizing systems would do a good phone
technician.
