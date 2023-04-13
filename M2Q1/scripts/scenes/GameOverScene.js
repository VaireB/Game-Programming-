class GameOverScene extends Phaser.Scene {
  constructor() {
      super('GameOverScene');
  }
  preload() {
      this.load.image('retryBtn', 'assets/GameOver/retryBtn.png');
      this.load.image('mainMenuBtn', 'assets/GameOver/mainMenuBtn.png');
  }
  create() {
      // Add the background
      const bg = this.add.sprite(0, 0, 'background');
      bg.setOrigin(0, 0);
      bg.displayWidth = config.width;
      bg.displayHeight = config.height;

      //Display game over message
      let gameOverText = this.add.text(config.width / 2 - 200, config.height / 2 - 100, 'GAME OVER', { fontSize: '64px', fill: '#000' });

      //Display score
      let scoreText = this.add.text(config.width / 2 - 200, config.height / 2, 'Score: ' + score, { fontSize: '32px', fill: '#000' });

      // Add the Retry button
      const retryBtn = this.add.sprite(config.width / 2, config.height / 2 + 100, 'retryBtn').setInteractive();
      retryBtn.setScale(0.3);
      retryBtn.on('pointerdown', () => this.scene.start('GameScene'));

      // Add the Main Menu button
      const mainMenuBtn = this.add.sprite(config.width / 2, config.height / 2 + 200, 'mainMenuBtn').setInteractive();
      mainMenuBtn.setScale(0.3);
      mainMenuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }
}