---
title: Learning VIM
slug: learning-vim
date: '2019-04-21T12:10:11+02:00'
template: 'post'
draft: false
category: 'Tools'
tags:
  - Tools
  - Productivity
  - Vim
description: 'Shared thoughts on starting to learn VIM.'
---

Learning [Vim](https://www.vim.org/) and its ideology has been a personal quest for several years. The journey started with [vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en) so that I can learn "how to walk". Later, I started experimenting with editor extensions such as [ideavim](https://github.com/JetBrains/ideavim) and [VSCodeVim](https://github.com/VSCodeVim/Vim).

I tried to learn Vim on-the-go and not from scratch, as most people probably do. That played its part in lack of focus, though I aimed to remain decently productive in my work AND upgrade my skills at the same time, gradually.

Do not take the following story as guide or a lesson. It's not meant to be one. It's a shared story, nothing more and nothing less.

## Mistakes

Here I've gathered a non-exhaustive list of mistakes that come to mind when I reflect on my learning path and what I could have done better.

The lack of focus was my first mistake. **Taking on learning several tools at the same time was not an optimal approach.**

Atom, my previous primary editor wasn't that bad, but seeing almost all the cool gurus using VS Code made me think: ok, I can use the opportunity to learn a new editor and learn Vim magic at the same time.

Mistake, mixing editor shortcuts with key combinations was not productive. So, I took a step back to use the editor without the Vim extension, got along with it, adding the extension when I felt comfortable with the editor.

And no, I didn't reconfigure VS Code shortcuts to match what I knew from Atom, because I am not a fan of spending too much time tweaking defaults. Saving settings in files (or gists) could be considered a safe option for keeping personalization. However, I'd rather learn the defaults so that I'm not helpless on other people's machines without my super personalized tweaks.

**My second mistake was my way of thinking**.

I thought that knowing how to walk (vimium) will suffice for having the Vim mode on all the time in my editor. That was not the case because I was trying to solve problems in the same way I'd solve them in non-Vim mode. Meaning, I'd move with `h-j-k-l` and switch between normal and insert modes. That was as smart and efficient as having a bread slicing machine and using it for holding the bread still while cutting it with a regular knife.

Then I came upon [this article](https://www.barbarianmeetscoding.com/blog/2019/02/08/boost-your-coding-fu-with-vscode-and-vim) which helped me understand that I approached learning Vim from the wrong perspective. It's not about movements and optimal use of new shortcuts. So I took on the approach of learning at least one new combination each day and improve with time.

## What worked

After sharing about my mistakes, let's mention how I'd approach the learning process from my current perspective.

I'd probably still start with a browser extension and learn how to walk without using Vim as an editor.

Next, I'd do:

```sh
$ vimtutor
```

Then, I'd go and read a few tutorials with useful combinations which make sense to me in every-day tasks, such as deleting words and lines, working with text within specific scopes such as tags, brackets, etc. Up to this point, I'd feel confident I am at least as productive in my editor as I were before taking on Vim.

From this point on, I plan to slowly internalize ideas from [Practical Vim](https://pragprog.com/book/dnvim2/practical-vim-second-edition) and other places which work on the way-of-thinking approach and solving specific use-cases more effectively.

I've already researched on using `gvim` and `neovim`, but I don't see a good reason not to continue with VS Code for now.

I wish I had asked myself why the cool gurus are suggesting it before I started learning it. It helps to have the end goal in mind before starting. To be honest, I don't plan to have my custom vim scripts or plugins, but use defaults in emulators, use those basics which are universal but powerful enough to make me efficient, with the right way of thinking ;)
