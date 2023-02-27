/* how i generated this class using chatgpt:
 https://github.com/n0coder/goblins-haven/blob/main/chatgpt/features/maplab.md
 */
import {MapData} from "./MapData.mjs";
export class MapLab {
    constructor(p) {
        this.p = p;
        this.maps = [];
        this.currentMap; // what style do i go for... always open, modification creates new and sets dirty?
        this.onMapChanged;
    }

    async importMapZip(zipFile) {
        const zip = await JSZip.loadAsync(zipFile);

        let isMappack = zip.hasOwnProperty("mappack.json");

        if (isMappack) { // Handle map pack import
            const mapDataJson = await zip.file("mappack.json").async ("string");
            const mapPackData = JSON.parse(mapDataJson);

            for (let i = 0; i < mapPackData.maps.length; i++) {
                const mapDataInPack = mapPackData.maps[i];
                // essentially mappacks are regular maps with an index in a levels folder
                const mapDataJson = await zip.file(`levels/${i}/${
                    mapDataInPack.mapTexturePath
                }`).async ("string");
                const mapData = JSON.parse(mapDataJson);
                const mapBlob = await zip.file(`levels/${i}/${
                    mapData.mapTexturePath
                }`).async ("blob");
                const mapImg = await this.createImage(mapBlob);
                const map = new MapData(mapData.levelName, mapData.description, mapData.levelId, mapData.minOffsetX, mapData.minOffsetY, mapData.currentTile, mapData.fallbackSpawn, mapData.mapTexture, mapData.customTileRules);
                this.maps.push({mapImg, mapData: map});
            }
        } else { // Handle single map import
            const mapDataJson = await zip.file("map.json").async ("string");
            const mapData = JSON.parse(mapDataJson);
            const mapBlob = await zip.file(mapData.mapTexturePath).async ("blob");
            const mapImg = await this.createImage(mapBlob);
            const map = new MapData(mapData.levelName, mapData.description, mapData.levelId, mapData.minOffsetX, mapData.minOffsetY, mapData.currentTile, mapData.fallbackSpawn, mapData.mapTexture, mapData.customTileRules);
            this.maps.push({mapImg, mapData: map});
        }
    }


    async importMapZip(zipFile) {
        const zip = await JSZip.loadAsync(zipFile);

    }

    async exportMap(map, extra) {
        const zipData = await this.createZip(`${mapName}.zip`, async (zip) => {
            zip.file("map.png", map.mapImg);
            zip.file("map.json", map.mapJson);
            if (extra) 
                await extra(zip)


            


        });
    }
    async exportMapPack(maps, packName, extra) {
        const zipData = await this.createZip(`${packName}.zip`, async (zip) => {
            const levelsFolder = zip.folder('levels');
            for (let i = 0; i < maps.length; i++) {
                const mapFolder = levelsFolder.folder(`${i}`);
                const map = maps[i];
                const mapName = `map${
                    i + 1
                }`;
                mapFolder.file(`${mapName}.png`, map.mapImg);
                mapFolder.file(`${mapName}.json`, map.mapJson);
                if (extra) 
                    await extra(mapFolder, map, mapName);
                


            }
        });
    }
    async saveDirtyCheck() { 
        if (this.currentMap?.dirty) {
          const result = await showConfirmationDialog("Save changes before creating a new map?");
          if (result === "yes") {
            await this.saveMap();
          } else if (result === "cancel") {
            return false;
          }
        }
        return true;
      }
      
      async showConfirmationDialog(message) {
        return new Promise(resolve => {
          const confirmationDialog = document.createElement("div");
          confirmationDialog.classList.add("confirmation-dialog");
          const messageContainer = document.createElement("div");
          messageContainer.innerText = message;
          const buttonContainer = document.createElement("div");
          const yesButton = document.createElement("button");
          yesButton.innerText = "Yes";
          const noButton = document.createElement("button");
          noButton.innerText = "No";
          const cancelButton = document.createElement("button");
          cancelButton.innerText = "Cancel";
          buttonContainer.appendChild(yesButton);
          buttonContainer.appendChild(noButton);
          buttonContainer.appendChild(cancelButton);
          confirmationDialog.appendChild(messageContainer);
          confirmationDialog.appendChild(buttonContainer);
          document.body.appendChild(confirmationDialog);
          yesButton.addEventListener("click", () => {
            confirmationDialog.remove();
            resolve("yes");
          });
          noButton.addEventListener("click", () => {
            confirmationDialog.remove();
            resolve("no");
          });
          cancelButton.addEventListener("click", () => {
            confirmationDialog.remove();
            resolve("cancel");
          });
        });
      }
    newMap() {
        if ( this.saveDirtyCheck() ) 
            this.setCurrentMap({ // sets current map and calls the map changed function
                mapImg: undefined,
                mapData: new MapData("Empty", "a blank map", undefined, 0, 0, undefined, undefined, undefined, undefined),
                dirty: false // an unmodified empty map is not worth new/unload protecting lol
            })
         // now load the map into the editor... < maybe this is open in the editor by setting currentMap
    }
    saveMap() { // Check if there is a current map and it is dirty
        console.log("save needs a way to 'save' the grid png")
        if (this.currentMap && this.currentMap.dirty) { // Search for an existing map with the same levelName in the maps array
            const index = this.maps.findIndex((map) => map.levelId === this.currentMap.levelId);

            if (index !== -1) { // If the map already exists, replace it with the current map
                this.maps[index] = this.currentMap;
            } else { // If the map doesn't exist, add it to the end of the maps array
                this.maps.push(this.currentMap);
            }
            this.currentMap.dirty = false;
        } else if (!this.currentMap) {
            console.log("no current map to save")
        }
    }
    setCurrentMap(map) {
        const oldMap = this.currentMap;
        this.currentMap = map;
        this.currentMap.dirty = false; // ?
        if (this.onMapChanged) 
            this.onMapChanged(oldMap, this.currentMap);
        


    }
    loadMap(map) {
        // this is the hardest part... taking the map from the grid and evaluating data based on it...
        // this will load the chosen map png into the map...
        // we will also load the map data...
        // not hard it's a mental barrier... kinda exciting tho lol...
        if (currentMap ?. dirty) {
            const confirmSave = confirm("Do you want to save changes before creating a new map?");
            if (confirmSave) {
                saveMap();
            }
        }
        this.setCurrentMap(map)
    }

    async createImage(mapBlob) {
        const url = URL.createObjectURL(mapBlob);
        const mapImg = await new Promise(resolve => {
            this.p.createImg(url, img => {
                resolve(img);
            });
        });
        return mapImg;
    }

    async createZip(zipName, extra) {
        var zip = new JSZip();
        extra(zip); // to pipe in extra files yk
        zip.generateAsync({type: "blob"}).then((content) => {
            this.saveBlob(content, zipName)
        });
    }

    // save the zip to the hard driveu
    async saveBlob(content, name) {
        const url = window.URL.createObjectURL(new Blob([content]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
    }
}
