# React migration review

Baseline: `4a40653` (`main` at the start of the migration).
Working branch: `refactor/react-static-site`.
Validation date: 2026-10-11.

## Result

Current English/Japanese pages are editable React/TypeScript components, rendered
by Next.js static export. The production artifact remains `dist/` for GitHub
Pages; there is no production Node.js server. Original images, downloads, data,
BibTeX content, styles, and historical pages remain in the repository.

Pug templates and the Pug page-rendering pipeline have been removed. Shared
navigation, headers, footers, project/publication/timeline content, and rich-text
helpers live in `site/`; page-specific content lives in `pages/`.

The original Fomantic/jQuery interactions are deliberately retained behind a
post-hydration compatibility boundary. Menus, modals, filtering, clipboard
citations, embeds, and feed expansion retain their existing behavior. Historical
standalone sites and old documentation remain static HTML rather than being
unnecessarily rewritten.

## Automated checks

The following checks passed on the completed production export:

- Clean lockfile install with `npm ci`, then a full production build
- TypeScript checking and 5 data/model unit tests
- 18 migration-verifier and deferred-widget regression tests
- All 286 baseline HTML URLs retained
- 125 React routes match normalized baseline DOM, visible text, language,
  metadata, inline styles, and public content URLs
- 161 historical/redirect HTML files are byte-identical
- 623 static assets are byte-identical
- All baseline CSS rules remain in order; four stylesheets are byte-identical
- Both RSS feeds match apart from their build timestamp
- All 95 original sitemap entries retain their metadata; 12 navigation routes
  are additionally listed
- No newly broken local references; 60 existing broken-link occurrences are
  reported separately rather than silently “fixed”

CSS additions are limited to compatibility rules and selectors retained by the
updated purge process. No original CSS rule is removed. The Design navigation
has explicit `#__next` selectors to preserve its original floating controls.

Regression tests cover sequential widget loading, asynchronous social scripts,
repeat initialization, already-fired `window.load`, missing Maps API, and static
project-year formatting. An independent rendering check also advanced the clock
to 2027 and confirmed identical server-rendered output for 12 major bilingual
pages.

## Browser verification

The untouched baseline and React export were served side by side and compared
in the same Chromium browser with the original Adobe font loaded. Representative
English/Japanese home, project, publication, Design, activity, timeline,
collaboration, TextAlive, and Griffith pages were compared at desktop and phone
widths, with additional resume checks. Eight deeper sections and six tablet
captures also matched the sampled baseline layout and styling. After external
content finished loading, the full Google Maps basemap and TextAlive videos
matched in both versions.

Browser checks cover language navigation, direct loads, refresh, Back/Forward,
mobile sidebar and contact navigation, news expansion, avatar and Design modals,
tag controls, citation menus, and BibTeX copying verified by an actual paste.
Browser-discovered hydration
issues in Design and Japanese Science, and the floating Design navigation CSS,
were repaired and rechecked. A final sweep of all 125 React routes reported zero
hydration errors and zero new application errors. At that stage, the 60 pre-existing embed
initialization console errors across 40 routes matched the baseline exactly;
the affected elements contain iframes but lack Fomantic URL configuration. Five
legacy external redirects still reach unavailable/certificate-failing destinations;
they were preserved, and browser security warnings were not bypassed.

## Explicit differences

- Five existing translation-source links now target the replacement
  `pages/**/index.tsx` files on the same GitHub `main` branch. Their labels and
  public site URLs are unchanged.
- `/resume.html` and its metadata remain intact; Next also exports `/resume/`.
- Next's standard `404.html` and `/404/` files are new generated outputs.
- The sitemap additionally includes 12 current navigation routes.
- Framework scripts, the `#__next` root, hydration markers, and local copies of
  the original jQuery dependency are implementation changes.
- Date-dependent static content uses a generated build clock so old exports do
  not develop hydration errors at New Year. Rebuild to refresh that content.

## Initial limitations and follow-up repairs

The initially inherited broken references and embed initialization errors are recorded
with affected pages, source files, and repair hints in
[LEGACY_CONTENT_ISSUES.md](LEGACY_CONTENT_ISSUES.md). That inventory also records
the legacy external redirect destinations and distinguishes historical browser
findings from the latest local-file checks. The native React widgets introduced
in `02405a0` resolved the embed initialization mismatch (E1); a 2026-10-14 browser
sweep confirmed all 40 affected pages and 60 iframe elements are free of that
error. The five historical external redirect entry points (R1–R5) have also
been restored to local content or internal redirects.

A subsequent 2026-10-14 audit checked 1,377 external URLs and 2,206 internal
anchor references. Two resume anchor targets were corrected; the rebuilt HTML
has no missing anchor targets. External failures, replacement URLs, and the
remaining playback or publication-setting tasks are recorded in
[EXTERNAL_CONTENT_AUDIT.md](EXTERNAL_CONTENT_AUDIT.md), with per-URL results in
[EXTERNAL_LINK_AUDIT.csv](EXTERNAL_LINK_AUDIT.csv).

Third-party maps, videos, and social widgets still depend on
external services and can show transient loading states; settled Maps and
TextAlive renders were verified to match the original.

The initial compatibility build retained Fomantic and jQuery 3.2.1. Current React
pages retain Fomantic CSS and use native React widgets; their runtime no longer
loads jQuery or Fomantic JavaScript. Standalone archival documents can still use
their original vendor scripts.

See [README.md](../README.md) for installation, development, build, preview, and
baseline-comparison commands. No remote branch was pushed and no deployment was
performed as part of this local migration.

## Follow-up: client navigation and React authoring

The initial compatibility pass left internal anchors doing document loads and
wrapped ordinary text in Pug conversion helpers. The follow-up removes all
`richText`, `richParagraph`, `plainText`, and `createContentComponents` calls from
page and shared-component source. Fixed text and markup are JSX; existing
HTML-bearing data has an explicit `HtmlContent` boundary that also renders
internal links through `SiteLink`. Sixteen shared render functions are typed
React components. Generated accumulation closures were simplified, and 1,547
unused data bindings were removed.

`SiteLink` selects Next's `Link` for known React routes, including relative URLs,
translations, and year routes. Other destinations preserve ordinary document
navigation. Retained widgets have explicit initialization/disposal; their bundle,
jQuery, fonts, and analytics scripts are loaded once. Route transitions update
language and body classes before paint, cancel pending widget initializers, and
restore detached modal nodes before React unmounts the page. Widget-generated
links have a narrow navigation adapter. Hash navigation uses Next/browser history
and a CSS scroll offset instead of manually replacing history state.

The dark background flash was reproduced in the previous React export. Under a
1.2-second jQuery delay, it showed 77 dark frames over approximately 1.27 seconds;
the updated export showed zero dark frames. Five menu transitions made 10 main
navigation requests before the change (including directory redirects) and zero
after. Median time until the destination widgets initialized was 1,443 ms before
and 120 ms after in that controlled local run. These numbers include the
artificial delay; they do not predict production performance on every device.

Validation of the final export includes:

- Type checking, six model unit tests, and the deferred-widget/content/verifier
  regression tests
- Twelve Chromium browser scenarios across desktop and phone viewports
- Nine representative pages compared at 1440 px and 390 px: identical image
  dimensions and zero differing pixels in all 18 comparisons
- 118 content routes loaded in Chromium with zero application errors; seven
  historical redirects recorded separately
- All 125 React routes match the previous export's normalized content, structure,
  inline styles, language, and metadata; known React URL trailing slashes are
  treated as equivalent
- 161 archival/redirect HTML files and 637 static assets are byte-identical;
  generated Next HTML/data is compared separately from archival assets
- No new broken local references, and no removed baseline CSS rules

Browser comparison artifacts and measurements are generated locally in
`site-qa/navigation/` by `scripts/check-browser.ts`. Third-party services are
blocked in this repeatable comparison; the initial migration's settled external
Maps and TextAlive verification remains described above.

## Follow-up: CSS animation compatibility

The React widgets now drive Fomantic's existing CSS keyframes through a small
visibility lifecycle, without loading its jQuery transition plugin. Dropdowns
use slide animations (200 ms), popups and clipboard feedback use scale (200 ms),
and modals use scale with a fading dimmer (500 ms). Sidebar uncover motion keeps
the existing CSS transitions. Closing elements remain mounted until the animation
ends, are inert during exit, and have a timed cleanup fallback. Reopening cancels
pending cleanup; unmounting releases timers, scroll locking, and focus state.

The floating navigation button again uses bounce, and SNS attention and newly
added history entries use the original jiggle keyframes. Required dynamic CSS
classes are retained in the production purge. Reduced-motion preferences skip
these animations, including when changed during an active transition.

Browser regression checks verify entry/exit keyframes, interrupted modal exits,
sidebar motion, dropdown keyboard focus, attention animations, and immediate
cleanup with reduced motion on desktop and phone layouts. Screenshot inspection
covers the entering modal and settled modal, popup, and phone sidebar.
