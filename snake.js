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
var right = false;
var up = false;
var down = false;
var inGame = true;

var start_time = Date.now();
var running_time;
var interval;

var head;
var food;
var dots;
var score = 0;
var restart_count = 0;

function init() {
    const gameBoard = document.getElementById("gameBoard");
    ctx = gameBoard.getContext('2d');

    gameOverMenu = document.getElementById("gameOver");
    formMenu = document.getElementById("form");

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    startButton = document.getElementById("startButton");
    startButton.addEventListener("click", start)

    quitSurvey = document.getElementById("quitSurvey");
    quitSurvey.addEventListener("click", quitAndSurvey);

    // loadImages();
    // createSnake();
    // createFood();
    // interval = setInterval(stopwatch, 1000);
    // setTimeout("game()", DELAY);
}

function start(){
    startButton.style.visibility = "hidden";
    loadImages();
    createSnake();
    createFood();
    interval = setInterval(stopwatch, 1000);
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
    //snake will start with length of 1
    dots = 1;
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
    right = false;
    up = false;
    down = false;
    inGame = true;

    score = 0;
    restart_count++;
    document.getElementById("points").innerHTML = score;

    loadImages();
    createSnake();
    createFood();
    setTimeout("game()", DELAY);
}

function quitAndSurvey(){
    var final_score = document.getElementById("points").innerHTML;
    var final_time = document.getElementById("timer").innerHTML;

    clearInterval(interval);

    document.getElementById("restart").value = restart_count;
    document.getElementById("time").value = final_time;

    gameOverMenu.style.visibility = "hidden";
    formMenu.style.visibility = "visible";
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
    running_time = Date.now() - start_time; //in ms
    running_secs = (running_time/1000 % 60);
    running_mins = (running_time/60000 % 24)

    var out = "";
    var rs_str = sprintf("%02d", running_secs);
    var rm_str = sprintf("%02d", running_mins);
    out = out.concat(rm_str,":", rs_str);
    document.getElementById("timer").innerHTML = out;
}

function sprintf(str) {
    var args = arguments, i = 1;

    return str.replace(/%(s|d|0\d+d)/g, function (x, type) {
        var value = args[i++];
        switch (type) {
        case 's': return value;
        case 'd': return parseInt(value, 10);
        default:
            value = String(parseInt(value, 10));
            var n = Number(type.slice(1, -1));
            return '0'.repeat(n).slice(value.length) + value;
        }
    });
}
