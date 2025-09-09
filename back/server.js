import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const PORT = 3000;

app.use(express.static(path.join(process.cwd(), "../front")));

const waitingPlayers = [];

// WebSocket
io.on("connection", (socket) => {
  console.log("Jugador conectado:", socket.id);

  socket.on("joinQueue", () => {
    if (!waitingPlayers.includes(socket)) {
      waitingPlayers.push(socket);
      console.log("Jugador agregado a la cola:", waitingPlayers.length);
    }
    tryStartMatch();
  });

  socket.on("disconnect", () => {
    const index = waitingPlayers.indexOf(socket);
    if (index !== -1) waitingPlayers.splice(index, 1);
    console.log("Jugador desconectado:", socket.id);
  });
});

function tryStartMatch() {
  if (waitingPlayers.length >= 2) {
    const player1 = waitingPlayers.shift();
    const player2 = waitingPlayers.shift();

    const roomId = `room-${Date.now()}`;
    player1.join(roomId);
    player2.join(roomId);

    io.to(roomId).emit("matchStart", { roomId });
    console.log("Partida iniciada en", roomId);
  }
}

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
