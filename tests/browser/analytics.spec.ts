import { test, expect, type Page } from "@playwright/test";

function commands(page: Page) {
  return page.evaluate(() =>
    ((window as any).dataLayer || [])
      .filter((command: any) => command?.[0])
      .map((command: any) => Array.from(command)),
  );
}
async function views(page: Page) {
  return (await commands(page))
    .filter(([command, event]) => command === "event" && event === "page_view")
    .map(([, , data]) => data);
}

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test("views queue during tag loading and follow committed pages, titles, and referrers", async ({
  page,
  baseURL,
}) => {
  let release = () => {};
  const heldTag = new Promise<void>((resolve) => {
    release = resolve;
  });
  let tagRequests = 0;
  await page.route(
    "https://www.googletagmanager.com/gtag/js?*",
    async (route) => {
      tagRequests++;
      await heldTag;
      await route
        .fulfill({ contentType: "application/javascript", body: "" })
        .catch(() => {});
    },
  );
  try {
    await page.goto("/?source=analytics#contact", {
      waitUntil: "domcontentloaded",
    });
    await expect
      .poll(() => views(page))
      .toEqual([
        {
          page_location: `${baseURL}/?source=analytics`,
          page_title: "Portfolio of Jun Kato | junkato.jp",
          page_referrer: "",
          send_to: "G-W5KXWN8CJD",
        },
      ]);
    await page.evaluate(() => (window as any).next.router.push("/projects/"));
    await expect.poll(() => views(page)).toHaveLength(2);
    await page.evaluate(() => (window as any).next.router.push("/ja/tweeq/"));
    await expect.poll(() => views(page)).toHaveLength(3);
    await page.evaluate(() =>
      (window as any).next.router.push("/ja/tweeq/#implementation"),
    );
    expect(await views(page)).toHaveLength(3);
    await page.goBack();
    await expect(page).toHaveURL(`${baseURL}/ja/tweeq/`);
    expect(await views(page)).toHaveLength(3);
    await page.goBack();
    await expect.poll(() => views(page)).toHaveLength(4);
    expect((await views(page)).slice(1)).toEqual([
      {
        page_location: `${baseURL}/projects/`,
        page_title: "Projects | junkato.jp",
        page_referrer: `${baseURL}/?source=analytics`,
        send_to: "G-W5KXWN8CJD",
      },
      {
        page_location: `${baseURL}/ja/tweeq/`,
        page_title: "Tweeq | junkato.jp",
        page_referrer: `${baseURL}/projects/`,
        send_to: "G-W5KXWN8CJD",
      },
      {
        page_location: `${baseURL}/projects/`,
        page_title: "Projects | junkato.jp",
        page_referrer: `${baseURL}/ja/tweeq/`,
        send_to: "G-W5KXWN8CJD",
      },
    ]);
    expect(
      (await commands(page)).filter(([command]) => command === "config"),
    ).toEqual([["config", "G-W5KXWN8CJD", { send_page_view: false }]]);
    expect(tagRequests).toBe(1);
  } finally {
    release();
  }
});

test("cancelled navigation does not count and a blocked tag does not stop later views", async ({
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
    await page.goto("/");
    await expect.poll(() => views(page)).toHaveLength(1);
    await page.evaluate(() => {
      (window as any).next.router.events.on(
        "routeChangeStart",
        (url: string) => {
          if (url === "/activities/") (window as any).pendingNavigation = true;
        },
      );
      (window as any).next.router.events.on(
        "routeChangeError",
        (error: any) => {
          if (error.cancelled) (window as any).cancelledNavigation = true;
        },
      );
      void (window as any).next.router.push("/activities/").catch(() => {});
    });
    await page.waitForFunction(() => (window as any).pendingNavigation);
    await page.evaluate(() => (window as any).next.router.push("/#contact"));
    await page.waitForFunction(() => (window as any).cancelledNavigation);
    expect(await views(page)).toHaveLength(1);
    await page.evaluate(() => (window as any).next.router.push("/ja/"));
    await expect.poll(() => views(page)).toHaveLength(2);
    expect((await views(page))[1].page_title).toBe(
      "加藤 淳のポートフォリオ | junkato.jp",
    );
  } finally {
    release();
  }
});
