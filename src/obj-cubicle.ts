import cubicleUrl from '../assets/cubicle.png';
import { tweenPromise } from './utils';

const imageKey = 'cubicle';

export class CubicleObj {
  preload(scene: Phaser.Scene) {
    scene.load.image(imageKey, cubicleUrl);
  }

  create(scene: Phaser.Scene) {
    const image = scene.add.image(500, 200, imageKey);
    this.pulse(scene, image);
  }

  async pulse(scene: Phaser.Scene, image: Phaser.GameObjects.Image) {
    await tweenPromise(scene, {
      targets: image,
      scale: 1.5,
      duration: 300,
    });
    await tweenPromise(scene, {
      targets: image,
      scale: 1.0,
      duration: 300,
    });
    await tweenPromise(scene, {
      targets: image,
      scale: 1.5,
      duration: 500,
    });
    await tweenPromise(scene, {
      targets: image,
      scale: 1.0,
      duration: 100,
    });
  }
}