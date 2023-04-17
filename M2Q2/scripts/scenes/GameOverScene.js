export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameover');
    }
    preload() {
        this.load.audio('gameOverSound', 'assets/audio/gameOver.mp3');
    }

    create(data) {
        this.cameras.main.setBackgroundColor('#860111'); // Add red background color
    
        const gameOverText = this.add.text(this.cameras.main.centerX, 100, 'Game Over', { font: '32px Arial', fill: '#fff' });
        gameOverText.setOrigin(0.5, 0.5);
    
        const scoreText = this.add.text(this.cameras.main.centerX, 200, `Score: ${data.score}`, { font: '32px Arial', fill: '#fff' });
        scoreText.setOrigin(0.5, 0.5);
    
        const timeSurvivedText = this.add.text(this.cameras.main.centerX, 240, `Time Survived: ${data.timeSurvived}`, { font: '32px Arial', fill: '#fff' });
        timeSurvivedText.setOrigin(0.5, 0.5);
    
        const restartButton = this.add.text(this.cameras.main.centerX, 300, 'Restart', { font: '32px Arial', fill: '#fff' })
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('game');
            });
    
        this.sound.stopAll();
        this.sound.play('gameOverSound');
    }
}