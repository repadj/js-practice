<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/gameStore";

const router = useRouter();
const gameStore = useGameStore();

const winner = router.currentRoute.value.query.winner as string;

const getWinnerText = () => {
  if (winner === "T") return "It's a tie!";
  return `${winner} WON! 🎉`;
};

const restartGame = () => {
  router.push("/game");
};

const goToMenu = () => {
  router.push("/");
};
</script>

<template>
  <div id="winner">
    <h1>{{ getWinnerText() }}</h1>
    <p id="text" v-if="winner !== 'T'">
      {{ gameStore.player1Name }} (X) vs {{ gameStore.gameMode === "pvp" ? gameStore.player2Name : "Computer" }} (O)
    </p>

    <div id="winner-buttons">
      <button class="winnerButton" @click="restartGame">Play Again</button>
      <button class="winnerButton" @click="goToMenu">Main Menu</button>
    </div>
  </div>
</template>

<style scoped>
#winner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-size: 3rem;
  color: #34495E;
}

#text {
  font-size: 1.5rem;
  color: white;
}

#winner-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.winnerButton {
  font-size: 150%;
  cursor: pointer;
  height: 60px;
  width: 200px;
  background-color: #34495E;
  border: 3px solid black;
  border-radius: 10px;
  color: white;
}

.winnerButton:hover {
  background-color: lightsteelblue;
}
</style>
