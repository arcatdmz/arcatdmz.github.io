import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Embed, SiteModal } from "../site/components/SiteWidgets";
import { SiteLink } from "../site/components/SiteLink";
import {
  HomeHistory,
  HistoryFeed,
  HistoryMore,
} from "../site/components/HomeHistory";
import { readFileSync } from "node:fs";

test("embeds keep a static placeholder and do not request the iframe before activation", () => {
  const html = renderToStaticMarkup(
    createElement(Embed, {
      "data-url": "/paper/slides.pdf",
      "data-placeholder": "/images/background-eee.png",
      "data-icon": "video play outline",
    }),
  );
  assert.match(html, /role="button"/);
  assert.match(html, /class="placeholder"/);
  assert.doesNotMatch(html, /<iframe/);
});

test("existing direct iframe embeds stay available in the static document", () => {
  const html = renderToStaticMarkup(
    createElement(
      Embed,
      {},
      createElement("iframe", { src: "https://www.youtube.com/embed/example" }),
    ),
  );
  assert.match(html, /<iframe/);
});

test("tooltip and tag triggers remain valid inside paragraphs before hydration", () => {
  for (const className of ["with-popup", "project tag"]) {
    const html = renderToStaticMarkup(
      createElement(
        "p",
        {},
        createElement(
          SiteLink,
          { className, "data-content": "Hint", "data-tag": "music" } as any,
          "Tag",
        ),
      ),
    );
    assert.match(html, /^<p><a/);
    assert.doesNotMatch(html, /<div/);
    assert.match(html, /<\/a><\/p>$/);
  }
});

test("inactive modals retain their content without creating a dimmer or portal", () => {
  const html = renderToStaticMarkup(
    createElement(SiteModal, {}, createElement("p", {}, "Profile photo")),
  );
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /Profile photo/);
  assert.doesNotMatch(html, /page modals dimmer/);
});

test("home history keeps its first entries in HTML and disables the unhydrated control", () => {
  const html = renderToStaticMarkup(
    createElement(HomeHistory, {
      lang: "en",
      children: [
        createElement(
          HistoryFeed,
          { key: "feed" },
          createElement("div", { className: "event" }, "Recent update"),
        ),
        createElement(
          HistoryMore,
          { key: "more", className: "ui more disabled button" },
          "More",
        ),
      ],
    }),
  );
  assert.match(html, /Recent update/);
  assert.match(html, /aria-disabled="true"/);
});

test("the React document runtime does not import or request legacy widget bundles", () => {
  const runtime = readFileSync(
    new URL("../site/components/SiteRuntime.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(runtime, /jquery|jQuery|views\/runtime|siteInteractions/);
  const widgets = readFileSync(
    new URL("../site/components/SiteWidgets.tsx", import.meta.url),
    "utf8",
  );
  assert.match(widgets, /beforeHistoryChange/);
  assert.doesNotMatch(widgets, /events\.on\("routeChangeStart"/);
});

test("authored sibling popups are handled explicitly and never replaced by empty tooltip content", () => {
  const html = renderToStaticMarkup(
    createElement(
      SiteLink,
      { className: "with-popup", href: "/collaborations/" },
      "Collaborations?",
    ),
  );
  assert.doesNotMatch(html, /data-site-popup-trigger/);
  assert.match(html, /Collaborations\?/);
  for (const path of ["../pages/index.tsx", "../pages/ja/index.tsx"]) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    assert.match(
      source,
      /<Popup[\s\S]*?trigger=\{[\s\S]*?className="ui primary large with-popup labeled icon button"/,
    );
    assert.match(
      source,
      /I am actively seeking collaborators in both academia and industry/,
    );
  }
});
