# vite-plugin-vue-meta-layouts

Vite's Vue-Router's meta-information layout system

<br />

## README 🦉

English | [Chinese](./README.md)

<br />

## 动机 🤔

A rewritten version of
[vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
with a reasonable `HMR` in the latest version of 'Vite' !!

<br />
<br />

## usage 🦖

### basic

#### install

```shell
npm i vite-plugin-vue-meta-layouts -D
```

```ts
// vite.config.js
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import MetaLayouts from "vite-plugin-vue-meta-layouts"

export default defineConfig({
  plugins: [Vue(), MetaLayouts()],
})
```

#### usage

```ts
import { setupLayouts } from "virtual:meta-layouts"
import { createRouter, createWebHistory } from "vue-router"

const routes = setupLayouts([
  {
    // ... Page routes
  },
])

const router = createRouter({
  routes,
  history: createWebHistory(),
})
```

1. `layouts/default.vue` 👉 The default layout, which is now applied to the page

```html
<template>
  default
  <router-view />
</template>
```

2. Of course you can configure different layouts

For example `layouts/other.vue`

```ts
// apply layouts/default.vue layout
const home = {
  path: "/",
  component: () => import("./pages/home.vue"),
}

// apply layouts/other.vue layout
const about = {
  path: "/about",
  component: () => import("./pages/home.vue"),
  meta: {
    layout: "other", // Manage layouts through meta information
  },
}

const routes = setupLayouts([home, about])
```

<br />

### Pair with file routing

Of course, file routing is also supported 🤗

#### [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

##### install

```shell
npm i vite-plugin-pages -D
```

```ts
// vite.config.js
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages" // Introducing the file routing plugin
import MetaLayouts from "vite-plugin-vue-meta-layouts"

export default defineConfig({
  plugins: [
    Vue(),
    Pages(), // Configure the configuration file routing plug-in
    MetaLayouts(),
  ],
})
```

##### 使用

```ts
import fileRoutes from "~pages" // file routes
import { setupLayouts } from "virtual:meta-layouts"
import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  routes: setupLayouts(fileRoutes), // Register the file routes
  history: createWebHistory(),
})
```

At this time, the layout can be configured by `meta` of the custom block `route`
in the page

```html
<!-- Your page -->
<template> content </template>

<route> { meta: { layout: 'other' } } </route>
```

<br />
<br />

#### [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

##### install

```shell
npm i unplugin-vue-router -D
```

##### usage

```ts
import { routes } from "vue-router/auto-routes" // file routes
import { setupLayouts } from "virtual:meta-layouts"
import { createRouter, createWebHistory } from "vue-router/auto"

const router = createRouter({
  extendRoutes: () => setupLayouts(routes), // Register the file routes
  history: createWebHistory(),
})
```

<br />
<br />

### config

```ts
// vite.config.js
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import MetaLayouts from "vite-plugin-vue-meta-layouts"

export default defineConfig({
  plugins: [
    Vue(),
    MetaLayouts({
      target: "src/layouts", // Layout directory, default src/layouts
      defaultLayout: "default", // Default layout, which defaults to default
      importMode: "sync", // Load mode, support sync and async. The default is automatic processing, sync for SSGs, and async for non-SSGs
      skipTopLevelRouteLayout: true, // Turn on fixing https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134, default is false Close
    }),
  ],
})
```

<br />
<br />

### Type declarations 🦕

If you are a `ts` project, you can also configure the following declaration in
`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-vue-meta-layouts/client"]
  }
}
```

<br />
<br />

### `route` Code Hints 💡

Use
[volar-plugin-vue-router](https://github.com/kingyue737/volar-plugin-vue-router)
can bring friendly code hints.

<br />
<br />

### note

Since the layout system needs to nest a layer of layout routes in the outermost
layer, it may cause confusion in obtaining the routing table, and auxiliary
functions can be used at this time 👇

```ts
import { createGetRoutes } from "virtual:meta-layouts"

const getRoutes = createGetRoutes(router)

// Gets the route table, but does not contain layout routes
console.log(getRoutes())
```

<br />
<br />

## implement 👀

The layout implementation idea comes from [vite-plugin-vue-layouts]
(https://github.com/JohnCampionJr/vite-plugin-vue-layouts).

However, the simpler scheme 👉
[virtual file](https://vitejs.cn/guide/api-plugin.html#importing-a-virtual-file)
and [glob import](https://vitejs.cn/guide/features.html#glob-import) is used.

The program can do reasonable `HMR` automatically.

<br />
<br />

## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).

<br />
