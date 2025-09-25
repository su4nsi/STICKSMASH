import { Player } from "../objects/Player.js";

export class GameScene extends Phaser.Scene {
  constructor(localPlayer, socket) {
    super("GameScene");
    this.localPlayer = localPlayer;
    this.socket = socket;
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
    this.socket.on("opponentMove", (data) => {
      const opponent =
        this.localPlayer === "player1" ? this.player2 : this.player1;
      opponent.sprite.x = data.x;
      opponent.sprite.y = data.y;
      opponent.sprite.flipX = data.flipX;
      opponent.sprite.anims.play(data.anim, true);
    });

    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(675, 730, "ground")
      .setScale(1350 / 400, 1)
      .refreshBody();

    this.player1 = new Player(this, 100, 450, 0xff0000);
    this.player2 = new Player(this, 700, 450, 0x00ff00);

    this.physics.add.collider(this.player1.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.platforms);
    this.physics.add.collider(this.player2.sprite, this.player1.sprite);

    this.localSprite =
      this.localPlayer === "player1"
        ? this.player1.sprite
        : this.player2.sprite;

    this.keysWASD = this.input.keyboard.addKeys({
      up: "W",
      left: "A",
      right: "D",
      space: "SPACE",
      shift: "SHIFT",
      dot: "PERIOD",
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("stickman", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "hold",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 14,
        end: 14,
      }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 21,
        end: 40,
      }),
      frameRate: 55,
      repeat: -1,
    });
    this.anims.create({
      key: "defend",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 41,
        end: 43,
      }),
      frameRate: 30,
      repeat: 0,
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 43,
        end: 45,
      }),
      frameRate: 30,
      repeat: 0,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 28,
        end: 32,
      }),
      frameRate: 25,
      repeat: 0,
    });
    this.anims.create({
      key: "secondjump",
      frames: this.anims.generateFrameNumbers("stickman", {
        start: 28,
        end: 32,
      }),
      frameRate: 25,
      repeat: 0,
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
    const localSprite =
      this.localPlayer === "player1" ? this.player1 : this.player2;
    localSprite.update(this.keysWASD, this.socket);
  }
}
