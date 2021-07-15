import Phaser from 'phaser';
// import logoImg from './assets/logo.png';

// class MyGame extends Phaser.Scene {
//   constructor() {
//     super();
//   }

//   preload() {
//     this.load.image('logo', logoImg);
//   }

//   create() {
//     const logo = this.add.image(400, 150, 'logo');

//     this.tweens.add({
//       targets: logo,
//       y: 450,
//       duration: 2000,
//       ease: 'Power2',
//       yoyo: true,
//       loop: -1,
//     });
//   }
// }

// const config = {
//   type: Phaser.AUTO,
//   parent: 'phaser-example',
//   width: 800,
//   height: '96vh',
//   scene: MyGame,
// };

// const game = new Phaser.Game(config);

const SCREEN_W = 1920;
const SCREEN_H = 1080;

const SCREEN_CX = SCREEN_W / 2;
const SCREEN_CY = SCREEN_H / 2;

const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

var state = STATE_INIT;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  preload() {
    this.load.image('imgBack', 'assets/img_back.png');
  }

  create() {
    this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, 'imgBack');
  }

  update(time, delta) {
    switch (state) {
      case STATE_INIT:
        console.log('init game');
        state = STATE_RESTART;
        break;
      case STATE_RESTART:
        console.log('Restart game');
        state = STATE_PLAY;
        break;
      case STATE_PLAY:
        console.log('Play game');
        state = STATE_GAMEOVER;
        break;
      case STATE_GAMEOVER:
        console.log('Game over');
        break;

      default:
        break;
    }
  }
}

class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ScenePause' });
  }
}

var config = {
  type: Phaser.AUTO,
  width: SCREEN_W,
  height: SCREEN_H,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [MainScene, PauseScene],
};

// game instance
var game = new Phaser.Game(config);
