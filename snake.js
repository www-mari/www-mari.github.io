/* CONSTANTS */
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

const DOT_SIZE = 10;
const ALL_DOTS = 1600;
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
// const max_rand & const delay?

var snake_x = new Array(ALL_DOTS);
var snake_y = new Array(ALL_DOTS);
var food_x;
var food_y;

var ctx;

var head;
var food;
var dots;

function init() {
    const gameBoard = document.getElementById("gameBoard");
    ctx = gameBoard.getContext('2d');
    console.log("width * height =  (after adding element");
    console.log(gameBoard.width + gameBoard.height);
    console.log("width: " + gameBoard.width);
    console.log("height: " + gameBoard.height);

    loadImages();
    createSnake();
    createFood();
}

function loadImages() {

    head = new Image();
    head.src = 'body.png';

    food = new Image();
    food.src = 'food.png';

}

function createSnake() {
    //snake will start with length of 2
    for(let i = 0; i < 2; i++){
        snake_x[i] = 50 - z * 10;
        snake_y[i] = 50;
    }
}

function createFood() {
    var f = Math.floor(Math.random() * 30);
    food_x = f * DOT_SIZE;

    f = Math.floor(Math.random() * 30);
    food_y = f * DOT_SIZE;

}