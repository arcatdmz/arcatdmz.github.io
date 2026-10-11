import { test, expect, type Page } from "@playwright/test";

async function waitForWidgets(page: Page) {
  await page.waitForFunction(
    () => !!(window as any).$?.(".ui.sidebar").data("module-sidebar"),
  );
}
async function menuLink(page: Page, href: string, mobile: boolean) {
  await waitForWidgets(page);
  href = href.endsWith("/") ? href : `${href}/`;
  if (
    mobile ||
    !(await page.locator(`#fixed-menu a[href="${href}"]`).first().isVisible())
  ) {
    await page.locator(".sidebar-button").click();
    await expect(page.locator(".ui.sidebar")).toHaveClass(/visible/);
    await page.locator(`.ui.sidebar a[href="${href}"]`).first().click();
  } else await page.locator(`#fixed-menu a[href="${href}"]`).first().click();
}

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) => {
    if (new URL(route.request().url()).origin !== baseURL) return route.abort();
    return route.continue();
  });
});

test("slow widget downloads never expose the dark canvas", async ({ page }) => {
  await page.route("**/javascripts/vendor/jquery.min.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await page.addInitScript(() => {
    (window as any).backgroundFrames = [];
    const sample = () => {
      if (document.body) {
        const body = getComputedStyle(document.body).backgroundColor;
        (window as any).backgroundFrames.push(body);
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/visionsketch/");
  await expect(page).toHaveTitle("VisionSketch | junkato.jp");
  await waitForWidgets(page);
  const frames = await page.evaluate(
    () => (window as any).backgroundFrames as string[],
  );
  expect(frames.length).toBeGreaterThan(10);
  expect(frames.every((color) => color === "rgb(255, 255, 255)")).toBeTruthy();
  await expect(page.locator("body")).not.toHaveClass(/pushable/);
});

test("internal navigation keeps the document and initializes every destination", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/visionsketch/");
  await page.evaluate(() => {
    (window as any).documentSentinel = "same document";
  });
  for (const href of [
    "/publications",
    "/design",
    "/activities",
    "/timeline",
    "/ja/timeline/",
    "/ja/projects",
    "/ja/",
    "/",
  ]) {
    await menuLink(page, href, isMobile);
    await expect(page).toHaveURL(new RegExp(`${href.replace(/\/$/, "")}/$`));
    await waitForWidgets(page);
    expect(await page.evaluate(() => (window as any).documentSentinel)).toBe(
      "same document",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      href.startsWith("/ja") ? "ja" : "en",
    );
    if (/\/(projects|publications|timeline)/.test(href))
      await expect(page.locator("body")).toHaveClass(/with-rail/);
    else await expect(page.locator("body")).not.toHaveClass(/with-rail/);
  }
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(
    await page
      .locator('script[src="/javascripts/vendor/jquery.min.js"]')
      .count(),
  ).toBe(1);
  expect(
    await page.locator('script[src="/javascripts/views/runtime.js"]').count(),
  ).toBe(1);
  expect(
    await page
      .locator('script[src="https://use.typekit.net/tor0txx.js"]')
      .count(),
  ).toBeLessThanOrEqual(1);
  await expect(
    page.locator("head style").filter({ hasText: ".ui.visible.right.sidebar" }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("menus and modals work again after leaving and returning", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await waitForWidgets(page);
  await page.locator("#avatar").click();
  await expect(page.locator(".ui.modal")).toHaveClass(/active/);
  await page.keyboard.press("Escape");
  await expect(page.locator(".ui.modal")).not.toBeVisible();
  await menuLink(page, "/design", isMobile);
  await waitForWidgets(page);
  await page.locator("a.ui.for-modal.image").first().click();
  await expect(page.locator(".ui.modal")).toHaveClass(/active/);
  // Navigate while the modal is attached to Fomantic's body-level dimmer.
  await page.evaluate(() => (window as any).next.router.push("/"));
  await waitForWidgets(page);
  await page.locator("#avatar").click();
  await expect(page.locator(".ui.modal")).toHaveClass(/active/);
  await page.keyboard.press("Escape");
  await expect(page.locator(".ui.modal")).not.toBeVisible();
  await page.locator(".sidebar-button").click();
  await expect(page.locator(".ui.sidebar")).toHaveClass(/visible/);
});

test("year routes and contact anchors navigate without reloading", async ({
  page,
}) => {
  await page.goto("/timeline/");
  await waitForWidgets(page);
  await page.evaluate(() => {
    (window as any).documentSentinel = true;
  });
  await page.locator('a[href="/timeline/2025/"]').first().click();
  await expect(page).toHaveURL(/\/timeline\/2025\/$/);
  await waitForWidgets(page);
  if (!(await page.locator('a[href="/timeline/2024/"]:visible').count())) {
    await page.locator("a.popup-menu.button:visible").click();
  }
  await page.locator('a[href="/timeline/2024/"]:visible').first().click();
  await expect(page).toHaveURL(/\/timeline\/2024\/$/);
  await waitForWidgets(page);
  await page.locator(".sidebar-button").click();
  await expect(page.locator(".ui.sidebar")).toHaveClass(/visible/);
  await page.locator('.ui.sidebar a[href="/#contact"]').click();
  await expect(page).toHaveURL(/\/#contact$/);
  await waitForWidgets(page);
  await expect(page.locator("#contact")).toBeInViewport();
  expect(await page.evaluate(() => (window as any).documentSentinel)).toBe(
    true,
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/timeline\/2024\/$/);
  await waitForWidgets(page);
});

test("tag popups and citation menus initialize again after navigation", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/visionsketch/");
  await waitForWidgets(page);
  await page.evaluate(() => {
    (window as any).documentSentinel = true;
  });
  await page.locator("a.project.tag").first().click();
  await expect(page.locator(".ui.popup.project.tag")).toBeVisible();
  await page
    .locator(".ui.popup.project.tag a[href*='projects/#']")
    .first()
    .click();
  await expect(page).toHaveURL(/\/projects\/#projects-/);
  await waitForWidgets(page);
  expect(await page.evaluate(() => (window as any).documentSentinel)).toBe(
    true,
  );
  await menuLink(page, "/publications", isMobile);
  await waitForWidgets(page);
  await page.locator(".publication .with-popup-menu.button").first().click();
  await expect(page.locator(".publication .ui.popup").first()).toBeVisible();
  await page.locator(".publication .ui.popup .bibtex").first().click();
  await expect(
    page.getByText("Copied the BibTeX entry to your clipboard!", {
      exact: true,
    }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("links in trusted HTML data use client navigation", async ({ page }) => {
  await page.goto("/design/");
  await waitForWidgets(page);
  await page.evaluate(() => {
    (window as any).documentSentinel = true;
  });
  await page.locator('#body p a[href="/lyric-app-framework/"]').first().click();
  await expect(page).toHaveURL(/\/lyric-app-framework\/$/);
  await waitForWidgets(page);
  expect(await page.evaluate(() => (window as any).documentSentinel)).toBe(
    true,
  );
  await expect(page).toHaveTitle(/Lyric App Framework.*junkato\.jp/);
});
