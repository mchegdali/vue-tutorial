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
          <v-text-field
            name="m"
            type="number"
            label="Mètres"
            :rules="floatRules"
            required
            min="0"
            step="0.1"
            @change="handleDistanceChange"
            :value="meters"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            name="time"
            type="number"
            label="Temps"
            :rules="floatRules"
            required
            min="0"
            step="0.01"
            @change="handleTimeChange"
            :value="time"
          ></v-text-field>
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

<script setup>
import { ref, reactive } from "vue";

const meters = ref("");
const feet = ref("");
const time = ref("");

const data = reactive({
  time: time,
  m: meters,
  ft: feet,
});

function handleDistanceChange(e) {
  const value = e.target.valueAsNumber;
  meters.value = value.toFixed(2);
  feet.value = value.toFixed(2);
}

function handleTimeChange(e) {
  time.value = e.target.valueAsNumber.toFixed(2);
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
async function addToHistory() {
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

    console.log(data);

    history.push(data);
    localStorage.setItem("history", JSON.stringify(history));
  }

  meters.value = "";
  feet.value = "";
  time.value = "";
}
</script>

<style scoped></style>
