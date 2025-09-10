import { initMenu } from "./menu.js";

window.onload = () => {
  initMenu();
};
export let localPlayer = "player1";

export function startPhaser(player) {
  const localPlayer = player;
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

let player1, player2, cursors, keysWASD, platforms;

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
}

function update() {
  // Mover solo al jugador local
  if (localPlayer === "player1") {
    if (cursors.left.isDown) player1.setVelocityX(-200);
    else if (cursors.right.isDown) player1.setVelocityX(200);
    else player1.setVelocityX(0);

    if (cursors.up.isDown && player1.body.touching.down)
      player1.setVelocityY(-500);
  }

  if (localPlayer === "player2") {
    if (keysWASD.left.isDown) player2.setVelocityX(-200);
    else if (keysWASD.right.isDown) player2.setVelocityX(200);
    else player2.setVelocityX(0);

    if (keysWASD.up.isDown && player2.body.touching.down)
      player2.setVelocityY(-500);
  }

  // El otro jugador permanece estático (por ahora)
}
