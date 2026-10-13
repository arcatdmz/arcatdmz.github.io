/** Audit the exported site, optionally against a previous export. */
import { chromium, type Page } from "@playwright/test";
import { createPreviewServer } from "./serve-static";
import { filesIn } from "./verify-site";
import routes from "../site/routes.json";
import { buildYear } from "../site/clock";
import { promises as fs } from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const baseline = process.env.SITE_BASELINE;
const artifactDirectory = path.resolve("site-qa/navigation");
const report: Record<string, unknown> = {
  conditions: {
    thirdPartyNetwork: "blocked",
    jqueryDelayMs: 1200,
    baseline: baseline || null,
    candidate: "dist",
  },
};
const servers: Awaited<ReturnType<typeof createPreviewServer>>[] = [];
async function serve(directory: string) {
  const server = await createPreviewServer(path.resolve(directory));
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Missing preview address");
  return `http://127.0.0.1:${address.port}`;
}
async function prepare(page: Page, origin: string, delayed = false) {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    if (delayed && url.pathname === "/javascripts/vendor/jquery.min.js")
      await new Promise((resolve) => setTimeout(resolve, 1200));
    return route.continue();
  });
  await page.addInitScript({
    content: `
    Math.random = () => 0;
    window.canvasFrames = [];
    const sample = () => {
      if (document.body) window.canvasFrames.push({time: performance.now(), color: getComputedStyle(document.body).backgroundColor});
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  `,
  });
}
async function settled(page: Page) {
  await page.waitForFunction(
    () =>
      document.getElementById("__next")?.dataset.siteWidgets === "ready" ||
      !!(window as any).$?.(".ui.sidebar").data("module-sidebar"),
  );
}

async function main() {
  await fs.rm(artifactDirectory, { recursive: true, force: true });
  await fs.mkdir(artifactDirectory, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  });
  try {
    const candidateOrigin = await serve("dist");
    const baselineOrigin = baseline ? await serve(baseline) : undefined;
    const entries = routes.flatMap(({ path: filename, language }) => {
      if (filename.includes("[year]")) {
        const firstYear = language === "ja" ? 2010 : 2011;
        return Array.from(
          { length: buildYear - firstYear + 1 },
          (_, index) =>
            `/${filename.replace("[year].tsx", `${firstYear + index}/`)}`,
        );
      }
      return [`/${filename.replace(/(?:\/)?index\.tsx$/, "")}`];
    });
    const knownSources = new Set(routes.map((route) => route.path));
    for (const source of await filesIn(path.resolve("pages"))) {
      if (
        !source.endsWith(".tsx") ||
        path.basename(source).startsWith("_") ||
        source.includes("[") ||
        knownSources.has(source) ||
        source === "resume.tsx"
      )
        continue;
      entries.push(
        `/${source.replace(/(?:\/)?index\.tsx$/, "").replace(/\.tsx$/, "/")}`,
      );
    }
    const errors: { route: string; message: string }[] = [];
    const redirects: string[] = [];
    const page = await browser.newPage();
    await prepare(page, candidateOrigin);
    let currentRoute = "";
    page.on("pageerror", (error) =>
      errors.push({ route: currentRoute, message: error.message }),
    );
    for (const route of entries) {
      currentRoute = route;
      const normalizedRoute = route.replace(/\/$/, "");
      if (
        [
          "/science",
          "/ugv",
          "/user-generated-variables",
          "/user-interface-design",
          "/ja/user-generated-variables",
          "/ja/talks/as-a-code",
          "/ja/talks/people-are-programmers",
        ].includes(normalizedRoute)
      ) {
        redirects.push(route);
        continue;
      }
      await page.goto(candidateOrigin + route);
      if (await page.locator("#pusher").count()) await settled(page);
      else redirects.push(route);
    }
    await page.goto(candidateOrigin + "/resume/");
    report.sweep = {
      pages: entries.length + 1,
      applicationErrors: errors,
      redirects,
    };
    await page.close();
    console.log(
      `Swept ${entries.length + 1} routes; ${
        errors.length
      } application errors; ${redirects.length} preserved redirects.`,
    );
    await fs.writeFile(
      path.join(artifactDirectory, "report.json"),
      JSON.stringify(report, null, 2),
    );

    const timing: Record<string, unknown> = {};
    for (const [label, origin] of [
      ["before", baselineOrigin],
      ["after", candidateOrigin],
    ] as const) {
      if (!origin) continue;
      const page = await browser.newPage();
      await prepare(page, origin, true);
      let documents = 0;
      page.on("request", (request) => {
        if (
          request.isNavigationRequest() &&
          request.frame() === page.mainFrame()
        )
          documents += 1;
      });
      await page.goto(origin + "/visionsketch/");
      await settled(page);
      const frames = await page.evaluate(
        () => (window as any).canvasFrames as { time: number; color: string }[],
      );
      const dark = frames.filter(({ color }) => color === "rgb(84, 84, 84)");
      const baselineDocuments = documents;
      const samples: number[] = [];
      for (const route of [
        "publications",
        "activities",
        "timeline",
        "publications",
        "activities",
      ]) {
        await settled(page);
        const started = Date.now();
        await page
          .locator(
            `#fixed-menu a[href="/${route}"], #fixed-menu a[href="/${route}/"]`,
          )
          .first()
          .click();
        await page.waitForURL(origin + `/${route}/`);
        await settled(page);
        samples.push(Date.now() - started);
      }
      timing[label] = {
        darkFrames: dark.length,
        darkDurationMs:
          dark.length > 1 ? Math.round(dark.at(-1)!.time - dark[0].time) : 0,
        documentRequestsForFiveTransitions: documents - baselineDocuments,
        transitionMs: samples,
        medianTransitionMs: [...samples].sort((a, b) => a - b)[
          Math.floor(samples.length / 2)
        ],
        scriptElements: await page
          .locator('script[src="/javascripts/vendor/jquery.min.js"]')
          .count(),
      };
      await page.close();
    }
    report.performance = timing;
    console.log(JSON.stringify({ performance: timing }));
    await fs.writeFile(
      path.join(artifactDirectory, "report.json"),
      JSON.stringify(report, null, 2),
    );

    const visuals: Record<string, unknown>[] = [];
    if (baselineOrigin)
      for (const width of [1440, 390]) {
        for (const route of [
          "/",
          "/ja/",
          "/visionsketch/",
          "/projects/",
          "/publications/",
          "/design/",
          "/timeline/",
          "/activities/",
          "/resume/",
        ]) {
          const captures: PNG[] = [];
          for (const [label, origin] of [
            ["before", baselineOrigin],
            ["after", candidateOrigin],
          ] as const) {
            const page = await browser.newPage({
              viewport: { width, height: 900 },
            });
            await prepare(page, origin);
            await page.goto(origin + route);
            if (await page.locator("#pusher").count()) await settled(page);
            // Let the document-level font fallback settle consistently in both exports.
            await page.waitForFunction(
              () => !document.documentElement.classList.contains("wf-loading"),
            );
            const buffer = await page.screenshot({
              fullPage: true,
              animations: "disabled",
            });
            const filename = `${
              route.replaceAll("/", "_") || "home"
            }-${width}-${label}.png`;
            await fs.writeFile(path.join(artifactDirectory, filename), buffer);
            captures.push(PNG.sync.read(buffer));
            await page.close();
          }
          const [a, b] = captures;
          const sameSize = a.width === b.width && a.height === b.height;
          const diff = sameSize
            ? new PNG({ width: a.width, height: a.height })
            : undefined;
          const changedPixels = diff
            ? pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
                threshold: 0.1,
              })
            : undefined;
          if (diff && changedPixels)
            await fs.writeFile(
              path.join(
                artifactDirectory,
                `${route.replaceAll("/", "_")}-${width}-diff.png`,
              ),
              PNG.sync.write(diff),
            );
          visuals.push({
            route,
            width,
            sameSize,
            beforeHeight: a.height,
            afterHeight: b.height,
            changedPixels,
          });
        }
      }
    report.visuals = visuals;
    await fs.writeFile(
      path.join(artifactDirectory, "report.json"),
      JSON.stringify(report, null, 2),
    );
    console.log(JSON.stringify(report, null, 2));
    if (
      errors.length ||
      visuals.some((v) => !v.sameSize || (v.changedPixels as number) > 0)
    )
      process.exitCode = 1;
  } finally {
    await browser.close();
    for (const server of servers) {
      server.close();
      server.closeAllConnections();
    }
  }
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
