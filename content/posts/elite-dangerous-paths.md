---
title: "Elite Dangerous Paths"
date: 2016-10-14
description: You know how when you go for a while without practicing your data structures you just feel an undying urge to put them to good use? The frontend for this project was my first foray into React and Redux, and the backend was designed to perform real-time routing among the millions and millions of discovered galaxy in the absolutely massive world of [Elite Dangerous](https://www.elitedangerous.com/).
tags: ['projects']
draft: false
---

Elite Dangerous is a popular spacefaring game that puts you in the middle of an absolutely massive universe (~400 billion explorable galaxies) with a variety of objectives to accomplish. Navigation is therefore pretty important to the game, and different ships and ship upgrades allow you to travel further than others, so different pilots will operate under different constraints based on the ship they're flying.

The navigation tools in the game are good enough if you're trying to plan simple routes between points, but it's tough to do anything more complex using the in-game tools, including:

1) Finding galaxies to meet one or more friends based on everyone's current locations (and ships/components)
2) Planning more complex routes that include potential ship swaps (if efficient)
3) Navigating around dangerous regions

The purpose of this project was to create a tool that my friends and I could use to easy plan routes when the existing tools came up short. Technically, it's also an opportunity to dust of my data structures, and my first attempt at React + Redux. The search service itself is written in Golang. My repository is [here](https://github.com/anyweez/edpaths).

## How I search

The search is based on [A* search](https://en.wikipedia.org/wiki/A*_search_algorithm) of the universe graph; one of the more interesting parts of this search problem is that nodes (galaxies) are well-defined, but the available edges will depend on how far a specific ship can travel. For example, a cheaper ship may be able to jump three light years, and a more expensive ship may be able to jump eight light years. Paths that are six light years long will be available to the latter but not the former. This means that the edges available in the graph will vary from query to query.

In order to accomodate a distinct set of edges, I divide the universe up into a 3D grid with each cell of the grid potentially containing thousands of individual galaxies. I only include galaxies from cells that are within the query's max jump range (i.e. three or eight light years above). 

This dramatically reduces the cost of an individual step in the search process and improves the performance by 100-500x on average queries. Furthermore, query-specific edge lists are generated dynamically and the full edge list is never stored in memory, so this approach makes it possible to run many queries at once without encountering memory issues.

Lastly, ships have fuel limits and only certain galaxies offer refueling services; my results can't drop you off in the middle of a dark galaxy with no fuel, so I need to be "fuel-aware" with my routing. Each galaxy has a flag indicating whether fuel is available, and the search algorithm tracks fuel consumption as you go, termininating routes that result in an empty tank before you get to your destination.

## Additional notes

More information is available on Github, but a few things worth calling out here:

* There are a number of community-provided data dumps that contain galaxy information; my search tool uses [EDDB](https://eddb.io/api) which gives me a solid, community-powered source of truth for raw galaxy information.
* The system is designed for on-line interactions, i.e. performance matters. Most queries complete in under a second based on the Oct 2016 galaxy list, which is very sufficient for my use case.
* The UI is very light and insufficient for many of the use cases that I'd like to support, but the core routing logic is exposed via an endpoint that can be used with a variety of different frontends, including use cases that perform many searches in parallel.