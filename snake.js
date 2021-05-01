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

//create the snake 
function createSnake() {
    //snake will start with length of 2
    dots = 2;
    for(let i = 0; i < dots; i++){
        snake_x[i] = 50 - i * 10;
        snake_y[i] = 50;
    }
}

//create food in a random location on the game board
function createFood() {
    var f = Math.floor(Math.random() * 30);
    food_x = f * DOT_SIZE;

    f = Math.floor(Math.random() * 30);
    food_y = f * DOT_SIZE;

}

//snake eats food
function checkFood() {
    if((snake_x[0] == food_x) && (snake_y[0] == food_y)){
        dots++;
        score++;
        createFood();
    }
}

//draw food and snake at game start 
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

//actions at game over
function gameOver() {
    console.log("inside game over function");
    ctx.fillStyle = 'white';
    ctx.fillText('Game over', WIDTH/2, HEIGHT/2);
}

//move function
function move() {
    for(let i = dots; i > 0; i--){
        snake_x[i] = snake_x[(i - 1)];
        snake_y[i] = snake_y[(i - 1)];
    }
    if(left){
        snake_x[0] -= DOT_SIZE;
    }
    if(right){
        snake_x[0] += DOT_SIZE;
    }
    if(up){
        snake_y[0] -= DOT_SIZE;
    }
    if(down){
        snake_y[0] += DOT_SIZE;
    }
}


//end game if snake hits border or itself
function checkCollision() {
    for(let i = dots; i > 0; i--){
        if((i > 4) && (snake_x[0] == snake_x[i]) && (snake_y[0] == snake_y[i])){
            inGame = false;
        }
    }
    if(snake_y[0] >= HEIGHT){
        inGame = false;
    }
    if(snake_y[0] < 0){
        inGame = false;
    }
    if(snake_x[0] >= WIDTH){
        inGame = false;
    }
    if(snake_x[0] < 0){
        inGame = false;
    }
}

//game cycle
function game(){
    if(inGame){
        checkFood();
        checkCollision();
        move();
        draw();
        setTimeout("game()", DELAY);
    }
}

//keypress function
onkeydown = function(e) {
    console.log("key pressed!");
    console.log(e);
    var key = e.key;
    console.log("key: " + key);
    if((key == "ArrowLeft") && (!right)){
        console.log("LEFT KEY PRESSED");
        left = true;
        up = false;
        down = false;
    }
    if((key == "ArrowRight") && (!left)){
        console.log("RIGHT KEY PRESSED");
        right = true;
        up = false;
        down = false;
    }
    if((key == "ArrowUp") && (!down)){
        console.log("UP KEY PRESSED");
        up = true;
        right = false;
        left = false;
    }
    if((key == "ArrowDown") && (!up)){
        console.log("DOWN KEY PRESSED");
        down = true;
        right = false;
        left = false;
    }
};
