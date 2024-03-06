import * as PIXI from 'pixi.js';
import { Button } from './Button';

export class EndPopup {
  view;

  emoji;

  finalScore;

  betterLuckNiceOne;

  constructor(playAgainFunc) {
    this.view = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill('#FFFFFF');
    background.lineStyle({
      width: 12,
      alpha: 0.2,
      fill: '#660145',
    });
    background.drawRoundedRect(40, 40, 720, 620, 20);
    background.endFill();
    this.view.addChild(background);

    const timeIsUp = new PIXI.Text('Time\'s Up!', {
      fontSize: 50,
      fontWeight: 'bold',
      align: 'center',
      fill: '#660145',
    });
    timeIsUp.anchor.set(0.5, 0.5);
    timeIsUp.x = 400;
    timeIsUp.y = 100;
    this.view.addChild(timeIsUp);

    const emoji = new PIXI.Text('', {
      fontSize: 180,
      align: 'center',
    });
    emoji.anchor.set(0.5, 0.5);
    emoji.x = 400;
    emoji.y = 275;
    this.view.addChild(emoji);
    this.emoji = emoji;

    const finalScore = new PIXI.Text('', {
      fontSize: 30,
      fontWeight: 'bold',
      align: 'center',
      fill: '#660145',
    });
    finalScore.anchor.set(0.5, 0.5);
    finalScore.x = 400;
    finalScore.y = 400;
    this.view.addChild(finalScore);
    this.finalScore = finalScore;

    const betterLuckNiceOne = new PIXI.Text('', {
      fontSize: 30,
      fontWeight: 'bold',
      align: 'center',
      fill: '#660145',
    });
    betterLuckNiceOne.anchor.set(0.5, 0.5);
    betterLuckNiceOne.x = 400;
    betterLuckNiceOne.y = 450;
    this.view.addChild(betterLuckNiceOne);
    this.betterLuckNiceOne = betterLuckNiceOne;

    const playAgain = new Button('Play Again!', '#FFBFCB', 200, 100, '#FFFFFF', '#FFFFFF', () => {
      this.closePopup();
      playAgainFunc();
    });
    playAgain.view.x = 300;
    playAgain.view.y = 500;
    this.view.addChild(playAgain.view);

    this.view.visible = false;
  }

  showPopup(score) {
    this.view.visible = true;

    this.emoji.text = score > 0 ? '🏆' : '🥔';
    this.betterLuckNiceOne.text = score > 0 ? 'Nice one!' : 'Better luck next time!';
    this.finalScore.text = `Your final score: ${score}`;
  }

  closePopup() {
    this.view.visible = false;
  }
}
