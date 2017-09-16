// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //reset position of enemy to move across again
    if (this.x > 600) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 1000);
        //generates random nos from 100-1000 for speed
    }

    // Checks collision :
    if (player.x < this.x + 60 && player.x + 50 > this.x &&
        player.y < this.y + 60 && player.y + 50 > this.y) {
        player.x = 200;
        player.y = 400;
        // reset ^ player position after detecting collision
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas boundaries
    if (this.x < 0 ) {
        this.x = 0;
    } else

    if (this.x > 400) {
        this.x = 400;
    } else

    if (this.y < -10 ) {
        this.y = -10;
    } else

    if (this.y > 400) {
        this.y = 400;
    }

    // Check for player reaching top of canvas
    if (this.y < 0) {
        this.x = 200;
        this.y = 400;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Control player movement
Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'up':
            this.y -= 80;
            break;
        case 'down':
            this.y += 80;
            break;
        case 'left':
            this.x -= 100;
            break;
        case 'right':
            this.x += 100;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position for enemies created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 400, 50);
var enemy;

enemyPosition.forEach(function(position) {
        var num = 100;
        enemy = new Enemy(0, position, num + Math.floor(Math.random() * num));
        allEnemies.push(enemy);
});

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
