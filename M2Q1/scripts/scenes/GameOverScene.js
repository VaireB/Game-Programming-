
export default class GameOverScene extends Phaser.Scene {
      constructor() {
    super('GameOverScene');
  }
  
  init(data) {
    this.score = data.score;
  }
  preload() {
      this.load.image('retryBtn', 'assets/images/retryBtn.png');
      this.load.image('mainMenuBtn', 'assets/images/mainMenuBtn.png');
      this.load.image('gameOver' , 'assets/images/gameover.png');
  }
  create() {
      // Add the background
      const gameoverbg = this.add.sprite(0, 0, 'gameOver');
      gameoverbg.setOrigin(0, 0);
      gameoverbg.displayWidth = 1368;
      gameoverbg.displayHeight = 768;

      //Display game over message
      this.add.text(500, 200, 'GAME OVER', { fontSize: '64px', fill: '#000' });

      //Display score
      this.add.text(590, 300, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

      // Add the Retry button
      const retryBtn = this.add.sprite(600, 400, 'retryBtn').setInteractive();
      retryBtn.setScale(0.2);
      retryBtn.on('pointerdown', () => this.scene.start('GameScene'));
      this.add.text(560, 450, 'Retry?', { fontSize: '25px', fill: '#000' });

      // Add the Main Menu button
      const mainMenuBtn = this.add.sprite(750, 400, 'mainMenuBtn').setInteractive();
      mainMenuBtn.setScale(0.2);
      mainMenuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
      this.add.text(690, 450, 'Main Menu', { fontSize: '25px', fill: '#000' });
  }
}