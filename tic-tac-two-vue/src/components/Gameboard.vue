<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  board: (string | undefined)[][],
  isInGrid: (x: number, y: number) => boolean
}>();

const emit = defineEmits(["move"]);

const handleClick = (x: number, y: number) => {
  emit("move", x, y);
};
</script>

<template>
  <div id="board">
    <div v-for="(row, i) in board" :key="i" class="row">
      <div
          v-for="(cell, j) in row"
          :key="j"
          class="square"
          :class="{ grid: isInGrid(i, j) }"
          @click="handleClick(i, j)"
      >
        {{ cell || " " }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#board {
  width: 400px;
  height: 400px;
  background-color: #34495E;
  display: flex;
  flex-wrap: wrap;
  border: 3px solid #34495E;
}

.row {
  display: flex;
}

.square {
  width: 80px;
  height: 80px;
  background-color: white;
  border: 2px solid #34495E;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 450%;
  cursor: pointer;
}

.square:hover {
  background-color: lightsteelblue;
}

.grid {
  background-color: #41B883;
}
</style>
