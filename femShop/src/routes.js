import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

export const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/:path(.*)", component: NotFound },
];