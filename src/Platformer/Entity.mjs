export class Entity {
    constructor() {
      this.world = null;
      this.depth = 0;
    }
  
    added(world) {
      this.world = world;
    }
  
    beforeUpdate() {}
  
    update() {}
  
    afterUpdate() {}
  
    draw() {}
  }