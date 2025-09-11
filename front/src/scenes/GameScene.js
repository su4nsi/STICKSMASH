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
    this.physics.add.collider(this.player2.sprite, this.player1.sprite);
    // Elegir el jugador local
    this.localSprite =
      localPlayer === "player1" ? this.player1.sprite : this.player2.sprite;

    // Controles
    this.keysWASD = this.input.keyboard.addKeys({
      up: "W",
      left: "A",
      right: "D",
      space: "SPACE",
      shift: "SHIFT",
      dot: "PERIOD",
    });
    //animaciones
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
    if (localPlayer === "player1") {
      this.player1.update(this.keysWASD);
    } else {
      this.player2.update(this.keysWASD);
    }
  }
}
