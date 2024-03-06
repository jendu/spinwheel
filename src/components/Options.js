import * as PIXI from 'pixi.js';
import { Button } from './Button';

export class Options {
  view;

  buttons;

  options;

  constructor(options, func) {
    const spacing = 20;
    const buttonWidth = 80;
    const view = new PIXI.Container();
    const buttons = [];
    this.options = options;

    let currentX = 0;
    options.forEach((option, index) => {
      const button = new Button(option.value, option.colour, buttonWidth, buttonWidth, '#FFFFFF', '#660145', func);
      const buttonView = button.view;
      if (index !== 0) buttonView.x += currentX;
      currentX += buttonWidth + spacing;
      view.addChild(buttonView);
      buttons.push(button);
    });

    const canvasWidth = 800;
    // eslint-disable-next-line max-len
    view.x = (canvasWidth - ((options.length * buttonWidth) + ((options.length - 1) * spacing))) / 2;
    this.view = view;
    this.buttons = buttons;
  }

  disable(selectedValue) {
    this.buttons.forEach((button, index) => {
      button.disable();
      if (this.options[index].value === selectedValue) {
        button.highlight();
      }
    });
  }

  enable() {
    this.buttons.forEach((button) => {
      button.enable();
    });
  }
}
