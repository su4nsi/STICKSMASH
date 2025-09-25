let socket;

export function runOnlineGame() {
  // connect
  socket = io("http://localhost:3000");
  console.log("Online game queue started");

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Esperando jugadores...", 100, 300);

  socket.emit("joinQueue");

  socket.on("game_over", (info) => {
    endGameAndReturnToMenu();
  });

  socket.on("matchStart", (data) => {
    document.getElementById("menu").style.display = "none";
    console.log("Match  started, room ID:", data.roomId);
    import("./main.js").then((module) => {
      module.startPhaser(data.yourPlayer, socket);
    });
  });

  function endGameAndReturnToMenu() {
    console.log("Returning to menu");

    const canvas = document.getElementById("gameCanvas");

    canvas.style.display = "none";
    document.getElementById("menu").style.display = "block";

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    if (window.phaserGame) {
      window.phaserGame.destroy(true, false);
      window.phaserGame = null;
    }

    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }
  }
}
