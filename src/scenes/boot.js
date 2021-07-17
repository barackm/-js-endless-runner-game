import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'https://res.cloudinary.com/fidbagraphicscode/image/upload/v1626541413/samples/logo_ys8sqa.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
