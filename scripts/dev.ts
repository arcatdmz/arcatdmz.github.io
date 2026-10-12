/** Build source assets, then keep them in sync alongside Next's development server. */
import { spawn, type ChildProcess } from "node:child_process";
import { watch, type FSWatcher } from "node:fs";
import path from "node:path";

const root = process.cwd();
const children = new Map<ChildProcess, Promise<void>>();
const watchers: FSWatcher[] = [];
let debounce: NodeJS.Timeout | undefined;
let stopping = false;
let building = false;
let queued = false;
let next: ChildProcess | undefined;

function signalChild(child: ChildProcess, signal: NodeJS.Signals): void {
  if (!child.pid) return;
  try {
    if (process.platform === "win32") {
      // Windows has no POSIX process groups. Include Next's worker processes.
      spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
      }).on("error", () => child.kill(signal));
    } else {
      process.kill(-child.pid, signal);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ESRCH")
      console.error(`[dev] Could not stop child ${child.pid}:`, error);
  }
}

function start(args: string[]): ChildProcess {
  const child = spawn(process.execPath, args, {
    cwd: root,
    stdio: "inherit",
    detached: process.platform !== "win32",
  });
  children.set(
    child,
    new Promise<void>((resolve) => {
      child.once("close", () => {
        // Clear any workers left in the group when the direct child exits.
        signalChild(child, "SIGKILL");
        children.delete(child);
        resolve();
      });
    }),
  );
  return child;
}

async function stop(code: number, signal: NodeJS.Signals = "SIGTERM") {
  if (stopping) {
    for (const child of children.keys()) signalChild(child, "SIGKILL");
    return;
  }
  stopping = true;
  if (debounce) clearTimeout(debounce);
  for (const watcher of watchers) watcher.close();
  const pending = [...children.values()];
  for (const child of children.keys()) signalChild(child, signal);
  const timeout = setTimeout(() => {
    for (const child of children.keys()) signalChild(child, "SIGKILL");
  }, 5_000);
  await Promise.all(pending);
  clearTimeout(timeout);
  process.exitCode = code;
}

function startNext(): void {
  if (next || stopping) return;
  next = start([
    path.join(root, "node_modules/next/dist/bin/next"),
    "dev",
    "--webpack",
    ...process.argv.slice(2),
  ]);
  next.once("error", (error) => {
    console.error("[dev] Could not start Next.js:", error);
    void stop(1);
  });
  next.once("exit", (code, signal) => {
    if (!stopping) {
      if (code || signal)
        console.error(`[dev] Next.js stopped (${signal || code}).`);
      void stop(code ?? 1);
    }
  });
}

async function rebuild(): Promise<void> {
  queued = true;
  if (building || stopping) return;
  building = true;
  try {
    while (queued && !stopping) {
      queued = false;
      console.log("[dev] Preparing source assets…");
      const child = start([
        "--import",
        "tsx",
        path.join(root, "scripts/prepare-assets.ts"),
      ]);
      const success = await new Promise<boolean>((resolve) => {
        child.once("error", (error) => {
          console.error("[dev] Could not start the asset build:", error);
          resolve(false);
        });
        child.once("exit", (code) => resolve(code === 0));
      });
      if (stopping) break;
      if (success) {
        if (next)
          console.log(
            "[dev] Assets rebuilt. Reload the browser for static asset changes.",
          );
        else startNext();
      } else {
        console.error(
          "[dev] Asset build failed. Fix the source and save again to retry." +
            (next
              ? " Next.js is still running."
              : " Next.js will start after a successful build."),
        );
      }
    }
  } finally {
    building = false;
  }
}

function scheduleRebuild(): void {
  if (stopping) return;
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(() => void rebuild(), 200);
}

function watchSource(
  directory: string,
  recursive: boolean,
  include: (filename: string) => boolean = () => true,
): void {
  const watcher = watch(
    path.join(root, directory),
    { recursive },
    (_, filename) => {
      if (!filename || include(filename.toString())) scheduleRebuild();
    },
  );
  watcher.on("error", (error) => {
    console.error(`[dev] Source watcher failed for ${directory}:`, error);
    void stop(1);
  });
  watchers.push(watcher);
}

process.on("SIGINT", () => void stop(130, "SIGINT"));
process.on("SIGTERM", () => void stop(143));

try {
  // Watch only source inputs. Watching public/, build/, or site/generated/
  // would turn each asset build into an endless rebuild loop.
  watchSource("src", true);
  watchSource("semantic", true);
  watchSource("site", true, (name) => !/^generated(?:[/\\]|$)/.test(name));
  watchSource("scripts", false, (name) =>
    [
      "prepare-assets.ts",
      "image-derivatives.ts",
      "prepare-page-data.ts",
      "blog-redirections.json",
    ].includes(name),
  );
  watchSource(".", false, (name) =>
    [
      "website.json",
      "semantic.json",
      "webpack.config.js",
      "tsconfig.json",
    ].includes(name),
  );
  void rebuild();
} catch (error) {
  console.error("[dev] Could not watch source files:", error);
  void stop(1);
}
