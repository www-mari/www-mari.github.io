/* CONSTANTS */
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
// const max_rand & const delay?

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function init() {
    const gameBoard = document.getElementById("gameBoard");
    var ctx = gameBoard.getContext('2d');
    console.log("width * height =  (after adding element");
    console.log(gameBoard.width + gameBoard.height);
    console.log("width: " + gameBoard.width);
    console.log("height: " + gameBoard.height);
}