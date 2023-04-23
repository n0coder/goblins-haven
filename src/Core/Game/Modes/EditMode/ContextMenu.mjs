import { possibleTiles } from "../../../n0config.mjs";
import { p } from "../../../p5engine.mjs";

export class ContextMenu {
    constructor(onTilePicked) {
      this.onTilePicked = onTilePicked;
      this.currentTile;
      this.lastMenu = null;
      this.buttons = [];
    }
    get menuOpen() {
      return this.menu.elt.classList.contains("Shown");
    }
    start() {

      this.menu = p.createDiv('').class('ContextMenu').parent("menu");
      
    }
    rightClick() {

      if(this.menuOpen) {

        this.menu.removeClass("Shown");
      } else {

      this.menu.addClass("Shown");
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
      possibleTiles.forEach(tile => {
        console.log("tile "+ tile + ": "+ tile.color[0] + ", "+ tile.color[1]+", "+tile.color[2]);
        if (!baseMaps.includes(tile.color[0])) {
          baseMaps.push(tile.color[0]);
        }
      });
      let back = p.createButton('Close').class('BackButton').parent(this.menu);
      back.mousePressed(() => {
        //this.backButton();
        this.menu.removeClass("Shown");
      
      });
      this.buttons.push(back);
      // Create a button for each unique base map
      baseMaps.forEach(baseMap => {
        let btn = p.createButton(`Base Map ${baseMap}`).class('TextItem').parent(this.menu);
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
      possibleTiles.forEach(tile => {
        if (tile.color[0] === baseMap && !itemTypes.includes(tile.color[1])) {
          itemTypes.push(tile.color[1]);
        }
      });

      let back = p.createButton('Back').class('TextBack').parent(this.menu);
      back.mousePressed(() => {
        this.createMenu();
      });
      this.buttons.push(back);
      itemTypes.forEach(itemType => {
        let btn = p.createButton(`Item Type ${itemType}`).class('TextItem').parent(this.menu);
        
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
      possibleTiles.forEach(tile => {
        if (tile.color[0] === baseMap && tile.color[1] === itemType) {
          individualItems.push(tile);
        }
      });
      let vivi = p.createDiv('').class('Tile').parent(this.menu);
      let back = p.createButton('Back').class('TileBack').parent(vivi);
      back.mousePressed(() => {
        this.createItemTypesMenu(baseMap);
      });
      this.buttons.push(vivi);
      // Create a preview of each individual item
      individualItems.forEach(item => {
        vivi = p.createDiv('').class('Tile').parent(this.menu);
        let preview = p.createImg(item.imagePath).class('TileImg').parent(vivi);
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
      let prevMenu = p.select('.ContextMenu');
      if (prevMenu) {
        prevMenu.remove();
      }
    }
    selectItem(item) {
    }
  }