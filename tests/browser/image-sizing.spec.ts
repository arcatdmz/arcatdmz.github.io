import { test, expect } from "@playwright/test";

test("content images retain their aspect ratios at desktop, tablet and phone widths", async ({
  page,
  baseURL,
}) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
  for (const width of [1440, 1024, 800, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/creativity-support-environments/",
      "/ja/creativity-support-environments/",
    ]) {
      await page.goto(route);
      for (const section of ["abstract", "postgrowth"]) {
        const image = page.locator(`#${section} img`).first();
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((image: HTMLImageElement) => image.decode());
        const box = await image.evaluate((image: HTMLImageElement) => ({
          width: image.clientWidth,
          height: image.clientHeight,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          parentWidth: image.parentElement!.clientWidth,
        }));
        expect(box.naturalWidth).toBeGreaterThan(0);
        expect(box.width).toBeLessThanOrEqual(box.parentWidth);
        expect(
          Math.abs(
            box.height - (box.width * box.naturalHeight) / box.naturalWidth,
          ),
        ).toBeLessThan(2);
      }
    }
  }
});

test("avatar and Design thumbnail dimensions remain controlled by their specific CSS", async ({
  page,
  baseURL,
}) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
  await page.goto("/");
  const avatar = await page
    .locator("#avatar")
    .evaluate((el) => el.getBoundingClientRect().toJSON());
  expect(avatar.width).toBeCloseTo(avatar.height, 0);
  await page.goto("/design/");
  const thumbnails = page.locator("#portfolio .ui.images > .ui.image > img");
  expect(await thumbnails.count()).toBeGreaterThan(0);
  for (const image of await thumbnails.all()) {
    await image.scrollIntoViewIfNeeded();
    expect(
      await image.evaluate((el) => el.getBoundingClientRect().height),
    ).toBe(70);
  }
});
