import 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene) {
    console.log(text);
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, {
      fontSize: '32px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      if (targetScene) {
        this.scene.scene.sleep('GameOver');
        this.scene.scene.start('Game');
      } else {
        location.reload(true);
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}
