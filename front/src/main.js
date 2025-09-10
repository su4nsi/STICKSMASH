import { GameScene } from "./scenes/GameScene.js";
import { initMenu } from "./menu.js";
export let localPlayer = "player1";

window.onload = () => {
  initMenu();
};

export function startPhaser(player) {
  localPlayer = player;

  const config = {
    type: Phaser.CANVAS,
    width: 1350,
    height: 750,
    canvas: document.getElementById("gameCanvas"),
    backgroundColor: "#222",
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 1000 }, debug: true },
    },
    pixelArt: true,
    scene: [GameScene],
  };

  new Phaser.Game(config);
}
