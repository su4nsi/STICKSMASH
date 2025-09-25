export class Game {
  constructor(player1, player2, playerLifes = 3, duration = 60) {
    this.players = [player1, player2];
    this.playerLifes = playerLifes;
    this.duration = duration;
    this.timeLeft = duration;
    this.isActive = true;
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 100000000);
  }

  endGame() {
    this.isActive = false;
    clearInterval(this.timer);
    console.log(
      "Partida terminada entre:",
      this.players.map((p) => p.id)
    );
  }

  loseLife(playerIndex) {
    this.playerLifes -= 1;
    if (this.playerLifes <= 0) {
      this.endGame();
    }
  }
}
