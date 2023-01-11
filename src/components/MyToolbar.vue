<template>
  <v-navigation-drawer v-model="drawer" clipped fixed app>
    <myContentDrawer />
  </v-navigation-drawer>
  <v-app-bar dark color="deep-purple" clipped-left app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title @click="goHome" class="white--text pointer">
      Cliff height timer
    </v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import myContentDrawer from "./MyDrawer.vue";

const drawer = ref(false);
const $router = useRouter();

function goHome() {
  $router.replace("/");
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
