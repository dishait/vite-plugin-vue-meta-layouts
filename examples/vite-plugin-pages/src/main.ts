import { createApp } from "vue";
import App from "./App.vue";
import { createGetRoutes, setupLayouts } from "virtual:meta-layouts";
import fileRoutes from "~pages";
import { createRouter, createWebHistory } from "vue-router";

const app = createApp(App);

const routes = setupLayouts(fileRoutes);

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const getRoutes = createGetRoutes(router);

// get routes without layout
console.log(getRoutes());

app.use(router);

app.mount("#app");
