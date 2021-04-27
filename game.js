// /** CONSTANTS **/
// const GAME_PIXEL_COUNT = 40;
// const SCORE = 0;
// // Direction codes
// const LEFT_DIR = 37;
// const UP_DIR = 38;
// const RIGHT_DIR = 39;
// const DOWN_DIR = 40;

// // Get the canvas element
// var gameCanvas =document.getElementById("gameCanvas");
// // Return a two dimensional drawing context
// var ctx =gameCanvas.getContext("2d");

window.onload=function() {
    canv=document.getElementById("gameContainer");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);
}
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
function game() {
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
 
    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            tail = 5;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length>tail) {
    trail.shift();
    }
 
    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }
}


// // Draw a "filled" rectangle to cover the entire canvas
// ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
// // Draw a "border" around the entire canvas
// ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
// // Move on step to the right
// advanceSnake();
// // Change vertical velocity to 0
//       dx =0;
// // Change horizontal velocity to 10
//       dy =-10;
// // Move one step up
// advanceSnake();
// // Draw snake on the canvas
// drawSnake();
// /**
//        * Advances the snake by changing the x-coordinates of its parts
//        * according to the horizontal velocity and the y-coordinates of its parts
//        * according to the vertical veolocity
// */
// functionadvanceSnake() {
// consthead= {x: snake[0].x+ dx, y: snake[0].y+ dy};
// snake.unshift(head);
// snake.pop();
// }
// /**
//        * Draws the snake on the canvas
// */
// functiondrawSnake() {
// // loop through the snake parts drawing each part on the canvas
// snake.forEach(drawSnakePart)
// }

// functiondrawSnakePart(snakePart) {
// // Draw a "filled" rectangle to represent the snake part at the coordinates
// // the part is located
// ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
// // Draw a border around the snake part
// ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
// }