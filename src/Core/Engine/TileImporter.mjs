export class TileImporter {
    constructor(p) {
        this.p = p;
        this.tiles = [];
        this.individualTilesetId = 0;
    }
    // [0,0,0] [tilesetid, tiletypeid, tileid]
    // get individual tileset id, when the individual tile id fills up
    // or spawn a new tileset id above all tilesets

    // check in tiles array for the tile.color
    // tile.color is an array of ints [0,0,0]
    // those relate to the colors in RGB like this:
    // [R,G,B]: [tilesetid, tiletypeid, tileid]

    // I need to find the current tilesetid
    // using the array of tiles currently imported
    // also make a new tilesetid function for spawning non individual tiles
    getCurrentTilesetId() {
        let currentTilesetId = 0;
        for (const tile of this.tiles) {
            const tilesetId = tile.color[0];
            if (tilesetId > currentTilesetId) {
                currentTilesetId = tilesetId;
            }
        }
        return currentTilesetId;
    }


    newMethodName(tileName) {

        if (tileName in this.tileData) {
            return this.tileData[tileName][0][0];
        } else {
            this.tilesetData[tilesetIndex] = [];
            this.tileData[tileName] = [0][tilesetIndex];
            return Object.keys(this.tilesetData).length;
        }
    }
    async importTilesFromDirectory(directory) {

        const files = await this.p.loadStrings(directory);
        for (const file of files) {
            if (file.endsWith(".png")) {
                let index = this.newMethodName(filePath, tilesetIndex);

            }
        }
        //         const filePath = `${directory}/${file}`;
        //         const tileName = file.split(".")[0];
        //         let tilesetIndex;
        //
        //         const tileIndex = this.tilesetData[tilesetIndex].length;
        //         this.tilesetData[tilesetIndex].push({path: filePath, name: tileName});
        //         const tileData = this.tileData[tileName];
        //         tileData[1] = tileIndex;
        //         this.tiles.push(new Tile(this.p, filePath, tileData));
        //     }
        // }
    }

    importTile(imagePath, tileName) {
        // let tilesetIndex;
        // if (tileName in this.tileData) {
        //     tilesetIndex = this.tileData[tileName][0];
        // } else {
        //     tilesetIndex = Object.keys(this.tilesetData).length;
        //     this.tilesetData[tilesetIndex] = [];
        //     this.tileData[tileName] = [tilesetIndex, 0];
        // }
        // const tileIndex = this.tilesetData[tilesetIndex].length;
        // this.tilesetData[tilesetIndex].push({path: imagePath, name: tileName});
        // const tileData = this.tileData[tileName];
        // tileData[1] = tileIndex;
        // this.tiles.push(new Tile(this.p, imagePath, tileData));
    }

    loadTileDataFromJson(filename) {
        // return new Promise((resolve, reject) => {
        //     this.p.loadJSON(filename, (tileData) => {
        //         this.tileData = tileData;
        //         this.tilesetData = {};
        //         for (const [tileName, [
        //                 tilesetIndex, tileIndex
        //             ]
        //         ] of Object.entries(tileData)) {
        //             if (!(tilesetIndex in this.tilesetData)) {
        //                 this.tilesetData[tilesetIndex] = [];
        //             }
        //             this.tilesetData[tilesetIndex][tileIndex] = {
        //                 path: tileData[tileName][2],
        //                 name: tileName
        //             };
        //         }
        //         resolve();
        //     }, reject);
        // });
    }

    saveTileDataToJson(filename) {
        // const tileData = {};
        // for (const [tileName, [
        //         tilesetIndex, tileIndex
        //     ]
        // ] of Object.entries(this.tileData)) {
        //     tileData[tileName] = [
        //         tilesetIndex, tileIndex, this.tilesetData[tilesetIndex][0][tileIndex].path
        //     ];
        // }
        // const jsonData = JSON.stringify(tileData);
        // this.p.save(jsonData, filename);
    }
}
