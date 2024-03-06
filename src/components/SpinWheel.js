import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { Wedge } from './Wedge';

export class SpinWheel {
  RADIANS_IN_CIRCLE = 2 * Math.PI;

  WEDGE_ANGLE;

  SPINWHEEL_RADIUS = 180;

  NUMBER_OF_WEDGES;

  view;

  wedges = [];

  spinning;

  useEmojis;

  constructor(numberOfWedges, useEmojis) {
    this.useEmojis = useEmojis;
    this.WEDGE_ANGLE = (this.RADIANS_IN_CIRCLE / numberOfWedges);
    const spinWheel = new PIXI.Container();
    spinWheel.width = this.SPINWHEEL_RADIUS * 2;
    spinWheel.height = this.SPINWHEEL_RADIUS * 2;
    this.view = spinWheel;
    this.NUMBER_OF_WEDGES = numberOfWedges;
    this.createSpinWheel();

    this.spinning = gsap.to(this.view, {
      duration: 30, rotation: '+= 720', ease: 'none', repeat: -1,
    });
    this.spinning.pause();
  }

  createSpinWheel() {
    const wheelOutline = new PIXI.Graphics();
    wheelOutline.beginFill('#FFBFCB');
    wheelOutline.drawCircle(0, 0, 200);
    wheelOutline.endFill();
    this.view.addChild(wheelOutline);

    const wheelBackground = new PIXI.Graphics();
    wheelBackground.beginFill('#FFFFFF');
    wheelBackground.drawCircle(0, 0, 180);
    wheelBackground.endFill();
    this.view.addChild(wheelOutline);

    const emojis = ['🌽', '🥕', '🍓', '🥝', '🍒', '🫐', '🍑', '🥑', '🍎', '🍌', '🍊', '💩'];
    gsap.utils.shuffle(emojis);

    for (let i = 0; i < this.NUMBER_OF_WEDGES; i += 1) {
      const value = this.useEmojis && i < emojis.length ? emojis[i] : `${i + 1}`;
      const wedge = new Wedge(i, this.WEDGE_ANGLE, this.SPINWHEEL_RADIUS, value);
      this.view.addChild(wedge.view);
      this.wedges.push(wedge);
    }

    this.view.rotation = -(this.WEDGE_ANGLE / 2);
  }

  startSpin() {
    this.spinning.resume();
  }

  stopSpin() {
    this.spinning.pause();
  }

  checkIfLanded(selection) {
    let landedValue = '';
    for (let i = 0; i < this.wedges.length; i += 1) {
      if (this.wedges[i].checkIfContains(new PIXI.Point(400, 150))) {
        landedValue = this.wedges[i].value;
        break;
      }
    }
    return selection === landedValue;
  }
}
