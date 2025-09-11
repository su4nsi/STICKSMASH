export class Player {
  constructor(scene, x, y, tint) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "stickman");
    this.sprite.setTint(tint);
    this.sprite.body.setSize(64, 128);
    this.sprite.body.setOffset(32, 0);
    this.sprite.setCollideWorldBounds(true);
    this.didJump = false;
    this.holdFrames = 0;
    this.maxHoldFrames = 30;
    this.guard = false;
  }

  update(keys) {
    const onGround = this.sprite.body.touching.down;

    const MAX_SPEED = 1000;
    const ACCEL = 3500;
    const DECEL = 4300;

    if (Phaser.Input.Keyboard.JustDown(keys.shift)) {
      this.guard = !this.guard;
      console.log(this.guard);
    }
    if (Phaser.Input.Keyboard.JustDown(keys.dot)) {
      console.log("hello");
      if (this.guard) {
        this.sprite.anims.play("attack", true);
        console.log("attack");
      } else {
        this.sprite.anims.play("defend", true);
        console.log("defend");
      }
    }

    if (keys.left.isDown && !keys.right.isDown) {
      this.sprite.setAccelerationX(-ACCEL);
      this.sprite.setMaxVelocity(MAX_SPEED, 2000);
      this.sprite.flipX = true;
    } else if (keys.right.isDown && !keys.left.isDown) {
      this.sprite.setAccelerationX(ACCEL);
      this.sprite.setMaxVelocity(MAX_SPEED, 2000);
      this.sprite.flipX = false;
    } else {
      this.sprite.setAccelerationX(0);
      this.sprite.setDragX(DECEL);
    }

    // jump logic
    if (Phaser.Input.Keyboard.JustDown(keys.up)) {
      if (onGround) {
        this.sprite.setVelocityY(-1500); // primer salto
        this.isJumping = true;
        this.didJump = false;

        this.sprite.anims.play("jump", true);
      } else if (!onGround && !this.didJump) {
        console.log("segundo salto");
        this.sprite.setVelocityY(-1500); // segundo salto
        this.didJump = true;
        this.sprite.anims.play("secondjump", true);
      }
    }
    if (!onGround) {
      if (keys.up.isDown) {
        if (this.sprite.body.velocity.y < 0) {
          this.sprite.body.velocity.y = Math.max(
            //dynamic jump height
            this.sprite.body.velocity.y,
            -650
          );
        }
      } else {
        this.sprite.body.velocity.y += 50; // gravity boost
      }
    }

    //space hold
    /*
    if (keys.space.isDown && !onGround) {
      this.savedVelocityX = this.sprite.body.velocity.x;
      if (this.holdFrames < this.maxHoldFrames) {
        this.sprite.setVelocityY(0);
        this.sprite.body.allowGravity = false;
        this.holdFrames++;
        console.log("hold");
        this.sprite.setVelocityX(0);
        this.sprite.anims.play("hold", true);
      } else {
        this.sprite.body.allowGravity = true;
        this.sprite.body.velocity.y += 50;
        this.sprite.anims.play("jump", true);
        this.sprite.setVelocityX(this.savedVelocityX);
        console.log("reset");
      }
    }
      */
    //flag reset
    if (onGround && this.sprite.body.velocity.y === 0 && !this.isDefending) {
      this.isJumping = false;
      this.didJump = false;
      this.sprite.body.allowGravity = true;
      this.holdFrames = 0;
      if (keys.dot.isUp) {
        if (this.sprite.body.velocity.x === 0) {
          this.sprite.anims.play("idle", true);
        } else {
          this.sprite.anims.play("run", true);
        }
      }
    }
  }
}
