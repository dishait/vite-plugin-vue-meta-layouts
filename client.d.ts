declare module "virtual:meta-layouts" {
  import type {
    Router,
    RouteRecordNormalized,
    RouteRecordRaw,
  } from "vue-router";

  export const setupLayouts: (
    routes: RouteRecordRaw[],
  ) => RouteRecordRaw[];

  export const createGetRoutes: (
    router: Router,
    /**
     * @default false
     */
    withLayout?: boolean,
  ) => () => RouteRecordNormalized[];
}
