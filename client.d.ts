declare module "virtual:meta-layouts" {
  import type {
    Router,
    RouteRecordNormalized,
    RouterOptions,
  } from "vue-router";

  export const setupLayouts: (
    routes: RouterOptions['routes'],
  ) => RouterOptions['routes'];

  export const createGetRoutes: (
    router: Router,
    /**
     * @default false
     */
    withLayout?: boolean,
  ) => () => RouteRecordNormalized[];
}
