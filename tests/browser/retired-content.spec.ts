import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test.describe("retired TextAlive samples", () => {
  test.use({ javaScriptEnabled: false });

  test("all old page URLs lead to developer documentation without JavaScript", async ({
    page,
  }) => {
    await page.route("https://developer.textalive.jp/", (route) =>
      route.fulfill({
        contentType: "text/html",
        body: "<title>TextAlive developer documentation</title>",
      }),
    );
    for (const pathname of [
      "/textalive/embed/",
      "/textalive/embed/index.html",
      "/textalive/embed/api/",
      "/textalive/embed/api/index.html",
      ...Array.from(
        { length: 6 },
        (_, index) => `/textalive/embed/api/embed-${index + 1}.html`,
      ),
    ]) {
      await page.goto(pathname);
      await expect(page).toHaveURL("https://developer.textalive.jp/");
      await expect(page).toHaveTitle("TextAlive developer documentation");
    }
  });
});

test("retired Fun documents and old API assets are no longer published", async ({
  request,
}) => {
  for (const pathname of [
    "/fun/",
    "/ja/fun/",
    "/textalive/embed/api/prism.js",
    "/textalive/embed/api/prism.css",
    "/user-generated-variables.old/js/main.js",
  ]) {
    expect((await request.get(pathname)).status(), pathname).toBe(404);
  }
});

test("book references retain product links without advertising image requests", async ({
  page,
}) => {
  const advertisingRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).hostname.endsWith("amazon-adsystem.com"))
      advertisingRequests.push(request.url());
  });
  await page.goto("/ja/user-interface-design/");
  for (const asin of ["4621304674", "013438038X", "B0029ZBK80", "4861008212"]) {
    await expect(
      page.locator(`a[href="https://www.amazon.co.jp/dp/${asin}"]`),
    ).toBeVisible();
  }
  await expect(page.locator('img[src*="amazon-adsystem.com"]')).toHaveCount(0);
  expect(advertisingRequests).toEqual([]);
});
