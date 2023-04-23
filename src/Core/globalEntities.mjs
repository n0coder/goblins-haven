import { cosmicEntityManager } from "./CosmicEntity/CosmicEntityManager.mjs";
import { cam } from "./Engine/Camera.mjs";
import { Player } from "./Game/Travelers/Player.mjs";


export const globalEntities = [];
export var player = new Player(64,64,128);
globalEntities.push(cam);
globalEntities.push(player);
cam.follow(player);
export function startGlobalEntities() {
    for (const entity of globalEntities) {
        cosmicEntityManager.addEntity(entity);
        if (entity.start) entity.start();
    }
}