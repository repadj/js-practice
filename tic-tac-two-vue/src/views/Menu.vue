<script setup lang="ts">
import { ref , computed } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/gameStore.ts";

const router = useRouter();
const gameStore = useGameStore();
const player1Name = ref("");
const player2Name = ref("");
const selectedMode = ref("pvp");
const isPvP = computed(() => selectedMode.value === "pvp");

const openRulesPage = () => {
  window.location.href = "https://gamescrafters.berkeley.edu/games.php?game=tictactwo";
};

const startGame = () => {
  gameStore.setPlayer1Name(player1Name.value);
  if (isPvP.value) {
    gameStore.setPlayer2Name(player2Name.value);
  } else {
    gameStore.setPlayer2Name("Computer");
  }
  gameStore.setGameMode(selectedMode.value);
  router.push("/game");
};
</script>

<template>
  <div id="menu">
    <h1>TIC TAC TWO VUE</h1>

    <div>
      <input class="menuButton" id="playerName" v-model="player1Name" type="text" placeholder="Player 1" />
    </div>

    <div v-if="isPvP">
      <input class="menuButton" id="playerName" v-model="player2Name" type="text" placeholder="Player 2" />
    </div>

    <div>
      <select class="menuButton" id="mode" v-model="selectedMode">
        <option value="pvp">PvP</option>
        <option value="pvc">PvC</option>
      </select>
    </div>

    <button class="menuButton" @click="startGame">Start Game</button>
    <button class="menuButton" @click="openRulesPage">Rules</button>
  </div>
</template>

<style scoped>
  h1 {
    color: #34495E;
    font-size: 250%;
  }

  #menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .menuButton {
    margin-top: 30px;
    font-size: 200%;
    cursor: pointer;
    height: 70px;
    width: 240px;
    background-color: #34495E;
    border: 3px solid #34495E;
    border-radius: 10px;
    color: white;
  }

  #playerName {
    text-align: center;
    color: black;
    background-color: white;
    height: 60px;
  }

  #mode {
    text-align: center;
  }
</style>
