// EditorGrid module
export class EditorGrid {
    constructor(p, camera, tileSize = 64) {
        this.p = p;
        this.camera = camera;
        this.tileSize = tileSize;
        this.colorMode = false;
        this.grid = [];
    }

    toggleColorMode() {
        this.colorMode = !this.colorMode;
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
        var img = await this.createImg(width, height, minX / this.tileSize, minY / this.tileSize);
        var blob = await this.imgToBlob(img.get());
        
        await this.createZip(blob, `${mapName}.zip`, async (zip) => {
            console.log(zip);
            await extra(zip)
        })
        
    }
    async saveBlob(content, name) {
        const url = window.URL.createObjectURL(new Blob([content]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
    }
    async createZip(img, zipName, extra) {
        var zip = new JSZip();
        zip.file("map.png", img);4
        extra(zip); // to pipe in extra files yk
        zip.generateAsync({type: "blob"}).then((content) => {
            this.saveBlob(content, zipName)
        });
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
    imgToBlob(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Create a temporary p5.Graphics object
        const graphics = this.p.createGraphics(img.width, img.height);
        graphics.image(img, 0, 0);

        // Draw the graphics to the context of the canvas
        ctx.drawImage(graphics.elt, 0, 0);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            });
        });
    }
    removeTile(x, y) {
        this.grid = this.grid.filter((tile) => tile.pos.x !== x || tile.pos.y !== y);
    }

    drawGrid() {
        for (let o of this.grid) {
            o.tile.draw(this.tileSize, this.colorMode);
        }
        const [x, y] = this.getGridCoords(this.p.mouseX, this.p.mouseY)
        this.p.rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        const [minX, minY, maxX, maxY] = this.getGridBounds()
        this.p.stroke(255);
        this.p.noFill();
        // this.p.rect(minX*this.tileSize,minY*this.tileSize , maxX*this.tileSize,maxY*this.tileSize);

        this.p.rect(minX, minY, maxX - minX, maxY - minY);

        this.p.noStroke();
    }
}
