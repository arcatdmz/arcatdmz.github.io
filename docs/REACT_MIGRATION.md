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
hydration errors and zero new application errors. The 60 pre-existing empty-embed
console errors across 40 routes matched the baseline exactly. Five legacy
external redirects still reach unavailable/certificate-failing destinations;
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

## Existing limitations retained

Some legacy links and empty embeds are already broken in the baseline, as
reported above. Third-party maps, videos, and social widgets still depend on
external services and can show transient loading states; settled Maps and
TextAlive renders were verified to match the original.

Fomantic and jQuery 3.2.1 remain for interaction/appearance compatibility. This
migration does not claim a complete replacement of that legacy widget stack.

See [README.md](../README.md) for installation, development, build, preview, and
baseline-comparison commands. No remote branch was pushed and no deployment was
performed as part of this local migration.
