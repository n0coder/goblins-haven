let gridSize = 20; // size of each grid cell
let numRows = 20; // number of rows in the grid
let numCols = 20; // number of columns in the grid
let grid = []; // 2D array to hold the grid cells
let cropTypes = ['corn', 'wheat', 'potato']; // types of crops
let currentCrop = 0; // index of the currently selected crop
let inventory = [0, 0, 0]; // number of each crop in inventory

function setup() {
  createCanvas(numCols * gridSize, numRows * gridSize);
  // initialize the grid
  for (let i = 0; i < numRows; i++) {
    grid.push([]);
    for (let j = 0; j < numCols; j++) {
      grid[i].push({ type: 'soil', growth: 0 });
    }
  }
}

function draw() {
  background(200);
  // draw the grid
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let cell = grid[i][j];
      if (cell.type === 'soil') {
        fill(180, 100, 50);
      } else {
        let color = map(cell.growth, 0, 1, 50, 255);
        fill(0, color, 0);
      }
      stroke(0);
      rect(j * gridSize, i * gridSize, gridSize, gridSize);
    }
  }
  // draw the current crop selection
  fill(255);
  stroke(0);
  textSize(20);
  text(`Current crop: ${cropTypes[currentCrop]}`, 10, height - 30);
  // draw the inventory
  for (let i = 0; i < cropTypes.length; i++) {
    let x = width - (cropTypes.length - i) * 80;
    let y = height - 50;
    fill(0, 150, 0);
    stroke(0);
    rect(x, y, 60, 40);
    fill(255);
    textSize(20);
    text(`${cropTypes[i]}: ${inventory[i]}`, x + 10, y + 25);
  }
}

function mouseClicked() {
  // determine the cell that was clicked
  let col = Math.floor(mouseX / gridSize);
  let row = Math.floor(mouseY / gridSize);
  if (col < 0 || col >= numCols || row < 0 || row >= numRows) {
    return;
  }
  let cell = grid[row][col];
  // handle placing crops
  if (cell.type === 'soil' && inventory[currentCrop] > 0) {
    cell.type = cropTypes[currentCrop];
    cell.growth = 0;
    inventory[currentCrop]--;
  }
  // handle selecting crops
  if (mouseY > height - 50 && mouseY < height - 10) {
    for (let i = 0; i < cropTypes.length; i++) {
      let x = width - (cropTypes.length - i) * 80;
      if (mouseX > x && mouseX < x + 60) {
        currentCrop = i;
      }
    }
  }
}

// add some kind of code to progress time...
