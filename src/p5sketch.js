
import { Tile } from './RPG/Tile.mjs';
import { Transform }  from './RPG/Engine/Transform.mjs';
import { Player } from './RPG/Player.mjs';
import { Camera } from './RPG/Engine/Camera.mjs';
import { SceneManager } from './RPG/SceneManager.mjs';

let sceneManager;
let scene, mapTexture;
let possibleTiles = [];

let sprite;
let previousTime = 0;
let camera;
let windowSize = 512;



new window.p5((p) => {
    p.preload = function() {
        mapTexture = p.loadImage('assets/maps/f11-map-test.png');
        sprite = p.loadImage('assets/chara.png');
        addTiles();
    };
    
    function addTiles() {
        possibleTiles.push(new Tile(p, 'assets/grass.png', [0, 0, 1]));
        possibleTiles.push(new Tile(p, 'assets/grass2.png', [0, 255, 0]));
        possibleTiles.push(new Tile(p, 'assets/lilspace2.png', [153, 0, 255]));
      
        for (let i = 0; i < 9; i++) 
            possibleTiles.push(new Tile(p, 'assets/pack/ff5/zozo+/' + i + '.png', [1, 0, i]));
        
    }
    p.setup = function() {
        p.gameW = windowSize*1.777777;
        p.gameH = windowSize;

        let menu = p.select('#game');
        menu.style("width", `${p.gameW}px`);
        menu.style("height", `${p.gameH}px`);
        p.createCanvas(p.gameW,  p.gameH, p.WEBGL).parent("sketch-holder");
        var player = new Player(p, 0, 0, 128, sprite)
        camera = new Camera(p, new Transform(0,0,1), player, .5);
        sceneManager = new SceneManager(p, player, camera, possibleTiles, mapTexture);
        sceneManager.start();

        previousTime = p.millis();
    }

    
    p.mousePressed = function() {
        if (p.mouseButton === p.RIGHT) 
            sceneManager.rightClick();
        if (p.mouseButton === p.LEFT) 
            sceneManager.leftClick();
    };
  
    p.draw = function() {
        p.background(34.5, 34.5, 34.5);
        p.rotateX(p.PI*.125);
        p.noStroke();
        let deltaTime = calculateDeltaTime();
        sceneManager.update(deltaTime);
        sceneManager.draw();
    };
    function calculateDeltaTime() {
        let currentTime = p.millis();
        let deltaTime = currentTime - previousTime;
        previousTime = currentTime;
        return deltaTime / 1000;
    }
});
