import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/gameOver';
import Music from './objects/music';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const music = new Music();
    this.globals = { music, bgMusic: null };
    this.globals = { music, liveSound: null };
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Game');
  }
}

export default Game;
