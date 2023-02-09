<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-toolbar class="bg-deep-purple" />
  <v-list dense>
    <template v-for="item in items" :key="item.title">
      <v-list-item ripple :to="item.action">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text" />
      </v-list-item>
    </template>
  </v-list>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  { icon: "mdi-home", text: "Accueil", action: "/" },
  { icon: "mdi-history", text: "Historique", action: "/history" },
  {
    icon: "mdi-file-document-plus-outline",
    text: "Ajouter",
    action: "/history/add",
  },
  { icon: "mdi-help", text: "À propos", action: "/about" },
]);
</script>
