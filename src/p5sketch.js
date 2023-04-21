import { p5engine, p } from './RPG/Core/p5engine.mjs'; //somehow this spawns a p5 engine
import { mainMenu } from './RPG/Core/Game/Modes/MainMenu.mjs';
import { playMode } from './RPG/Core/Game/Modes/PlayMode.mjs';
import { editMode } from './RPG/Core/Game/Modes/EditMode.mjs';
import { modeSwitcher } from './RPG/Core/ModeSwitcher.mjs'; //this starts the scene manager

modeSwitcher.addMode("Main Menu", mainMenu);
modeSwitcher.addMode("Play Mode", playMode);
modeSwitcher.addMode("Edit Mode", editMode);

modeSwitcher.loadMode("Main Menu"); //this is now how i will make it load the main menu on start

//how can we work the scene manager?
//we need to set up game cosmic entities
//a list of entities that belong to the game 
//that should only be shown when the game is playing or editing

/*
    vv  in the game n0config module  vv
    var globalEntities = []; // push cam and player

    vv  on scene load, run this  vv
    for entitiy in globalEntities
         cosmicEntityManager.addEntity(entitiy);
    //this is where we can start to add more entities related to the game mode.
*/ 

/*


import { Tile } from './RPG/Tile.mjs';
import { Transform }  from './RPG/Engine/Transform.mjs';
import { Player } from './RPG/Player.mjs';
import { Camera } from './RPG/Engine/Camera.mjs';

let sceneManager;
let scene, mapTexture;
let possibleTiles = [];

let sprite;
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
        for (let i = 0; i < 9; i++) 
            possibleTiles.push(new Tile(p, 'assets/pack/testmetal/sprite' + i + '.png', [1, 1, i]));
            for (let i = 0; i < 10; i++) 
            possibleTiles.push(new Tile(p, 'assets/pack/testmetalshade/sprite' + i + '.png', [1, 2, i]));
            for (let i = 0; i < 15; i++) 
            possibleTiles.push(new Tile(p, 'assets/pack/zexus/sprite' + i + '.png', [1, 1, i]));
    }
    p.setup = function() {
        p.gameW = windowSize*1.777777;
        p.gameH = windowSize;

        let menu = p.select('#game');
        menu.style("width", `${p.gameW}px`);
        menu.style("height", `${p.gameH}px`);
        p.createCanvas(p.gameW,  p.gameH).parent("sketch-holder");
        var player = new Player(p, 0, 0, 128, sprite);
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
        p.noStroke();
        let deltaTime = calculateDeltaTime();
        sceneManager.update(deltaTime);
        sceneManager.draw();
    };
    
});
*/