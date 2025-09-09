export function runOnlineGame(canvas) {
  const ctx = canvas.getContext("2d");
  console.log("Online game started");
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Juego Online - Próximamente...", 100, 300);
}
