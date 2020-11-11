---
title: "Foundations of world generation"
date: 2020-11-10
description: I've done a bunch of new research on procedural world generation and documented lessons learned, complete with examples and sources.
tags: ['projects', 'glimpse']
draft: false
---

Over the last two weeks I've refined the goals of my own world generator and gone back to the drawing board on how to be successful. This has involved reading up on a ton of prior work, the best of which is provided below.

## Refined goal

My goal is to generate worlds that look good when printed; this project will be successful once I can generate enough high-quality maps to make a coffee table book that I don't have to hide in a drawer. With aesthetics being the primary goal, I'll have to venture not only into the generation of the world but spend some time on how I visualize it -- at a certain point the artistic style of the map may end up being more important than improving the quality of the simulation itself. The closest example to what I'm trying to accomplish is the [fantastic work of Martin O'Leary](http://mewo2.com/notes/terrain/), but I'm striving for a world scale map vs the coastlines he's built.

Examples are abound in fantasy books and games, such as the Game of Thrones world map below; however, these maps are almost always hand-drawn and this project will be 100% machine generated. Here's a [collection of nice maps on Pinterest](https://www.pinterest.com/tristancrwood/fantasy-maps/).

![GoT World](/World_Of_Ice_And_Fire-Game-of-Thrones-Map.jpg)
*Visual from the official Game of Thrones map collection, from [geoawesomeness](https://www.geoawesomeness.com/maps-games-thrones-created/)*

## Brief observations about artistic worldbuilding


### Rules govern realistic maps

Rivers lead to lakes or oceans. Trees tend to grow in forests. Mountains tend to form in ranges. Islands often form in clusters. Deeper water tends to be further from shore. Worlds will be colder in some areas and warmer in others. In many cases, generating realistic maps requires creating the illusion that the process took place. For example, my latest version of glimpse uses a loose approximation of plate tectonics to divide the world into continents -- I'm definitely not modeling the actual process but it creates the right illusion.

![Glimpse continents](/Figure_6.png)
*A world broken up into three continents with a few small islands.*

Most of the interesting simulation problems appear to come in the form "how can I make it look like X?" (forests grew naturally, continents formed over time, rivers have formed lakes, etc). I've found its helpful to understand how the actual system works, or to study patterns of how it looks, to figure out how to create good illusions. 

It's also really useful to have some underlying structure to a map that you can use to create illusions -- over the last two weeks I've completely re-written glimpse for this particular reason. The original version was based on a simple grid and didn't have any underlying structure, but the new version is oriented around [Vonoroi diagrams](https://en.wikipedia.org/wiki/Voronoi_diagram) which forms cells that I'm able to group into various landforms like continents and islands. At the same time this lays a firm foundation for generating mountain ranges, deserts, forests, rivers, etc based around these cells.

Amit Patels' [series of posts on terrain generation](http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/) are widely referenced and immensely helpful. He's got a set of additional references at the bottom of this post.

### Cities 

Cities tend to appear at certain non-random locations, often on major waterways or cross-roads, and often in certain biomes that are more hospitable to human life. Cities often aren't too close or too far from other cities, and come in various sizes. Once I'm generating decent landmasses it should be reasonable to add a variety of cities to any map, potentially including things like geopolitical boundaries between different groups.

I haven't researched this subject in great depth, though Martin O'Leary provides a relatively straightforward approach [here](http://mewo2.com/notes/terrain/).

### Naming places

Continents, oceans, cities, rivers, and other important elements on the map should be named; often these names will involve some context behind why its named what it is, and not just a randomly selected label. In the case of many fanasty worlds, the names of things may be based in part on the culture that they're closest to (those that named the thing).

### Artistic style

Ultimately the artistic style is going to heavily influence the quality of the final product, and it needs to be optimized for printed format (coffee table book!). I'm going to avoid digitizing any effects like crumpled/stained paper, but do want to make the map feel like something you could find in a fantasy book. Lots more to come on this, and here are a few of the resources I've been studying:

* Visualization extensions to [O'Learly's work](https://imgur.com/gallery/z2hnk)
* Scott Turner recently published some pencil effects for mapmaking on his blog, [Here Dragons Abound](https://heredragonsabound.blogspot.com/) 
* [Azgaar's blog](https://azgaar.wordpress.com/)
* [reliefshading.com](http://www.reliefshading.com/examples/)

## Next

My general approach is to iteratively improve on the components listed above -- get to something 'good enough' then move on to the next. Landform generation is actually working out pretty well in my new Voronoi-based version of glimpse, but the elevation map is still pretty boring. I'd like to get elevation working well enough that I can support clear mountain ranges as well as lakes formed by watersheds (water running downhill and pooling at low points). 

Once I've got elevation in a good spot, I want to do a basic no-frills version of city generation and then switch to rendering for a bit. All of these categories will still need more polish, but this should give me the basic building blocks that I can gradually improve over time.