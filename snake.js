/* CONSTANTS & VARIABLES*/
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var ctx;

const DOT_SIZE = 10;
const ALL_DOTS = 1600;
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const DELAY = 140;
// const max_rand & const delay?

var snake_x = new Array(ALL_DOTS);
var snake_y = new Array(ALL_DOTS);
var food_x;
var food_y;

var left = false;
var right = true;
var up = false;
var down = false;
var inGame = true;

var head;
var food;
var dots;
var score = 0;

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
    setTimeout("game()", DELAY);
}

function loadImages() {

    head = new Image();
    head.src = 'body.png';

    food = new Image();
    food.src = 'food.png';

}

function createSnake() {
    //snake will start with length of 2
    dots = 2;
    for(let i = 0; i < dots; i++){
        snake_x[i] = 50 - i * 10;
        snake_y[i] = 50;
    }
}

function createFood() {
    var f = Math.floor(Math.random() * 30);
    food_x = f * DOT_SIZE;

    f = Math.floor(Math.random() * 30);
    food_y = f * DOT_SIZE;

}

function checkFood() {
    if((snake_x[0] == food_x) && (snake_y[0] == food_y)){
        dots++;
        score++;
        createFood();
    }
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if(inGame){
        ctx.drawImage(food, food_x, food_y);

        for(let i = 0; i < dots; i++){
            ctx.drawImage(head, snake_x[i], snake_y[i]);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    console.log("inside game over function");
    ctx.fillStyle = 'white';
    ctx.fillText('Game over', WIDTH/2, HEIGHT/2);
}

function game(){
    if(inGame){
        checkFood();
        draw();
        setTimeout("game()", DELAY);
    }
}