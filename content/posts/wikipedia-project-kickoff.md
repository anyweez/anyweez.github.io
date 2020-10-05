---
title: "Wikipedia Project: Kickoff"
date: 2020-07-25
description: Test description
tags: ["wikipedia-project" ]
draft: true
---

I've got a theory that there's a lot to learn from Wikipedia that isn't visible on the website; in particular there's likely never been a better resource for describing how ideas are related than the Wikipedia link graph, but there also isn't a huge body of work analyzing it.

The good news is that Wikipedia makes *the entire Wikipedia dataset* freely available online; it can be downloaded [here](https://en.wikipedia.org/wiki/Wikipedia:Database_download), though the volume of data is pretty daunting. I'm going to kick off a project to investigate the Wikipedia graph with a particular focus on making it easier to understand relationships between topics. 

I'll be making some technical posts as well as documenting some of my non-technicals observations from studying the graph. Follow-up posts will all be tagged as [wikipedia-project](/tags/wikipedia-project); stay tuned for more! I've got some ideas for tools that may come out of this, but don't have anything available to announce at this time.

### Phase 1: foundations

I need to get the Wikipedia dataset into an accessible format for running additional analyses. We're going to need to be able to compare articles against other documents (textbooks, course transcripts, etc) and analyze the structure of the Wikipedia graph to better understand the important relationships between topics.

### Phase 2: traditional categories

Traditional categories are the topics we typically use to cluster things in school curricula, bookstore shelves, libraries, etc; this includes buckets like "history", "accounting", "philosophy", and "chemistry" -- I need to figure out how to identify which categories (roughly) apply to each of the millions of topics on the wiki.

This will also give us a chance to understand the degree of overlap between the traditional categories.

### Phase 3: connecting the unconnected

In Phase 3 we should be able to compare arbitrary topics for "similarity" (to be defined), and compare this to the traditional categories. I expect this phase to start with a fairly in-depth analysis of the structure of the Wikipedia graph.