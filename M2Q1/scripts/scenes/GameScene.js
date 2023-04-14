export default class GameScene extends Phaser.Scene {
  constructor(){
    super("GameScene");
    this.player;
    this.eggs;
    this.bombs;
    this.platforms;
    this.cursors;
    this.score = 0;
    this.gameOver = false;
    this.scoreText;
  }

  preload () {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('egg', 'assets/images/egg.png');
    this.load.image('bomb', 'assets/images/bomb.gif');
    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    // Set up background
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = 1366;
    background.displayHeight = 768;

    // Set up player and physics
    this.player = this.physics.add.sprite(700, 700, 'player');
    this.player.setBounce(0.1);
    this.player.setScale(3);
    this.player.body.setSize(32, 32);
    this.player.setOrigin(0.5, 0.5); // Set sprite origin to its center
    this.player.setCollideWorldBounds(true);

    // Set up player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    // Set up keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKey('Space');

    // Set up eggs group and physics
    this.eggs = this.physics.add.group({
        key: 'egg',
        repeat: 2,
        setXY: { x: Phaser.Math.Between(0, 1368), y: 0, stepX: 70 }
    });

    this.eggs.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.1));
        child.setCollideWorldBounds(true);
    });

    // Set up bombs group and physics
    this.bombs = this.physics.add.group();
    this.bombs.children.iterate(function (child) {
      child.setCollideWorldBounds(true);
      child.disableBody(true, true); // Disable bomb physics by default
    });

    // Set up score text
    this.scoreText = this.add.text(1010, 16, 'Eggs Collected: 0', { fontSize: '32px', fill: '#000' });

    // Set up collisions and overlaps
    this.physics.add.collider(this.player, this.eggs, this.collectEgg, null, this);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    // Set up world bounds and floor
    this.physics.world.setBounds(0, 0, 1368, 768);

    // Spawn bombs with eggs with 30% probability
    this.eggs.children.iterate(function (egg) {
        if (Phaser.Math.Between(1, 10) <= 10) {
            const bomb = this.bombs.create(egg.x, egg.y, 'bomb');
            bomb.setBounce(1);
            bomb.setVelocity(Phaser.Math.Between(-500, 200), 20);
        }
        // Set up collisions and overlaps between eggs and bombs
        this.physics.add.collider(egg, this.bombs, function() {}, null, this);
    }, this);
  }

  update() {
    if (this.gameOver) {
      return;
    }
  
    // Check if player is touching the ground
    const onGround = this.player.body.blocked.down || this.player.body.touching.down;
    
    // Set player velocity and animations based on keyboard input
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play('left', true);

      this.player.setScale(-3, 3); // Flip player horizontally
  
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
  
      this.player.anims.play('right', true);
  
      this.player.setScale(3, 3); // Set player scale back to normal
    } else {
      this.player.setVelocityX(0);
  
      this.player.anims.play('turn');
    }
  
    if (this.cursors.space.isDown && onGround) {
      this.player.setVelocityY(-330);
    }
  
    // Keep player, eggs, and bombs from going out of bounds
    this.player.setCollideWorldBounds(true);
    this.eggs.children.iterate(function (child) {
      child.setCollideWorldBounds(true);
    });
    this.bombs.children.iterate(function (child) {
      child.setCollideWorldBounds(true);
    });
  
    // Check for collisions and overlaps
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.eggs, this.collectEgg, null, this);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

  }

  collectEgg(player, egg) {
    // Disable the egg's physics body to remove it from the game world
    egg.disableBody(true, true);

    // Increase the score and update the score text
    this.score += 1;
    this.scoreText.setText('Eggs Collected: ' + this.score);

    // Change the player's tint based on the current score
    const tints = [0xffffff, 0xd10000, 0xff6622, 0xffda21, 0x33dd00, 0x1133cc, 0x220066, 0x330044];
    const currentTintIndex = Math.floor(this.score / 1) % tints.length;
    this.player.setTint(tints[currentTintIndex]);

    // Increase the player's size every 5 eggs
    if (this.score % 5 === 0) {
        this.player.setScale(this.player.scaleX * 1.1, this.player.scaleY * 1.1);
    }

    // Spawn a new egg at a random position
    const x = Phaser.Math.Between(0, 1368);
    const y = Phaser.Math.Between(0, 100);
    const z = Phaser.Math.Between(0,1000);
    const newStar = this.eggs.create(x, y, 'egg');
    newStar.setBounceY(Phaser.Math.FloatBetween(0.2, 0.8));
  }


  hitBomb(player, bomb) {
    // Disable the player's physics body
    this.player.disableBody(true, true);

    // Set the gameOver variable to true
    this.scene.start('GameOverScene', { score: this.score });

  }
}