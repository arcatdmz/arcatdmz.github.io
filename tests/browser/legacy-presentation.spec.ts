import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

async function presentationReady(page: import("@playwright/test").Page) {
  await page.waitForFunction(() => (window as any).Reveal?.isReady());
}

test("UGV is served locally and the original slides, deep links and code details work", async ({
  page,
}) => {
  const errors: string[] = [];
  const failedLocalAssets: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      /\/user-generated-variables(?:\.old)?\//.test(response.url())
    )
      failedLocalAssets.push(response.url());
  });
  expect((await page.goto("/user-generated-variables/"))?.status()).toBe(200);
  await presentationReady(page);
  await expect(page.locator('header a[href$=".pdf"]')).toBeInViewport();
  await expect(page.locator(".slides section.present > h1").first()).toHaveText(
    "User-Generated Variables",
  );
  expect(await page.locator('link[href="/stylesheets/main.css"]').count()).toBe(
    0,
  );
  expect(
    await page
      .locator('iframe[data-src^="http:"],.live-demo[data-src^="http:"]')
      .count(),
  ).toBe(0);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#ugc")).toHaveClass(/present/);
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#ugc .fragment")).toHaveClass(/visible/);
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#twitter")).toHaveClass(/present/);
  await page.goto("/user-generated-variables/#/interaction-design");
  await presentationReady(page);
  await expect(page.locator("#interaction-design")).toHaveClass(/present/);
  await page.goto("/user-generated-variables/#/4/3");
  await presentationReady(page);
  const hotspot = page
    .locator(".slides section.present .clickable.line")
    .first();
  await expect(hotspot).toBeVisible();
  const token = hotspot.locator("span").last();
  await token.click();
  await expect(page.locator("#impl-2-last-field-code")).toBeVisible();
  await page.locator("#impl-2-last-field-code").click();
  await expect(page.locator("#impl-2-last-field-code")).toBeHidden();
  expect(errors).toEqual([]);
  expect(failedLocalAssets).toEqual([]);
});

test("all UGV entry points end at the local presentation", async ({
  page,
  baseURL,
}) => {
  for (const entry of [
    "/ugv/",
    "/ja/user-generated-variables/",
    "/user-generated-variables.old/",
  ]) {
    await page.goto(entry);
    await expect(page).toHaveURL(/\/user-generated-variables\/(?:#\/)?$/);
    await presentationReady(page);
    await expect(page.locator(".reveal")).toBeVisible();
  }
  await page.goto("/user-generated-variables.old/#/interaction-design");
  await expect(page).toHaveURL(
    `${baseURL}/user-generated-variables/#/interaction-design`,
  );
  await presentationReady(page);
  await expect(page.locator("#interaction-design")).toHaveClass(/present/);
});

test("project lists link to the local UGV presentation using document navigation", async ({
  page,
}) => {
  for (const route of ["/projects/", "/ja/projects/"]) {
    await page.goto(route);
    const link = page
      .locator(
        'a[href="/user-generated-variables"],a[href="/user-generated-variables/"]',
      )
      .filter({ hasText: "User-Generated Variables" })
      .first();
    await expect(link).toBeVisible();
    await page.evaluate(() => ((window as any).__UGVDocumentMarker = true));
    await link.click();
    await expect(page).toHaveURL(/\/user-generated-variables\/(?:#\/)?$/);
    await presentationReady(page);
    expect(
      await page.evaluate(() => (window as any).__UGVDocumentMarker),
    ).toBeUndefined();
  }
});
