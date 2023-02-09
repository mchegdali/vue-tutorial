import { createRouter, createWebHistory } from "vue-router";
import Home from "../screens/HomeScreen.vue";
import About from "../screens/AboutScreen.vue";
import History from "../screens/HistoryScreen.vue";
import AddHistory from "../screens/AddHistoryScreen.vue";

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
  // {
  //   path: "/add",
  //   name: "AddHistory",
  //   component: AddHistory,
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
