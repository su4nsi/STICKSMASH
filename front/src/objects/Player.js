export class Player {
  constructor(scene, x, y, tint) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "stickman");
    this.sprite.setTint(tint);
    this.sprite.body.setSize(32, 128);
    this.sprite.body.setOffset(48, 0);
    this.sprite.setCollideWorldBounds(true);

    // Variables para salto variable
    this.jumpHoldTime = 0;
    this.maxJumpHold = 10; // frames de “suspensión” máxima
  }

  update(keys) {
    const onGround = this.sprite.body.touching.down;

    // Movimiento horizontal
    if (keys.left.isDown) {
      this.sprite.setVelocityX(-400);
      this.sprite.flipX = true;
    } else if (keys.right.isDown) {
      this.sprite.setVelocityX(400);
      this.sprite.flipX = false;
    } else {
      this.sprite.setVelocityX(0);
    }

    if (keys.up.isDown) {
      if (onGround && !this.isJumping) {
        this.sprite.setVelocityY(-1000); // impulso inicial
        this.isJumping = true;
        this.jumpHoldTime = 0;
      }
    } else {
      this.isJumping = false;
    }

    // gravity
    if (
      !onGround &&
      (!keys.up.isDown || this.jumpHoldTime >= this.maxJumpHold)
    ) {
      this.sprite.body.velocity.y += 35;
    }

    this.sprite.anims.play("idle", true);
    /*
    // Animaciones
    if (!onGround) {
      this.sprite.anims.play("jump", true);
    } else if (this.sprite.body.velocity.x !== 0) {
      this.sprite.anims.play("run", true);
    } else {
      this.sprite.anims.play("idle", true);
    }
      */
  }
}
