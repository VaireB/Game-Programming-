var config = {
    type: Phaser.AUTO,
    width: 1368,
    height: 768,
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
  };
  
  var game = new Phaser.Game(config);
  
  var player;
  var eggs;
  var bombs;
  var platforms;
  var cursors;
  var score = 0;
  var gameOver = false;
  var scoreText;
  
  function preload ()
  {
    this.load.image('background', 'assets/background.png');
    this.load.image('egg', 'assets/egg.png');
    this.load.image('bomb', 'assets/bomb.gif');
    this.load.spritesheet('player', 'assets/player.png',{ frameWidth: 32, frameHeight: 32 });
  }
  
  function create() {
    // Set up background
    this.add.image(config.width / 2, config.height / 2, 'background');

    // Set up player and physics
    player = this.physics.add.sprite(700, 700, 'player');
    player.setBounce(0.1);
    player.setScale(3);
    player.body.setSize(32, 32);
    player.setOrigin(0.5, 0.5); // Set sprite origin to its center
    player.setCollideWorldBounds(true);

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
    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKey('Space');

    // Set up eggs group and physics
    eggs = this.physics.add.group({
        key: 'egg',
        repeat: 0,
        setXY: { x: Phaser.Math.Between(0, 1368), y: 0, stepX: 70 }
    });

    eggs.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.1));
        child.setCollideWorldBounds(true);
    });

    // Set up bombs group and physics
    bombs = this.physics.add.group();
    bombs.children.iterate(function (child) {
    child.setCollideWorldBounds(true);
    child.disableBody(true, true); // Disable bomb physics by default
});


    // Set up score text
    scoreText = this.add.text(900, 16, 'Eggs Collected: 0', { fontSize: '32px', fill: '#000' });

    // Set up collisions and overlaps
    this.physics.add.collider(player, eggs, collectEgg, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // Set up world bounds and floor
    this.physics.world.setBounds(0, 0, 1368, 768);

    // Spawn bombs with eggs with 30% probability
    eggs.children.iterate(function (egg) {
        if (Phaser.Math.Between(1, 10) <= 10) {
            var bomb = bombs.create(egg.x, egg.y, 'bomb');
            bomb.setBounce(1);
            bomb.setVelocity(Phaser.Math.Between(-500, 200), 20);
        }
        // Set up collisions and overlaps between eggs and bombs
        this.physics.add.collider(egg, bombs, function() {}, null, this);
    }, this);
}

  
  function update()
  {
  if (gameOver)
  {
  return;
  }
  
  // Check if player is touching the ground
  var onGround = player.body.blocked.down || player.body.touching.down;
  
  // Set player velocity and animations based on keyboard input
  if (cursors.left.isDown)
  {
  player.setVelocityX(-300);
  player.anims.play('left', true);

  player.setScale(-3, 3); // Flip player horizontally

}
else if (cursors.right.isDown)
{
player.setVelocityX(300);

player.anims.play('right', true);

player.setScale(3, 3); // Set player scale back to normal
}
else
{
  player.setVelocityX(0);

  player.anims.play('turn');
}

if (cursors.space.isDown && onGround)
{
  player.setVelocityY(-330);
}

// Keep player, eggs, and bombs from going out of bounds
player.setCollideWorldBounds(true);
eggs.children.iterate(function (child) {
  child.setCollideWorldBounds(true);
});
bombs.children.iterate(function (child) {
  child.setCollideWorldBounds(true);
});

// Check for collisions and overlaps
this.physics.add.collider(player, platforms);
this.physics.add.overlap(player, eggs, collectEgg, null, this);
this.physics.add.collider(bombs, platforms);
this.physics.add.collider(player, bombs, hitBomb, null, this);

}

function collectEgg(player, egg) {
  // Disable the egg's physics body to remove it from the game world
  egg.disableBody(true, true);

  // Increase the score and update the score text
  score += 1;
  scoreText.setText('Eggs Collected: ' + score);

  // Change the player's tint based on the current score
  var tints = [0xffffff, 0xd10000, 0xff6622, 0xffda21, 0x33dd00, 0x1133cc, 0x220066, 0x330044];
  var currentTintIndex = Math.floor(score / 1) % tints.length;
  player.setTint(tints[currentTintIndex]);

  // Increase the player's size every 5 eggs
  if (score % 5 === 0) {
    player.setScale(player.scaleX * 1.1, player.scaleY * 1.1);
  }

  // Spawn a new egg at a random position
  var x = Phaser.Math.Between(0, 1368);
  var y = Phaser.Math.Between(0, 100);
  var newStar = eggs.create(x, y, 'egg');
  newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
}
  

  function hitBomb (player, bomb) {
    // Disable the player's physics body
    player.disableBody(true, true);
  
    // Set the gameOver variable to true
    gameOver = true;
  
    // Display a game over message
    this.add.text(config.width / 2 - 200, config.height / 2, 'Game Over', { fontSize: '64px', fill: '#000' });
}
