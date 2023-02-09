<script setup>
import { computed } from "vue";

let history = computed(() => {
  const historyStr = localStorage.getItem("history");
  let history = JSON.parse(historyStr) ?? [];

  history = history.map((v) => ({ ...v, key: btoa(v) }));
  return history;
});
</script>

<template>
  <div>
    <v-container>
      <v-row class="mb-2"><h1>Historique</h1></v-row>
      <template v-for="item of history" :key="item.key">
        <v-card :text="`${item.m}m (${item.ft}ft) en ${item.time}s`"></v-card>
      </template>
    </v-container>
  </div>
</template>
