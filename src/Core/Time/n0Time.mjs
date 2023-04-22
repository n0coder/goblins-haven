import { p } from "../p5engine.mjs";

export let previousTime = 0; //does this update?!
export function calculateDeltaTime() {
    let currentTime = p.millis();
    let deltaTime = currentTime - previousTime;
    previousTime = currentTime;
    return deltaTime / 1000;
}