export class Grid {
    constructor(possibleTiles, tileSize) {
      this.possibleTiles = possibleTiles;
      this.grid = [];
      this.tileSize = tileSize;  
      this.gridSize = [-1, -1];     
    }

    generateGrid(lookupTexture) {
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
              this.placeTile(tile, x, y);
            }
          }
        }
      }
    }
    
placeTile(tile, x, y) {
  let copiedTile = tile.copy();
  this.grid[y][x] = copiedTile;
  copiedTile.x = (x * this.tileSize);//- (this.tileSize/2);
  copiedTile.y = (y * this.tileSize);// - (this.tileSize/2);
  //print(copiedTile);
}
 getGridCoords(x, y, camera, p5) {
  // Get the world position of where the user clicked, adjusted for camera position
  const hw = (p5.gameW/2);
  const hh = (p5.gameH/2);
  
  const worldX = x + (camera.transform.x/* + hw*/);
  const worldY = y + (camera.transform.y/* + hh*/);

  // Get the grid position by dividing the world position by tile size
  const gridX = p5.floor(worldX / this.tileSize);
  const gridY = p5.floor(worldY / this.tileSize);
  //console.log(`Clicked at screen position (${x}, ${y}), world position (${worldX}, ${worldY}), grid position (${gridX}, ${gridY})`);
  return [gridX, gridY];
}
// function to retrieve a tile from the grid
getTile(gridX, gridY) {
  return this.grid[gridY][gridX];
  }
  isValidGridPosition(numCols, numRows, gridX, gridY) {
    return gridX >= 0 && gridX < numCols && gridY >= 0 && gridY < numRows;
    }
    // function to render the grid
  drawGrid() {
  // loop through the grid and render each tile
  for (let y = 0; y < this.grid.length; y++) {
    for (let x = 0; x < this.grid[y].length; x++) {
      let tile = this.grid[y][x];
      if (tile) {
        if (typeof tile !== 'undefined') {
          tile.draw(this.tileSize);
        }
      }
    }
  }
}


  }