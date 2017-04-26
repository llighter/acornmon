// 맵 기본 단위
const UNIT = 64;
const IMG_U = 64;
const MAPIMG_U = 64;
const MOVE_U = 16;

// 키보드 코드 값 맵핑
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACE_BAR = 32;
const KEYBOARD_A = 65;
const KEYBOARD_1 = 49;
const KEYBOARD_2 = 50;
const KEYBOARD_3 = 51;
const KEYBOARD_4 = 52;
const KEYBOARD_5 = 53;

// 캐릭터 방향 값 맵핑
const SOUTH_DIRECTION = 0;
const WEST_DIRECTION = 1;
const EAST_DIRECTION = 2;
const NORTH_DIRECTION = 3;

// 맵 크기 및 코드 값 맵핑
const MAP_WIDTH = 640;
const MAP_HEIGHT = 640;
const MAP_GRASS = 0;
const MAP_ROAD01 = 1;
const MAP_STONE = 101;
const MAP_SAND = 3;
const MAP_SANDROAD01 = 4;
const MAP_SANDSTONE = 102;
const MAP_ACADEMY_YANG = 501;
const MAP_00_STORE_NPC = 502;
const MAP_00_QUEST_NPC = 503;
const MAP_01_STORE_NPC = 504;
const MAP_01_QUEST_NPC = 505;
const MAP_02_STORE_NPC = 506;
const MAP_02_QUEST_NPC = 507;
const MAP_ACADEMY_TO_00 = 90;
const MAP_00_TO_ACADEMY = 91;
const MAP_00_TO_01 = 99;
const MAP_01_TO_00 = 98;
const MAP_01_TO_02 = 97;
const MAP_02_TO_01 = 96;
const MAP_02_TO_BOSS = 95;
const MAP_BOSS_TO_02 = 94;

var player = new Image();
var bossmap = new Image();
var academy = new Image();
var village00 = new Image();
var village01 = new Image();
var village02 = new Image();

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

// Charactor's direction
var motionIdx = 0;

player.src = './img/map/jiwoo.png';
bossmap.src = './img/map/bossmap.png';
academy.src = './img/map/map_academy_v2.png';
village00.src = './img/map/stage00_npc.png';
village01.src = './img/map/stage01_npc.png';
village02.src = './img/map/stage02_npc.png';


var map_init = [
    [   0,   0,   0,   0,   0,   0,   0,   0,   0, 210],
    [ 202, 203, 204,   0,   0,   0, 501,   0, 205,2101],
    [2021,2031,2041,   0,   0,   0,   0, 206, 206,2102],
    [   0,   0,   0,   0,   0,   0,   0,   0,   0, 211],
    [ 207,   0,  207,  0, 207,   0, 207,   0, 207,2111],
    [2071, 209, 2071,209,2071,   0,2071, 209,2071, 211],
    [ 208,   0,  208,  0, 208,   0, 208,   0, 208,2111],
    [ 207,   0,  207,  0, 207,   0, 207,   0, 207, 211],
    [2071, 209, 2071,209,2071,   0,2071, 209,2071,2111],
    [208,    0, 208,   0, 208,  90, 208,   0, 208,   0]
];

var map_boss = [
    [ 301, 301, 301, 301, 301, 301, 301, 301, 301, 301],
    [ 301, 301,	  0,   0,   0,   0,   0,   0, 301, 301],
    [ 301, 301,   0,   0, 303,3021,   0,   0, 301, 301],
    [ 301, 301,   0,   0,   0,   0,   0,   0, 301, 301],
    [ 301, 301,   0,   0,   0,   0,   0,   0, 301, 301],
    [ 301, 301,   0,   0,   0,   0,   0,   0, 301, 301],
    [ 301, 301, 301, 301,   0,   0, 301, 301, 301, 301],
    [ 301, 301, 301, 301,   0,   0, 301, 301, 301, 301],
    [  94,   0,   0,   0,   0,   0, 301, 301, 301, 301],
    [ 301, 301, 301, 301, 301, 301, 301, 301, 301, 301]
];

var map00=[
	   [154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154],
	   [154,  0,  0,210,100,100,100,100,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,154],
	   [154,  0,  0,100,100,100,100,100,  0,  0,  0, 50, 50, 50, 50, 50, 50,  0,  0,154],
	   [154,  0,  0,100,100,100,100,100,  0,  0,  0, 50, 50, 50, 50, 50, 50,  0,  0,154],
	   [154,  0,  0,100,100,100,100,100,  0,  0,  0, 50, 50, 50, 50, 50, 50,  0,  0,154],
	   [154,  0,  0,100,100,91,100,100,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,154],
	   [154,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,200,100,  0,  0,154],
	   [154,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0,  0,100,100,155,  0,154],
	   [154,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  502,  0,  0,154],
	   [154,  0,  0,  0,  0,  1,  0,  0,  0,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,154],
	   [154,  0,  0, 50, 50, 50, 50, 50,  0,  1,  1,  0,  0,230,100,  0,  0,  0,  0,154],
	   [154,  0,  0, 50, 50, 50, 50, 50,  0,  1,  1,  0,  0,100,100,  0,  0,  0,  0,154],
	   [154,  0,  0, 50, 50, 50, 50, 50,  0,  1,  1,  1,  1,  1,  503,  1,  1,  1,  1, 99],
	   [154,  0,220,100,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 99],
	   [154,  0,100,100,  0,  0,  0,  0,  0,  1,  1,  0,  0,  0,  0,  1,  0,  0,  0,154],
	   [154,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  1,  0,  0,  0,154],
	   [154,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 50, 50, 50, 50, 50, 50,154],
	   [154,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 50, 50, 50, 50, 50, 50,154],
	   [154,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 50, 50, 50, 50, 50, 50,154],
	   [154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154]

	];


var map01=[
	   [  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,110, 97, 97,110,  3,  3,  3,  3],
	   [  3,  3,  3,  3,  3,  3,110,110,110,110,110,110,110,  5,  5,110,110,110,110,110],
	   [ 52, 52, 52,  3,  3,  3,110, 51, 51,  3,  3,  3,  3,  5,  5,  3,  3,  3,  3,110],
	   [ 52, 52, 52,  3,  3,  3,110, 51, 51,  3,  3,200,100,  5,  5,  3,  3,  3,  3,110],
	   [ 52, 52, 52,  3,  3,  3,110, 51, 51,  3,  3,100,100,  5,  5,  3,  3,  3,  3,110],
	   [ 52, 52, 52,  3,  3,  3,110,  3,  3,  3,  3,  3,  504,  5,  5,  3,  3,220,  3,110],
	   [ 52, 52, 52,  3,  3,  3,110,  3,230,100,  3,  3,  3,  5,  5,  3,  3,  3,  3,110],
	   [  3,  3,  3,  3,  3,  3,110,  3,100,100,  505,  3,  3,  5,  5,  3,  3,  3,  3,110],
	   [  3,  3,  3,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  3,  3,  3,110],
	   [  3,  3,  3,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,240,  3,  3,110],
	   [  3,  3,  3,  3,  5,  3,110,  3,  3,  3,  3,  3,  3,  3,  3,  3,100,  3,  3,110],
	   [  3,  3,  3,  3,  5,  3,110,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,110],
	   [  3,  3,  3,  3,  5,  3,110,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,110],
	   [  3,  3,  3,  3,  5,  3,110,  3, 51, 51, 51, 51, 51,  3,  3,  3, 51, 51, 51,110],
	   [154,  3,  3,  3,  5,  3,110,  3, 51, 51, 51, 51, 51,  3,  3,  3, 51, 51, 51,110],
	   [154,154,  3,  3,  5,  3,110,  3, 51, 51, 51, 51, 51,  3,  3,  3, 51, 51, 51,110],
	   [ 98,  4,  4,  4,  5,  3,110,110,110,110,110,110,110,110,110,  3,110,110,110,110],
	   [ 98,  4,  4,  4,  4,  3,  3,  3,  3, 52, 52, 52, 52, 52, 52,  3,  3,  3,  3,  3],
	   [154,154,  3,  3,  3,  3, 52, 52,  3, 52, 52, 52, 52, 52, 52,  3,  3, 52, 52, 52],
	   [154,154,154,  3,  3,  3, 52, 52,  3,  3,  3,  3,  3,  3,  3,  3,  3, 52, 52, 52]

	];
	
	
var map02=[
	   [152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152],
	   [152,230,100,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,156,155,152,152,152,152,152],
	   [152,100,100,156,  8,  8,  8,  8,  8,  8,  8,  7,  7,  7,  7,  7,  7,  7,  7,152],
	   [  7,  507,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  8,  7,  7,152],
	   [  7,  7,  8,  8,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  8,  7,  7,152],
	   [  7,  7,  8,  8,  7,  7,  7,  7,152,152,  7,  7,  7,  7,  7,  7,  8,  7,  7,152],
	   [  7,  7,  8,  8, 53, 53, 53, 53,152,152,152,152,152,  7,  7,  7,  8,  7, 54, 54],
	   [  7,  7,  8,  8, 53, 53, 53,152,152,152,152,152,240,100,100,  7,  8,  7, 54, 54],
	   [  7,  7,  8,  8, 53, 53, 53,152,152,  7,  7,155,100,100,100,  7,  8,  7, 54, 54],
	   [  7,  7,  8,  8,152,152,152,152,152,  7,  7,  7,  7,  7,  7,  7,  8,  7, 54, 54],
	   [  7,  7,  8,  8,152,152,152,152,152, 53, 53,  7,  8,  8,  8,  8,  8,152,152,152],
	   [  7,  7,  8,  8,152,152,152,152,152, 53, 53,  7,  8,152,152,152,152,152,152,152],
	   [  7,  7,  8,  8,  8,  7,200,100,152, 53, 53,  7,  8,152,152,152,152,152,152,152],
	   [  7,  7,  7,  8,  8,  7,100,100,152,  7,  7,  8,  8,152,152,152,152,152,152,152],
	   [ 53, 53,  7,  8,  8,  8,  8,  506,152,  7,  7,  8,  7, 54, 54, 54, 54,  7,152,152],
	   [ 53, 53,  7,  8,  8,152,152,152,152,  7,  7,  8,  7, 54, 54, 54, 54,  7,152,152],
	   [ 53, 53,  7,  8,  8,152,152,  7,220,100,  7,  8,  7,  7,  7,  7,  7,  7,  7,152],
	   [ 53, 53,  7,  8,  8,152,152,  7,100,100,  7,  8,  8,  8,  8,  8,  8,  8,  8, 95],
	   [ 53, 53,  7,  8,  8,152,152,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  7,  8, 95],
	   [152,152,152, 96, 96,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152]

	];	

