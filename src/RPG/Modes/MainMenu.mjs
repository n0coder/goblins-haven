import {experiments} from "../../DumbExperiment.mjs";
import {GameMode} from "./GameMode.mjs";

export class MainMenu extends GameMode {
    constructor(p5, player, camera, sceneManager) {
        super(p5, player, camera, sceneManager)
        this.p5 = p5;
        // a list of all buttons and what they do
        this.buttons = [
            {
                name: "Play",
                action: () => sceneManager.loadScene("play mode")
            },
            {
                name: "New",
                action: () => console.log(experiments.modStringFunny(`level ${
                    Date.now()
                }`))
            },
            {
                name: "Load",
                action: () => console.log("Load button pressed")
            },
            {
                name: "Edit Mode",
                action: () => sceneManager.loadScene("edit mode")
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
        this.menu = this.p5.createDiv("").id("MainMenu").parent("menu");
        // spawn the buttons and assign a mouse pressed action based on the button
        this.buttons.forEach((button, index) => {
            let buttona = this.p5.createButton(button.name).parent(this.menu).addClass("MainMenuButton");
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
