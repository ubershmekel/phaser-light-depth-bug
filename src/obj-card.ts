import gunRangeUrl from '../assets/gun-range.png';
import cardbackUrl from '../assets/cardback.png';
import type { CardData } from './card-data';

const imageKey = 'card-back';

export class CardObj {
  card: CardData;

  constructor(card: CardData) {
    this.card = card;
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
      wordWrap: { width: sprite.width }
    });
    container.add(title);

    container.setSize(sprite.width, sprite.height);
    container.setInteractive();
    scene.input.setDraggable(container);
    scene.input.on('drag', function (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      gameObject.scale = 1.2;
    });

    // const zone = scene.add.zone(500, 300, 200, 200).setDropZone();
    // //  Just a visual display of the drop zone
    // var graphics = scene.add.graphics();
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRect(zone.x, zone.y, zone.width, zone.height);
    // graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
    scene.input.on('dragend', function (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) {
      console.log("dragend");
      gameObject.scale = 1.0;
    });

    // scene.input.on('drop', function (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dropZone: Phaser.GameObjects.Zone) {
    //   console.log("drop");
    //   gameObject.x = dropZone.x;
    //   gameObject.y = dropZone.y;
    // });
  }
}