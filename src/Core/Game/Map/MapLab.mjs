/* how i generated this class using chatgpt:
 https://github.com/n0coder/goblins-haven/blob/main/chatgpt/features/maplab.md
 */

 //this is overengineered. we can improve this now...
import { p } from "../../p5engine.mjs";
import {MapData} from "./MapData.mjs";
export class MapLab {
    constructor() {
        this.maps = [];
        this.currentMap; // what style do i go for... always open, modification creates new and sets dirty?
        this.onMapChanged;
    }

    async importMapZip(zipFile) { // load zip holding maps into maps array 
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


    async exportMap(data, name, extra) {
        let mapData, packName;
        if (data instanceof Map) {
          mapData = [{ mapImg: data.mapImg, mapJson: data.mapJson }];
          packName = name;
        } else if (Array.isArray(data)) {
          mapData = data;
          packName = name;
        } else {
          throw new TypeError(`Invalid data type. Expected Map or Array, but received ${typeof data}`);
        }
      
        const zipData = await this.createZip(`${packName}.zip`, async (zip) => {
          const levelsFolder = zip.folder('levels');
          for (let i = 0; i < mapData.length; i++) {
            const mapFolder = levelsFolder.folder(`${i}`);
            const map = mapData[i];
            const mapName = `map${i + 1}`;
            mapFolder.file(`${mapName}.png`, map.mapImg);
            mapFolder.file(`${mapName}.json`, map.mapJson);
            if (extra) {
              if (mapData.length === 1) {
                await extra(zip, map, mapName);
              } else {
                await extra(mapFolder, map, mapName);
              }
            }
          }
        });
        return zipData;
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
    async saveDirtyCheck() { //think of something else later
        if (this.currentMap?.dirty) {
          const result = await this.showConfirmationDialog("Save changes before creating a new map?");
          if (result === "yes") {
            await this.saveMap();
          } else if (result === "cancel") {
            return false;
          }
        }
        return true;
      }
      
    newMap() {
        if ( this.saveDirtyCheck() ) 
            this.setCurrentMap({ // sets current map and calls the map changed function
                mapImg: undefined, //map is undefined so we will load empty map removing the old one
                mapData: new MapData("Empty", "a blank map", undefined, 0, 0, undefined, undefined, undefined, undefined),
                dirty: false // an unmodified empty map is not worth new/unload protecting lol
            });
         // now load the map into the editor... < maybe this is open in the editor by setting currentMap
    }
    async saveMap(editorGrid) {
        if (this.currentMap && this.currentMap.dirty) {
          const index = this.maps.findIndex((map) => map.levelId === this.currentMap.levelId);
      
          if (index !== -1) {
            this.maps[index] = this.currentMap;
          } else {
            this.maps.push(this.currentMap);
          }
          this.currentMap.dirty = false;
          this.currentMap.mapImg = await editorGrid.saveGrid(); //save current editor
        } else if (!this.currentMap) {
          console.log("no current map to save");
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
        if (this.currentMap ?. dirty) {
            const confirmSave = confirm("Do you want to save changes before creating a new map?");
            if (confirmSave) {
                this.saveMap();
            }
        }
        this.setCurrentMap(map);
    }

    async createImage(mapBlob) {
        const url = URL.createObjectURL(mapBlob);
        const mapImg = await new Promise(resolve => {
            p.createImg(url, img => {
                resolve(img);
            });
        });
        return mapImg;
    }

    async createZip(zipName, extra) {
        var zip = new JSZip();
        extra(zip); // to pipe in extra files yk
        zip.generateAsync({type: "blob"}).then((content) => {
            this.saveBlob(content, zipName);
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
    async getBlobFromP5Image(p5img, type) {
        return new Promise((resolve) => {
          p5img.canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            type,
            1 //high quality image no compression?
          );
        });
      }
      
}
export const mapLab = new MapLab();
