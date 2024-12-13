import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
import Product from "./views/Product.vue";
import Cart from "./views/Cart.vue";

export const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/search", name: "search", component: Home },
  { path: "/product/:id", name: "product", component: Product },
  { path: "/cart", name: "cart", component: Cart },
  { path: "/:path(.*)", component: NotFound },
];
