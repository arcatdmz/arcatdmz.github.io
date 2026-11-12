import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test("representative citations and project ownership remain distinct in both languages", async ({
  page,
}) => {
  for (const prefix of ["/", "/ja/"]) {
    await page.goto(`${prefix}griffith/`);
    const featured = page.locator("#publications .major-publication");
    await expect(featured).toHaveCount(2);
    await expect(featured.nth(0)).toContainText("Griffith:");
    await expect(featured.nth(1)).toContainText("ProConte:");
    await page.goto(`${prefix}textalive/`);
    await expect(page.locator("#publications .major-publication")).toHaveCount(
      1,
    );
    await expect(
      page.locator("#publications .major-publication"),
    ).toContainText("TextAlive:");
    await expect(
      page.locator('#publications [id="chi2023-kato-lyric-app-framework"]'),
    ).toHaveCount(0);
    await expect(
      page.locator(".project-meta-list .project-publication-labels"),
    ).toContainText("CHI '23");
    const related = page
      .locator(".project-meta-list .project-publication-labels a")
      .filter({ hasText: "CHI '23" });
    await expect(related).toHaveAttribute(
      "href",
      new RegExp(`${prefix}lyric-app-framework/?$`),
    );
    const own = page
      .locator(".project-meta-list .project-publication-labels .label")
      .filter({ hasText: "CHI '15" });
    expect(await own.evaluate((el) => el.tagName)).toBe("SPAN");
    await related.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}lyric-app-framework/?$`));
    await expect(page.locator("#publications .major-publication")).toHaveCount(
      1,
    );
  }
});

test("award summary opens with keyboard or touch and links to stable award anchors", async ({
  page,
  isMobile,
}) => {
  for (const prefix of ["/", "/ja/"]) {
    await page.goto(`${prefix}lyric-app-framework/`);
    const trigger = page.locator(".project-awards-summary");
    await expect(trigger).toHaveCount(1);
    await expect(trigger).toContainText(
      prefix === "/" ? "10 awards in total" : "10件受賞（国際1件, 国内9件）",
    );
    if (isMobile) await trigger.tap();
    else await trigger.focus();
    const popup = page.locator(".project-awards-popup");
    await expect(popup).toBeVisible();
    await expect(popup).toHaveClass(/bottom center/);
    const geometry = await popup.evaluate((el) => {
      const style = getComputedStyle(el);
      const arrow = getComputedStyle(el, "::before");
      return {
        originY: style.transformOrigin.split(" ")[1],
        overflow: style.overflowY,
        arrow: arrow.content,
        arrowTop: parseFloat(arrow.top),
      };
    });
    expect(geometry.originY).toBe("0px");
    expect(geometry.overflow).toBe("visible");
    expect(geometry.arrow).not.toBe("none");
    expect(geometry.arrowTop).toBeLessThan(0);

    await expect(popup.locator("a")).toHaveCount(10);
    await page.keyboard.press("Escape");
    await expect(popup).toBeHidden();
    await trigger.click();
    await expect(popup).toBeVisible();
    const link = popup.locator("a").first();
    const href = await link.getAttribute("href");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}publications/?#award-`));
    await expect(page.locator(`#${href!.split("#")[1]}`)).toBeInViewport();
    const ids = await page
      .locator('[id^="award-"]')
      .evaluateAll((nodes) => nodes.map((node) => node.id));
    expect(ids).not.toContain("award-undefined");
    expect(new Set(ids).size).toBe(ids.length);
  }
});

test("project tags in cards and headings open downward with a speech-bubble pointer", async ({
  page,
}) => {
  for (const route of ["/projects/", "/textalive/"]) {
    await page.goto(route);
    const trigger = page
      .locator(
        route === "/projects/"
          ? "#projects-textalive a.project.tag"
          : ".project-meta-list a.project.tag",
      )
      .first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const popup = page.locator(".ui.popup.project.tag");
    await expect(popup).toBeVisible();
    await expect(popup).toHaveClass(/bottom center/);
    const geometry = await popup.evaluate((el) => ({
      originY: getComputedStyle(el).transformOrigin.split(" ")[1],
      arrow: getComputedStyle(el, "::before").content,
    }));
    expect(geometry.originY).toBe("0px");
    expect(geometry.arrow).not.toBe("none");
    await page.keyboard.press("Escape");
  }
});

test("TextAlive awards exclude publications owned by Lyric App Framework", async ({
  page,
}) => {
  for (const prefix of ["/", "/ja/"]) {
    await page.goto(`${prefix}textalive/`);
    const header = page.locator(".project-meta-list");
    await expect(header.locator('a[href*="#award-"]')).toHaveCount(3);
    await expect(header.locator(".project-awards-summary")).toHaveCount(0);
    await expect(header.locator('a[href*="#award-chi2023"]')).toHaveCount(0);
    await expect(header.locator(".project-publication-labels")).toContainText(
      "CHI '23",
    );
  }
});
