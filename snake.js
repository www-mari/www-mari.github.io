/* CONSTANTS & VARIABLES*/
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var ctx;
var screenHeight = screen.height;
var screenWidth = screen.width;
var gameOverMenu;
var restartButton;
var quitSurvey;

const DOT_SIZE = 10;
const ALL_DOTS = 1600;
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const DELAY = 140;

var snake_x = new Array(ALL_DOTS);
var snake_y = new Array(ALL_DOTS);
var food_x;
var food_y;

var left = false;
var right = true;
var up = false;
var down = false;
var inGame = true;

var start_time;
var end_time;
var running_time;

var head;
var food;
var dots;
var score = 0;

function init() {
    const gameBoard = document.getElementById("gameBoard");
    ctx = gameBoard.getContext('2d');

    gameOverMenu = document.getElementById("gameOver");

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    quitSurvey = document.getElementById("quitSurvey");
    quitSurvey.addEventListener("click", quitAndSurvey);

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
        document.getElementById("points").innerHTML = score;
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
    gameOverMenu.style.visibility = "visible";
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
        stopwatch();
        checkFood();
        checkCollision();
        move();
        draw();
        setTimeout("game()", DELAY);
    }
}

function gameRestart(){
    gameOverMenu.style.visibility = "hidden";
    left = false;
    right = true;
    up = false;
    down = false;
    inGame = true;

    score = 0;
    document.getElementById("points").innerHTML = score;

    loadImages();
    createSnake();
    createFood();
    setTimeout("game()", DELAY);
}

function quitAndSurvey(){
    console.log("time for survey!");
}

//keypress function
onkeydown = function(e) {
    var key = e.key;

    if((key == "ArrowLeft") && (!right)){
        left = true;
        up = false;
        down = false;
    }
    if((key == "ArrowRight") && (!left)){
        right = true;
        up = false;
        down = false;
    }
    if((key == "ArrowUp") && (!down)){
        up = true;
        right = false;
        left = false;
    }
    if((key == "ArrowDown") && (!up)){
        down = true;
        right = false;
        left = false;
    }
};

function stopwatch(){
    start_time = performance.now();
    console.log("start time: " + start_time); 
    end_time = performance.now();
    running_time = end_time - start_time; //in ms
    console.log("running time: " + running_time);
    running_secs = (running_time/1000 % 60);
    console.log("running seconds: " + running_secs);
    running_mins = (running_time/60000 % 24);
    console.log("running minutes: " + running_mins);

    var out = "";
    var rs_str = (running_secs).toFixed(2);
    var rm_str = (running_mins).toFixed(2);
    console.log("rs_str and rm_str: " + rs_str + " " + rm_str);
    out = out.concat(rm_str,":", rs_str);
    console.log("OUT string: " + out);
}
