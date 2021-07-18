import Phaser from 'phaser';
import storage from '../localstorage';
import api from '../api';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.myPlayer = storage.get('player');
    this.paying = true;
    this.playerText = '';
    this.player = '';
    this.stars = '';
    this.bombs = '';
    this.platforms = '';
    this.cursors = '';
    this.score = 0;
    this.gameOver = false;
    this.scoreText = '';
    this.arrows = '';
    this.soundOn = '';
    this.stopGame = '';
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'arrow').setScale(0.5).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.platforms.create(450, 350, 'arrow');
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    this.bgMusic.play();

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '22px',
      fill: '#fff',
    });

    this.playerText = this.add.text(16, 50, `Player: ${this.myPlayer}`, {
      fontSize: '22px',
      fill: '#fff',
    });

    this.soundOn = this.add.image(25, 100, 'soundOn').setInteractive();
    this.soundOn.on('pointerdown', () => {
      if (this.playing) {
        this.bgMusic.play();
        this.playing = false;
      } else {
        this.bgMusic.stop();
        this.playing = true;
      }
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this,
    );

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this,
    );
    this.physics.add.collider(
      this.player,
      this.arrows,
      this.hitArrows,
      null,
      this,
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    this.liveSound = this.sound.add('gemSound', { volume: 0.5, loop: false });
    this.liveSound.play();
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  hitBomb() {
    api.createScore(this.score);
    this.scene.stop('Game');
    this.playing = true;
    this.bgMusic.stop();
    this.scene.start('GameOver');
  }

  restartGame = () => {
    this.scene.restart();
  };

  hitArrows(player) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }

  restart() {
    this.scene.restart();
  }
}
