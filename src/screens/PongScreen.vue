<template>
  <div class="container">
    <div
      id="player1"
      class="player"
      :style="{ top: `${player1Position}%` }"
      ref=""
    ></div>
    <div
      id="player2"
      class="player"
      :style="{ top: `${player2Position}%` }"
    ></div>
    <div
      id="ball"
      :style="{ top: `${ballPosition.top}%`, left: `${ballPosition.left}%` }"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const player1Position = ref(50);
const player2Position = ref(50);
const ballPosition = ref({ top: 50, left: 50 });

const inputsMap = new Map();

setInterval(() => {
  if (inputsMap.get("KeyW") && player1Position.value > 0) {
    player1Position.value -= 1;
  } else if (inputsMap.get("KeyS") && player1Position.value < 100) {
    player1Position.value += 1;
  }

  if (inputsMap.get("KeyI") && player2Position.value > 0) {
    player2Position.value -= 1;
  } else if (inputsMap.get("KeyK") && player2Position.value < 100) {
    player2Position.value += 1;
  }
}, 10);

/**
 *
 * @param {KeyboardEvent} e
 */
function handleKeyDown(e) {
  e.stopPropagation();

  if (e.code === "KeyW" || e.code === "KeyS") {
    inputsMap.set(e.code, true);
  }

  if (e.code === "KeyI" || e.code === "KeyK") {
    inputsMap.set(e.code, true);
  }
}

/**
 *
 * @param {KeyboardEvent} e
 */
function handleKeyUp(e) {
  e.stopPropagation();

  if (e.code === "KeyW" || e.code === "KeyS") {
    inputsMap.set(e.code, false);
  }

  if (e.code === "KeyI" || e.code === "KeyK") {
    inputsMap.set(e.code, false);
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
  width: 100vw;
  height: calc(100vh - 64px);
}

.container::before {
  position: absolute;
  content: "";
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  border: 2px dashed #fff;
}

.player {
  width: 20px;
  height: 20%;
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
