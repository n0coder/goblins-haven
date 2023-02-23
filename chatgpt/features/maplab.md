# maplab
clickable links to relevant scripts:
[MapData.mjs](https://github.com/n0coder/goblins-haven/blob/main/src/RPG/Engine/LevelEditor/MapData.mjs) - 
[MapLab.mjs](https://github.com/n0coder/goblins-haven/blob/main/src/RPG/Engine/LevelEditor/MapLab.mjs)
---



### n0coder
> can you help me figure out a system for holding, saving and loading the map data? what should we call this system? can you give it a cool robotic name similar to robots in world of warcraft, but the name needs to be related to the map system.
---
### chatgpt
> Sure! Here's an idea for the map system and its name:

> The map system is a collection of map data objects that can be held, saved, and loaded. Each map data object contains information about a single map, including its dimensions, tile data, and any other custom data associated with the map. These map data objects can be created, edited, and deleted as needed.

> As for a name, how about "MapCore"? It sounds like a powerful and robust system for handling all of your map needs, and it has a cool, technological feel to it. Plus, it incorporates the word "core", which suggests that it's a fundamental part of your game's architecture.
---
### n0coder
> that is interesting can you come up with 10 more alternative names?
---
### chatgpt
> Sure, here are 10 alternative names for your map data system:

> MapCortex, TerrainMatrix, WorldSeed, Geoscape, TerrainForge, CartoSynth, TopoGenesis, LandLab, TerraCraft, GeoChamber
---
### n0coder
> my favorites are mapcore, mapcortex, worldseed, and landlab. would you be able to come up with a sorta mix of these names?
---
### chatgpt
> How about "MapLab"? It combines elements from "MapCore" and "LandLab".

> "Map" refers to the project's focus on maps, mapping, and level generation.

> "Lab" is short for laboratory, which often refers to a place where experiments are conducted and new things are discovered or created. In the context of "MapLab", it could refer to the project being a place where new maps and levels are created or experimented with. It could also suggest a sense of exploration, experimentation, and discovery, which could fit well with a game development project.
---
### n0coder
> MapLab sounds cool. what should the visual theme look and feel like?
---
### chatgpt
> The visual theme for MapLab could be modern and sleek, with clean lines and a minimalistic design. It could incorporate a lot of white space and utilize bold typography for headings and important information. The color scheme could include shades of blue and green to evoke a sense of nature and the outdoors, as well as earth tones like browns and grays to give a more grounded feel. The interface could be easy to navigate, with intuitive controls and clear instructions on how to use the various tools and features. Overall, the design should be functional, user-friendly, and visually appealing.
---
### n0coder
> can you generate a maplab js script for me that takes in a p5 instance (p) 
## maplab:
> hold an array of map objects defined like this:

```
[{
level name
description
minOffsetX, minOffsetY 
current editor selected tile
a fallback spawn point (defaults to center mapTexture.png)
mapTexture.png
Custom Tile Rules: 
    [{
        tileX, 
        tileY,
        rules: []
    }]
},{
}]
```
>I would prefer if you made the map object it's own class. lets call them mapdatas
---
### chatgpt
> Sure, here's a MapData class in JavaScript that matches the specifications you provided:
```javascript
class MapData {
  constructor(levelName, description, minOffsetX, minOffsetY, selectedTile, spawnPoint, mapTexture, customTileRules) {
    this.levelName = levelName;
    this.description = description;
    this.minOffsetX = minOffsetX;
    this.minOffsetY = minOffsetY;
    this.selectedTile = selectedTile;
    this.spawnPoint = spawnPoint || { x: mapTexture.width / 2, y: mapTexture.height / 2 };
    this.mapTexture = mapTexture;
    this.customTileRules = customTileRules || [];
  }
}
```
---
### n0coder
> can you show me how to use JSZip to import "map.png" and also a mapdata object with json?
---
### chatgpt
> Sure! Here's an example of how you can use JSZip to import a 'map.png' file and a 'mapdata' JSON object:
```javascript
async function importMap(zipFile) {
  const zip = await JSZip.loadAsync(zipFile);
  const imgData = await zip.file("map.png").async("blob");
  const mapData = await zip.file("map.json").async("string");
  return { imgData, mapData };
}
```
---
### n0coder
> so basically,
```javascript
async importMap(zipFile) {
    const zip = await JSZip.loadAsync(zipFile);
    const mapDataJson = await zip.file("map.json").async ("string");
    const mapData = JSON.parse(mapDataJson);
    const mapBlob = await zip.file(mapData.mapTexturePath).async ("blob");
    this.maps.push({
        mapBlob,
        mapData: new MapData(mapData.levelName, mapData.description, mapData.minOffsetX, mapData.minOffsetY, mapData.currentTile, mapData.fallbackSpawn, mapData.mapTexture, mapData.customTileRules)
    });
    }
}
```
### chatgpt
> Yes, that looks correct! It should work as long as the file paths and variable names match up with your code.

[Back to top](#maplab)