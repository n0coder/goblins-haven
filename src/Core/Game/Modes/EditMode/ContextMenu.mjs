
export class ContextMenu {
    constructor(p5, possibleTiles, onTilePicked) {
      this.p5 = p5;
      this.possibleTiles = possibleTiles;
      this.onTilePicked = onTilePicked;
      this.currentTile;
      this.lastMenu = null;
      this.buttons = [];
    }
    get menuOpen() {
      return this.menu.elt.classList.contains("Shown")
    }
    start() {

      this.menu = this.p5.createDiv('').class('ContextMenu').parent("menu");
      
    }
    rightClick() {

      if(this.menuOpen) {

        this.menu.removeClass("Shown")
      } else {

      this.menu.addClass("Shown")
      }
      
      if (this.buttons.length < 1) 
        this.createMenu();
      
    }
    createMenu() {
      this.lastMenu = undefined;
      this.buttons.forEach(button => {
        button?.remove();
      });
      // Clear the buttons array
      this.buttons.splice(0);
      
      // Get all the unique base maps
      let baseMaps = [];
      this.possibleTiles.forEach(tile => {
        console.log("tile "+ tile + ": "+ tile.color[0] + ", "+ tile.color[1]+", "+tile.color[2]);
        if (!baseMaps.includes(tile.color[0])) {
          baseMaps.push(tile.color[0]);
        }
      });
      let back = this.p5.createButton('Close').class('BackButton').parent(this.menu);
      back.mousePressed(() => {
        //this.backButton();
        this.menu.removeClass("Shown")
      
      })
      this.buttons.push(back);
      // Create a button for each unique base map
      baseMaps.forEach(baseMap => {
        let btn = this.p5.createButton(`Base Map ${baseMap}`).class('TextItem').parent(this.menu);
        btn.mousePressed(() => {
          
          this.createItemTypesMenu(baseMap);
        });
        this.buttons.push(btn);
      });
      
    }
  
    createItemTypesMenu(baseMap) {
      //remove and clear buttons here
      this.buttons.forEach(button => {
        button?.remove();
      });
      // Clear the buttons array
      this.buttons.splice(0);
      // Get all the unique item types for the selected base map
      let itemTypes = [];
      this.possibleTiles.forEach(tile => {
        if (tile.color[0] === baseMap && !itemTypes.includes(tile.color[1])) {
          itemTypes.push(tile.color[1]);
        }
      });

      let back = this.p5.createButton('Back').class('TextBack').parent(this.menu);
      back.mousePressed(() => {
        this.createMenu();
      })
      this.buttons.push(back);
      itemTypes.forEach(itemType => {
        let btn = this.p5.createButton(`Item Type ${itemType}`).class('TextItem').parent(this.menu);
        
        btn.mousePressed(() => {
          this.createIndividualItemsMenu(baseMap, itemType);
        });
        this.buttons.push(btn);
      });
    }
  
    createIndividualItemsMenu(baseMap, itemType) {
      //remove and delete btns
      this.buttons.forEach(button => {
        button?.remove();
      });
      // Clear the buttons array
      this.buttons.splice(0);

      // Get all the individual items for the selected base map and item type
      let individualItems = [];
      this.possibleTiles.forEach(tile => {
        if (tile.color[0] === baseMap && tile.color[1] === itemType) {
          individualItems.push(tile);
        }
      });
      let vivi = this.p5.createDiv('').class('Tile').parent(this.menu);
      let back = this.p5.createButton('Back').class('TileBack').parent(vivi);
      back.mousePressed(() => {
        this.createItemTypesMenu(baseMap);
      })
      this.buttons.push(vivi);
      // Create a preview of each individual item
      individualItems.forEach(item => {
        vivi = this.p5.createDiv('').class('Tile').parent(this.menu);
        let preview = this.p5.createImg(item.imagePath).class('TileImg').parent(vivi);
        if (item === this.currentTile) {
          preview.addClass("Selected");
        }
        this.buttons.push(vivi);
        preview.mousePressed(() => {

          let tileImages = document.getElementsByClassName("TileImg");
          for (let i = 0; i < tileImages.length; i++) {
            tileImages[i].classList.remove("Selected");
          }

          this.onTilePicked(item);
          this.currentTile = item;
          preview.addClass("Selected");
        });
      });
    }
    backButton() {
      let prevMenu = this.p5.select('.ContextMenu');
      if (prevMenu) {
        prevMenu.remove();
      }
    }
    selectItem(item) {
    }
  }