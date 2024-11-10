# vite-plugin-vue-meta-layouts

`vite` 的 `vue-router` 的元信息布局系统

<br />

## README 🦉

[English](./README_EN.md) | Chinese

<br />

## 动机 🤔

[vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
的重写版本，在最新版本的 `vite` 中有合理的 `hmr` ！！

<br />
<br />

## 使用 🦖

### 基础

#### 安装

```shell
npm i vite-plugin-vue-meta-layouts -D
```

```ts
// vite.config.js
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import MetaLayouts from "vite-plugin-vue-meta-layouts";

export default defineConfig({
  plugins: [Vue(), MetaLayouts()],
});
```

#### 使用

```ts
import { setupLayouts } from "virtual:meta-layouts";
import { createRouter, createWebHistory } from "vue-router";

const routes = setupLayouts([
  {
    // ... 页面路由配置
  },
]);

const router = createRouter({
  routes,
  history: createWebHistory(),
});
```

1. 创建 `layouts/default.vue` 默认布局，此时页面都会被应用该布局

```html
<template>
  default
  <router-view />
  <!-- 视图出口 -->
</template>
```

2. 当然你可以配置不同的的布局

例如创建 `layouts/other.vue`

```ts
// 应用 layouts/default.vue 布局
const home = {
  path: "/",
  component: () => import("./pages/home.vue"),
};

// 应用 layouts/other.vue 布局
const about = {
  path: "/about",
  component: () => import("./pages/home.vue"),
  meta: {
    layout: "other", // 通过元信息来管理布局
  },
};

const routes = setupLayouts([home, about]);
```

<br />

### 搭配文件路由

当然也支持文件路由哦 🤗

#### [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

##### 安装

```shell
npm i vite-plugin-pages -D
```

```ts
// vite.config.js
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages"; // 引入文件路由插件
import MetaLayouts from "vite-plugin-vue-meta-layouts";

export default defineConfig({
  plugins: [
    Vue(),
    Pages(), // 配置文件路由插件
    MetaLayouts(),
  ],
});
```

##### 使用

```ts
import fileRoutes from "~pages"; // 引入文件路由表
import { setupLayouts } from "virtual:meta-layouts";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  routes: setupLayouts(fileRoutes), // 注册文件路由表
  history: createWebHistory(),
});
```

此时可以通过页面中的自定义块 `route` 的 `meta` 来做布局配置

```html
<!-- 你的页面 -->
<template> 内容 </template>

<route> { meta: { layout: 'other' } } </route>
```

<br />
<br />

#### [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

##### 安装

```shell
npm i unplugin-vue-router -D
```

##### 使用

```ts
import { routes } from "vue-router/auto-routes"; // 引入文件路由表
import { setupLayouts } from "virtual:meta-layouts";
import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  routes: setupLayouts(routes), // 注册文件路由表
  history: createWebHistory(),
});
```

<br />
<br />

### 配置

```ts
// vite.config.js
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import MetaLayouts from "vite-plugin-vue-meta-layouts";

export default defineConfig({
  plugins: [
    Vue(),
    MetaLayouts({
      target: "src/layouts", // 布局目录，默认 src/layouts
      defaultLayout: "default", // 默认布局，默认为 default
      importMode: "sync", // 加载模式，支持 sync 和 async。默认为自动处理，SSG 时为 sync，非 SSG 时为 async
      skipTopLevelRouteLayout: true, // 打开修复 https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134，默认为 false 关闭
      excludes: [], // 排除路径，仅接受 glob
    }),
  ],
});
```

<br />
<br />

### 类型声明 🦕

如果你是 `ts` 项目，还可以在 `tsconfig.json` 中配置以下声明

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-vue-meta-layouts/client"]
  }
}
```

<br />
<br />

### `route` 代码提示 💡

使用
[volar-plugin-vue-router](https://github.com/kingyue737/volar-plugin-vue-router)
可以带来友好的代码提示.

<br />
<br />

### 注意

由于布局系统需要在最外层嵌套一层布局路由，所以可能会造成路由表的获取混乱，此时可以用辅助的函数
👇

```ts
import { createGetRoutes } from "virtual:meta-layouts";

const getRoutes = createGetRoutes(router);

// 获取路由表但是不包含布局路由
console.log(getRoutes());
```

<br />
<br />

## 实现 👀

布局实现思路来自
[vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)。

但用了更简单方案 👉
[虚拟文件](https://vitejs.cn/guide/api-plugin.html#importing-a-virtual-file) 与
[Glob 导入](https://vitejs.cn/guide/features.html#glob-import)。

该方案可以自动地做合理的 `hmr`。

<br />
<br />

## 组织 🦔

欢迎关注 **帝莎编程**

- [官网](http://dishaxy.dishait.cn/)
- [Gitee](https://gitee.com/dishait)
- [Github](https://github.com/dishait)
- [网易云课堂](https://study.163.com/provider/480000001892585/index.htm?share=2&shareId=480000001892585)

<br />
<br />

## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).

<br />
