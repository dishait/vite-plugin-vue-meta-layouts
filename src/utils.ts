import { posix } from "path";
import { getPackageInfo } from "local-pkg";

export function normalizePath(path: string) {
  path = path.startsWith("/") ? path : "/" + path;
  return posix.normalize(path);
}

export async function isVite2() {
  const info = await getPackageInfo("vite");
  if (info) {
    return /.?2/.test(info.version);
  }
  return false;
}
