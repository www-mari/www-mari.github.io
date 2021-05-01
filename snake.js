/* CONSTANTS */
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

const gameContainer = document.getElementById("gameContainer");
console.log("width * height =  (after adding element");
console.log(gameContainer.width + gameContainer.height);
console.log("width: " + gameContainer.width);
console.log("height: " + gameContainer.height);

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const WIDTH = gameContainer.width;
const HEIGHT = gameContainer.height;
// const max_rand & const delay?

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);