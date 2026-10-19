import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

async function ready(page: Page) {
  await page.goto("/");
  await expect
    .poll(() => page.evaluate(() => !!(window as any).dataLayer))
    .toBe(true);
}

async function pauseTime(page: Page) {
  const now = new Date("2026-10-20T00:00:00Z");
  await page.clock.install({ time: now });
  await page.clock.pauseAt(now);
  await page.evaluate(() => {
    (window as any).progressBarsCreated = 0;
    new MutationObserver((mutations) => {
      for (const mutation of mutations)
        for (const node of mutation.addedNodes)
          if (node instanceof Element && node.id === "nprogress")
            (window as any).progressBarsCreated++;
    }).observe(document.body, { childList: true });
  });
}

// Emit router events to exercise timing and otherwise nondeterministic overlap
// independently of network/cache speed. The last test uses real navigation.
async function emit(
  page: Page,
  event:
    | "routeChangeStart"
    | "routeChangeComplete"
    | "routeChangeError"
    | "hashChangeStart"
    | "hashChangeComplete",
  url: string,
  shallow = false,
) {
  await page.evaluate(
    ({ event, url, shallow }) => {
      const events = (window as any).next.router.events;
      if (event === "routeChangeError")
        events.emit(event, new Error("Navigation failed"), url, { shallow });
      else events.emit(event, url, { shallow });
    },
    { event, url, shallow },
  );
}

test("fast, shallow, and fragment transitions never flash a bar", async ({
  page,
}) => {
  await ready(page);
  await pauseTime(page);
  await emit(page, "routeChangeStart", "/fast/");
  await page.clock.runFor(199);
  await expect(page.locator("#nprogress")).toHaveCount(0);
  await emit(page, "routeChangeComplete", "/fast/");
  await page.clock.runFor(1000);
  await emit(page, "routeChangeStart", "/?filter=new", true);
  await page.clock.runFor(1000);
  await emit(page, "routeChangeComplete", "/?filter=new", true);
  await emit(page, "hashChangeStart", "/#contact");
  await page.clock.runFor(1000);
  await emit(page, "hashChangeComplete", "/#contact");
  await emit(page, "routeChangeStart", "/cancelled/");
  await emit(page, "routeChangeError", "/cancelled/");
  await page.clock.runFor(1000);
  expect(await page.evaluate(() => (window as any).progressBarsCreated)).toBe(
    0,
  );
});

test("a displayed bar lasts at least 200ms and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  await pauseTime(page);
  await emit(page, "routeChangeStart", "/slow/");
  await page.clock.runFor(199);
  await expect(page.locator("#nprogress")).toHaveCount(0);
  await page.clock.runFor(2);
  const progress = page.getByRole("progressbar", { name: "Loading page" });
  await expect(progress).toBeAttached();
  await expect(progress.locator(".bar")).toHaveCSS("transition-duration", "0s");
  const transform = await progress
    .locator(".bar")
    .evaluate((bar) => bar.getAttribute("style"));
  // No trickling even when the destination remains pending for several seconds.
  await page.clock.runFor(2500);
  expect(await progress.locator(".bar").getAttribute("style")).toBe(transform);
  await emit(page, "routeChangeComplete", "/slow/");
  await page.clock.runFor(10);
  await expect(progress).toHaveCount(0);

  await emit(page, "routeChangeStart", "/brief/");
  await page.clock.runFor(201);
  await emit(page, "routeChangeComplete", "/brief/");
  await page.clock.runFor(198);
  await expect(progress).toBeAttached();
  await page.clock.runFor(10);
  await expect(progress).toHaveCount(0);
});

test("overlapping navigation and completion fades cannot strand or remove the current bar", async ({
  page,
}) => {
  await ready(page);
  await pauseTime(page);
  await emit(page, "routeChangeStart", "/first/");
  await page.clock.runFor(250);
  await expect(page.locator("#nprogress .bar")).toBeVisible();
  await emit(page, "routeChangeStart", "/second/");
  await emit(page, "routeChangeError", "/first/");
  await emit(page, "routeChangeComplete", "/first/");
  await page.clock.runFor(1000);
  await expect(page.locator("#nprogress .bar")).toBeVisible();
  expect(await page.evaluate(() => (window as any).progressBarsCreated)).toBe(
    1,
  );
  await emit(page, "routeChangeComplete", "/second/");
  await page.clock.runFor(100);
  await emit(page, "routeChangeStart", "/third/");
  await page.clock.runFor(1000);
  await expect(page.locator("#nprogress .bar")).toBeVisible();
  expect(await page.evaluate(() => (window as any).progressBarsCreated)).toBe(
    2,
  );
  await page.clock.runFor(1000);
  await expect(page.locator("#nprogress")).toHaveCount(1);
  await emit(page, "routeChangeError", "/third/");
  await page.clock.runFor(1500);
  await expect(page.locator("#nprogress")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveClass(/nprogress-busy/);
});

test("a real slow navigation shows a nonblocking bar and completes normally", async ({
  page,
}) => {
  let release = () => {};
  const heldChunk = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(
    "**/_next/static/chunks/pages/activities-*",
    async (route) => {
      await heldChunk;
      await route.continue().catch(() => {});
    },
  );
  try {
    await ready(page);
    await page.evaluate(() => {
      void (window as any).next.router.push("/activities/");
    });
    const progress = page.getByRole("progressbar", { name: "Loading page" });
    await expect(progress.locator(".bar")).toBeVisible();
    await expect(progress).toHaveCSS("pointer-events", "none");
    await expect(progress.locator(".spinner")).toHaveCount(0);
    await expect(page).toHaveURL("/");
    release();
    await expect(page).toHaveURL("/activities/");
    await expect(page).toHaveTitle("Professional Activities | junkato.jp");
    await expect(progress).toHaveCount(0);
    await expect(page.locator("html")).not.toHaveClass(/nprogress-busy/);
  } finally {
    release();
  }
});
