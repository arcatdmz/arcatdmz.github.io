import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Embed } from "react-fomantic-ui";

import { HistoryFeed } from "../site/components/history/HistoryFeed";
import { HistoryMore } from "../site/components/history/HistoryMore";
import { HomeHistory } from "../site/components/history/HomeHistory";
import { SiteLink } from "../site/components/links/SiteLink";
import { DeferredEmbed } from "../site/components/media/DeferredEmbed";
import { SiteModal } from "../site/components/widgets/SiteModal";

test("embeds keep a static placeholder and do not request the iframe before activation", () => {
  const html = renderToStaticMarkup(
    createElement(DeferredEmbed, {
      url: "/paper/slides.pdf",
      placeholder: "/images/background-eee.png",
      icon: "video play outline",
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
      { active: true, icon: false },
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
        createElement(HistoryMore, { key: "more", className: "more" }, "More"),
      ],
    }),
  );
  assert.match(html, /Recent update/);
  assert.match(html, /aria-disabled="true"/);
});

test("the React document runtime does not import or request legacy widget bundles", () => {
  const runtime = readFileSync(
    new URL("../site/components/runtime/SiteRuntime.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(runtime, /jquery|jQuery|views\/runtime|siteInteractions/);
  const widgets = readFileSync(
    new URL("../site/components/widgets/SiteWidgets.tsx", import.meta.url),
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
  const source = readFileSync(
    new URL("../components/index.tsx", import.meta.url),
    "utf8",
  );
  assert.match(
    source,
    /<SitePopup[\s\S]*?trigger=\{[\s\S]*?<Button[\s\S]*?className="with-popup"/,
  );
  assert.match(
    source,
    /I am actively seeking collaborators in both academia and industry/,
  );
});
