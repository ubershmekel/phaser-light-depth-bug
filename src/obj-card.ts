import gunRangeUrl from '../assets/gun-range.png';
import cardbackUrl from '../assets/cardback.png';

const imageKey = 'card-back';

export class CardObj {
  preload(scene: Phaser.Scene) {
    scene.load.image('card-object', gunRangeUrl);
    scene.load.image(imageKey, cardbackUrl);
  }

  create(scene: Phaser.Scene) {
    const sprite = scene.add.image(100, 100, imageKey);
    sprite.setInteractive();
    scene.input.setDraggable(sprite);
    scene.input.on('drag', function (_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
  }
}