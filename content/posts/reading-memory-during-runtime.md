---
title: "Reading Memory During Runtime"
date: 2023-08-19T12:36:58+02:00
draft: false

tags:
  - "Python"
  - "Memory"
---

## What and why

Lately, I've been curious about reading the memory of a process during runtime. There are several use cases for this, but the ones that piqued my interest are anti-virus software and (illegal) botting software for video games. Game companies can invest a lot of resources into solving botting issues, but consistently detecting programs that read your game's memory can be very difficult if the programs are not injecting anything directly into your running process.

The example I'm showing here is about reading a potential "health" or "hit points" value from a game's process memory.

## The problem

So here's the main idea: *We want to read the memory of any process currently running on our machine, without injecting our own code into it.* 

To do this, we have to solve two main problems regarding the data we're interested in:

1. Find where the current process has stored the data in the memory.

2. Find out how the memory location of the data changes when the process is restarted.

## Finding the data of interest

Once the process you're interested in is up and running, finding the current address of the desired data is relatively simple. [Cheat Engine](https://www.cheatengine.org/) is a great (and free) tool for this job. For example, searching for your "hit points" data can be as simple as looking at your value in-game and scanner for the value in Cheat Engine:

![Alt text](/cheat-engine-scan.png)

There are many different values that can match the once you're scanning for, but if you change the value in-game and scan again, the remaing list of possible addresses will get smaller and smaller. Once you have only one address left that changes accordingly, you found the address you're looking for.

So it seems we have what we need and we're done? Well, this solution only covers the first problem mentioned at the beginning - finding the *current* process has stored the data. But once a process is restarted there is no guarantee that the value will be stored in the exact same memory address. 

## Pointer offsets

So how can we keep track of values in the process memory, even if the process is restarted? A trivial solution would be to simply repeat the manual search again, keeping track of the changing values and scanning until we found our address again. But this is out of the question, if we want to write a tool that we deliver to other users. 

Cheat Engine can help us here as well. In Cheat Engine, comparing pointermaps is a technique used to identify static memory addresses in a program, even when the program's base address changes due to updates or restarts. Pointermaps are an essential part of the process when working with dynamic memory addresses. There are several good guides and videos that go into depth explaining how to create and compare pointermaps, but in this case it's only important to keep in mind the result that this technique brings us.

The result of comparing pointermaps is that we're no longer dealing with memory addresses directly, but with pointers that lead us to the final memory address. These pointer paths are given by so-called offsets, which we can then use to track our desired data, no matter how many times the process is restarted. Here's how these pointer offsets look like when scanning for a particular memory address:

![Alt text](/pointer-scan.png)

As you can see, there are many pointer offsets that can match a given memory address, that is why we compare multiple pointer scans, until we find a set of offsets that work for our use-case.

This approach requires us to do one extra step in our program, where we calculate the actual address with pointer offsets, so that we can read the address later. This is an example in Python using the [Pymem](https://github.com/srounet/Pymem) module:

![Image alt](/calculate-address.png)
<img src="/calculate-address.png"/>


## Using the address

Once we have calculated the desired address, reading the actual value with Pymem is simple:

![Image alt](/read-memory.png)
<img src="/read-memory.png"/>

This example demonstrates reading an integer value from memory, but the approach extends to other data types and larger memory portions, such as data structures like lists, maps, and trees.