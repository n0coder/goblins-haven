import { Node } from "./Platformer/Node.mjs";
import { Spring } from "./Platformer/Spring.mjs";
import { World } from "./Platformer/World.mjs";

new p5((p) => {
  
  let windowSize = 512;
  let world;
  p.setup = () => {
    p.gameW = windowSize*1.777777;
    p.gameH = windowSize;
    p.createCanvas(p.gameW, p.gameH);

    world = new World(p);
  }

  p.draw = () => {
    p.background(0);
    const mouse = p.createVector(p.mouseX, p.mouseY);

    world.update();
    world.draw();
  }
});