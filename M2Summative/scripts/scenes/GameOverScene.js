export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameOverScene' });
  }

  // Define the create method
  create() {

    this.cameras.main.setBackgroundColor("#4E0707");
    // Add game over text
    const gameOverText = this.add.text(400, 250, 'Game Over', {
      fontSize: '32px',
      fill: '#FFF'
    });
    gameOverText.setOrigin(0.5, 0.5);

    // Add restart text
    const restartText = this.add.text(400, 300, 'Press SPACE to Restart', {
      fontSize: '20px',
      fill: '#FFF'
    });
    restartText.setOrigin(0.5, 0.5);

    // Handle input
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('game');
    });
  }
}
