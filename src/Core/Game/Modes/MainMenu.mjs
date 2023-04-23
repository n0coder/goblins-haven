//this is an issue ../../../../...
import {modStringFunny} from "../Experiments/DumbExperiment.mjs";
import { modeSwitcher } from "../../ModeSwitcher.mjs";
import { p } from "../../p5engine.mjs";
import { CosmicEntity as CosmicGalaxy } from "../../CosmicEntity/CosmicEntity.mjs";

export class MainMenu extends CosmicGalaxy {
    constructor() {
        super();
    
        // a list of all buttons and what they do
        this.buttons = [
            {
                name: "Play",
                action: () => modeSwitcher.loadMode("play mode")
            },
            {
                name: "New",
                action: () => console.log(modStringFunny(`level ${
                    Date.now()
                }`))
            },
            {
                name: "Load",
                action: () => console.log("Load button pressed")
            },
            {
                name: "Edit Mode",
                action: () => modeSwitcher.loadMode("edit mode")
            }, 
            {
                name: "Settings",
                action: () => console.log("Settings button pressed")
            }, 
            {
                name: "Info",
                action: () => console.log("Info button pressed")
            },
        ];
        this.selectedButton = 0;
    }

    start() { 
        // create an html menu div
        this.menu = p.createDiv("").id("MainMenu").parent("menu");
        // spawn the buttons and assign a mouse pressed action based on the button
        this.buttons.forEach((button, index) => {
            let buttona = p.createButton(button.name).parent(this.menu).addClass("MainMenuButton");
            buttona.mousePressed(button.action);
        });

    }

    // when the scene ends we remove the menu from the screen if it exists
    end() {
        if (this.menu) this.menu.remove();
        

        // this suggests that the following line is possible
        // this.menu?.remove();
        // this feature does not appear to work like in c#.
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
export const mainMenu = new MainMenu();