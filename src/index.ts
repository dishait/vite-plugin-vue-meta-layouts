import type { Plugin } from "vite";
import { createVirtualModuleCode, createVirtualModuleID } from "./virtual";

export interface Options {
  /**
   * layouts dir
   * @default "src/layouts"
   */
  target?: string;
  /**
   * default layout
   * @default "default"
   */
  defaultLayout?: string;
  /**
   * default auto resolve
   */
  importMode?: "sync" | "async";
  /**
   * If opened, fix →
   * https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134
   * @default false
   */
  skipTopLevelRouteLayout?: boolean;
  /**
   * excludes path 
   */
  excludes: string[];
}

export default function MetaLayouts(options: Partial<Options> = {}): Plugin {
  const {
    target = "src/layouts",
    defaultLayout = "default",
    importMode = process.env.VITE_SSG ? "sync" : "async",
    skipTopLevelRouteLayout = false,
    excludes = []
  } = options;

  const { virtualModuleId, resolvedVirtualModuleId } = createVirtualModuleID(
    "meta-layouts",
  );

  return {
    name: "vite-plugin-vue-meta-layouts",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return createVirtualModuleCode({
          target,
          importMode,
          defaultLayout,
          skipTopLevelRouteLayout,
          excludes
        });
      }
    },
  };
}
