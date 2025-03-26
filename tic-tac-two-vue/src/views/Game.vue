<script setup lang="ts">
import { ref, reactive , computed } from "vue";
import { useGameStore } from "@/stores/gameStore";
import { useRouter } from "vue-router";
import { GameBrain } from "@/gameBrain.ts";
import GameBoard from "@/components/Gameboard.vue";

const router = useRouter();
const gameStore = useGameStore();
const game = reactive(new GameBrain(gameStore.gameMode as "pvp" | "pvc"));
const playerX = computed(() => gameStore.player1Name || "Player X");
const playerO = computed(() => gameStore.player2Name || "Player O");

const currentPlayerName = computed(() =>
    game.currentPlayer === "X" ? playerX.value : playerO.value
);

const infoMessage = ref(`${currentPlayerName.value}'s turn`);

const winCheck = () => {
  let winner = game.checkForWin();
  if (winner !== "N") {
    game.switchTurn();
    router.push({ path: "/gameOver", query: { winner: winner === "X" ? playerX.value : winner === "O" ? playerO.value : "T" } });
    infoMessage.value = winner === "T" ? "It's a tie!" : `${currentPlayerName.value} WON!`;
  } else {
    infoMessage.value = `${currentPlayerName.value}'s turn`;
  }
};

const handleMove = (x: number, y: number) => {
  if (game.checkForWin() !== "N") {
    return;
  }
  if (game.currentPlayerMoves() >= 2 && game.board[x][y] === game.currentPlayer) {
    game.removePiece(x, y);
  } else if (game.currentPlayerMoves() < 3) {
    game.makeAMove(x, y);
  } else {
    infoMessage.value = "Not enough pieces!";
  }
  winCheck();
  if (gameStore.gameMode === "pvc" && game.currentPlayer === "O" && game.checkForWin() === "N") {
    setTimeout(handleBotMove, 1000);
  }
};

const handleBotMove = () => {
  if (game.currentPlayer === "O" && game.checkForWin() === "N") {
    game.randomMove();
    winCheck();
  }
};

const moveGrid = (direction: string) => {
  if (game.currentPlayerMoves() < 2 || game.checkForWin() !== "N") {
    infoMessage.value = "Can't move grid!";
    return;
  }
  if (game.moveGrid(direction)) {
    winCheck();
  } else {
    infoMessage.value = "Can't move grid!";
  }
  if (gameStore.gameMode === "pvc" && game.currentPlayer === "O" && game.checkForWin() === "N") {
    setTimeout(handleBotMove, 1000);
  }
};

const restartGame = () => {
  Object.assign(game, new GameBrain(gameStore.gameMode as "pvp" | "pvc"));
};

const goToMenu = () => {
  router.push("/");
};
</script>

<template>
  <div id="game">
    <h1>TIC TAC TWO VUE</h1>

    <GameBoard :board="game.board" :isInGrid="(x, y) => game.isInGrid(x, y)" @move="handleMove" />

    <p id="info">{{ infoMessage }}</p>

    <div id="buttons">
      <button class="gridButton" @click="moveGrid('▲')">▲</button>
      <button class="gridButton" @click="moveGrid('▼')">▼</button>
      <button class="gridButton" @click="moveGrid('◄')">◄</button>
      <button class="gridButton" @click="moveGrid('►')">►</button>
    </div>

    <div id="menu-buttons">
      <button class="menuButton" @click="goToMenu">Menu</button>
      <button class="menuButton" @click="restartGame">Restart</button>
    </div>
  </div>
</template>


<style scoped>
h1 {
  color: #34495E;
  font-size: 200%;
  text-align: center;
}

#info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 400px;
  height: 40px;
  background-color: white;
  border: 3px solid black;
  font-size: 200%;
}

#buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

#menu-buttons {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}

.gridButton {
  font-size: 250%;
  width: 60px;
  height: 60px;
  margin: 3px;
  background-color: #34495E;
  border: 3px solid black;
  border-radius: 10px;
  color: white;
}

.gridButton:hover {
  background-color: lightsteelblue;
}

.menuButton {
  display: block;
  margin: 3px;
  font-size: 200%;
  cursor: pointer;
  height: 60px;
  width: 180px;
  background-color: #34495E;
  border: 3px solid black;
  border-radius: 10px;
  color: white;
}
</style>
