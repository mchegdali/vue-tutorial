<template>
  <v-container fluid class="d-flex fill-height bg-deep-purple lighten-1">
    <div class="home">
      <h1>{{ time }} s</h1>
      <h3>{{ m }} m</h3>
      <h3>{{ ft }} ft</h3>
    </div>

    <v-btn @click="action" :class="state_class" icon fixed bottom right>
      <v-icon>{{ state_icon }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

let start = ref(0);
let timerId = ref(0);
let running = ref(false);
let time = ref("0");
let m = ref("0");
let ft = ref("0");

const state_icon = computed(() => {
  // Retourne l’icone pour le FAB
  if (running.value) {
    return "mdi-stop";
  } else {
    return "mdi-play";
  }
});

const state_class = computed(() => {
  // Retourne la class pour le FAB
  if (running.value) {
    return "fab red";
  } else {
    return "fab green";
  }
});

function action() {
  // Gestion du start / stop
  start.value = new Date().getTime();

  if (!running.value) {
    running.value = true;
    timerId.value = setInterval(() => {
      compute();
    }, 10);
  } else {
    running.value = false;
    clearInterval(timerId.value);
    saveHistory({ time: time.value, m: m.value, ft: ft.value });
  }
}

/**
 *
 * @param {{ time: string; m: string; ft: string }} item
 */
function saveHistory(item) {
  // Sauvegarde dans l’historique
  let history = JSON.parse(localStorage.getItem("history"));
  if (!Array.isArray(history)) {
    history = [];
  }
  history.unshift(item);
  localStorage.setItem("history", JSON.stringify(history));
}

function compute() {
  let fallTime = new Date().getTime() - start.value;
  let height = 16 * Math.pow(fallTime / 1000, 2);
  let numberDigits = 1;
  if (height < 1) {
    numberDigits = 2;
  }

  time.value = (fallTime / 1000).toFixed(2);
  ft.value = height.toFixed(numberDigits);
  m.value = (height / 3.2808).toFixed(numberDigits);
}
</script>

<style scoped>
.home {
  margin: auto;
  text-align: center;
}

.home > h1,
.home > h2,
.home > h3 {
  color: white;
}

.fab {
  position: absolute;
  bottom: 35px;
  right: 35px;
  transition: background-color 0.3s;
}

.fab.red {
  background-color: #f44336;
}

.fab.green {
  background-color: #4caf50;
}
</style>
