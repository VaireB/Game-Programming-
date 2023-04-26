import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameScene2 from './scenes/GameScene2.js';
import GameScene3 from './scenes/GameScene3.js';
import GameOverScene from './scenes/GameOverScene.js';
import StageClearedScene from './scenes/StageClearedScene.js';
import StageClearedScene2 from './scenes/StageClearedScene2.js';
import StageClearedScene3 from './scenes/StageClearedScene3.js';


let gameOverScene = new GameOverScene();
let gameScene = new GameScene();
let gameScene2 = new GameScene2();
let gameScene3 = new GameScene3();
let menuScene = new MenuScene();
let stageCleared = new StageClearedScene();
let stageCleared2 = new StageClearedScene2();
let stageCleared3 = new StageClearedScene3();



var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics:{
    
    default: 'arcade',
    arcade: {
      gravity: {y: 200},
      debug: true
  }
  
},
scene: [MenuScene, GameScene, GameScene2, GameScene3, GameOverScene, StageClearedScene, StageClearedScene2, StageClearedScene3]

};

var game = new Phaser.Game(config);

game.scene.add('gameOverScene', gameOverScene);
game.scene.add('gameScene', gameScene);
game.scene.add('gameScene2', gameScene2);
game.scene.add('gameScene3', gameScene3);
game.scene.add('menuScene', menuScene);
game.scene.add('stageCleared', stageCleared);
game.scene.add('stageCleared2', stageCleared2);
game.scene.add('stageCleared3', stageCleared3);


game.scene.start('menuScene');