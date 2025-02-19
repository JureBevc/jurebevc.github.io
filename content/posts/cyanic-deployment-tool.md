---
title: "Cyanic - A blue/green deployment tool"
date: 2025-01-03T21:14:30+02:00
draft: false

tags:
  - "Go"
  - "Tool"
  - "Deployment"
---

## Introduction

I’ve been working a tool that has changed the way I handle application deployments for personal projects. I developed [Cyanic](https://github.com/JureBevc/cyanic), a lightweight blue-green deployment tool written in Go. This journey has been incredibly rewarding, and I think it might resonate with fellow developers looking for a simpler way to manage deployments.

## Why Build Cyanic

For those who might not be familiar, blue-green deployment is a strategy that allows you to switch between two identical environments—let’s call them "blue" and "green"—to ensure smooth updates with minimal downtime. Traditionally, this can be complex, but I wanted to create a tool that simplifies this process, especially for small to medium-sized applications.

As I was working on personal projects and smaller applications, I found that many deployment tools were either too complicated or tied to Docker, which I wasn’t using. I wanted something straightforward that could run behind an Nginx proxy without the fuss. So, I rolled up my sleeves and created Cyanic.

## Getting Started with Cyanic

You have two options for installation:

1. Download the Compiled Program: If you want to skip the setup hassle, you can simply download the precompiled binary directly from the releases section on the [Cyanic GitHub Repository](https://github.com/JureBevc/cyanic/releases/). This is the quickest way to get up and running.

2. Install from Source: If you prefer to build from source or want to customize it, you can install Cyanic as a Go package.
```go
go get -u github.com/JureBevc/cyanic
```

Just a quick note: you’ll need a few dependencies on your deployment server, such as nginx, systemctl, disown, and fuser. But if you’re already running a server, you probably have those covered.


## Using Cyanic
Cyanic has a range of commands that make deploying and managing applications a breeze. Here are some of my favorites:

Help Command: Whenever I need a quick reminder of the commands, I just run:

```bash
cyanic help
```

To push my latest changes to staging, I simply use:

```bash
cyanic deploy-staging
```

Once I’m ready to go live, swapping environments takes just one command:

```bash
cyanic swap
```

I can quickly check the health of my applications with:

```bash
cyanic health-staging
cyanic health-production
```

For a fully automated deploy, I use:

```bash
cyanic full-deploy
```
This command handles everything—from deploying to staging, running health checks, swapping, and checking production again.



## Configuration

Cyanic uses a configuration file (cyanic.yaml) where you can specify your deployment settings. I made sure to include examples in the repository to help you get started quickly. Having a structured way to manage settings has made my deployments more organized and less prone to error.

## Conclusion
If you’re looking for a straightforward tool to manage blue-green deployments without the overhead of Docker or complicated setups, I recommend giving Cyanic a shot.You can check out the [Cyanic GitHub Repository](https://github.com/JureBevc/cyanic/) to get started. I’d love to hear your thoughts and any experiences you’ve had with deployment tools.
