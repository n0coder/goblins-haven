import { p } from "../../../p5engine.mjs";

export class LevelSelectMenu {
    constructor(newa, open, save) {
        this.save = save;
        this.new = newa;
        this.open = open;
        this.maps = ["assets/maps/f11-map-test.png", "assets/maps/mapspacetest.png"];
        this.selectedMap = 0;
    }

    openMenu(editModeCallback) {
        this.menu = p.createDiv("").id("editorMenu").parent("menu");

        // first section
        let firstSection = p.createDiv("").parent(this.menu).addClass("menuSection");
        let newButton = p.createButton("New").parent(firstSection).addClass("MainMenuButton").mousePressed(async () => await this.new?.call());
        let openButton = p.createButton("Open").parent(firstSection).addClass("MainMenuButton").mousePressed(async () => await this.openMenu?.call());
        let saveButton = p.createButton("Save").parent(firstSection).addClass("MainMenuButton").mousePressed(async () => await this.save?.call());
        
        // second section
        /*
        let secondSection = p.createDiv("").parent(this.menu).addClass("menuSection");
        this.maps.forEach((map, index) => {
            let mapButton = p.createButton(map).parent(secondSection).addClass("MainMenuButton mapButton").mousePressed(() => {
                this.selectedMap = index;
                editModeCallback ?. call(this.maps[index]);
                console.log("Map button pressed");
            });
            if (index === this.selectedMap) {
                mapButton.addClass("Selected");
            }
        });
        */
    }

    end() { // destroy menu if it's drawing
        console.log("I should be removed");
        if (this.menu) {
            this.menu.remove();
        }
    }

    showSecondaryMenu(type) {
        let secondaryMenus = {
            "new": this.showNewMenu,
            "open": this.showOpenMenu
        };
        let o = secondaryMenus[type];
        if (o) {
            p.select('#secondaryEditorMenu')?.remove(); 
            let menu = p.createDiv("").id("secondaryEditorMenu").parent("menu");
            o(menu);
        }
    }
    showNewMenu(menu) {
        console.log("new");
    }
    showOpenMenu(menu) {
        console.log("open");
    }
    

}
export const levelSelectMenu = new LevelSelectMenu();