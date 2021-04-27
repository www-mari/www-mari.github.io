// /** CONSTANTS **/
const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);
const SCORE = 0;
// Direction codes
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

// Get the canvas element
const gameContainer = document.getElementById("gameContainer");

const createGameBoardPixels = () => {
    // Populate the [#gameContainer] div with small div's representing game pixels
    for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) {
      gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
};

// variable of createGameBoardPixels()
const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

// SETUP:

let snake;
let food;
let w;
let h;

function setup() {
    w = 10;
    h = 10;
    frameRate(5);
    snake = new Snake();
    foodLocation();

}

function foodLocation() {
    let foodx = floor(random.randrange(0, dis_width - 10.0) / 10.0) * 10.0;
    let foody = floor(random.randrange(0, dis_height - 15.0) / 10.0) * 10.0;
    food = createVector(foodx, foody);

}

function keyPressed() {
    if (keyCode === LEFT_DIR) {
        snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_DIR) {
        snake.setDir(1, 0);
    } else if (keyCode === DOWN_DIR) {
        snake.setDir(0, 1);
    } else if (keyCode === UP_DIR) {
        snake.setDir(0, -1);
    } else if (key == ' ') {
        snake.grow();
    }
}

function draw() {
    scale(20);
    if(snake.eat(food)){
        foodLocation();
    }
    snake.update();
    snake.show();

    if(snake.endGame()){
        print('END GAME');
        noLoop();
    }

    noStroke();
    rect(food.foodx, food.foody, 1, 1);
}


