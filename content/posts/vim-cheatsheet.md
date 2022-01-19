---
title: VIM commands cheatsheet
date: '2022-01-20T00:00:00+02:00'
template: 'post'
draft: false
slug: vim-cheatsheet
category: 'Tools'
tags:
  - VIM
  - Productivity
description: 'Sharing the most useful VIM commands and combinations I use daily.'
---

![The logo of VS Code VIM extension](/media/vscodevim.png)

## Introduction

I have been [learning VIM](learning-vim) for the last couple of years. Not so much the editor itself but the way of thinking and commands. I have been sticking with using [VS Code's VIM extension](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) and the time has come for me to share what I find most worthy and useful.

## Cheatsheet 🎁

To make it quick and straight-to-the-point, here it is!

The sheet is an embedded gist which means it's a an actively maintained piece of information which you can [like, fork or comment](https://gist.github.com/kalinchernev/aad31a60c2a5503700bd7ca905e24186#file-vim_cheatsheet-md).

<script src="https://gist.github.com/kalinchernev/aad31a60c2a5503700bd7ca905e24186.js"></script>

## Examples 🥷

Here is the longer version of the above: how exactly are these useful?

### Go to a specific variable and wrap it in brackets

Useful when a callback parameter should be refactored to a new prettier config for later typescript type annotation:

![Go to and wrap in brackets](/media/goto_wrap_brackets.gif)

The steps:

- Search `/` a given word, i.e.`edge`
- Press enter to save the pattern
- Press `n` to repeatedly apply the search until you have reached the right match
- Yank the word `cw` leaving you in an insert mode
- Type `(` which should autoclose, depending on VS Code configurations
- Press escape when having `()`
- Press `p` to put back the previously yanked word
