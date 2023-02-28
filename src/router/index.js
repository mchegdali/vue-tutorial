import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/HomeScreen.vue";
import About from "../screens/AboutScreen.vue";
import History from "../screens/HistoryScreen.vue";
import AddHistory from "../screens/AddHistoryScreen.vue";
import Pong from "../screens/PongScreen.vue";

// table-tennis
/**
 * @type {import('vue-router').RouteRecordRaw}
 */
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/history",
    children: [
      {
        path: "",
        name: "History",
        component: History,
      },
      {
        path: "add",
        name: "AddHistory",
        component: AddHistory,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/pong",
    name: "Pong",
    component: Pong,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
