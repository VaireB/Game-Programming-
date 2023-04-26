let map;
let jumpSound;
let groundLayer;
let coinLayer;
let player;
let cursors;
let text;
let score = 0;
let lives;
let livesText;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'assets/levels/map.json');
        // tiles in spritesheet 
        this.load.spritesheet('tiles', 'assets/levels/tiles.png', {frameWidth: 70, frameHeight: 70});
        // simple coin image
        this.load.image('coin', 'assets/levels/coinGold.png');
        // player spritesheet
        this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 32, frameHeight: 32});



        this.load.audio('coinSound', 'assets/audio/coin.wav');
        this.load.audio('jumpSound', 'assets/audio/jump.wav');
        this.load.audio('gameBGM', ['assets/audio/gameBGM.mp3']);
    }
    
create() {

    let gameBGM = this.sound.add('gameBGM');
    gameBGM.play({ loop: true });
    gameBGM.setVolume(0.2);
    const coinSound = this.sound.add('coinSound');
    coinSound.setVolume(0.2);
    jumpSound = this.sound.add('jumpSound');
    jumpSound.setVolume(0.2);
    
    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    groundLayer = map.createLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // coin image used as tileset
    var coinTiles = map.addTilesetImage('coin');
    // add coins as tiles
    coinLayer = map.createLayer('Coins', coinTiles, 0, 0);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // create the player sprite    
    player = this.physics.add.sprite(100, 450, 'player', 0);
    player.body.setSize(player.width, player.height, true);
    player.body.setOffset(0, 0); // offset the hitbox to the bottom of the sprite
    player.setScale(2.5);
    player.setBounce(0.1); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    

    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);

    score = 0;
    lives = 3;

    coinLayer.setTileIndexCallback(17, (sprite, tile) => {
        coinLayer.removeTileAt(tile.x, tile.y);
        score++;
        text.setText('Score: ' + score);
        coinSound.play(); // play the coin sound effect
        if (score >= 15) {
            this.scene.start('StageClearedScene');
        }
        return false;
    }, this);

    const OoBLayer = map.createLayer('OoB', groundTiles, 0, 0);
    OoBLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(player, OoBLayer, () => {
    lives--;
    if (lives <= 0) {
    this.scene.start('gameOverScene');
    } else {
    player.setPosition(100, 450);
    }
    });



    this.physics.add.overlap(player, coinLayer);

    // player animations
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {start: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
        });

        // set up keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    // display score
    text = this.add.text(50, 100, 'Score: 0', { font: '32px Arial', fill: '#FFFFFF' });
    livesText = this.add.text(50, 150, 'Lives: ' + lives, { font: '32px Arial', fill: '#FFFFFF' });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);

}

//update the lives text to follow the camera
update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        player.flipX = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
        player.flipX = false;
    } else {
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }

    // player can jump while walking any direction by pressing the space bar
    if (cursors.space.isDown && player.body.onFloor()) {
        player.setVelocityY(-200);
        jumpSound.play(); // play the jump sound effect
    }

    text.x = this.cameras.main.scrollX+50;
    text.y = this.cameras.main.scrollY+100;

    livesText.setText('Lives: ' + lives);
    
    
    
}


collectCoin(sprite, tile) {
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 1 point to the score
    text.setText('Score: ' + score); // set the text to show the current score

    // check if player has collected 15 coins
    if (score >= 15) {
        this.scene.start('StageClearedScene');
    }

    return false;
}
}