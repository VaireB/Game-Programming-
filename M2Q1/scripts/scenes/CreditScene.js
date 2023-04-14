export default class CreditScene extends Phaser.Scene{

    constructor() {
        super("CreditScene")
    }


  preload() {
      this.load.image('backBtn', 'assets/images/backBtn.png');
      this.load.image('creditsBG', 'assets/images/creditsbg.png');
  }


  create() {
      // Add the background
      const creditsbg = this.add.image(0, 0, 'creditsBG');
      creditsbg.setOrigin(0, 0);
      creditsbg.displayWidth = 1366;
      creditsbg.displayHeight = 768;

      //Add credits
      this.add.text(550, 0, 'CREDITS', { fontSize: '64px', fill: '#000' });
      this.add.text(520, 150, 'Mark Raphael Abaya', { fontSize: '32px', fill: '#000' });
      this.add.text(640, 200, 'A223', { fontSize: '32px', fill: '#000' });
      this.add.text(300, 250, 'BS Entertainment and Multimedia Computing', { fontSize: '32px', fill: '#000' });

      // Add the Back button
      const backBtn = this.add.sprite(200, 700, 'backBtn').setInteractive();
      backBtn.setScale(0.2);
      backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
      
  }
}