import { Player } from "../objects/Player.js";
import { localPlayer } from "../main.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image(
      "ground",
      "https://labs.phaser.io/assets/sprites/platform.png"
    );
    this.load.spritesheet("stickman", "./assets/spritesheet.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create() {
    // Plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(675, 730, "ground")
      .setScale(1350 / 400, 1)
      .refreshBody();

    // Jugadores
    this.player1 = new Player(this, 100, 450, 0xff0000);
    this.player2 = new Player(this, 700, 450, 0x00ff00);

    this.physics.add.collider(this.player1.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.platforms);

    // Elegir el jugador local
    this.localSprite =
      localPlayer === "player1" ? this.player1.sprite : this.player2.sprite;

    // Controles
    this.keysWASD = this.input.keyboard.addKeys({
      up: "W",
      left: "A",
      right: "D",
    });
    //animaciones
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("stickman", { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 22,
        end: 47,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 21,
        end: 40,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "throw",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 41,
        end: 45,
      }),
      frameRate: 8,
      repeat: 0,
    });
  }

  update() {
    const onGround = this.localSprite.body.touching.down;

    if (this.keysWASD.left.isDown) {
      this.localSprite.setVelocityX(-1000);
      this.localSprite.flipX = true;
    } else if (this.keysWASD.right.isDown) {
      this.localSprite.setVelocityX(1000);
      this.localSprite.flipX = false;
    } else {
      this.localSprite.setVelocityX(0);
    }

    if (this.keysWASD.up.isDown && onGround) {
      this.localSprite.setVelocityY(-500);
    }
    this.localSprite.anims.play("idle", true);
    /*
    if (!onGround) {
      this.localSprite.anims.play("jump", true);
    } else if (this.localSprite.body.velocity.x !== 0) {
      this.localSprite.anims.play("run", true);
    } else {
      this.localSprite.anims.play("idle", true);
    }
    */
  }
}
