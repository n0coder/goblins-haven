export class LevelSelectMenu {
    constructor(p5, newa, open, save) {
        this.p5 = p5;
        this.save = save;
        this.new = newa;
        this.open = open;
        this.maps = ["assets/maps/f11-map-test.png", "assets/maps/mapspacetest.png"];
        this.selectedMap = 0;

    }

    openMenu(editModeCallback) {
        this.menu = this.p5.createDiv("").id("editorMenu").parent("menu");

        // first section
        let firstSection = this.p5.createDiv("").parent(this.menu).addClass("menuSection");
        let newButton = this.p5.createButton("New").parent(firstSection).addClass("MainMenuButton").mousePressed(async () => await this.new?.call());
        let openButton = this.p5.createButton("Open").parent(firstSection).addClass("MainMenuButton").mousePressed(async () => await this.openMenu?.call());
        let saveButton = this.p5.createButton("Open").parent(firstSection).addClass("MainMenuButton").mousePressed(async () => await this.save?.call());
        
        // second section
        /*
        let secondSection = this.p5.createDiv("").parent(this.menu).addClass("menuSection");
        this.maps.forEach((map, index) => {
            let mapButton = this.p5.createButton(map).parent(secondSection).addClass("MainMenuButton mapButton").mousePressed(() => {
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
        }
        let o = secondaryMenus[type];
        if (o) {
            this.p5.select('#secondaryEditorMenu')?.remove(); 
            let menu = this.p5.createDiv("").id("secondaryEditorMenu").parent("menu");
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
