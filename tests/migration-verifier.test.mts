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
