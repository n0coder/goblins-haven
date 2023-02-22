import {ContextMenu} from "../Engine/LevelEditor/ContextMenu.mjs";
import {EditorGrid} from "../Engine/LevelEditor/EditorGrid.mjs";
import {LevelSelectMenu} from "../Engine/LevelEditor/LevelSelectMenu.mjs";
import {Scene} from "../Engine/Scene.mjs";
import {GameMode} from "./GameMode.mjs";

export class EditMode extends GameMode {
    constructor(p, player, camera, sceneManager, possibleTiles) {
        super(p, player, camera, sceneManager, possibleTiles);
        this.p = p;
        this.camera = camera;
        this.scene.hierarchy.push(player);
        this.possibleTiles = possibleTiles;
        this.editorGrid = new EditorGrid(p, camera, 64);
        this.currentTile = this.possibleTiles[1]
        this.levelSelector = new LevelSelectMenu(p, () => this.onNewSelected(), async () => await this.onOpenSelected(), async () => await this.onSaveSelected());
        // other editing-related properties
    }
    onNewSelected() {
        // reset editor grid
        // set currentTile to default mode
        // shift player/camera back to center
    }

    async onOpenSelected() {
        // this will get called when a map is selected
        // load map into editor grid (a zip somehow)
        // do spawn point tile checks (to find where to place player)
        // if no spawn tile, we spawn in the center of the map instead
        // select the current tile that's selected in the json file
    }

    async onSaveSelected(mapName = "map") {
        // console.log([this.editorGrid, this.editorGrid.saveGrid])
        // pack tiles from the editor grid into a texture
        await this.editorGrid.saveGrid(mapName, async (zip) => {
          console.log(zip);
          zip.file("extra.txt", "testing extra pipe\n");
        }); // ask chatgpt how to convert the p5.img file to a png and insert it to the zip without saving it
        
        //
    }

    leftClick() {

        if (!(this.open)) {
            const [gridX, gridY] = this.editorGrid.getGridCoords(this.p.mouseX, this.p.mouseY);
            this.editorGrid.placeTile(this.currentTile, gridX, gridY);

            // console.log(`left click ${gridX}, ${gridY}`);
        }
        super.leftClick();
        this.open = this.contextMenu ?. menuOpen
    }
    rightClick() {

        const [gridX, gridY] = this.editorGrid.getGridCoords(this.p.mouseX, this.p.mouseY, this.camera);
        // this.editorGrid.removeTile(gridX, gridY);
        // this.editorGrid.saveGrid();
        // console.log(`right click ${gridX}, ${gridY}`);
        this.contextMenu.rightClick();

        this.open = this.contextMenu ?. menuOpen
        super.rightClick();
    }
    // TODO: i need to handle the loading of specific levels in the editor
    start() { // somehow get possible tiles loaded here

        this.scene.setup(() => {
            // grid.generateGrid(selectedMap); //hold this for reference
            // grid.findSize();
            return this.editorGrid;
        });

        this.levelSelector.openMenu((selectedMap) => {})
        // painting context menu:
        this.contextMenu = new ContextMenu(this.p, this.possibleTiles);
        this.contextMenu.onTilePicked = (oa) => {
            this.currentTile = oa;
            console.log(["picked tile", oa]);
        };
        this.contextMenu.start();
        super.start();
    }
    end() {
        super.end();
    }
    update(deltaTime) {
        super.update(deltaTime);
        // update game logic for edit mode
        // this.handleEditing();
        // other editing-related tasks
    }

    handleEditing() {
        if (this.isDrawing) { // draw on lookup texture
        } else if (this.isEditing) { // open tile editor
        }
    }

    draw() {
        super.draw();
        /*
        if (currentMode === PlayMode) {
          currentMode.update();
        } else if (currentMode === EditMode) {
          currentMode.update();
        }
    */
    }
    // other methods for handling editing
}
