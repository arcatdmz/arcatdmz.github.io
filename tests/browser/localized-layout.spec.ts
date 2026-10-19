import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test("shared DeployGround content survives a client-side language switch", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/deployground/");
  await page.waitForFunction(
    () => document.getElementById("__next")?.dataset.siteWidgets === "ready",
  );
  await expect(page.locator("#abstract h2")).toHaveText("Abstract");
  const defaultContent = await page.locator("#related-work").textContent();
  await page.evaluate(
    () => ((window as any).languageSwitchMarker = "same-document"),
  );
  await page
    .locator(
      '#fixed-menu a[href="/ja/deployground/"], #fixed-menu a[href="/ja/deployground"]',
    )
    .click();
  await expect(page.locator("#abstract h2")).toHaveText("概要");
  expect(await page.locator("#related-work").textContent()).toBe(
    defaultContent,
  );
  expect(await page.evaluate(() => (window as any).languageSwitchMarker)).toBe(
    "same-document",
  );
  expect(errors).toEqual([]);
});

test("Fungus Camera shares its media and responsive grid behavior in both locales", async ({
  page,
  isMobile,
}) => {
  for (const prefix of ["/", "/ja/"]) {
    await page.goto(`${prefix}homehack/fungus-camera/`);
    await expect(page.locator("#main")).toContainText(
      "なめこの生育を観察する定点カメラ",
    );
    await expect(page.locator('iframe[src*="6etDXqnFnSM"]')).toHaveCount(0);
    await expect(page.locator('iframe[src*="rFeTAwY_d_Y"]')).toHaveCount(1);
    const grid = page.locator("#main > .ui.grid").first();
    const columns = grid.locator(":scope > .column");
    await expect(columns).toHaveCount(3);
    const first = await columns.nth(0).boundingBox();
    const second = await columns.nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    if (isMobile) {
      expect(second!.y).toBeGreaterThan(first!.y);
      expect(second!.x).toBeCloseTo(first!.x, 0);
    } else {
      expect(second!.y).toBeCloseTo(first!.y, 0);
      expect(second!.x).toBeGreaterThan(first!.x);
    }
    // The library's singular "column" count must match the original plural
    // "columns" selector in the site's custom, purged Fomantic stylesheet.
    const widths = await grid.evaluate((element) => {
      const measure = () =>
        [...element.children].map(
          (child) => child.getBoundingClientRect().width,
        );
      const current = measure();
      element.classList.replace("column", "columns");
      const legacy = measure();
      element.classList.replace("columns", "column");
      return { current, legacy };
    });
    expect(widths.current).toEqual(widths.legacy);
  }
});
