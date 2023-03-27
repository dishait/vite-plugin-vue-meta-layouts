import { createApp } from "vue";
import App from "./App.vue";
import { createGetRoutes, setupLayouts } from "virtual:meta-layouts";
import { createRouter, createWebHistory } from "vue-router";
import { routes as _routes } from "vue-router/auto/routes";

const app = createApp(App);

console.log(_routes);

const routes = setupLayouts(_routes);

const router = createRouter({
  routes,
  history: createWebHistory(),
});

const getRoutes = createGetRoutes(router);

// get routes without layout
console.log(getRoutes());

app.use(router);

app.mount("#app");
