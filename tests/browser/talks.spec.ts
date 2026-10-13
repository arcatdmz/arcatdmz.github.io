import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === baseURL
      ? route.continue()
      : route.abort(),
  );
});

test("all six lecture chapters display without Bootstrap, broken images or horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const slug of ["as-a-code", "people-are-programmers"]) {
    for (const chapter of [1, 2, 3]) {
      const url = `/ja/talks/${slug}/${
        chapter === 1 ? "" : `p${chapter}.html`
      }`;
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator("article.talk-page")).toBeVisible();
      await expect(
        page.locator('nav[aria-label="講演の章"] [aria-current="page"]'),
      ).toContainText(`${chapter}.`);
      expect(
        await page
          .locator(
            'link[href*="bootstrap"],script[src*="jquery"],script[src*="rawgit"],script[src*="jsdo.it"]',
          )
          .count(),
      ).toBe(0);
      expect(await page.locator("html").getAttribute("lang")).toBe("ja");
      for (const image of await page.locator(".talk-page img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((el: HTMLImageElement) => el.decode());
        const dimensions = await image.evaluate((el: HTMLImageElement) => ({
          width: el.clientWidth,
          height: el.clientHeight,
          naturalWidth: el.naturalWidth,
          naturalHeight: el.naturalHeight,
        }));
        expect(dimensions.naturalWidth).toBeGreaterThan(0);
        expect(
          Math.abs(
            dimensions.height -
              (dimensions.width * dimensions.naturalHeight) /
                dimensions.naturalWidth,
          ),
        ).toBeLessThan(2);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("chapter links use client navigation, p1 redirects and historical query URLs remain usable", async ({
  page,
}) => {
  await page.goto("/ja/");
  await page.waitForFunction(
    () => document.getElementById("__next")?.dataset.siteWidgets === "ready",
  );
  await page.evaluate(() => ((window as any).__lectureNavigationMarker = true));
  await page.evaluate(() =>
    (window as any).next.router.push("/ja/talks/people-are-programmers/"),
  );
  await expect(page).toHaveURL(/\/ja\/talks\/people-are-programmers\/$/);
  await expect(page.locator(".talk-page .talk-note").first()).toHaveCSS(
    "color",
    "rgb(102, 102, 102)",
  );
  await page
    .getByRole("link", { name: "2. ぼくらのプログラミング", exact: true })
    .click();
  await expect(page).toHaveURL(/\/p2\.html$/);
  expect(
    await page.evaluate(() => (window as any).__lectureNavigationMarker),
  ).toBe(true);
  await expect(page.locator("#for-us")).toBeVisible();
  await page.getByRole("link", { name: "次の章 »", exact: true }).click();
  await expect(page).toHaveURL(/\/p3\.html$/);
  await expect(page.locator("#for-all")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/p2\.html$/);
  for (const slug of ["as-a-code", "people-are-programmers"]) {
    await page.goto(`/ja/talks/${slug}/p1.html`);
    await expect(page).toHaveURL(new RegExp(`/ja/talks/${slug}/$`));
    await page.goto(`/ja/talks/${slug}/?p=3`);
    await expect(page).toHaveURL(new RegExp(`/ja/talks/${slug}/p3\\.html$`));
    await page.goto(`/ja/talks/${slug}.old/`);
    await expect(page).toHaveURL(new RegExp(`/ja/talks/${slug}/$`));
  }
});

test("drawing and IDE demos run, share code, save locally and interrupt infinite loops", async ({
  page,
}) => {
  await page.goto(
    "/ja/talks/as-a-code/p2.html?code=" +
      encodeURIComponent('color(200,0,0); dot(20,20); print("描画しました");'),
  );
  const editor = page.getByRole("textbox", { name: "JavaScript" });
  await expect(page.locator('pre[role="status"]')).toContainText(
    "描画しました",
  );
  expect(
    await page
      .locator("canvas")
      .evaluate((el: HTMLCanvasElement) => [
        ...el.getContext("2d")!.getImageData(20, 20, 1, 1).data,
      ]),
  ).toEqual([200, 0, 0, 255]);
  await editor.fill('print("updated"); 2 + 3');
  await expect(page.locator('pre[role="status"]')).toContainText("updated\n5");
  const shared = await page
    .getByRole("link", { name: "コードを共有", exact: true })
    .getAttribute("href");
  expect(new URL(shared!, "https://junkato.jp").searchParams.get("code")).toBe(
    'print("updated"); 2 + 3',
  );
  await editor.fill("while (true) {}");
  await expect(page.locator('pre[role="status"]')).toContainText("時間制限");
  await editor.fill('throw "test error";');
  await expect(page.locator('pre[role="status"]')).toContainText("test error");
  await editor.fill("var =");
  await expect(page.locator('pre[role="status"]')).toContainText("SyntaxError");
  await editor.fill('fetch("https://example.com/");');
  await expect(page.locator('pre[role="status"]')).toContainText(
    "Unknown identifier: fetch",
  );
  await editor.fill("print(document);");
  await expect(page.locator('pre[role="status"]')).toContainText(
    "Unknown identifier: document",
  );
  await page.goto("/ja/talks/as-a-code/ide/");
  await editor.fill("6 * 7");
  await expect(page.locator('pre[role="status"]')).toHaveText("42");
  await page.getByRole("button", { name: "保存", exact: true }).click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "このブラウザーに保存しました。" }),
  ).toBeVisible();
  await page.reload();
  await expect(editor).toHaveValue("6 * 7");
  await expect(page.locator('pre[role="status"]')).toHaveText("42");
  await editor.fill("while (true) {}");
  await page
    .getByRole("link", { name: "1. プログラミングって何だっけ？", exact: true })
    .click();
  await expect(page.locator("#programming")).toBeVisible();
});
