import * as PIXI from 'pixi.js';

export class Button {
  background;

  label;

  view;

  constructor(label, colour, width, height, fill, stroke, func) {
    const background = new PIXI.Graphics();
    background.beginFill(colour);
    background.lineStyle({
      width: 12,
      alpha: 0.2,
      fill: '#000000',
    });
    background.drawRoundedRect(0, 10, width, height, 20);
    background.endFill();
    this.background = background;

    this.label = new PIXI.Text(label, {
      fontSize: 25,
      fontWeight: 'bold',
      align: 'center',
      fill,
      stroke,
      strokeThickness: 2,
    });
    this.label.x = width / 2;
    this.label.y = height / 2 + 8;
    this.label.anchor.set(0.5, 0.5);

    const view = new PIXI.Container();
    view.addChild(this.background);
    view.addChild(this.label);
    view.eventMode = 'static';
    view.cursor = 'pointer';
    view.on('pointertap', () => { func(label); });
    this.view = view;
  }

  disable() {
    this.view.eventMode = 'none';
    this.view.cursor = 'default';
    this.view.alpha = 0.2;
  }

  enable() {
    this.view.eventMode = 'static';
    this.view.cursor = 'pointer';
    this.view.alpha = 1;
  }

  highlight() {
    this.view.eventMode = 'none';
    this.view.cursor = 'default';
    this.view.alpha = 1;
  }
}
