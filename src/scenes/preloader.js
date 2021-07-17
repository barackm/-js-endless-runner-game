import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'logo');
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);
    this.load.image('sky', './assets/bg.jpg');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/jem.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.image('arrow', './assets/spike.png');
    this.load.image('river', './assets/river.png');
    this.load.audio('bgMusic', './assets/music.mp3');
    this.load.audio('gemSound', './assets/gem.mp3');
    this.load.image('soundOn', './assets/sound3.png');
    this.load.image('soundOff', './assets/sound6.png');
    this.load.image('btn1', './assets/button1.png');
    this.load.image('btn2', './assets/button2.png');
    this.load.audio('gameoverMusic', './assets/gameover.wav');

    this.load.spritesheet('dude', './assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`); //eslint-disable-line
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(5000, this.ready, [], this);
  }

  ready() {
    this.scene.sleep('Preloader');
    this.scene.start('Title');
  }
}
