import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import slides from "../../site/slides.json";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test("slide archive opens and downloads all five reviewed PDFs", async ({
  page,
  request,
}) => {
  await page.goto("/ja/slides/");
  await page.screenshot({
    path: `site-qa/slides-${test.info().project.name}.png`,
    fullPage: true,
  });
  await expect(
    page.getByRole("heading", { name: "発表スライド", exact: true }),
  ).toBeVisible();
  await expect(page.locator("article")).toHaveCount(5);
  for (const slide of slides) {
    const response = await request.get(`/slides/${slide.id}.pdf`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect(
      createHash("sha256")
        .update(await response.body())
        .digest("hex"),
    ).toBe(slide.sha256);
    const downloadEvent = page.waitForEvent("download");
    await page
      .locator(`#${slide.id}`)
      .getByRole("link", { name: "ダウンロード", exact: true })
      .click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe(`${slide.id}.pdf`);
    expect(
      createHash("sha256")
        .update(await readFile((await download.path())!))
        .digest("hex"),
    ).toBe(slide.sha256);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/slides/");
  await expect(
    page.getByRole("heading", { name: "Presentation slides", exact: true }),
  ).toBeVisible();
  await page.goto("/ja/homehack/");
  await expect(
    page.locator('a[href="/slides/home-hack.pdf"]').first(),
  ).toBeVisible();
  await expect(page.locator('iframe[src*="slideshare"]')).toHaveCount(0);
  await page.waitForFunction(
    () => document.getElementById("__next")?.dataset.siteWidgets === "ready",
  );
  if (test.info().project.name === "mobile") {
    await page.locator(".sidebar-button").click();
    await page.locator('.ui.sidebar a[href="/ja/slides/"]').click();
  } else {
    await page.locator('#fixed-menu a[href="/ja/slides/"]').click();
  }
  await expect(page).toHaveURL(/\/ja\/slides\/$/);
  await expect(
    page.getByRole("heading", { name: "発表スライド", exact: true }),
  ).toBeVisible();
});
