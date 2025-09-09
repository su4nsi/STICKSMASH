import { runLocalGame } from "./localGame.js";
import { runOnlineGame } from "./onlineGame.js";

export function initMenu() {
  const menu = document.getElementById("menu");
  const canvas = document.getElementById("gameCanvas");

  const btnLocal = document.getElementById("btnLocal");
  const btnOnline = document.getElementById("btnOnline");

  btnLocal.addEventListener("click", () => {
    startGame("local");
  });

  btnOnline.addEventListener("click", () => {
    startGame("online");
  });

  function startGame(mode) {
    menu.style.display = "none";
    canvas.style.display = "block";

    if (mode === "local") {
      runLocalGame(canvas);
    } else {
      runOnlineGame(canvas);
    }
  }
}
