/* how i generated this class using chatgpt:
 https://github.com/n0coder/goblins-haven/blob/main/chatgpt/features/maplab.md
 */
import {MapData} from "./MapData.mjs";
export class MapLab {
    constructor(p) {
        this.p = p;
        this.maps = [];
    }

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
    async exportMap(map) {

    }
    saveMap() {

    }
    loadMap() {
        
    }
}
