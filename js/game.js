var stage = document.getElementById('stage-board');
var context = stage.getContext('2d');

var speed = 1;

var speedX = 0;
var speedY = 0
var positionX = 10;
var positionY = 15;

var blocSize = 20;
var pieces = 20;

var foodX = 15;
var foodY = 15;

var trail = [];
var tail = 5;

var score = 0;

document.addEventListener('keydown', keyPush);
var updateSpeed = 180;
setInterval(game, updateSpeed);

function game() {
    positionX += speedX;
    positionY += speedY;

    if (positionX < 0) {
        positionX = pieces - 1;
    }
    if (positionX > pieces - 1) {
        positionX = 0;
    }
    if (positionY < 0) {
        positionY = pieces - 1;
    }
    if (positionY > pieces - 1) {
        positionY = 0;
    }

    /* Board Style */
    context.fillStyle = 'black';
    context.fillRect(0, 0, stage.width, stage.height);

    /* Food Style */
    context.fillStyle = 'red';
    context.fillRect(foodX * blocSize, foodY * blocSize, blocSize, blocSize);

    /* Snacke Style */
    context.fillStyle = 'gray';
    for (var i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * blocSize, trail[i].y * blocSize, blocSize, blocSize);
        if (trail[i].x == positionX && trail[i].y == positionY) {
            speedX = 0;
            speedY = 0;
            tail = 5;
        }
    }

    trail.push({
        x: positionX,
        y: positionY
    });

    while (trail.length > tail) {
        trail.shift();
    }

    if (foodX == positionX && foodY == positionY) {
        tail++;
        score++;
        if (score % 3 == 0 && updateSpeed > 60) {
            updateSpeed = updateSpeed - 60;
        }
        document.getElementById('score').innerHTML = score;
        foodX = Math.floor(Math.random() * pieces);
        foodY = Math.floor(Math.random() * pieces);
    }
}

function keyPush(event) {
    switch (event.keyCode) {
        case 37: //left
            speedX = -speed;
            speedY = 0;
            break;
        case 38: //up
            speedX = 0;
            speedY = -speed;
            break;
        case 39: //right
            speedX = speed;
            speedY = 0;
            break;
        case 40: //down
            speedX = 0;
            speedY = speed;
            break;
        default:
            break;
    }
}