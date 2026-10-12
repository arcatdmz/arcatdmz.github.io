import test from "node:test";
import assert from "node:assert/strict";
import {
  canonicalPage,
  compareCss,
  differences,
  localReferences,
  targetExists,
} from "../scripts/verify-site.ts";

function document(
  body: string,
  head = '<title>Portfolio</title><meta name="description" content="Research"><link rel="stylesheet" href="/main.css">',
  attrs = 'lang="en"',
  bodyAttrs = "",
): string {
  return `<!doctype html><html ${attrs}><head>${head}</head><body ${bodyAttrs}>${body}</body></html>`;
}
function compare(before: string, after: string) {
  return differences(canonicalPage(before), canonicalPage(after));
}

test("React comments, script lifecycle, resource hints, root wrapper and boolean serialization do not change content", () => {
  const before = document(
    '<p class="ui red">Hello <strong>world</strong> today</p><video controls="controls"></video><script src="/old.js"></script>',
  );
  const after = document(
    '<div id="__next"><link rel="preload" as="image" href="/avatar.jpg"><p class="red ui">Hello <!-- -->' +
      '<strong>world</strong> today</p><video controls=""></video></div><script src="/_next/chunk.js"></script>',
    '<meta name="description" content="Research" data-next-head><title data-next-head>Portfolio</title><meta name="next-head-count" content="3"><link rel="stylesheet" href="/main.css" data-next-head><noscript data-n-css></noscript>',
  );
  assert.deepEqual(compare(before, after), []);
});

test("HTML5 parser normalizes actual browser repairs including nested anchors and implicit tbody", () => {
  assert.deepEqual(
    compare(
      document(
        '<a href="/one">one<a href="/two">two</a></a><table><tr><td>A</td></tr></table>',
      ),
      document(
        '<a href="/one">one</a><a href="/two">two</a><table><tbody><tr><td>A</td></tr></tbody></table>',
      ),
    ),
    [],
  );
});

test("all visible text, rich tags and whitespace separating inline content remain strict", () => {
  const before = document("<p>English <strong>content</strong> end</p>");
  for (const body of [
    "<p>Japanese <strong>content</strong> end</p>",
    "<p>English <em>content</em> end</p>",
    "<p>English<strong>content</strong> end</p>",
    "<p>English <strong>content</strong>end</p>",
  ]) {
    assert.notDeepEqual(compare(before, document(body)), []);
  }
});

test("metadata, lang, body classes and responsive classes cannot silently drift", () => {
  const before = document(
    '<span class="mobile hidden">Content</span>',
    undefined,
    'lang="en"',
    'class="with-rail"',
  );
  const variants = [
    document(
      '<span class="mobile hidden">Content</span>',
      undefined,
      'lang="ja"',
      'class="with-rail"',
    ),
    document(
      '<span class="mobile hidden">Content</span>',
      undefined,
      'lang="en"',
    ),
    document(
      '<span class="mobile only">Content</span>',
      undefined,
      'lang="en"',
      'class="with-rail"',
    ),
    document(
      '<span class="mobile hidden">Content</span>',
      "<title>Changed</title>",
      'lang="en"',
      'class="with-rail"',
    ),
  ];
  for (const variant of variants)
    assert.notDeepEqual(compare(before, variant), []);
});

test("href, src, iframe attributes, data attributes and event placeholders remain strict", () => {
  const body =
    '<a href="/target" data-text="Original"><img src="/a.jpg"></a><iframe allowfullscreen src="https://example.com/"></iframe>';
  for (const changed of [
    body.replace("/target", "/missing"),
    body.replace("/a.jpg", "/b.jpg"),
    body.replace("Original", "Changed"),
    body.replace("allowfullscreen ", ""),
  ]) {
    assert.notDeepEqual(compare(document(body), document(changed)), []);
  }
});

test("only the unadorned framework root is transparent", () => {
  assert.notDeepEqual(
    compare(
      document("<p>A</p>"),
      document('<div id="__next" class="different"><p>A</p></div>'),
    ),
    [],
  );
  assert.notDeepEqual(
    compare(document("<p>A</p>"), document('<div id="wrapper"><p>A</p></div>')),
    [],
  );
});

test("inline styles and stylesheet cascade order remain strict", () => {
  assert.deepEqual(
    compare(
      document('<p style="color: red;">A</p>'),
      document('<p style="color:red">A</p>'),
    ),
    [],
  );
  assert.notDeepEqual(
    compare(
      document('<p style="color:red">A</p>'),
      document('<p style="color:blue">A</p>'),
    ),
    [],
  );
  const head =
    '<link rel="stylesheet" href="/one.css"><link rel="stylesheet" href="/two.css">';
  assert.notDeepEqual(
    compare(
      document("<p>A</p>", head),
      document(
        "<p>A</p>",
        head
          .replace("one.css", "temp.css")
          .replace("two.css", "one.css")
          .replace("temp.css", "two.css"),
      ),
    ),
    [],
  );
});

test("preformatted whitespace and literal style content are preserved", () => {
  assert.notDeepEqual(
    compare(document("<pre>a  b\n c</pre>"), document("<pre>a b\n c</pre>")),
    [],
  );
  assert.notDeepEqual(
    compare(
      document("A", '<style>a:after{content:"a  b"}</style>'),
      document("A", '<style>a:after{content:"a b"}</style>'),
    ),
    [],
  );
});

test("CSS comparator detects dropped responsive selectors, changed values and reordered cascade", () => {
  const before =
    "/* original */ .a,.b { display: block; } @media(max-width:768px){.a {display:none!important}}";
  assert.deepEqual(
    compareCss(before, before.replace("/* original */ ", "")).missing,
    [],
  );
  assert.deepEqual(
    compareCss(before, before.replace(".a,.b", ".a,.b,.c")).missing,
    [],
  );
  assert.equal(
    compareCss(before, before.replace(".a,.b", ".a,.b,.c")).added.length,
    1,
  );
  assert.equal(
    compareCss(before, before.replace("display:none", "display:flex")).missing
      .length,
    1,
  );
  assert.equal(compareCss(before, ".a,.b { display:block }").missing.length, 1);
  assert.equal(
    compareCss(".a{color:red}.a{color:blue}", ".a{color:blue}.a{color:red}")
      .missing.length,
    1,
  );
});

test("local URL checks resolve relative, absolute, same-origin and encoded paths without external requests", () => {
  const html = document(
    '<a href="../projects/#research">P</a><img src="/images/a%20b.png"><a href="https://junkato.jp/resume.html">CV</a><a href="https://other.example/a">External</a><a href="#same">Same</a><script src="/old.js"></script>',
  );
  const links = localReferences(html, "ja/index.html");
  assert.deepEqual(links.map((link) => link.target).sort(), [
    "images/a b.png",
    "main.css",
    "projects/",
    "resume.html",
  ]);
  const files = new Set([
    "projects/index.html",
    "images/a b.png",
    "resume.html",
    "index.html",
  ]);
  assert.equal(targetExists("projects/", files), true);
  assert.equal(targetExists("projects", files), true);
  assert.equal(targetExists("", files), true);
  assert.equal(targetExists("missing", files), false);
});

test("export verifier preserves archives/assets/feeds and separates pre-existing broken URLs", async () => {
  const fs = await import("node:fs/promises");
  const os = await import("node:os");
  const path = await import("node:path");
  const { verifySite } = await import("../scripts/verify-site.ts");
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "migration-verifier-"));
  try {
    const baseline = path.join(root, "before"),
      candidate = path.join(root, "after");
    for (const directory of [
      baseline,
      candidate,
      path.join(root, "site"),
      path.join(root, "pages"),
    ])
      await fs.mkdir(directory);
    await fs.writeFile(path.join(root, "site/routes.json"), "[]");
    const html = document(
      '<a href="/old-missing">Old</a><img src="/image.png">',
    );
    for (const directory of [baseline, candidate]) {
      await fs.writeFile(path.join(directory, "index.html"), html);
      await fs.writeFile(
        path.join(directory, "resume.html"),
        document("Resume"),
      );
      await fs.writeFile(path.join(directory, "main.css"), "p{color:red}");
      await fs.writeFile(
        path.join(directory, "image.png"),
        Buffer.from([1, 2, 3]),
      );
      await fs.writeFile(
        path.join(directory, "rss.xml"),
        `<rss><lastBuildDate>${directory}</lastBuildDate><item>Original</item></rss>`,
      );
      await fs.writeFile(
        path.join(directory, "sitemap.xml"),
        "<urlset><url><loc>https://junkato.jp/</loc><priority>1.0</priority></url></urlset>",
      );
    }
    const initial = await verifySite({
      root,
      baseline,
      candidate,
      render: false,
    });
    assert.deepEqual(initial.failures, []);
    assert.equal(initial.existingBrokenUrls.length, 1);
    assert.equal(initial.newBrokenUrls.length, 0);
    assert.equal(initial.counts.exactStaticAssets, 1);
    assert.equal(initial.counts.exactStaticHtml, 1);
    assert.equal(initial.counts.comparedRssFeeds, 1);
    await fs.writeFile(
      path.join(candidate, "index.html"),
      html.replace("Old</a>", "Changed</a>"),
    );
    await fs.rm(path.join(candidate, "image.png"));
    await fs.writeFile(
      path.join(candidate, "rss.xml"),
      "<rss><item>Changed</item></rss>",
    );
    await fs.writeFile(
      path.join(candidate, "sitemap.xml"),
      "<urlset><url><loc>https://junkato.jp/changed</loc></url></urlset>",
    );
    const changed = await verifySite({
      root,
      baseline,
      candidate,
      render: false,
    });
    for (const category of [
      "static-html-bytes",
      "missing-static-asset",
      "rss-content",
      "sitemap-entry",
      "new-broken-url",
    ]) {
      assert.equal(
        changed.failures.some((failure) => failure.category === category),
        true,
        category,
      );
    }
    assert.deepEqual(
      changed.newBrokenUrls.map((issue) => issue.url),
      ["/image.png"],
    );
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test("only the five migrated translation-source links may change to TSX", () => {
  const root = "https://github.com/arcatdmz/arcatdmz.github.io/blob/main";
  for (const name of [
    "phybots",
    "homehack",
    "live-tuning",
    "openpool",
    "programming-with-examples",
  ]) {
    assert.deepEqual(
      compare(
        document(`<a href="${root}/src/${name}/index.pug">Translate</a>`),
        document(`<a href="${root}/pages/${name}/index.tsx">Translate</a>`),
      ),
      [],
    );
  }
  assert.notDeepEqual(
    compare(
      document(`<a href="${root}/src/other/index.pug">Translate</a>`),
      document(`<a href="${root}/pages/other/index.tsx">Translate</a>`),
    ),
    [],
  );
  assert.notDeepEqual(
    compare(
      document(`<a href="${root}/src/phybots/index.pug">Translate</a>`),
      document(`<a href="${root}/pages/homehack/index.tsx">Translate</a>`),
    ),
    [],
  );
});

test("React route hrefs compare equivalent trailing slashes while archive URLs stay literal", () => {
  assert.deepEqual(
    canonicalPage('<html><body><a href="/projects">Projects</a></body></html>'),
    canonicalPage(
      '<html><body><a href="/projects/">Projects</a></body></html>',
    ),
  );
  assert.notDeepEqual(
    canonicalPage('<html><body><a href="/archive">Archive</a></body></html>'),
    canonicalPage('<html><body><a href="/archive/">Archive</a></body></html>'),
  );
});

const imageManifest = {
  "/photo.jpg": {
    width: 1000,
    height: 500,
    srcSet: [
      { src: "/_images/photo-320.webp", width: 320, height: 160 },
      { src: "/_images/photo-640.webp", width: 640, height: 320 },
    ],
  },
};
const optimizedImage =
  '<img alt="Photo" src="/_images/photo-640.webp" data-original-src="/photo.jpg" width="1000" height="500" loading="lazy" decoding="async" sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) 933px, 1127px" srcset="/_images/photo-320.webp 320w, /_images/photo-640.webp 640w, /photo.jpg 1000w">';
async function compareOptimized(
  before: string,
  after: string,
  page = "projects/index.html",
  manifest = imageManifest,
  pageImages = manifest,
) {
  const { optimizedDifferences } = await import("../scripts/verify-site.ts");
  return optimizedDifferences(document(before), document(after), {
    page,
    manifest,
    pageImages,
  });
}

test("optimized images validate exact manifest/srcset and original source, while strict mode still rejects them", async () => {
  const original = '<img src="/photo.jpg" alt="Photo">';
  assert.notDeepEqual(
    compare(document(original), document(optimizedImage)),
    [],
  );
  assert.deepEqual(await compareOptimized(original, optimizedImage), []);
  for (const changed of [
    optimizedImage.replace(
      'src="/_images/photo-640.webp"',
      'src="/_images/other.webp"',
    ),
    optimizedImage.replace(
      'data-original-src="/photo.jpg"',
      'data-original-src="/other.jpg"',
    ),
    optimizedImage.replace("320w", "300w"),
    optimizedImage.replace('width="1000"', 'width="900"'),
    optimizedImage.replace('height="500"', 'height="450"'),
    optimizedImage.replace('loading="lazy"', 'loading="eager"'),
    optimizedImage.replace('decoding="async"', 'decoding="sync"'),
    optimizedImage.replace("1127px", "100px"),
    optimizedImage.replace('alt="Photo"', 'alt="Changed"'),
    optimizedImage.replace(
      'alt="Photo"',
      'alt="Photo" data-content="Inserted"',
    ),
  ])
    assert.notDeepEqual(await compareOptimized(original, changed), [], changed);
  assert.notDeepEqual(
    await compareOptimized(
      original,
      optimizedImage,
      undefined,
      imageManifest,
      {},
    ),
    [],
  );
  assert.notDeepEqual(
    await compareOptimized(original, optimizedImage, undefined, imageManifest, {
      "/photo.jpg": { ...imageManifest["/photo.jpg"], width: 900 },
    }),
    [],
  );
});

test("optimized images preserve authored dimensions, styles, download URLs and metadata", async () => {
  const original =
    '<a href="/photo.jpg"><img src="/photo.jpg" width="250" style="border:1px solid red" alt="Photo"></a>';
  const candidate = `<a href="/photo.jpg">${optimizedImage.replace(
    'width="1000"',
    'width="250" style="border:1px solid red"',
  )}</a>`;
  assert.deepEqual(await compareOptimized(original, candidate), []);
  for (const changed of [
    candidate.replace('width="250"', 'width="251"'),
    candidate.replace("border:1px", "border:2px"),
    candidate.replace('href="/photo.jpg"', 'href="/_images/photo-640.webp"'),
  ])
    assert.notDeepEqual(await compareOptimized(original, changed), []);
  const { optimizedDifferences } = await import("../scripts/verify-site.ts");
  assert.notDeepEqual(
    optimizedDifferences(
      document(original),
      document(candidate, "<title>Changed</title>"),
      {
        page: "index.html",
        manifest: imageManifest,
        pageImages: imageManifest,
      },
    ),
    [],
  );
});

test("widget allowances apply only to documented selectors and exact initial states", async () => {
  const original =
    '<div class="ui right sidebar inverted vertical menu"><a href="/projects">Projects</a></div><a class="sidebar-button" href="#">Menu</a><div class="ui dropdown item"><div class="menu"><a href="/one">One</a></div></div>';
  const candidate =
    '<div id="site-sidebar" class="ui right sidebar inverted vertical menu uncover" aria-label="Site navigation"><a href="/projects">Projects</a></div><a class="sidebar-button" href="#" role="button" aria-controls="site-sidebar" aria-expanded="false">Menu</a><div class="ui dropdown item" role="button" tabindex="0" aria-haspopup="menu" aria-expanded="false" data-site-popup-trigger="_R_123_"><div class="menu transition hidden" role="menu"><a href="/one">One</a></div></div>';
  assert.deepEqual(await compareOptimized(original, candidate), []);
  assert.notDeepEqual(compare(document(original), document(candidate)), []);
  for (const changed of [
    candidate.replace('aria-expanded="false"', 'aria-expanded="true"'),
    candidate.replace('aria-controls="site-sidebar"', 'aria-controls="other"'),
    candidate.replace("transition hidden", "transition visible"),
    candidate.replace('href="/one"', 'href="/two"'),
    candidate.replace("One</a>", "Changed</a>"),
    candidate.replace("_R_123_", "not-react"),
  ])
    assert.notDeepEqual(await compareOptimized(original, changed), []);
  assert.notDeepEqual(
    await compareOptimized(
      "<p>Text</p>",
      '<p role="button" aria-expanded="false">Text</p>',
    ),
    [],
  );
});

test("inline popups validate shared ids and preserve all authored content", async () => {
  const original =
    '<div><div class="with-popup-menu button">Open</div><div class="ui popup"><a href="/file.pdf" data-clipboard-text="Original">Download</a></div></div>';
  const candidate =
    '<div><div class="with-popup-menu button" data-site-popup-trigger="_R_1_" aria-expanded="false" aria-controls="_R_1_" tabindex="0" role="button">Open</div><div class="ui popup top right transition hidden" id="_R_1_" data-site-popup="_R_1_"><a href="/file.pdf" data-clipboard-text="Original">Download</a></div></div>';
  assert.deepEqual(await compareOptimized(original, candidate), []);
  for (const changed of [
    candidate.replace('aria-controls="_R_1_"', 'aria-controls="_R_2_"'),
    candidate.replace('id="_R_1_"', 'id="_R_2_"'),
    candidate.replace(
      'data-clipboard-text="Original"',
      'data-clipboard-text="Changed"',
    ),
    candidate.replace("top right", "top left"),
    candidate.replace("Download</a>", "Changed</a>"),
  ])
    assert.notDeepEqual(await compareOptimized(original, changed), []);
});

test("static embeds permit only exact icon/image placeholders derived from unchanged parent data", async () => {
  const original =
    '<div class="ui embed" data-url="https://example.org/embed" data-placeholder="/photo.jpg" data-alt="Photo"></div>';
  const candidate = original.replace(
    "></div>",
    ' role="button" tabindex="0" aria-label="Open embedded content"><i class="video play icon"></i>' +
      optimizedImage.replace("<img ", '<img class="placeholder" ') +
      "</div>",
  );
  assert.deepEqual(await compareOptimized(original, candidate), []);
  for (const changed of [
    candidate.replace("video play", "delete"),
    candidate.replace('alt="Photo" src=', 'alt="Changed" src='),
    candidate.replace("</div>", '<a href="/extra">Inserted</a></div>'),
    candidate.replace(
      'data-url="https://example.org/embed"',
      'data-url="https://elsewhere.org/embed"',
    ),
  ])
    assert.notDeepEqual(await compareOptimized(original, changed), []);
  assert.notDeepEqual(
    await compareOptimized(
      original.replace("></div>", ">Authored</div>"),
      candidate,
    ),
    [],
  );
});

test("only the two Live Tuning hover styles may lose display:none", async () => {
  const original =
    '<a id="live-programming"><img class="hover" src="/illustration.svg" style="position:absolute;display:none;z-index:10"></a>';
  const candidate =
    '<a id="live-programming" class="live-preview" tabindex="0"><img class="hover" src="/illustration.svg" style="position:absolute;z-index:10" loading="lazy" decoding="async"></a>';
  assert.deepEqual(
    await compareOptimized(original, candidate, "live-tuning/index.html"),
    [],
  );
  assert.notDeepEqual(
    await compareOptimized(original, candidate, "other/index.html"),
    [],
  );
  assert.notDeepEqual(
    await compareOptimized(
      original,
      candidate.replace("z-index:10", "z-index:11"),
      "live-tuning/index.html",
    ),
    [],
  );
});

test("optimized stylesheet links and widget rules are exact, while baseline CSS retention stays strict", async () => {
  const { optimizedDifferences, optimizedCssDifferences, optimizedWidgetCss } =
    await import("../scripts/verify-site.ts");
  const before = document(
    "Content",
    '<link rel="stylesheet" href="/stylesheets/main.css">',
  );
  const after = document(
    "Content",
    '<link rel="stylesheet" href="/stylesheets/main.css"><link rel="stylesheet" href="/stylesheets/design.css">',
  );
  const context = { page: "index.html", manifest: {}, pageImages: {} };
  assert.deepEqual(optimizedDifferences(before, after, context), []);
  assert.notDeepEqual(
    optimizedDifferences(
      before,
      after.replace(
        'href="/stylesheets/design.css"',
        'href="/stylesheets/design.css" media="print"',
      ),
      context,
    ),
    [],
  );
  assert.deepEqual(optimizedCssDifferences(optimizedWidgetCss), []);
  assert.notDeepEqual(
    optimizedCssDifferences(
      optimizedWidgetCss.replace("opacity 200ms", "opacity 2s"),
    ),
    [],
  );
  assert.notDeepEqual(
    compareCss(
      ".existing{color:red}",
      ".existing{color:blue}" + optimizedWidgetCss,
    ).missing,
    [],
  );
});

test("URL validation checks every srcset candidate and original image URL", () => {
  const refs = localReferences(document(optimizedImage), "index.html");
  assert.deepEqual(
    refs.filter((ref) => ref.attribute === "srcset").map((ref) => ref.target),
    ["_images/photo-320.webp", "_images/photo-640.webp", "photo.jpg"],
  );
  assert.equal(
    refs.find((ref) => ref.attribute === "data-original-src")?.target,
    "photo.jpg",
  );
});

test("deprecated render mode fails clearly before pretending to validate pages without getStaticProps", async () => {
  const { verifySite } = await import("../scripts/verify-site.ts");
  await assert.rejects(
    verifySite({
      root: "/missing",
      baseline: "/missing",
      candidate: "/missing",
      render: true,
    }),
    /getStaticProps.*npm run build/,
  );
});

test("optimized export verifies route JSON and never normalizes archival bytes", async () => {
  const fs = await import("node:fs/promises"),
    os = await import("node:os"),
    path = await import("node:path");
  const { verifySite } = await import("../scripts/verify-site.ts");
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "optimized-parity-"));
  try {
    const baseline = path.join(root, "before"),
      candidate = path.join(root, "after");
    for (const directory of [
      baseline,
      candidate,
      path.join(root, "site/generated"),
      path.join(root, "pages"),
      path.join(candidate, "_next/data/build"),
    ])
      await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(root, "site/routes.json"), "[]");
    await fs.writeFile(path.join(root, "site/generated/images.json"), "{}");
    const props = {
      pageProps: {
        pageData: {
          images: {},
          text: "Original",
          metadata: { title: "Resume" },
        },
      },
      __N_SSG: true,
    };
    for (const directory of [baseline, candidate]) {
      await fs.writeFile(
        path.join(directory, "index.html"),
        document("Archive"),
      );
      await fs.writeFile(
        path.join(directory, "resume.html"),
        document(
          'Resume<script id="__NEXT_DATA__" type="application/json">' +
            JSON.stringify({ buildId: "build", gsp: true, props }) +
            "</script>",
        ),
      );
      await fs.writeFile(
        path.join(directory, "archive.js"),
        "const value = 1;",
      );
      await fs.writeFile(
        path.join(directory, "archive.css"),
        "a { color: red; }",
      );
    }
    await fs.writeFile(
      path.join(candidate, "_next/data/build/resume.json"),
      JSON.stringify(props),
    );
    const options = {
      root,
      baseline,
      candidate,
      render: false,
      optimized: true,
    };
    assert.deepEqual((await verifySite(options)).failures, []);
    await fs.writeFile(
      path.join(candidate, "index.html"),
      document("Changed archive"),
    );
    await fs.writeFile(path.join(candidate, "archive.js"), "const value = 2;");
    await fs.writeFile(path.join(candidate, "archive.css"), "a{color:red}");
    await fs.writeFile(
      path.join(candidate, "_next/data/build/resume.json"),
      JSON.stringify({
        ...props,
        pageProps: { ...props.pageProps, changed: true },
      }),
    );
    const report = await verifySite(options);
    assert.ok(
      report.failures.some(
        (failure) => failure.category === "static-html-bytes",
      ),
    );
    for (const page of ["archive.js", "archive.css"])
      assert.ok(
        report.failures.some(
          (failure) =>
            failure.page === page && failure.category === "static-asset-bytes",
        ),
      );
    assert.ok(
      report.failures.some(
        (failure) => failure.category === "route-data-consistency",
      ),
    );
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test("new CSS cannot silently override retained selectors or approved widget rules", async () => {
  const { optimizedCssDifferences, optimizedWidgetCss } = await import(
    "../scripts/verify-site.ts"
  );
  assert.notDeepEqual(
    optimizedCssDifferences(
      ".old{color:red}" + optimizedWidgetCss + ".old{color:blue}",
      ".old{color:red}",
    ),
    [],
  );
  assert.notDeepEqual(
    optimizedCssDifferences(
      optimizedWidgetCss + ".live-preview > img.hover { opacity:1 }",
    ),
    [],
  );
});

test("non-executable structured data is content, not an ignored framework script", () => {
  const before = document(
    "Content",
    '<script type="application/ld+json">{"name":"Original"}</script>',
  );
  const after = before.replace("Original", "Changed");
  assert.notDeepEqual(compare(before, after), []);
});
