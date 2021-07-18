import Phaser from 'phaser';
import config from '../config/config';
import Button from '../objects/Button';

export default class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.text(250, 50, 'ENDLESS RUNNER', {
      fontSize: '36px',
      fill: '#B09B1C',
    });
    this.add.text(
      120,
      480,
      `         Use direction keys${''} \n to avoid bombs and collect gems.`,
      {
        fontSize: '26px',
        fill: '#B09B1C',
      },
    );

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'btn1',
      'btn2',
      'Play',
      'Game',
    );
  }
}
