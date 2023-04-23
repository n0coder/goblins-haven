import {ContextMenu} from "./ContextMenu.mjs";
import { CosmicEntity as CosmicGalaxy } from "../../../CosmicEntity/CosmicEntity.mjs";
import { possibleTiles } from "../../../n0config.mjs";
import { mapLab } from "../../Map/MapLab.mjs";
import { grid } from "../../Map/Grid.mjs";
import { levelSelectMenu } from "./LevelSelectMenu.mjs";
import { cosmicEntityManager } from "../../../CosmicEntity/CosmicEntityManager.mjs";
import { startGlobalEntities } from "../../../globalEntities.mjs";

export class EditMode extends CosmicGalaxy {
    constructor() {
        super();
        mapLab.onMapChanged = (oldMap, newMap) => this.onMapChanged(oldMap, newMap);
        grid.init(64);
        this.currentTile = possibleTiles[1];

        levelSelectMenu.new = () => this.onNewSelected();
        levelSelectMenu.open = async () => await this.onOpenSelected();
        levelSelectMenu.save = async () => await this.onSaveSelected();
        
        // other editing-related properties
    }
    onNewSelected() {
        mapLab.newMap();
        console.log("new was selected");
        // reset editor grid
        // set currentTile to default mode
        // shift player/camera back to center
    }
    onMapChanged(oldMap, newMap) {
        console.log(["map was changed", oldMap, newMap, oldMap?.mapData.levelId, newMap?.mapData.levelId]);
        //unload map png, load new one
        //swap out map info...
        //easier done than said...
    }

    async onOpenSelected() {
        //this.mapLab.loadMap();//we need a way to choose a map
        console.log(["open selected"]);
        // this will get called when a map is selected
        // load map into editor grid (a zip somehow)
        // do spawn point tile checks (to find where to place player)
        // if no spawn tile, we spawn in the center of the map instead
        // select the current tile that's selected in the json file
    }

    async onSaveSelected(mapName = "map") {
        // console.log([grid, grid.saveGrid])
        // pack tiles from the editor grid into a texture
        this.mapLab.saveMap(); 
        //some work will have to be done to have it save the grid...
        /*
        await grid.saveGrid(mapName, async (zip) => {
          console.log(zip);
          zip.file("extra.txt", "testing extra pipe\n");
        }); // ask chatgpt how to convert the p5.img file to a png and insert it to the zip without saving it
        */
        //
    }

    leftClick() {

        if (!(this.open)) {
            const [gridX, gridY] = grid.getGridCoords(this.p.mouseX, this.p.mouseY);
            grid.placeTile(this.currentTile, gridX, gridY);

            // console.log(`left click ${gridX}, ${gridY}`);
        }
        super.leftClick();
        this.open = this.contextMenu ?. menuOpen;
    }
    rightClick() {

        const [gridX, gridY] = grid.getGridCoords(this.p.mouseX, this.p.mouseY, this.camera);
        // grid.removeTile(gridX, gridY);
        // grid.saveGrid();
        // console.log(`right click ${gridX}, ${gridY}`);
        this.contextMenu.rightClick();

        this.open = this.contextMenu ?. menuOpen;
        super.rightClick();
    }

    preload() {
        
    }

    // TODO: i need to handle the loading of specific levels in the editor
    start() { // somehow get possible tiles loaded here
        /*
        this.scene.setup(() => {
            // grid.generateGrid(selectedMap); //hold this for reference
            // grid.findSize();
            return grid;
        });
        */
        //import the global objects
        startGlobalEntities();
        

        levelSelectMenu.openMenu((selectedMap) => {
            console.log([selectedMap, "on open menu?"]);
        });
        // painting context menu:
        this.contextMenu = new ContextMenu(this.p, this.possibleTiles);
        this.contextMenu.onTilePicked = (oa) => {
            this.currentTile = oa;
            console.log(["picked tile", oa]);
        };
        this.contextMenu.start();
    }
    end() {
        //close menus...
        //clean up edit mode entities
    }
    draw(deltaTime) { //this is draw now 
        // update game logic for edit mode
        // this.handleEditing();

        /* //why does this exist?
        if (currentMode === PlayMode) {
          currentMode.update();
        } else if (currentMode === EditMode) {
          currentMode.update();
        }
        */
        // other editing-related tasks
    }

    handleEditing() {
        if (this.isDrawing) { // draw on lookup texture
        } else if (this.isEditing) { // open tile editor
        }
    }
    // other methods for handling editing
}
export const editMode = new EditMode();