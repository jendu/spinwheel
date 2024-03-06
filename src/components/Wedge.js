import * as PIXI from 'pixi.js';

export class Wedge {
  WEDGE_ANGLE;

  SPINWHEEL_RADIUS;

  view;

  background;

  label;

  value = '';

  colour = '';

  constructor(i, wedgeAngle, spinWheelRadius, value) {
    this.WEDGE_ANGLE = wedgeAngle;
    this.SPINWHEEL_RADIUS = spinWheelRadius;
    this.value = value;
    const wedge = new PIXI.Container();
    this.background = this.createWedge(i);
    wedge.addChild(this.background);
    this.label = this.createLabel(i);
    wedge.addChild(this.label);
    this.view = wedge;
  }

  createWedge(i) {
    const background = new PIXI.Graphics();
    const colour = Wedge.getRandomColour();
    this.colour = colour;
    background.beginFill(colour, 1);
    background.lineStyle(0, colour, 1);

    // need to `- (Math.PI / 2)` because on pixi canvas angle 0 is at 3 o'clock
    const startAngle = (i * this.WEDGE_ANGLE) - (Math.PI / 2);
    const endAngle = (i + 1) * this.WEDGE_ANGLE - (Math.PI / 2);

    // arc
    background.arc(0, 0, this.SPINWHEEL_RADIUS, startAngle, endAngle);

    // triangle
    background.moveTo(
      this.SPINWHEEL_RADIUS * Math.cos(startAngle),
      this.SPINWHEEL_RADIUS * Math.sin(startAngle),
    );
    background.lineTo(
      this.SPINWHEEL_RADIUS * Math.cos(endAngle),
      this.SPINWHEEL_RADIUS * Math.sin(endAngle),
    );
    background.lineTo(0, 0);
    background.endFill();

    return background;
  }

  createLabel(i) {
    const label = new PIXI.Text(this.value, {
      fill: '#FFFFFF',
      fontSize: 38,
      fontWeight: 'bold',
      stroke: '#660145',
      strokeThickness: 3,
    });

    // need to `- (Math.PI / 2)` if you want first wedge to be at 0 o'clock
    // because on pixi canvas angle 0 is at 3 o'clock
    label.x = 0.8 * this.SPINWHEEL_RADIUS * Math.cos((i + 0.5) * this.WEDGE_ANGLE - (Math.PI / 2));
    label.y = 0.8 * this.SPINWHEEL_RADIUS * Math.sin((i + 0.5) * this.WEDGE_ANGLE - (Math.PI / 2));
    label.anchor.set(0.5, 0.5);
    label.rotation = ((i + 0.5) * this.WEDGE_ANGLE);
    return label;
  }

  static getRandomColour() {
    return Math.floor(Math.random() * 16777215);
  }

  checkIfContains(point) {
    return this.background.containsPoint(point);
  }
}
