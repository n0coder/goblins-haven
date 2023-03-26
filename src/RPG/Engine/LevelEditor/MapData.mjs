import { experiments } from "../../../DumbExperiment.mjs";

/* how i generated this class using chatgpt:
 https://github.com/n0coder/goblins-haven/blob/main/chatgpt/features/maplab.md
 */
export class MapData {
    constructor(levelName, description, levelId, minOffsetX, minOffsetY, selectedTile, spawnPointFallback, mapTexturePath, customTileRules) {
      this.levelName = levelName;
      this.description = description;
      this.levelId = levelId || experiments.modStringFunny(`${Date.now()}`); 
      this.minOffsetX = minOffsetX;
      this.minOffsetY = minOffsetY;
      this.selectedTile = selectedTile;
      this.spawnPointFallback = spawnPointFallback || { x: 0, y: 0 };
      this.mapTexturePath = mapTexturePath;
      this.customTileRules = customTileRules || [];
    }
  }