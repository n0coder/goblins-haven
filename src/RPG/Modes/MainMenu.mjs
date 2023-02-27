import { experiments } from "../../DumbExperiment.mjs";
import { GameMode } from "./GameMode.mjs";

export class MainMenu extends GameMode {
    constructor(p5, player, camera, sceneManager) {
        super(p5, player, camera, sceneManager)
        this.p5= p5;
        
        this.buttons = [
            {
                name: "Play",
                action: () => sceneManager.loadScene("play mode")
            },
            {
                name: "New",
                action: () => console.log(experiments.generateMechName(`level ${Date.now()}`))
            },
            {
                name: "Load",
                action: () => console.log("Load button pressed")
            },

            {
                name: "Edit Mode",
                action: () => sceneManager.loadScene("edit mode")
            }, {
                name: "Settings",
                action: () => console.log("Settings button pressed")
            }, {
                name: "Info",
                action: () => console.log("Info button pressed")
            },
        ];
        this.selectedButton = 0;
    }

    start() {
        this.menu = this.p5.createDiv("").id("MainMenu").parent("menu");
        this.buttons.forEach((button, index) => {
            let buttona = this.p5.createButton(button.name).parent(this.menu).addClass("MainMenuButton").mousePressed(button.action);
            if (index === this.selectedButton) {
                buttona.addClass("Selected");
            }
        });
      
    }

    end() {
        //destroy menu if it's drawing
        console.log("i should be removed");
        if (this.menu)
        this.menu.remove();
        //let prevMenu = this.p5.select('MainMenu');
        //if (prevMenu) 
        //if (prevMenu) prevMenu.remove();
    }

    passthrough(buttonName) {
        const buttonIndex = this.buttons.findIndex((button) => button.name === buttonName);
        if (buttonIndex !== -1) {
            this.selectedButton = buttonIndex;
            this.buttons[buttonIndex].action();
        }
    }

    update() {}
    draw() {}
}
