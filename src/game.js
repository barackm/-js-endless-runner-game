import 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/gameOver';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Game');
  }
}

export default Game;
