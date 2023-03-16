var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('hero', 'assets/hero.gif');
    this.load.image('enemy', 'assets/enemy.png');
}

function create() {
    //Add the Background
    this.add.image(960, 540, 'background');

    //Adding the hero
    this.hero = this.physics.add.sprite(0, 450, 'hero');
    this.hero.setCollideWorldBounds(true);
    this.hero.setScale(.7);
    this.hero.setSize(100, 200);
    this.hero.setOffset(50, 0);

    //Adding the enemy
    this.enemy = this.physics.add.sprite(1500, 450, 'enemy');
    this.enemy.setScale(5);
    this.physics.add.collider(this.hero, this.enemy, function() {
        this.enemy.destroy();
        score += 10;
        scoreText.setText('Score: ' + score);
        var winText = this.add.text(960, 50, 'You win!', { fontSize: '64px', fill: '#000' });
        setTimeout(function() {
            winText.destroy();
        }, 2000);
    }, null, this);
    scoreText = this.add.text(10, 10, 'Score: ' + score, { fontSize: '32px', fill: '#000' });


    //Adding the directional controlsW
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = {
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    };
}


function update() {
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
        this.hero.setVelocityX(-400);
        this.hero.flipX = true; // Flip the hero sprite when moving left
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
        this.hero.setVelocityX(400);
        this.hero.flipX = false; // Don't flip the hero sprite when moving right
    } else {
        this.hero.setVelocityX(0);
    }
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
        this.hero.setVelocityY(-400);
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
        this.hero.setVelocityY(400);
    } else {
        this.hero.setVelocityY(0);
    }
}
