import { test, expect, type Page } from "@playwright/test";

async function waitForWidgets(page: Page) {
  await page.waitForFunction(
    () => document.getElementById("__next")?.dataset.siteWidgets === "ready",
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

test("slow page downloads never expose the dark canvas", async ({ page }) => {
  await page.route(
    "**/_next/static/chunks/pages/visionsketch-*",
    async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await route.continue();
    },
  );
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
  ).toBe(0);
  expect(
    await page.locator('script[src="/javascripts/views/runtime.js"]').count(),
  ).toBe(0);
  expect(await page.evaluate(() => typeof (window as any).jQuery)).toBe(
    "undefined",
  );
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
  // Navigate while the React modal portal is open.
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

for (const destination of ["/", "/#contact"]) {
  test(`cancelled navigation back to ${destination} keeps current-page widgets`, async ({
    page,
  }) => {
    let release: () => void = () => {};
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
      await waitForWidgets(page);
      await page.evaluate(() => {
        const site = window as any;
        site.documentSentinel = true;
        site.pendingNavigation = false;
        site.cancelledNavigation = false;
        site.next.router.events.on("routeChangeStart", (url: string) => {
          if (url === "/activities/") site.pendingNavigation = true;
        });
        site.next.router.events.on(
          "routeChangeError",
          (error: any, url: string) => {
            if (error.cancelled && url === "/activities/")
              site.cancelledNavigation = true;
          },
        );
        // Hold the destination before commit, independently of menu animations.
        void site.next.router.push("/activities/");
      });
      await page.waitForFunction(() => (window as any).pendingNavigation);
      if (destination === "/") {
        await page.locator('#fixed-menu a[href="/"]').click();
      } else {
        await page.locator('footer a[href="/#contact"]').click();
      }
      await page.waitForFunction(() => (window as any).cancelledNavigation);
      await expect(page).toHaveURL(destination === "/" ? /\/$/ : /\/#contact$/);
      await waitForWidgets(page);
      expect(await page.evaluate(() => (window as any).documentSentinel)).toBe(
        true,
      );
      await page.locator("#avatar").click();
      await expect(page.locator(".ui.modal")).toHaveClass(/active/);
      await page.keyboard.press("Escape");
      await expect(page.locator(".ui.modal")).not.toBeVisible();
      await page.locator(".sidebar-button").click();
      await expect(page.locator(".ui.sidebar")).toHaveClass(/visible/);
    } finally {
      release();
    }
  });
}

test("slow Design CSS loads before the first page and is reused by client navigation", async ({
  page,
  isMobile,
}) => {
  let stylesheetRequests = 0;
  await page.route("**/stylesheets/design.css", async (route) => {
    stylesheetRequests++;
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await page.goto("/");
  await waitForWidgets(page);
  expect(stylesheetRequests).toBe(1);
  expect(
    await page
      .locator('link[href="/stylesheets/design.css"]')
      .evaluate((link: HTMLLinkElement) => !!link.sheet),
  ).toBe(true);
  await page.evaluate(() => {
    (window as any).documentSentinel = true;
    (window as any).unstyledDesignFrames = 0;
    const sample = () => {
      const hero = document.querySelector("body.design #body > .hero-unit");
      if (
        hero &&
        getComputedStyle(hero).backgroundColor !== "rgb(238, 238, 238)"
      ) {
        (window as any).unstyledDesignFrames++;
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await menuLink(page, "/design", isMobile);
  await expect(page).toHaveURL(/\/design\/$/);
  await waitForWidgets(page);
  await expect(page.locator("#body > .hero-unit")).toHaveCSS(
    "background-color",
    "rgb(238, 238, 238)",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/design\/$/);
  await waitForWidgets(page);
  expect(stylesheetRequests).toBe(1);
  expect(await page.evaluate(() => (window as any).documentSentinel)).toBe(
    true,
  );
  expect(await page.evaluate(() => (window as any).unstyledDesignFrames)).toBe(
    0,
  );
});

test("the standalone resume uses document navigation and keeps its isolated styles", async ({
  page,
}) => {
  let homeDocumentRequests = 0;
  page.on("request", (request) => {
    if (
      request.isNavigationRequest() &&
      request.frame() === page.mainFrame() &&
      new URL(request.url()).pathname === "/"
    ) {
      homeDocumentRequests++;
    }
  });
  await page.route("**/stylesheets/main.css", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });
  await page.addInitScript(() => {
    (window as any).unstyledHomeFrames = 0;
    const sample = () => {
      const main = document.querySelector("#main");
      if (
        location.pathname === "/" &&
        main &&
        getComputedStyle(main).fontFamily.includes("Times New Roman")
      ) {
        (window as any).unstyledHomeFrames++;
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/resume/");
  await expect(page).toHaveTitle("Resume of Dr. Jun Kato");
  await expect(page.locator('link[href="/stylesheets/main.css"]')).toHaveCount(
    0,
  );
  await expect(
    page.locator('link[href="/stylesheets/design.css"]'),
  ).toHaveCount(0);
  await page.evaluate(() => {
    (window as any).resumeDocumentSentinel = true;
  });
  await page.locator('#profile a[href="/"]').click();
  await expect(page).toHaveTitle("Portfolio of Jun Kato | junkato.jp");
  await waitForWidgets(page);
  expect(homeDocumentRequests).toBe(1);
  expect(
    await page.evaluate(() => (window as any).resumeDocumentSentinel),
  ).toBeUndefined();
  expect(await page.evaluate(() => (window as any).unstyledHomeFrames)).toBe(0);
  await page.goBack();
  await expect(page).toHaveTitle("Resume of Dr. Jun Kato");
  await expect(page.locator('link[href="/stylesheets/main.css"]')).toHaveCount(
    0,
  );
  await expect(
    page.locator('link[href="/stylesheets/design.css"]'),
  ).toHaveCount(0);
  await page.goForward();
  await expect(page).toHaveTitle("Portfolio of Jun Kato | junkato.jp");
  await waitForWidgets(page);
});

test("React widgets do not request legacy scripts or eagerly request interaction data", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) =>
    requests.push(new URL(request.url()).pathname),
  );
  await page.goto("/");
  await waitForWidgets(page);
  expect(
    requests.filter((url) =>
      /jquery|semantic.*\.js|\/javascripts\/views\/runtime/.test(url),
    ),
  ).toEqual([]);
  expect(
    requests.filter((url) => /\/data\/(?:histories|project-tags)-/.test(url)),
  ).toEqual([]);
  await expect(page.locator("#history .ui.feed > .event")).toHaveCount(5);
  await page.locator("a.more").click();
  await expect(page.locator("#history .ui.feed > .event")).toHaveCount(10);
  await page.locator("a.more").click();
  await expect(page.locator("#history .ui.feed > .event")).toHaveCount(15);
  expect(
    requests.filter((url) => url === "/data/histories-en.json"),
  ).toHaveLength(1);
});

test("home history retries failed loading and uses Japanese data after navigation", async ({
  page,
}) => {
  await page.route("**/data/histories-en.json", (route) =>
    route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.goto("/");
  await waitForWidgets(page);
  await page.locator("a.more").click();
  await expect(
    page.getByText("Could not load updates. Please try again."),
  ).toBeVisible();
  await page.unroute("**/data/histories-en.json");
  await page.locator("a.more").click();
  await expect(page.locator("#history .ui.feed > .event")).toHaveCount(10);
  await page.evaluate(() => (window as any).next.router.push("/ja/"));
  await waitForWidgets(page);
  await expect(page.locator("#history .ui.feed > .event")).toHaveCount(5);
  await page.locator("a.more").click();
  await expect(page.locator("#history .ui.feed > .event")).toHaveCount(10);
  await expect(page.locator("#history .ui.feed > .event").last()).toContainText(
    /[年月]/,
  );
});

test("dropdown keyboard selection, escape, and pointer dismissal work", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "The desktop dropdown is replaced by the phone sidebar.");
  await page.goto("/visionsketch/");
  await waitForWidgets(page);
  const dropdown = page.locator("#fixed-menu .ui.dropdown");
  await dropdown.focus();
  await page.keyboard.press("ArrowUp");
  await expect(dropdown).toHaveAttribute("aria-expanded", "true");
  await expect(dropdown.locator("a").last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
  await expect(dropdown).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(dropdown).toHaveAttribute("aria-expanded", "true");
  await expect(dropdown.locator("a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.type("text");
  await expect(
    dropdown.locator("a").filter({ hasText: "TextAlive" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await dropdown.click();
  await expect(dropdown).toHaveAttribute("aria-expanded", "true");
  await page.locator("h1").click();
  await expect(dropdown).toHaveAttribute("aria-expanded", "false");
});

test("modal dismissal restores focus and embeds activate only on demand", async ({
  page,
}) => {
  await page.goto("/design/");
  await waitForWidgets(page);
  const image = page.locator("a.ui.for-modal.image").first();
  const original =
    (await image.locator("img").getAttribute("data-original-src")) ||
    (await image.locator("img").getAttribute("src"));
  await image.click();
  await expect(page.locator(".ui.modal.active img")).toHaveAttribute(
    "src",
    original!,
  );
  await page.keyboard.press("Escape");
  await expect(image).toBeFocused();
  await expect(page.locator(".site-modal-dimmer")).toHaveCount(0);
  await page.evaluate(() => (window as any).next.router.push("/visionsketch/"));
  await waitForWidgets(page);
  const embed = page.locator(".ui.embed[data-url]").first();
  await expect(embed.locator("iframe")).toHaveCount(0);
  await embed.click();
  await expect(embed.locator("iframe")).toHaveAttribute(
    "src",
    (await embed.getAttribute("data-url"))!,
  );
});

test("cold deep URLs contain their content and links with JavaScript disabled", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.route("**/*", (route) =>
      new URL(route.request().url()).origin === baseURL
        ? route.continue()
        : route.abort(),
    );
    for (const route of ["/visionsketch/", "/ja/timeline/2025/", "/design/"]) {
      await page.goto(`${baseURL}${route}`);
      await expect(page.locator("#body")).toBeVisible();
      await expect(page.locator("h1").first()).not.toBeEmpty();
      expect(await page.locator("#body a[href]").count()).toBeGreaterThan(0);
      await expect(page.locator(".ui.modal")).not.toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test("Live Tuning previews work on hover or keyboard focus without a deferred jQuery script", async ({
  page,
  isMobile,
}) => {
  await page.goto("/live-tuning/");
  await waitForWidgets(page);
  const preview = page.locator("#live-programming");
  if (isMobile) await preview.focus();
  else await preview.hover();
  await expect(preview.locator("img.hover")).toHaveCSS("opacity", "1");
  await page.locator("h1").first().click();
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await expect(preview.locator("img.hover")).toHaveCSS("opacity", "0");
});

test("publication popup supports keyboard focus, Escape restoration, and outside click", async ({
  page,
}) => {
  await page.goto("/publications/");
  await waitForWidgets(page);
  const trigger = page.locator(".publication .with-popup-menu.button").first();
  const popup = page.locator(".publication .ui.popup").first();
  await trigger.focus();
  await expect(popup).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(popup.locator("a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(popup).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(popup).toBeVisible();
  await page.locator("h1").first().click();
  await expect(popup).not.toBeVisible();
});

test("Japanese tag popups and clipboard feedback stay localized across navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/ja/visionsketch/");
  await waitForWidgets(page);
  await page.locator("a.project.tag").first().click();
  await expect(page.locator(".ui.popup.project.tag")).toContainText(
    "に関するものです。",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".ui.popup.project.tag")).toHaveCount(0);
  await page.evaluate(() =>
    (window as any).next.router.push("/ja/publications/"),
  );
  await waitForWidgets(page);
  await page.locator(".publication .with-popup-menu.button").first().click();
  await page.locator(".publication .ui.popup .bibtex").first().click();
  await expect(
    page.getByText("BibTeXをクリップボードにコピーしました！", { exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("sidebar button supports Space, Enter, and Escape focus restoration", async ({
  page,
}) => {
  await page.goto("/visionsketch/");
  await waitForWidgets(page);
  const trigger = page.locator(".sidebar-button");
  const sidebar = page.locator(".ui.sidebar");
  await trigger.focus();
  await page.keyboard.press("Space");
  await expect(sidebar).toHaveClass(/visible/);
  await page.keyboard.press("Space");
  await expect(sidebar).not.toHaveClass(/visible/);
  await page.keyboard.press("Enter");
  await expect(sidebar).toHaveClass(/visible/);
  await sidebar.locator("a[href]").first().focus();
  await page.keyboard.press("Escape");
  await expect(sidebar).not.toHaveClass(/visible/);
  await expect(trigger).toBeFocused();
});

test("home collaboration popup preserves its authored English and Japanese content on hover and focus", async ({
  page,
  isMobile,
}) => {
  for (const [route, label, heading, content] of [
    [
      "/",
      "Collaborations?",
      "Collaborations",
      "I am actively seeking collaborators in both academia and industry. Click for more details.",
    ],
    [
      "/ja/",
      "共同研究しませんか？",
      "共同研究",
      "学生の受け入れや技術提供などを行っています。クリックして詳細をご確認ください。",
    ],
  ]) {
    await page.goto(route);
    await waitForWidgets(page);
    // Fomantic's decorative icon glyph is part of the accessible name.
    const trigger = page.getByRole("link", { name: label });
    const popup = trigger.locator(
      "xpath=following-sibling::div[contains(@class, 'popup')]",
    );
    await trigger.focus();
    await expect(popup).toBeVisible();
    await expect(popup.locator(".header")).toHaveText(heading);
    await expect(popup.locator(".content")).toHaveText(content);
    await page.keyboard.press("Escape");
    await expect(popup).not.toBeVisible();
    if (!isMobile) {
      await page.locator("h1").first().hover();
      await trigger.hover();
      await expect(popup).toBeVisible();
      await expect(popup.locator(".content")).toHaveText(content);
    }
    await trigger.click();
    await expect(page).toHaveURL(new RegExp(`${route}collaborations/$`));
  }
});
