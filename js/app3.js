// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 1;
    if (this.x > 500) {
        this.x = -100;
    }
    //this.speed = Math.floor(Math.random()*5);

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*

allEnemies = [
    {
        speed: this.speed(30)
    },
    {
        speed: this.speed(50)
    },
    {
        speed: this.speed(40)
    },
]

*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 410;
};

Player.prototype.update = function(dt) {
    // first collission detection 
    for (let enemy of allEnemies) {
        let deltax = this.x - enemy.x - 15;
        let deltay = this.y - enemy.y - 20;
        let distance = Math.sqrt(deltax * deltax + deltay * deltay);
        if (distance < 56) {
            console.log('hit');
        }
    }
    // then if no collision, did player win?
    if (this.y < 10) {
        console.log('woot!');
        this.y = 410;
    }
};

/*
    if(this.y === enemy.y && (enemy.x + 40 >= this.x && enemy.x - 40 <= this.x)) {
        this.resetPlayer();
    };
*/

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    switch (dt) {
        case "left":
            this.x -= 100;
            break;
        case "right":
            this.x += 100;
            break;
        case "up":
            this.y -= 85;
            break;
        case "down":
            this.y += 85;
            break;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(0, 60, 40), new Enemy(0, 145, 80), new Enemy(0, 230, 120)];

var player = new Player();


//resetPlayer is used if the player collides with enemy bug throughout the game;
function resetPlayer() {
    this.x = 0;
    this.y = 0;
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function finishGame() {
    if (player.this.y < 0) {    //if player touches water in images/water-block.png in engine.js; then implement this function:
        console.log('Winner!');
        swal({
            title: 'Congratulations! You made it alive across the highway!', 
            text: `Select 'OK' to replay game; or 'Cancel' to Exit.`,
            buttons: ['Cancel', true],
        }).then(() => {
            gameRestart();
        });
    };
};

function gameRestart() {
    allEnemies = [];
};
