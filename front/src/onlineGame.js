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

  socket.on("matchStart", (data) => {
    document.getElementById("menu").style.display = "none";

    import("./main.js").then((module) => {
      module.startPhaser(data.yourPlayer);
    });
  });
}
