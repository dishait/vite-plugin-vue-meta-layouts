import type { Plugin } from "vite";
import {
  createVirtualModuleCode,
  createVirtualModuleID,
} from "./shared/create";

interface Options {
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
  importMode: "sync" | "async";
}

const usePlugin = (options?: Partial<Options>): Plugin => {
  const {
    target = "src/layouts",
    defaultLayout = "default",
    importMode = process.env.VITE_SSG ? "sync" : "async",
  } = options || {};

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
        });
      }
    },
  };
};

export default usePlugin;
