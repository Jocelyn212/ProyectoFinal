import { createApp } from "vue";
import "./normalize.css";
import "./style.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Agregar clases al div in .app (en index.html)
  router.afterEach((to) => {
    const appDiv = document.getElementById("app");

    // Limpia las clases previas
    appDiv.className = "";

    // Agrega una clase basada en el nombre de la ruta
    if (to.name) {
      appDiv.classList.add(`page-${to.name}`);
    } else {
      appDiv.classList.add("page-default");
    }
  });


app.use(router);
app.use(createPinia());

app.mount("#app");
