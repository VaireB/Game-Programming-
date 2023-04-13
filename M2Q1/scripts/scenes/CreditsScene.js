class CreditScene extends Phaser.Scene {
  constructor() {
      super('CreditScene');
  }
  preload() {
      this.load.image('backBtn', 'assets/Credits/backBtn.png');
  }
  create() {
      // Add the background
      const bg = this.add.sprite(0, 0, 'background');
      bg.setOrigin(0, 0);
      bg.displayWidth = config.width;
      bg.displayHeight = config.height;

      //Add credits
      let creditText = this.add.text(config.width / 2 - 200, config.height / 2 - 100, 'CREDITS', { fontSize: '64px', fill: '#000' });
      let nameText = this.add.text(config.width / 2 - 200, config.height / 2, 'Name: PUT YOUR FULL NAME HERE', { fontSize: '32px', fill: '#000' });
      let sectionText = this.add.text(config.width / 2 - 200, config.height / 2 + 50, 'Section: PUT YOUR SECTION HERE', { fontSize: '32px', fill: '#000' });
      let programText = this.add.text(config.width / 2 - 200, config.height / 2 + 100, 'Program: PUT YOUR PROGRAM HERE', { fontSize: '32px', fill: '#000' });

      // Add the Back button
      const backBtn = this.add.sprite(config.width / 2, config.height / 2 + 200, 'backBtn').setInteractive();
      backBtn.setScale(0.3);
      backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }
}