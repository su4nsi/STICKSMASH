import { initMenu } from "./menu.js";

window.onload = () => {
  initMenu();
};
export let localPlayer = "player1";

export function startPhaser(player) {
  localPlayer = player;
  const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    canvas: document.getElementById("gameCanvas"),
    backgroundColor: "#222",
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 1000 }, debug: true },
    },
    scene: { preload, create, update },
  };

  new Phaser.Game(config);
}

function preload() {
  this.load.image(
    "ground",
    "https://labs.phaser.io/assets/sprites/platform.png"
  );
}

let player1, player2, localSprite, cursors, keysWASD, platforms;

function create() {
  // Plataformas
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 580, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(200, 300, "ground");

  // Jugadores
  player1 = this.physics.add
    .sprite(100, 450, null)
    .setTint(0xff0000)
    .setSize(50, 100);
  player2 = this.physics.add
    .sprite(700, 450, null)
    .setTint(0x00ff00)
    .setSize(50, 100);

  player1.setCollideWorldBounds(true);
  player2.setCollideWorldBounds(true);

  this.physics.add.collider(player1, platforms);
  this.physics.add.collider(player2, platforms);

  // Controles
  cursors = this.input.keyboard.createCursorKeys();
  keysWASD = this.input.keyboard.addKeys({ up: "W", left: "A", right: "D" });
  localSprite = localPlayer === "player1" ? player1 : player2;
}

function update() {
  // mover solo al jugador local
  if (keysWASD.left.isDown) localSprite.setVelocityX(-200);
  else if (keysWASD.right.isDown) localSprite.setVelocityX(200);
  else localSprite.setVelocityX(0);

  if (keysWASD.up.isDown && localSprite.body.touching.down)
    localSprite.setVelocityY(-500);
}
