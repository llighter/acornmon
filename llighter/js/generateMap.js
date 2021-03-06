// INIT
var canvas = document.getElementById("startVillage");
var context = canvas.getContext("2d");

var map00=[
	[0,0,101,0,0,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0],
	[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,0,0,0,0,0,0,0,0,101,101,0,0,0,0],
	[0,0,0,0,0,1,1,1,0,0,0,0,0,0,101,0,0,0,0,0],
	[0,0,0,0,0,0,0,1,1,0,101,101,101,101,101,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,101,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,101,0,0,1,1,1,1,1,1,1,1,1,1,1,99],
	[0,0,0,0,0,101,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,101,0,101,0,0,0,1,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,0,0,0,101,0,0,1,0,0,0,0,0,0,101,0,0,0,0],
	[1,1,1,1,1,101,0,0,1,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,0,0,1,1,0,0,1,0,0,0,0,0,101,101,0,0,0,0],
	[0,0,0,0,0,1,1,1,1,0,0,0,0,0,101,0,0,0,0,0],
	[0,0,101,0,0,0,0,1,1,101,101,101,101,101,101,0,0,0,0,0],
	[0,0,101,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,101,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,101,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var map01=[
	[3,3,101,0,3,3,3,0,0,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,102,3,3,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0],
	[4,4,102,1,1,0,0,0,0,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,4,3,1,1,0,0,0,0,0,0,0,0,101,101,0,0,0,0],
	[101,101,4,3,0,1,1,1,0,0,0,0,0,0,101,0,0,0,0,0],
	[102,102,4,3,0,0,0,1,1,101,102,102,102,102,102,0,0,0,0,0],
	[0,0,4,3,0,0,0,0,1,0,0,0,0,0,3,3,3,0,0,0],
	[0,0,4,3,0,0,0,0,1,1,4,4,4,4,4,4,4,0,0,0],
	[0,0,4,3,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,4,3,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,4,0,0,0,0,0,1,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,4,0,0,0,0,0,1,0,0,0,0,0,0,101,0,0,0,0],
	[1,1,4,4,4,3,3,3,1,0,0,0,0,0,0,101,0,0,0,0],
	[0,0,4,0,1,1,0,0,1,0,0,0,0,0,101,101,0,0,0,0],
	[0,0,4,0,0,1,1,1,1,0,0,0,0,0,101,0,0,0,0,0],
	[0,0,4,0,0,0,0,1,1,5,5,5,101,101,101,0,0,0,0,0],
	[0,0,4,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,102,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
	[0,0,102,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,102,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const UNIT = 64;
const IMG_U = 96;
const MAPIMG_U = 64;
const MOVE_U = 16;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACE_BAR = 32;

const SOUTH_DIRECTION = 0;
const WEST_DIRECTION = 1;
const EAST_DIRECTION = 2;
const NORTH_DIRECTION = 3;

const MAP_GRASS = 0;
const MAP_ROAD01 = 1;
const MAP_STONE = 101;
const MAP_SAND = 3;
const MAP_SANDROAD01 = 4;
const MAP_SANDSTONE = 102;

const MAP_NPC_MON = 200;
const MAP_NPC_MON2 = 201;

var sand = new Image();
var grass = new Image();
var stone = new Image();
var road01 = new Image();
var player = new Image();
var monster = new Image();
var monster2 = new Image();
var sandStone = new Image();
var sandRoad01 = new Image();

var stage00 = new Image();
stage00.src = './img/stage02.png';

var npc = new Image();
npc.src='./img/npc.png';

// Charactor's direction
var motionIdx = 0;

// Monster's direction
var monsterIdx = 0;

player.src = './img/eagle.png';
monster.src = './img/mon00.png';
monster2.src = './img/mon01.png';
sand.src = './img/tileImage.png';
grass.src = './img/tileImage.png';
stone.src = './img/tileImage.png';
road01.src = './img/tileImage.png';
sandStone.src = './img/tileImage.png';
sandRoad01.src = './img/tileImage.png';

// Map coordinate
var mapX = 0;
var mapY = 0;

// Charactor coordinate
var charX = 0;
var charY = 0;

// Current map index
var nowMap = map00;


console.log(stage00.src);

function draw(){
	mapX=0;
	mapY=0;
	context.drawImage(stage00, 0,0,1280,1280,0,0,1280,1280);

	// 8, 16 
	// context.drawImage(npc,0,20,72,96,UNIT*16, UNIT*8, UNIT, UNIT);
	// context.drawImage(npc,0,20,72,96,mapX, mapY, 64, 64);
	// 12, 14
	// context.drawImage(npc,144,202,72,96, UNIT*14, UNIT*12, UNIT, UNIT);
	// context.drawImage(npc,144,202,72,96,mapX, mapY, 64, 64);

	// 5, 12
	// context.drawImage(npc,72,400,72,76,UNIT*12, UNIT*5, UNIT, UNIT);
	// context.drawImage(npc,72,400,72,76,mapX, mapY, 64, 64);
	// 7, 10
	// context.drawImage(npc,504,400,72,76,UNIT*10, UNIT*7, UNIT, UNIT);
	// context.drawImage(npc,504,400,72,76,mapX, mapY, 64, 64);

	// 3, 1
	context.drawImage(npc,288,30,72,68,UNIT*1, UNIT*3, UNIT, UNIT);
	// context.drawImage(npc,0,110,72,85,mapX, mapY, 64, 64);
	// 14, 7
	context.drawImage(npc,0,110,72,85,UNIT*7, UNIT*14, UNIT, UNIT);
	// context.drawImage(npc,288,30,72,68,mapX, mapY, 64, 64);

// 	for(var i = 0; i < nowMap.length ; i++){
// 		for(var j=0, mapX = 0; j < nowMap[i].length ; j++){
//             switch(nowMap[i][j]) {
//                 case MAP_GRASS:
//                     context.drawImage(grass, 0, 32, MAPIMG_U, MAPIMG_U, mapX, mapY, UNIT, UNIT);
//                     break;
//                 case MAP_ROAD01:
//                     context.drawImage(road01, 64, 32, MAPIMG_U, MAPIMG_U, mapX, mapY, UNIT, UNIT);
//                     break;
//                 case MAP_STONE:
//                     context.drawImage(stone, 192, 32, MAPIMG_U, MAPIMG_U, mapX, mapY, UNIT, UNIT);
//                     break;
//                 case MAP_SAND:
//                     context.drawImage(sand, 0, 128, MAPIMG_U, MAPIMG_U, mapX, mapY, UNIT, UNIT);
//                     break;
//                 case MAP_SANDROAD01:
//                     context.drawImage(sandRoad01, 64, 128, MAPIMG_U, MAPIMG_U, mapX, mapY, UNIT, UNIT);
//                     break;
//                 case MAP_SANDSTONE:
//                     context.drawImage(sandStone, 128, 128, MAPIMG_U, MAPIMG_U, mapX, mapY, UNIT, UNIT);
//                     break;
//             }
//             mapX += UNIT;
// 		}
// 		mapY += UNIT;
// 	}

// 	context.drawImage(monster, 0, 0, MAPIMG_U, MAPIMG_U, UNIT*6, UNIT*2, UNIT, UNIT);

// //	 requestAnimationFrame(draw);
}



var runMap = setInterval(function fps(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	draw();
	// moveMap();
}, 51);
//  draw();
