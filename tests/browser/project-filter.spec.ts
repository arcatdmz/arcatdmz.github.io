import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test("static research filtering restores URL state, history and reset without changing design projects", async ({
  page,
  isMobile,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const prefix of ["/", "/ja/"]) {
    await page.goto(`${prefix}projects/`);
    const research = page.locator("#other-projects-list > .item");
    const total = await research.count();
    const designBefore = await page
      .locator("#design-and-engineering-projects-list > .item")
      .evaluateAll((items) => items.map((el) => el.id));
    await page.evaluate(() => {
      (window as any).filterMarker = "retained";
    });
    async function select(tag: string) {
      if (isMobile) {
        await page.locator("#post-footer .popup-menu.button").click();
        await page
          .locator(
            '.popup-menu.popup.visible [data-project-filter="' + tag + '"]',
          )
          .click();
      } else
        await page
          .locator('.left-rail [data-project-filter="' + tag + '"]')
          .click();
    }
    await select("music");
    await expect(page).toHaveURL(/\?tag=music/);
    await expect.poll(() => research.count()).toBeLessThan(total);
    const filtered = await research.count();
    await expect(page.locator(".project-filter-count")).toHaveCount(0);
    const active = page.locator(
      isMobile
        ? '.popup-menu.popup [data-project-filter="music"]'
        : '.left-rail [data-project-filter="music"]',
    );
    const style = await active.evaluate((el) => ({
      weight: getComputedStyle(el).fontWeight,
      border: getComputedStyle(el).borderLeftWidth,
    }));
    expect(Number(style.weight)).toBeGreaterThanOrEqual(700);
    expect(style.border).toBe("0px");
    const decoration = await active.locator(".content").evaluate((el) => ({
      color: getComputedStyle(el).color,
      underline: getComputedStyle(el).textDecorationColor,
    }));
    expect(decoration.underline).toBe(decoration.color);
    const abbreviation = page
      .locator(".left-rail .project-tag-filters abbr")
      .first();
    const abbreviationStyle = await abbreviation.evaluate((el) => ({
      decoration: getComputedStyle(el).textDecorationLine,
      border: getComputedStyle(el).borderBottomWidth,
    }));
    expect(abbreviationStyle.decoration).toBe("none");
    expect(abbreviationStyle.border).toBe("0px");

    expect(filtered).toBeGreaterThan(0);
    expect(await page.evaluate(() => (window as any).filterMarker)).toBe(
      "retained",
    );
    await expect(
      page.locator("#other-projects-list #projects-textalive"),
    ).toHaveCount(1);
    await expect(
      page.locator("#other-projects-list #projects-griffith"),
    ).toHaveCount(0);
    expect(
      await page
        .locator("#design-and-engineering-projects-list > .item")
        .evaluateAll((items) => items.map((el) => el.id)),
    ).toEqual(designBefore);
    await page.reload();
    await expect(research).toHaveCount(filtered);
    const notice = page.locator("#research .ui.message");
    await expect(notice).toBeVisible();
    await expect(notice).not.toHaveClass(/\binfo\b/);
    await expect(notice).toHaveText(
      prefix === "/"
        ? `Human-Music Interaction： ${filtered} of ${total} projects`
        : `Human-Music Interaction： ${filtered}件 / 全${total}件`,
    );
    await notice.locator(".close.icon").click();
    await expect(page).not.toHaveURL(/[?&]tag=/);
    await expect(research).toHaveCount(total);
    await expect(notice).toHaveCount(0);
    await select("music");
    await expect(research).toHaveCount(filtered);

    await select("anime");
    await expect(page).toHaveURL(/\?tag=anime/);
    await expect(
      page.locator("#other-projects-list #projects-griffith"),
    ).toHaveCount(1);
    await page.goBack();
    await expect(page).toHaveURL(/\?tag=music/);
    await expect(research).toHaveCount(filtered);
    await page.goForward();
    await expect(page).toHaveURL(/\?tag=anime/);
    await select("");
    await expect(page).not.toHaveURL(/[?&]tag=/);
    await expect(research).toHaveCount(total);
    await page.goto(`${prefix}projects/?tag=unknown`);
    await expect(research).toHaveCount(total);
  }
  expect(errors).toEqual([]);
});

test("language switching preserves the selected tag", async ({ page }) => {
  await page.goto("/projects/?tag=music");
  await expect(
    page.locator("#other-projects-list #projects-griffith"),
  ).toHaveCount(0);
  await page.locator('#fixed-menu a[href^="/ja/projects"]').first().click();
  await expect(page).toHaveURL(/\/ja\/projects\/?\?tag=music/);
  await expect(
    page.locator("#other-projects-list #projects-griffith"),
  ).toHaveCount(0);
  await expect(
    page.locator("#other-projects-list #projects-textalive"),
  ).toHaveCount(1);
});

test("static HTML retains the complete research list without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
  try {
    const page = await context.newPage();
    const response = await page.goto(`${baseURL}/ja/projects/?tag=music`);
    await expect(
      page.locator("#other-projects-list #projects-textalive"),
    ).toHaveCount(1);
    await expect(
      page.locator("#other-projects-list #projects-griffith"),
    ).toHaveCount(1);
    expect(await response!.text()).toContain(
      "タグで絞り込むにはJavaScriptを有効にしてください。",
    );
  } finally {
    await context.close();
  }
});

test("matching research topics reuse the homepage overview and appear only once", async ({
  page,
}) => {
  for (const prefix of ["/", "/ja/"]) {
    for (const tag of [
      "live-programming",
      "programming-with-examples",
      "programming-as-communication",
    ]) {
      await page.goto(`${prefix}projects/?tag=${tag}`);
      const overview = page.locator(`[data-featured-tag-project="${tag}"]`);
      await expect(overview).toBeVisible();
      await expect(
        overview.locator("xpath=following-sibling::*[1]"),
      ).toHaveClass(/ui divider/);
      await expect(overview.locator(`#topics-${tag}`)).toHaveCount(1);
      await expect(
        overview.locator(".ui.grid > .five.wide.column img"),
      ).toBeVisible();
      await expect(overview.locator(".description")).not.toBeEmpty();
      await expect(
        overview.locator(".project-publication-labels, .extra"),
      ).toHaveCount(0);
      await expect(
        page.locator(`#other-projects-list #projects-${tag}`),
      ).toHaveCount(0);
      const featuredHeading = await overview
        .locator(".ui.header")
        .textContent();
      await page.goto(prefix);
      const home = page.locator(`#topics-${tag}`);
      await expect(home.locator(".ui.header")).toHaveText(featuredHeading!);
    }
  }
});

test("query loads do not paint All while hydration scripts are delayed", async ({
  page,
}) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\/_next\/static\/.*\.js(?:\?|$)/, async (route) => {
    await gate;
    await route.continue();
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  try {
    await page.goto("/ja/projects/?tag=music", { waitUntil: "commit" });
    await expect(page.locator("html")).toHaveAttribute(
      "data-project-filter-pending",
      "",
    );
    await expect(
      page.locator("#research .project-filter-pending"),
    ).toBeVisible();
    await expect(
      page.locator("#research .project-filter-results"),
    ).toBeHidden();
    const all = page.locator('.left-rail [data-project-filter=""]');
    expect(
      Number(await all.evaluate((el) => getComputedStyle(el).fontWeight)),
    ).toBeLessThan(700);
  } finally {
    release();
  }
  await expect(
    page.locator('.left-rail [data-project-filter="music"]'),
  ).toHaveAttribute("aria-current", "true");
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-project-filter-pending",
    "",
  );
  await expect(
    page.locator("#other-projects-list #projects-griffith"),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("changing filter does not remount the research list", async ({
  page,
  isMobile,
}) => {
  await page.goto("/projects/?tag=music");
  await expect(
    page.locator("#other-projects-list #projects-griffith"),
  ).toHaveCount(0);
  await page.evaluate(() => {
    (window as any).originalResearchList = document.getElementById(
      "other-projects-list",
    );
  });
  if (isMobile) {
    await page.locator("#post-footer .popup-menu.button").click();
    await page
      .locator('.popup-menu.popup.visible [data-project-filter="anime"]')
      .click();
  } else await page.locator('.left-rail [data-project-filter="anime"]').click();
  await expect(
    page.locator("#other-projects-list #projects-griffith"),
  ).toHaveCount(1);
  expect(
    await page.evaluate(
      () =>
        (window as any).originalResearchList ===
        document.getElementById("other-projects-list"),
    ),
  ).toBe(true);
});
