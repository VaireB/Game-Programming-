import CreditScene from './scenes/CreditScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import GameScene from './scenes/GameScene.js';
import MenuScene from './scenes/MenuScene.js';

let creditScene = new CreditScene();
let gameOverScene = new GameOverScene();
let gameScene = new GameScene();
let menuScene = new MenuScene();

var config = {
  type: Phaser.AUTO,
  width: 1368,
  height: 768,
  scene: [menuScene, gameScene, creditScene, gameOverScene]
};

var game = new Phaser.Game(config);

game.scene.add('creditScene', creditScene);
game.scene.add('gameOverScene', gameOverScene);
game.scene.add('gameScene', gameScene);
game.scene.add('menuScene', menuScene);

game.scene.start('menuScene');
