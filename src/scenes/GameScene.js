import 'phaser';
import storage from '../localstorage';
import api from '../api';

let player;
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText;
let playerText;
let arrows;
let soundOn;
let button;
let startButton;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.myPlayer = storage.get('player');
    this.paying = true;
  }

  preload() {
    this.load.image('sky', 'assets/bg.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/jem.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('arrow', 'assets/spike.png');
    this.load.image('river', 'assets/river.png');
    this.load.audio('bgMusic', 'assets/music.mp3');
    this.load.audio('gemSound', 'assets/gem.mp3');
    this.load.image('soundOn', 'assets/sound3.png');
    this.load.image('soundOff', 'assets/sound6.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('logo', 'assets/jem.png');
    for (let i = 0; i < 1000; i++) {
      this.load.image('logo' + i, 'assets/jem.png');
    }
  }

  create() {
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'arrow').setScale(0.5).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    platforms.create(450, 350, 'arrow');
    player = this.physics.add.sprite(100, 450, 'dude');
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    this.bgMusic.play();

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '22px',
      fill: '#fff',
    });

    playerText = this.add.text(16, 50, `Player: ${this.myPlayer}`, {
      fontSize: '22px',
      fill: '#fff',
    });

    soundOn = this.playing
      ? this.add.image(25, 100, 'soundOff').setInteractive()
      : this.add.image(25, 100, 'soundOn').setInteractive();

    soundOn.on('pointerdown', () => {
      if (this.playing) {
        this.bgMusic.play();
        this.playing = false;
      } else {
        this.bgMusic.stop();
        this.playing = true;
      }
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    this.physics.add.collider(player, arrows, this.hitArrows, null, this);
  }

  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    this.liveSound = this.sound.add('gemSound', { volume: 0.5, loop: false });
    this.liveSound.play();
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      let x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  hitBomb(player, bomb) {
    api.createScore(score);
    this.scene.stop('Game');
    this.bgMusic.stop();
    this.scene.start('GameOver');
  }

  restartGame = () => {
    this.scene.restart();
  };

  hitArrows(player, arrow) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
  }

  restart() {
    this.scene.restart();
  }
}
