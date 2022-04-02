import 'phaser';
import { CardObj } from './obj-card';
import { cardsList } from './card-data';
import { sampleSome } from './utils';

export class SceneBattle extends Phaser.Scene {
  cards: CardObj[] = [];

  constructor() {
    super({
      key: 'SceneBattle'
    });
  }

  preload(): void {
    const randomCards = sampleSome(cardsList, 4);
    randomCards.map((cardData, index) => {
      const homePoint = new Phaser.Math.Vector2(300 + index * 180, 580);
      this.cards.push(new CardObj(cardData, homePoint));
    });
    this.cards.map((card) => card.preload(this));
  }

  create(): void {
    this.cards.map((card) => card.create(this));
    this.add.text(0, 0, 'Battle S to restart scene', {
      fontSize: '60px',
      fontFamily: "Helvetica",
    });

  }

  update(): void {
  }
}