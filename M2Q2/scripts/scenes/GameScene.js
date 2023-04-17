export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }
 
    preload() {         
        
         // preload the projectile sprite
        this.load.image('projectile', 'assets/sprites/projectile.png');
    
        // preload the obstacle sprite
        this.load.image('obstacle', 'assets/sprites/obstacle.png');
        
        // preload the player sprite
        this.load.spritesheet('player', 'assets/sprites/player.png', {
            frameWidth: 231,
            frameHeight: 190
        });

        // preload the background music
        this.load.audio('backgroundMusic', 'assets/audio/gameBGM.mp3');
    
        // preload the sound effects
        this.load.audio('shootSound', 'assets/audio/shoot.wav');
        this.load.audio('collisionSound', 'assets/audio/collision.wav');
        this.load.audio('playerSound', 'assets/audio/ouch.wav');
    
        //preload the background
        this.load.image('gameBackground', 'assets/images/gameBG.png');
    }
    

    create() {
        // background image
        const gameBG = this.add.sprite(0, 0, 'gameBackground').setOrigin(0, 0);
        gameBG.displayWidth = this.cameras.main.width;
        gameBG.displayHeight = this.cameras.main.height;


        // background music
        this.music = this.sound.add('backgroundMusic', { loop: true });
        this.music.play();

        // set up the player
        this.player = this.physics.add.sprite(320, 580, 'player').setScale(1);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
        key: 'player_anim',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
        
        });
        this.player.body.setSize(100, 100);
        this.player.body.setOffset(65, 45);
 

        this.player.anims.play('player_anim');

        // set up the keyboard input for moving the player
        this.cursors = this.input.keyboard.createCursorKeys();

        // set up the projectiles group
        this.projectiles = this.physics.add.group({
            allowGravity: false,
            key: 'projectile'
        });

        // set up the obstacles group
        this.obstacles = this.physics.add.group({
            allowGravity: false,
            key: 'obstacle'
        });
        


    // spawn a new obstacle every .7 seconds
        this.obstacleSpawnTimer = this.time.addEvent({
        delay: 700,
        callback: this.spawnObstacle,
        callbackScope: this,
        loop: true
     });


        // set up collision detection between projectiles and obstacles
        this.physics.add.collider(this.projectiles, this.obstacles, (projectile, obstacle) => {
            projectile.destroy();
            obstacle.destroy();
            // play collision sound effect
            this.sound.play('collisionSound', { volume: 0.1 });
            
            // update the score
            this.score += 10;
            this.scoreText.setText(`Score: ${this.score}`);
        });
        

        // set up collision detection between player and obstacles
        this.physics.add.collider(this.player, this.obstacles, () => {
            // stop the obstacle spawn timer
            this.obstacleSpawnTimer.remove(false);
            this.timer.remove(false);
            
            // play collision sound effect
            this.sound.play('playerSound', { volume: 0.4 });

            // delay for 2 seconds before going to game over scene
            this.time.delayedCall(2000, () => {
                this.scene.start('gameover', { score: this.score, timeSurvived: this.timeSurvived });
            });
        });
        

        // set up the UI
        this.timeSurvived = 0;
        this.score = 0;
        this.scoreText = this.add.text(10, 10, 'Score: 0', { font: '32px Arial', fill: '#fff' });
        this.timeText = this.add.text(240, 10, 'Time: 0', { font: '32px Arial', fill: '#fff' });
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeSurvived++;
                this.timeText.setText(`Time: ${this.timeSurvived}`);
            },
            callbackScope: this,
            loop: true
        });
    }

        update() {
        // move the player
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-500);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(500);
        } else {
            this.player.setVelocityX(0);
        }

        // shoot projectiles
        if (this.input.keyboard.checkDown(this.cursors.space, 300)) {
            this.spawnProjectile();
            // play shoot sound effect
            this.sound.play('shootSound', { volume: 0.1 });
            }
                // spawn a new obstacle when an existing one falls off the screen
    const bottomObstacle = this.obstacles.getChildren()[0];
    if (bottomObstacle && bottomObstacle.y > 590) {
        bottomObstacle.destroy();
        this.spawnObstacle();
    }

    // check for game over
    if (this.timeSurvived >= 60) {
        this.scene.start('victory', { score: this.score, timeSurvived: this.timeSurvived });
    }
}

    spawnProjectile() {
    const fireball = this.projectiles.get(this.player.x, this.player.y - 50, 'projectile').setScale(1.5);
    fireball.angle = -90;
    fireball.setActive(true);
    fireball.setVisible(true);
    fireball.setVelocityY(-600);

}

    spawnObstacle() {
    const x = Phaser.Math.Between(40, 360);
    const enemy = this.obstacles.get(x, -200, 'obstacle').setScale(3);
    enemy.setActive(true);
    enemy.setVisible(true);
    enemy.setVelocityY(Phaser.Math.Between(200, 300));
}
}
