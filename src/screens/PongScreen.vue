<template>
  <div class="container">
    <div id="player1" class="player" :style="player1Style"></div>
    <div id="player2" class="player" :style="player2Style"></div>
    <div id="ball" :style="{ top: `${ballPosition.top}%`, left: `${ballPosition.left}%` }"></div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const player1Y = ref(50);
const player2Y = ref(50);

const player1Style = computed(() => ({
  top: `calc(${player1Y.value}% - 75px)`
}));

const player2Style = computed(() => ({
  top: `calc(${player2Y.value}% - 75px)`
}));
const ballPosition = ref({ top: 50, left: 50 });

const inputsMap = ref(new Map());

setInterval(() => {
  if (inputsMap.value.get("KeyW") && player1Y.value > 0) {
    player1Y.value -= 1;
  } else if (inputsMap.value.get("KeyS") && player1Y.value < 100) {
    player1Y.value += 1;
  }

  if (inputsMap.value.get("KeyI") && player2Y.value > 0) {
    player2Y.value -= 1;
  } else if (inputsMap.value.get("KeyK") && player2Y.value < 100) {
    player2Y.value += 1;
  }
}, 10);

/**
 *
 * @param {KeyboardEvent} e
 */
function handleKeyDown(e) {
  e.stopPropagation();

  if (e.code === "KeyW" || e.code === "KeyS") {
    inputsMap.value.set(e.code, true);
  }

  if (e.code === "KeyI" || e.code === "KeyK") {
    inputsMap.value.set(e.code, true);
  }
}

/**
 *
 * @param {KeyboardEvent} e
 */
function handleKeyUp(e) {
  e.stopPropagation();

  if (e.code === "KeyW" || e.code === "KeyS") {
    inputsMap.value.set(e.code, false);
  }

  if (e.code === "KeyI" || e.code === "KeyK") {
    inputsMap.value.set(e.code, false);
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
</script>

<style scoped>
.container {
  position: relative;
  background: #000;
  border: 5px solid #fff;
  width: calc(100vw - 10px);
  /* -10px here to simplify calculation */
  height: calc(100vh - 64px - 10px);
  /* -10px here to simplify calculation */
  box-sizing: content-box;
  /* content-box to simplify calculation */
}

.container::before {
  position: absolute;
  content: "";
  top: 0;
  left: 50%;
  width: 0px;
  height: 100%;
  border: 2px dashed #fff;
}

.player {
  width: 20px;
  height: 150px;
  background-color: #fff;
}

#player1 {
  position: fixed;
  left: 5%;
}

#player2 {
  position: fixed;
  right: 5%;
}

#ball {
  position: fixed;
  width: 31px;
  height: 31px;
  background-color: #fff;
  transform: translate(-50%, -50%);
}
</style>
