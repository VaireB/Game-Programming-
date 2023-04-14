export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {


        this.load.image('playBtn', 'assets/images/playBtn.png');
        this.load.image('creditBtn', 'assets/images/creditBtn.png');
        this.load.image('backBtn', 'assets/images/backBtn.png');
        this.load.image('quitBtn', 'assets/images/quitBtn.png');
        this.load.image('MenuBG', 'assets/images/menubg.png');
    }

    create() {
        // Add the background
        const menubg = this.add.image(0, 0, 'MenuBG');
        menubg.setOrigin(0, 0);
        menubg.displayWidth = 1366;
        menubg.displayHeight = 768;
    
        // Add the Play button
        const playBtn = this.add.sprite(700, 500, 'playBtn').setInteractive();
        playBtn.setScale(0.2);
        playBtn.on('pointerdown', () => this.scene.start('GameScene'));
        this.add.text(665, 485, 'Start', { fontSize: '25px', fill: '#000' });
    
        // Add the Credits button
        const creditBtn = this.add.sprite(700, 600, 'creditBtn').setInteractive();
        creditBtn.setScale(0.2);
        creditBtn.on('pointerdown', () => this.scene.start('CreditScene'));
        this.add.text(660, 590, 'Credits', { fontSize: '20px', fill: '#000' });
    
        // Add the Quit button
        const quitBtn = this.add.sprite(700, 700, 'quitBtn').setInteractive();
        quitBtn.setScale(0.2);
        quitBtn.on('pointerdown', () => alert('Game exited'));
        this.add.text(675, 685, 'Quit', { fontSize: '25px', fill: '#000' });
        
    }
}
