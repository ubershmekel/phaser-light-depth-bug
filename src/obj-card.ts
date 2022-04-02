import gunRangeUrl from '../assets/gun-range.png';
import cardbackUrl from '../assets/cardback.png';
import type { CardData } from './card-data';
import { tweenPromise } from './utils';

const imageKey = 'card-back';

function effectTextFromCard(card: CardData) {
  // const values = {
  //   mh?: number;
  //   mgr?: number;
  //   fr?: number;
  //   money?: number;
  //   prog?: number;
  //   time?: number;
  // }
  const parts = [];
  const valKeys = ['mh', 'mgr', 'fr', 'money', 'prog', 'time'];
  for (const key of valKeys) {
    const val = card[key as keyof CardData] as number;
    if (!val) {
      continue;
    }
    let valText = String(val);
    if (val > 0) {
      valText = '+' + valText;
    }
    const text = `${key} ${valText}`;
    parts.push(text);
  }
  return parts.join(', ');
}

export class CardObj {
  card: CardData;
  homePoint: Phaser.Math.Vector2;

  constructor(card: CardData, homePoint: Phaser.Math.Vector2) {
    this.card = card;
    this.homePoint = homePoint;
  }

  preload(scene: Phaser.Scene) {
    scene.load.image('card-object', gunRangeUrl);
    scene.load.image(imageKey, cardbackUrl);
  }

  create(scene: Phaser.Scene) {
    const container = scene.add.container(100, 100);

    const sprite = scene.add.image(0, 0, imageKey);
    container.add(sprite);

    const title = scene.add.text(-sprite.width / 2, -110, this.card.title, {
      fontSize: '14px',
      fontFamily: "Helvetica",
      wordWrap: { width: sprite.width },
    });
    container.add(title);

    const effectString = effectTextFromCard(this.card);
    const effectsText = scene.add.text(-sprite.width / 2, 40, effectString, {
      fontSize: '14px',
      fontFamily: "Helvetica",
      wordWrap: { width: sprite.width },
      color: '#000',
    });
    container.add(effectsText);

    container.setSize(sprite.width, sprite.height);
    container.setInteractive();
    scene.input.setDraggable(container);
    scene.input.on('drag', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      // gameObject.scale = 1.3;
      gameObject.setDepth(1);
      tweenPromise(scene, {
        targets: gameObject,
        scale: 1.3,
        duration: 40,
      });
    });

    const tweenHome = () => {
      tweenPromise(scene, {
        targets: container,
        x: this.homePoint.x,
        y: this.homePoint.y,
        scale: 1.0,
        duration: 300,
      });
    };

    tweenHome();

    // const zone = scene.add.zone(500, 300, 200, 200).setDropZone();
    // //  Just a visual display of the drop zone
    // var graphics = scene.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(zone.x, zone.y, zone.width, zone.height);
    // graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
    scene.input.on('dragend', (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
      console.log("dragend");
      // gameObject.scale = 1.0;
      tweenHome();
      gameObject.setDepth(0);
    });

    // scene.input.on('drop', function (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dropZone: Phaser.GameObjects.Zone) {
    //   console.log("drop");
    //   gameObject.x = dropZone.x;
    //   gameObject.y = dropZone.y;
    // });
  }
}