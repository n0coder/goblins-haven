import {Grid}  from "../Grid";
export class Scene {
    constructor(p, camera) {
        this.p = p;
        this.grid; //this can take in any type lol
        this.hierarchy = [];
        this.camera = camera;
    }
    leftClick() {
        if (!this.grid) return;
        const [gridX, gridY] = this.grid.getGridCoords(this.p.mouseX, this.p.mouseY, this.camera, this.p);
        //console.log(`(${gridX}, ${gridY})`);
    }
    rightClick() {
        
    }
    setup(takeGrid) {
        this.grid = takeGrid?.call()
    }
    addGameObject(obj) {
        if ("start" in obj) 
            obj.start();
        
        this.hierarchy.push(obj);
    }
    start () {
        this.camera.start();
    }
    update(deltaTime) {
        for (let i = 0; i < this.hierarchy.length; i++) {
          if ("update" in this.hierarchy[i])
            this.hierarchy[i].update(deltaTime);
        }
        this.camera.update(deltaTime);
    }

    draw(postCameraFunc) {
        this.p.background(35, 35, 35);
        this.camera.draw();
        this.p.ellipse( 0,0, 64,64);
        this.p.ellipse( 0,0, 128,128);
        
        this.grid?.drawGrid();

        for (let i = 0; i < this.hierarchy.length; i++) {
          if ("draw" in this.hierarchy[i])
            this.hierarchy[i].draw();
        }

    }
}