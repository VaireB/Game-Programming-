export default class StageClearedScene extends Phaser.Scene {
    constructor() {
      super({ key: "StageClearedScene3" });
    }
  
    preload() {
      // load any necessary assets
    }
  
    create() {
      // set background color to green
      this.cameras.main.setBackgroundColor("#004225");
  
      // create congratulatory message
      const message = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        "Congratulations! You completed all the levels!",
        {
          fontFamily: "Arial",
          fontSize: 32,
          color: "#FFFFFF",
          align: "center"
        }
      );
      message.setOrigin(0.5);
  
      // create restart button
      const button = this.add.text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 50,
        "Restart",
        {
          fontFamily: "Arial",
          fontSize: 24,
          color: "#FFFFFF",
          align: "center"
        }
      );
      button.setOrigin(0.5);
      button.setInteractive({ useHandCursor: true });
      button.on("pointerdown", () => {
        this.scene.start("game");
      });
    }
  }