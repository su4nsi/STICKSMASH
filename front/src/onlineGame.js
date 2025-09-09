let socket;

export function runOnlineGame(canvas) {
  const ctx = canvas.getContext("2d");

  // connect
  socket = io("http://localhost:3000");
  console.log("Online game queue started");

  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Esperando jugadores...", 100, 300);

  socket.emit("joinQueue");

  socket.on("matchStart", (data) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100); // 1
    ctx.fillRect(600, 50, 100, 100); //2
    ctx.fillStyle = "white";
    ctx.fillText("Partida iniciada!", 100, 300);
  });
}
