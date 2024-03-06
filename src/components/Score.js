import * as PIXI from 'pixi.js';

export class Score {
  view;

  constructor() {
    this.view = new PIXI.Text('0 🎯', {
      fontSize: 50,
      align: 'right',
      fill: '#660145',
    });
    this.view.anchor.set(0.5, 0);
  }

  setValue(value) {
    this.view.text = `${value} 🎯`;
  }
}
