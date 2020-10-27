---
title: "My procedural world generator"
date: 2020-10-26
description: I grew up interested in fantasy worlds and have been hooked on the idea of building them since I was in middle school. Programmatically generating these worlds is one of my go-to projects when I feel like coding, and I've been merging a few of these efforts into a single codebase that I can add onto every now and then to gradually get better results.
tags: ['projects', 'glimpse']
draft: false
---

I grew up interested in fantasy worlds and have been hooked on the idea of building them since I was in middle school. Programmatically generating these worlds is one of my go-to projects when I feel like coding, and I've been merging a few of these efforts into a single codebase that I can add onto every now and then to gradually get better results. It's way too fun, even if the world quality still isn't very good yet.

Building world generators has also been a surprisingly good way to learn more about how our planet formed; in many cases you're shortcutting around actual geological processes, but I've gotten lost reading about plate tectonics, watersheds, aquifers, and ecology on more than one occasion while working out how to simulate something. Its also been interesting to hear how others build fantasy worlds, both technically (video games) and via narratives (novels/fiction).

## Introducing glimpse

My simulator is called glimpse and lives [here](https://github.com/anyweez/glimpse); I'll be building a website with a gallery before long but don't have that yet. Ultimately the goal of the project is to be able to generate interesting fantasy worlds. Here's a visualization of a small world I generated from an early version:

![Example small landform from Glimpse](https://camo.githubusercontent.com/8cb5710f8259da24d830c670bc249a914a7a97f8/68747470733a2f2f616e797765657a2e6769746875622e696f2f676c696d7073652f696d672f7465727261696e2e706e67)
*Example small landform from Glimpse*

Even a simple visualization like this accounts for some important factors like erosion, rainfall & evaporation, aquifers/water tables, and a few different terrain types (rocks, sand, grass, etc). You can see a mountain range in gray that leads to a grassland, that ultimately results in a lake with some beaches on it. Certain mountains are tall and snow-covered, and certain water is deeper than the rest.

Can it get better, you ask? All in good time.

## Where we're heading

An important short-term goal is to come up with some way to measure the quality of worlds that glimpse generates so that its a bit easier to know whether changes that I make are helping or hurting. This can be done qualitatively, of course, but given the amount of randomness involved in each world its hard to know when you've sampled enough...this also gets pretty repetitive. My instinct at this point is that I may need to create some sort of classifier to separate nice maps from rejects, which could be useful on a couple of fronts if I can get it right.

Once I have a way to measure progress, there are a bunch of cool things I can add -- climate, forests, towns, and roads are some of the features on [the list](https://github.com/anyweez/glimpse/issues) today. My intent is to document some of these features, how I implemented them, and how doing so changed my understanding of them in regular life. I'll post again once I have more to show.