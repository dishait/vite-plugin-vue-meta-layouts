import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";
import VueRouter from "unplugin-vue-router/vite";
import MetaLayouts from "vite-plugin-vue-meta-layouts";

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    MetaLayouts(),
    VueRouter({
      dts: "types/typed-router.d.ts",
    }),
  ],
});
