// EditorGrid module
export class Grid {
    constructor(tileSize = 64, editMode) {
        this.tileSize = tileSize;
        this.colorMode = false;
        this.grid = [];
        this.editMode = editMode;
    }

    toggleColorMode() {
        this.colorMode = !this.colorMode;
    }
    generateGrid(lookupTexture, offsetX = 0, offsetY = 0) {
        lookupTexture.loadPixels();
        for (let y = 0; y < lookupTexture.height; y++) {
          this.grid[y] = [];
          for (let x = 0; x < lookupTexture.width; x++) {
            // get the RGB value of the current pixel
            let index = (y * lookupTexture.width + x) * 4;
            let r = lookupTexture.pixels[index];
            let g = lookupTexture.pixels[index + 1];
            let b = lookupTexture.pixels[index + 2];
      
            // find the corresponding tile for the current RGB value
            let tile = this.possibleTiles.find(t => t.color[0] == r && t.color[1] == g && t.color[2] == b);
      
            // if the tile was found, place it in the grid
            if (tile) {
              // place the tile in the grid
              if (typeof tile !== 'undefined') {
                this.placeTile(tile, x + offsetX, y + offsetY);
              }
            }
          }
        }
      }
      
      
    getGridBounds() {
        let minX = 16384;
        let minY = 16384;
        let maxX = -16384;
        let maxY = -16384;

        for (let tile of this.grid) {
            if ((tile.tile.x) < minX) {
                minX = tile.tile.x;
            }
            if ((tile.tile.y) < minY) {
                minY = tile.tile.y;
            }
            if ((tile.tile.x + this.tileSize) > maxX) {
                maxX = tile.tile.x + this.tileSize;
            }
            if ((tile.tile.y + this.tileSize) > maxY) {
                maxY = tile.tile.y + this.tileSize;
            }
        }
        return [minX, minY, maxX, maxY];
    }
    getGridCoords(screenX, screenY) { // Get the world position of where the user clicked, adjusted for camera position
        const worldX = screenX + (this.camera.transform.x);
        const worldY = screenY + (this.camera.transform.y);
        const preFloorX = worldX / this.tileSize;
        const preFloorY = worldY / this.tileSize;
        // Get the grid position by dividing the world position by tile size
        const gridX = this.p.floor(preFloorX);
        const gridY = this.p.floor(preFloorY);
        // console.log(`clicked at screen position (${screenX}, ${screenY}), world position (${worldX}, ${worldY}),`)
        // console.log(`grid position (${preFloorX}, ${preFloorY}) (${gridX}, ${gridY})`);
        return [gridX, gridY];
    }

    placeTile(tile, x, y) {
        const copiedTile = tile.copy();
        copiedTile.x = (x * this.tileSize);
        copiedTile.y = (y * this.tileSize);
        const pos = this.p.createVector(x, y);
        this.grid.push({tile: copiedTile, pos: pos});
    }
    async saveGrid(mapName, extra) {
        const [minX, minY, maxX, maxY] = this.getGridBounds();
        const width = (maxX - minX) / this.tileSize;
        const height = (maxY - minY) / this.tileSize;
        const minhX = minX / this.tileSize;
        const minhY = minY / this.tileSize;
        var img = await this.createImg(width, height, minhX, minhY);
        //pass the img into the maplab to save grid into a map
    }
    createImg(width, height, minX, minY) {
        var img = this.p.createImage(width, height);
        img.loadPixels();

        this.grid.forEach(to => {
            let t = to.tile;
            console.log([to.pos, minX, minY]);
            let index = ((to.pos.x - minX) + (to.pos.y - minY) * width) * 4;
            img.pixels[index] = t.color[0];
            img.pixels[index + 1] = t.color[1];
            img.pixels[index + 2] = t.color[2];
            img.pixels[index + 3] = 255;
        });
        img.updatePixels();
        return img;
    }
    removeTile(x, y) {
        this.grid = this.grid.filter((tile) => tile.pos.x !== x || tile.pos.y !== y);
    }

    drawGrid() {
        for (let o of this.grid) {
            o.tile.draw(this.tileSize, 255, this.colorMode);
        }

        const [x, y] = this.getGridCoords(this.p.mouseX, this.p.mouseY);
        this.editMode.currentTile.x = x*this.tileSize;
        this.editMode.currentTile.y = y*this.tileSize;
        this.editMode.currentTile.draw(this.tileSize, 128, this.colorMode);
        
        const [minX, minY, maxX, maxY] = this.getGridBounds();
        this.p.stroke(255);
        this.p.noFill();
        // this.p.rect(minX*this.tileSize,minY*this.tileSize , maxX*this.tileSize,maxY*this.tileSize);
        //this draws a grid bounds...
        this.p.rect(minX, minY, maxX - minX, maxY - minY); 

        this.p.noStroke();
    }
}
export const grid = new Grid();