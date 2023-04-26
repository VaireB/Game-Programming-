export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
        this.load.image('background', 'assets/background/background.png');
        this.load.image('button', 'assets/button/button.png');
        this.load.audio('menuBGM', 'assets/audio/menuBGM.mp3');
    }

    create() {
        // add background image
        var background = this.add.image(0, 0, 'background').setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // add start button
        var startButton = this.add.image(400, 400, 'button').setInteractive();
        startButton.setScale(0.5);
        startButton.on('pointerdown', function (pointer) {
            this.sound.stopAll();
            this.scene.start('game');
        }.bind(this));

        // add text to start button
        var text = this.add.text(400, 300, 'Start', { fontSize: '32px', fill: '#000' });
        Phaser.Display.Align.In.Center(text, startButton);

        // add background music
        var menuBGM = this.sound.add('menuBGM', { loop: true });
        menuBGM.setVolume(0.2);
        menuBGM.play();
    }
}
