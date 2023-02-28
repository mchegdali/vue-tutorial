<script setup>
import { ref, computed } from "vue";

const meters = ref(0);
const feet = ref(0);
const time = ref(0);

const data = computed(() => {
  return {
    time: time.value.toFixed(2),
    m: meters.value.toFixed(2),
    ft: feet.value.toFixed(2),
  }
});

function handleDistanceChange(e) {
  const value = e.target.valueAsNumber;
  meters.value = value;
  feet.value = 3.28084 * value;
}

function handleTimeChange(e) {
  time.value = e.target.valueAsNumber;
}

const floatRules = ref([
  (v) => !!v || "Veuiller entrer une valeur",
  (v) => !Number.isNaN(parseFloat(v)) || "Veuiller entrer un nombre",
  (v) =>
    parseFloat(v) >= 0 || "Veuiller entrer un nombre supérieur ou égal à zéro",
]);

/**
 * Add data to local storage
 */
async function addToHistory(e) {
  const isMetersValid = floatRules.value
    .map((cb) => cb(meters.value))
    .every((v) => v == true);

  const isTimeValid = floatRules.value
    .map((cb) => cb(time.value))
    .every((v) => v == true);

  if (isMetersValid && isTimeValid) {
    const history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [];

    history.push(data.value);
    localStorage.setItem("history", JSON.stringify(history));
  }

  e.target.reset();
}
</script>

<template>
  <v-form @submit.prevent="addToHistory" ref="addHistoryForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h1>Ajouter une donnée</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field name="m" type="number" label="Mètres" :rules="floatRules" required min="0"
            @change="handleDistanceChange"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field name="time" type="number" label="Temps" :rules="floatRules" required min="0" step="0.01"
            @change="handleTimeChange"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-btn type="submit" color="success">Valider</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped></style>
