import 'phaser';
import { CardObj } from './obj-card';

export class SceneBattle extends Phaser.Scene {
  cards: CardObj[] = [];

  constructor() {
    super({
      key: 'SceneBattle'
    });
  }

  preload(): void {
    this.cards.push(new CardObj());
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