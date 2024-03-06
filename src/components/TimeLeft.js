import * as PIXI from 'pixi.js';

export class TimeLeft {
  view;

  timeLeft;

  constructor(maxTime) {
    this.timeLeft = maxTime;
    this.view = new PIXI.Text(`⌛ ${maxTime}s`, {
      fontSize: 50,
      align: 'center',
      fill: '#660145',
    });
  }

  setTimeLeft(value) {
    this.view.text = `⏳ ${value}s`;
  }
}
