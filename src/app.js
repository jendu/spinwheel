import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { EndPopup } from './components/EndPopup';
import { Options } from './components/Options';
import { Score } from './components/Score';
import { SpinWheel } from './components/SpinWheel';
import { TimeLeft } from './components/TimeLeft';

// customise wheel
const NUMBER_OF_WEDGES = 5; // up to 8
const GAME_LENGTH_IN_SECONDS = 30;
const MAX_SPIN_TIME_IN_SECONDS = 4;
const USE_EMOJIS_INSTEAD_OF_NUMBERS = true;

const State = {
  NOT_STARTED: 'not_started',
  IN_PLAY: 'in_play',
  STOPPED: 'stopped',
  END: 'end',
};

class App {
  app;

  time;

  spinWheel;

  score;

  options;

  celebrate;

  endPopup;

  state;

  selection = '';

  points = 0;

  timeLeft = GAME_LENGTH_IN_SECONDS;

  timer;

  spinning;

  constructor() {
    this.state = State.NOT_STARTED;

    const app = new PIXI.Application({
      background: '#FFFBDbd3',
      width: 800,
      height: 700,
    });

    document.body.appendChild(app.view);
    this.app = app;

    this.time = new TimeLeft(GAME_LENGTH_IN_SECONDS);
    this.time.view.x = 20;
    this.time.view.y = 20;
    this.app.stage.addChild(this.time.view);

    this.spinWheel = this.addSpinWheel();
    this.app.stage.addChild(this.spinWheel.view);

    this.app.stage.addChild(this.addMarker());

    this.score = this.addScore();
    this.app.stage.addChild(this.score.view);

    this.options = this.addOptions();
    this.app.stage.addChild(this.options.view);

    this.celebrate = this.addCelebrate();
    this.app.stage.addChild(this.celebrate);

    this.endPopup = new EndPopup(() => { this.playAgain(); });
    this.app.stage.addChild(this.endPopup.view);

    const me = new PIXI.Text('Jennifer Du 😊', {
      fill: '#660145',
      fontSize: 15,
      fontWeight: 'bold',
    });
    me.anchor.set(0.5, 0);
    me.x = 720;
    me.y = 670;
    this.app.stage.addChild(me);
  }

  addSpinWheel() {
    const spinWheel = new SpinWheel(NUMBER_OF_WEDGES, USE_EMOJIS_INSTEAD_OF_NUMBERS);
    spinWheel.view.x = 400;
    spinWheel.view.y = 280;
    return spinWheel;
  }

  addMarker() {
    const marker = new PIXI.Graphics();
    marker.beginFill('#660145');
    marker.lineStyle(0, '#660145', 1);
    marker.moveTo(40, 0);
    marker.lineTo(20, 40);
    marker.lineTo(0, 0);
    marker.endFill();
    marker.x = 380;
    marker.y = 70;
    return marker;
  }

  addScore() {
    const score = new Score();
    score.view.x = 730;
    score.view.y = 20;
    return score;
  }

  addOptions() {
    const options = [];
    this.spinWheel.wedges.forEach((wedge) => {
      const option = {
        value: wedge.value,
        colour: wedge.colour,
      };
      options.push(option);
    });
    const optionButtons = new Options(options, (value) => { this.onOptionClick(value); });
    optionButtons.view.y = 520;
    this.options = optionButtons;
    return optionButtons;
  }

  onOptionClick(value) {
    this.selection = value;
    switch (this.state) {
      case State.NOT_STARTED:
        this.timer = setInterval(() => {
          this.timeLeft -= 1;
          this.time.setTimeLeft(this.timeLeft);
        }, 1000);
        setTimeout(() => {
          this.spinWheel.stopSpin();
          clearTimeout(this.timer);
          this.timer = undefined;
          this.state = State.END;
          this.endPopup.showPopup(this.points);
        }, GAME_LENGTH_IN_SECONDS * 1000);
        // fall through
      case State.STOPPED:
        this.spinWheel.startSpin();
        this.state = State.IN_PLAY;
        this.spinning = setTimeout(() => {
          this.spinWheel.stopSpin();
          this.checkLanding();
          this.state = State.STOPPED;
          this.options.enable();
        }, gsap.utils.random(1, MAX_SPIN_TIME_IN_SECONDS * 1000));
        this.options.disable(this.selection);
        break;
      case State.END:
        this.timeLeft = GAME_LENGTH_IN_SECONDS;
        this.time.setTimeLeft(this.timeLeft);
        this.points = 0;
        this.score.setValue('0');
        this.state = State.NOT_STARTED;
        this.options.enable();
        break;
      default:
        break;
    }
  }

  addCelebrate() {
    this.celebrate = new PIXI.Text('🥳', {
      fontSize: 180,
      align: 'center',
      fill: '#660145',
    });
    this.celebrate.anchor.set(0.5, 0.5);
    this.celebrate.x = 400;
    this.celebrate.y = 280;
    this.celebrate.alpha = 0;
    return this.celebrate;
  }

  checkLanding() {
    if (this.spinWheel.checkIfLanded(this.selection)) {
      gsap.timeline({
        defaults: { duration: 0.5 },
      }).to(this.celebrate, { alpha: 1 })
        .to(this.celebrate, { alpha: 0 });
      this.points += 1;
      this.score.setValue(this.points.toString());
    }
  }

  playAgain() {
    this.timeLeft = GAME_LENGTH_IN_SECONDS;
    this.time.setTimeLeft(this.timeLeft);
    this.points = 0;
    this.score.setValue('0');
    this.state = State.NOT_STARTED;
    this.selection = '';
  }
}

export const app = new App();
