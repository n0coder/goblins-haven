
export class Tile {
    constructor(p5, imagePath, color) {
        this.p5 = p5;
        this.image = p5.loadImage(imagePath);
        this.imagePath = imagePath;
        this.color = color;
    }
    draw(tileSize, colorMode = false) {
        if (colorMode) {
            this.p5.fill(this.color[0], this.color[1], this.color[2], 255);
            this.p5.rect(this.x, this.y, tileSize, tileSize);
        } else {
            this.p5.image(this.image, this.x, this.y, tileSize, tileSize);
        }
    }
    
    copy() {
        let copiedTile = Object.assign({}, this);
        copiedTile.image = this.image;
        copiedTile.imagePath = this.imagePath;
        copiedTile.color = this.color;
        copiedTile.draw = this.draw;
        copiedTile.copy = this.copy;
        return copiedTile;
    }


    
}