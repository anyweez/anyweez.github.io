---
title: "Glimpse: mid-Nov update"
date: 2020-11-20
description: We've made progress! Glimpse is starting to come to life. My latest update include lakes, forests, cities, named points of interest, higher resolution maps, vector outputs, and a new color scheme.
draft: false
---

We've made progress! [Glimpse](https://lukesegars.com/posts/my-procedural-world-generator) is starting to come to life.

![Glimpse mid-Nov](/Glimpse-MidNov-Demo1.png)
*New worlds are far more interesting than they were [last week](/posts/foundations-of-world-generation/). White dots are cities, heatmap is elevation.*

The new maps have a lot of the improvements I laid out in my [last article](/posts/foundations-of-world-generation/). There's still a lot of work to do artistically on making these ready to print, but feature-wise we're getting pretty close to v1. Primary improvements are:

* **Forests, lakes, and channels.** Forests (green triangles) are still pretty rudimentary but have some fairly believable clustering behavior and tend to vary a lot from map to map; I probably won't make any massive improvements until biomes and/or climates exists. Lakes worked out really well - they're formed by rainfall simulations that determine where water pools up (watersheds). In the map above you can see a lake in the middle of the mountainous island on the left that formed between all the mountains, [Interlaken style](https://en.wikipedia.org/wiki/Interlaken) -- so cool. Channels began to form somewhat naturally when I introduced lakes / rainfall simulations.
* **Cities and named points of interest.** Three important topics to talk about here: cultures, languages, and POI detection. See the section below for more information as this is both really cool today and has a lot of future potential.
* **Better elevation variety.** My older maps supported elevation across multiple continents but every continent ended up having very similar topological properties - if one was mountainous, they were all mountainous. This makes sense for maps representing smaller areas, but not for world-scale maps. I've adjusted elevation to be more of a local property vs global property, which makes the maps a lot more visually interesting.
* **Increased resolution.** My older maps look a lot blockier than these do; the blockiness is determined by the number of cells in the map -- more smaller cells are less noticeable than fewer larger cells. I made a number of performance improvements to make it reasonable to generate larger maps with an emphasis on scaling into very large maps. The cells shouldn't be visible at all in larger 'print quality' maps.
* **Vector output.** I completely switched out the old renderer (pyplot-based) because I was running into limits with it; one of the most important is that I need to be able to export to SVG format both for higher-resolution printing and the ability to zoom to potentially include content focused on particular regions in the final product. The new renderer is Cairo-based and can output PNG or SVG format and offers much more visual flexibility.
* **New color scheme.** This wasn't that much work but made the maps look a lot better, and is encouraging that further refinement will keep making the maps look better. The color scheme is currently based around a green-to-red elevation heatmap, and I also introduced a color for deeper water to break up the boring blue seas.

[Technical notes](https://github.com/anyweez/glimpse/wiki) will live on Github once I take a breather.

### More on cities and named points of interest

Hit some serious flow with this one; in the span of 24hrs I conceptualized and implemented cultures, languages, and points of interest.

In my simulation, a culture is a combination of settlement rules (where cities form) and a language (used for naming). Any map can have any number of cultures, and cultures can represent anything from mythical races (dwarves who prefer mountain life, elves who always live in forests, and seafaring humans that live by the coast) to distinct cultures of people -- it's quite flexible. When placing cities, I'm scoring a random selection of cells according to the culture's settlement rules -- I started with [this description](http://mewo2.com/notes/terrain/) but abstracted it further into three core ideas that every culture has: 

1. a **survivability score** (what do you need to thrive, and does this place have it?); in the map above, the only constraint is that the culture must live on land.
2. an **economy score** (what makes this place thrive, and does this place have it?); in the map above, its beneficial but not required to have other cities reachable over land.
3. a **threat score** (what decreases odds of survival, and does this place have it?); in the map above, its dangerous to have other cities too close by.

Languages were even more fun. My original approach here was to manually create a list of acceptable names, but I found this produced incredibly dull results, especially if I need to populate an entire book. I started looking around for other approaches and quickly stumbled across [recurrent neural networks](https://en.wikipedia.org/wiki/Recurrent_neural_network) (RNNs), which I've studied but never used. They're fairly well-known for generating names (or more generally, logical character sequences) given many examples, and I found a [very useful example](https://github.com/tadeaspaule/universal-name-generator) built off of Tensorflow, Google's publicly available machine learning library, that I've intergrated into my own project. I searched around and found lists of hundreds of Scottish town names (that's almost medieval, right?) and am now generating a completely dynamic set of names for each map based off of that training set. All of the Scottish town names are part of my "English" language, but I can also create any number of other languages (real or fantasy) based on distinct training sets. Watch out, Tolkien.

Naturally, my pulse was racing so I decided that I wanted to use these languages to name things like mountains and lakes as well. The only problem was that thus far I've only been drawing elevation and dropping water on the map -- there was really no such thing as a "mountain" or a "lake". I introduced a new module that scans over the map once it's been built to detect points of interest and then assigns names to them based on the nearest culture's language -- for example, if a mountain is near an English-speaking town the I assume that the mountain has an English name and I use that culture's RNN to generate it.

I still need to improve the language quality (i.e. get more training examples), but here are some names that the English RNNs produced for the map above. Each one is assigned to a particular city/lake/mountain.

* New Fochara
* Dunmahog
* Lochalar
* Stranran Harbor
* Lake Obaine
* Lake Nairn
* Mount Lolligh

Pretty darn fun.

### North star

I've also been thinking a bit more about the product itself (coffee table book) and I'm going to reach out to some friends who enjoy worldbuilding (D&D, roleplaying, etc) to see if they want to establish some lore for these worlds. I think the book will be a lot more interesting if there's some "history" to each place and not just the visuals themselves.

There are only a few key features left, though there's still a good bit of time required to polish the system to improve quality. My current plan is to finish getting features implemented and then turning my full attention to quality. Remaining features include:

* Rivers
* Basic biomes
* City sizes (capitals at minimum)
* New print-focused visual theme and styling

I'm also going to be accepting feature requests from my writers if the feature will significantly improve the quality of the lore.