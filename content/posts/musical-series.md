---
title: "Musical series"
date: 2023-08-18T17:40:52+02:00
draft: false

tags:
  - "Javascript"
---

There are several wonderful ways to visualize and represent numbers,
but one that interesed me the most is doing it through music. Since
there are no simple and widely available tools to transform
arbitrary numbers into music, I decided to make my own.

The most popular musical scales are the major and the minor scales,
each with 7 unique notes. One can simply translate a number to a
musical scale, by playing the first note for number 0, the second
note for number 1 and so on. If the number we are trying to play is
greater than the number of notes, then you loop around again to the
first note.

Using this simple idea, I made a
[website](https://jurebevc.com/musical-series) that
allows you to play any sequence of numbers in any major or minor
scale. There is a "How to use" section inside the tool for those who
wish to explore for themselves, otherwise there are some interesting
presets available.

![Image alt](/musical-series-example.png)
<img src="/musical-series-example.png"/>

The tool is made in pure javascript with no external libraries. The
source code of this project is available on my [GitHub](https://github.com/JureBevc/musical-series).