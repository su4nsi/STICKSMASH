import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { Game } from "./src/Game.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const activeGames = [];
const PORT = 3000;

app.use(express.static(path.join(process.cwd(), "../front")));

const waitingPlayers = [];

// WebSocket
io.on("connection", (socket) => {
  console.log("Jugador conectado:", socket.id);
  socket.on("playerMove", (movement) => {
    const game = activeGames.find((g) => g.players.includes(socket));
    if (!game) return;

    const opponent = game.players.find((p) => p !== socket);
    if (opponent) {
      io.to(opponent.id).emit("opponentMove", movement);
    }
  });

  socket.on("joinQueue", () => {
    if (!waitingPlayers.includes(socket)) {
      waitingPlayers.push(socket);
      console.log("Jugador agregado a la cola:", waitingPlayers.length);
      console.log(
        "el jugador en  de la cola que ha apretado el boton para jugar es :",
        socket.id
      );
    }
    tryStartMatch();
  });

  socket.on("disconnect", () => {
    const index = waitingPlayers.indexOf(socket);
    if (index !== -1) {
      console.log("index de la cola del jugador desconectado:", index);
      waitingPlayers.splice(index, 1);
      console.log("Jugador desconectado por voluntad:", socket.id);
    }

    const gameIndex = activeGames.findIndex((g) => g.players.includes(socket));
    if (gameIndex !== -1) {
      const [removedGame] = activeGames.splice(gameIndex, 1);

      removedGame.players.forEach((p) => {
        if (p.id !== socket.id) {
          io.to(p.id).emit("game_over", { reason: "opponent_disconnected" });
          const indexInQueue = waitingPlayers.indexOf(p);
          if (indexInQueue !== -1) waitingPlayers.splice(indexInQueue, 1);
          console.log(
            "el otro jugador removido de la cola por desconexión:",
            p.id
          );
        }
      });
      console.log(
        "Partida eliminada por desconexión :",
        removedGame.players.map((p) => p.id)
      );
      console.log("Jugadores en cola todavia", waitingPlayers.length);
    }
  });
});

function tryStartMatch() {
  if (waitingPlayers.length >= 2) {
    console.log("se da la condicion para iniciar la partida");
    const player1 = waitingPlayers.shift();
    const player2 = waitingPlayers.shift();

    const roomId = `room-${Date.now()}`;
    player1.join(roomId);
    player2.join(roomId);

    const game = new Game(player1, player2, 3, 60);
    activeGames.push(game);

    io.to(player1.id).emit("matchStart", { roomId, yourPlayer: "player1" });
    io.to(player2.id).emit("matchStart", { roomId, yourPlayer: "player2" });
    console.log("Partida iniciada en", roomId);
    console.log("Jugadores en cola todavia", waitingPlayers.length);
  }
}

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
