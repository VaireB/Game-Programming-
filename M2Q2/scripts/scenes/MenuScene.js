export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
        // preload audio files
        this.load.audio('menuMusic', 'assets/audio/menuBGM.mp3');
        // preload background image
        this.load.image('menuBackground', 'assets/images/menuBG.png');
    }

    create() {
        // add the background image
        const menuBackground = this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);
        menuBackground.setOrigin(0,0);
        menuBackground.displayWidth = 400;
        menuBackground.displayHeight = 600;

        // background music
        this.music = this.sound.add('menuMusic', { loop: true });
        this.music.play();
        

        // add the start button
        const startButton = this.add.text(120, 400, 'Start Game', { font: '32px Arial', fill: '#000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.music.stop(); // stop the menu music when transitioning to the game scene
                this.scene.start('game');
            });
    }
}
