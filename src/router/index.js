import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/HomeScreen.vue";
import About from "../screens/AboutScreen.vue";
import History from "../screens/HistoryScreen.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
