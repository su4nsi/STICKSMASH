export class Player {
  constructor(scene, x, y, tint) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "stickman");
    this.sprite.setTint(tint);
    this.sprite.body.setSize(32, 128);
    this.sprite.body.setOffset(48, 0);
    this.sprite.setCollideWorldBounds(true);
  }
}
