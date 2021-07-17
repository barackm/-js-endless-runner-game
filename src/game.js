import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/gameOver';
import Music from './objects/music';
import Preloader from './scenes/preloader';
import Boot from './scenes/boot';
import Title from './scenes/title';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const music = new Music();
    this.globals = { music, bgMusic: null };
    this.globals = { music, liveSound: null };
    this.scene.add('Game', GameScene);
    this.scene.add('Preloader', Preloader);
    this.scene.add('Boot', Boot);
    this.scene.add('Title', Title);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

export default Game;
