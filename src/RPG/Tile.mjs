
export class Tile {
    constructor(p5, imagePath, color) {
        this.p5 = p5;
        this.image = p5.loadImage(imagePath);
        this.imagePath = imagePath;
        this.color = color;
    }
    draw(tileSize, alpha=255, colorMode = false) {
        
          this.p5.push();

        if (colorMode) {
          this.p5.fill(this.color[0], this.color[1], this.color[2], alpha);
          this.p5.rect(this.x, this.y, tileSize, tileSize);
        } else {
          this.p5.tint(255, alpha);
          this.p5.image(this.image, this.x, this.y, tileSize, tileSize);
        }

          this.p5.pop();
        
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