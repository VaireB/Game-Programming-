class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    preload() {
        this.load.image('playBtn', 'assets/Menu/playBtn.png');
        this.load.image('creditBtn', 'assets/Menu/creditBtn.png');
        this.load.image('backBtn', 'assets/Menu/backBtn.png');
        this.load.image('quitBtn', 'assets/Menu/quitBtn.png');
        this.load.image('MenuBG', 'assets/images/menubg.png');
    }

    create() {
        // Add the background
        const bg = this.add.image(0, 0, 'MenuBG');
        bg.setOrigin(0, 0);
        bg.displayWidth = config.width;
        bg.displayHeight = config.height;
    
        // Add the Play button
        const playBtn = this.add.sprite(config.width / 2, config.height / 2, 'playBtn').setInteractive();
        playBtn.setScale(0.3);
        playBtn.on('pointerdown', () => this.scene.start('GameScene'));
    
        // Add the Credits button
        const creditBtn = this.add.sprite(config.width / 2, config.height / 2 + 100, 'creditBtn').setInteractive();
        creditBtn.setScale(0.3);
        creditBtn.on('pointerdown', () => this.scene.start('CreditScene'));
    
        // Add the Quit button
        const quitBtn = this.add.sprite(config.width / 2, config.height / 2 + 200, 'quitBtn').setInteractive();
        quitBtn.setScale(0.3);
        quitBtn.on('pointerdown', () => alert('Game exited'));
    }
}    