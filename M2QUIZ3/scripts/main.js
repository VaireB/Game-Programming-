import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import StageClearedScene from './scenes/StageClearedScene.js';


let gameOverScene = new GameOverScene();
let gameScene = new GameScene();
let menuScene = new MenuScene();
let stageCleared = new StageClearedScene();


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics:{
    
    default: 'arcade',
    arcade: {
      gravity: {y: 200},
      debug: false
  }
  
},
scene: [MenuScene, GameScene, GameOverScene, StageClearedScene]

};

var game = new Phaser.Game(config);

game.scene.add('gameOverScene', gameOverScene);
game.scene.add('gameScene', gameScene);
game.scene.add('menuScene', menuScene);
game.scene.add('stageCleared', stageCleared);


game.scene.start('menuScene');