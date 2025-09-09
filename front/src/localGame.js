export function runLocalGame(canvas) {
  const ctx = canvas.getContext("2d");
  console.log("Local game started");
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Local", 100, 300);
}
