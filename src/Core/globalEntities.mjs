import { cam } from "../Engine/Camera.mjs";
import { Player } from "../Player.mjs";

export const globalEntities = [];
export var player = new Player(0,0,128);
globalEntities.push(player);
globalEntities.push(cam);
cam.follow(player);
