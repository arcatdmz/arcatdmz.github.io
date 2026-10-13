# junkato.jp

[![Publish](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/deploy.yml)
[![Publish assets](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/publish-assets.yml/badge.svg?branch=main)](https://github.com/arcatdmz/arcatdmz.github.io/actions/workflows/publish-assets.yml)

All rights on image, video, text, and related resources (e.g., including paper PDF files) reserved.

## Architecture

The site uses Next.js 16.4, React 19.3, and TypeScript. The Pages Router renders
static HTML with `output: "export"` and `trailingSlash: true`. No Node.js server is
needed in production.

- `pages/`: React pages, including English and Japanese routes
- `site/`: shared React components, layouts, route metadata, and data adapters
- `src/`: original images, downloads, JSON data, `junkato.bib`, LESS stylesheets,
  and TypeScript interaction code
- `src/**/index.html`: preserved archival pages, copied without rewriting them
- `semantic/`: existing Fomantic UI source and build tasks
- `scripts/`: asset preparation, static-export finalization, preview, and parity checks
- `site/generated/`, `build/`, `public/`: generated data and asset intermediates
- `.next/`, `out/`: Next.js build intermediates and raw static export
- `dist/`: complete production site, ready for GitHub Pages

Edit source files, not the generated directories. Pug is no longer part of page
rendering. React state and lifecycle now own menus, sidebars, popups, modals,
clipboard feedback, embedded content and home-page history expansion. Main React
routes use the existing Fomantic CSS without downloading jQuery, Fomantic
JavaScript, Clipboard.js or the legacy interaction bundle. Archival standalone
HTML and its historical assets remain unchanged.

Current React pages use `SiteLink` to select Next's `Link` for internal React
routes. Downloads, external URLs, and archival pages retain native anchors.
The two 2015 Japanese lectures now use React pages and Fomantic UI, including
their restored second and third chapters; see [the migration notes](docs/TALK_MIGRATION.md).
The User-Generated Variables presentation is served locally at
`/user-generated-variables/`, preserving its original Reveal.js slide format.
`/ugv/` and `/ja/user-generated-variables/` point to that presentation.
Trusted HTML fragments in the existing data go through `HtmlContent`; fixed page
content is ordinary JSX. Shared content uses typed components and page context.

The standalone résumé uses document navigation in both directions, including
`/resume/` and the historical `/resume.html`, to keep its print stylesheet
isolated. The development server rewrites `/resume.html` to `/resume/`; static
exports provide the same URL as a generated HTML file. Main-site documents load
`main.css` followed by the small `design.css` up front, so client navigation
never shows a destination before its styles are ready. Both existing public
stylesheet URLs are preserved.

Widgets unmount with their page, cleaning up listeners, timers, pending history
requests and modal portals. Shared state resets on `beforeHistoryChange`, so a
pending navigation can be cancelled without disabling the current page. Popups
and history fetch compact, localized JSON only when used. Language and section
classes update before painting the destination. Fonts and analytics scripts load once.

## Development

Use Node.js 24 and the checked-in lockfile. No global Gulp installation is needed.

```sh
npm ci
npm run dev
```

The development command prepares assets first, then starts `next dev --webpack`.
It watches source assets, data, styles, Fomantic files, and build configuration,
debouncing and serializing asset rebuilds. React edits use Next.js hot reload;
reload the browser after static asset changes. A failed asset rebuild is logged
and retried after another source edit without stopping an already running server.

Pass Next.js options through npm, for example:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3000
```

## Build, test, and preview

```sh
npm run build
npm run typecheck
npm test
npm run preview
```

`npm run build` prepares assets, runs `next build --webpack`, then finalizes
`out/` into `dist/`. Asset preparation compiles LESS, builds the existing
interaction bundles, converts BibTeX, copies archival HTML/downloads, and emits
RSS, the sitemap, and blog redirects. Finalization preserves the old
`/resume.html` URL alongside `/resume/`, purges styles, and creates gzip assets.

`npm test` runs type checking, data unit tests, and the migration verifier's unit
tests. The independent baseline comparison below is a separate integration check.

Preview serves the actual exported files at http://127.0.0.1:4174, including
directory redirects and the exported 404 page. Build again to update the preview.
Use `npm run preview -- --port 8080` to change the port; pass `--host` explicitly
if a non-loopback interface is needed.

The existing GitHub Pages workflow still uploads `dist/`. Both `.nojekyll` and
`CNAME` are generated so Next.js assets and the custom domain continue to work.

## Browser regression checks

Build the production export before running Playwright:

```sh
npm run build
npx playwright install chromium
npx playwright test
```

The suite covers desktop and phone navigation, slow page loading without a dark
background flash, English/Japanese switches, Back/Forward, year routes, contact
anchors, menus, modals, tag popups, citations, and links embedded in trusted HTML.
It also checks keyboard controls, clipboard feedback, lazy history retry,
on-demand embeds, cold deep links without JavaScript, and navigation that keeps
the document without requesting legacy widget scripts.

For a route sweep and an optional comparison with a previous export:

```sh
SITE_BASELINE=/path/to/previous/dist node --import tsx scripts/check-browser.ts
```

Without `SITE_BASELINE`, it checks the current export. The comparison saves
screenshots and `site-qa/navigation/report.json`, measures five menu transitions,
and compares nine representative pages at desktop and phone widths. External
requests are blocked for repeatability. For an old baseline, the timing scenario
deliberately delays jQuery by 1.2 seconds; the React candidate no longer requests
it. Results are a controlled regression measurement, not an estimate of every
visitor's connection. Seven historical redirects are listed separately, while
their unchanged markup is checked by the static verifier.

The optional screenshot comparison remains pixel-strict: re-encoded images and
lazy loading can produce expected nonzero image diffs. Review those screenshots,
image dimensions and page geometry alongside the optimized markup verifier;
do not interpret that pixel-only failure as a content regression or silently
accept an unexplained layout change.

## Responsive images and incremental cache

Asset preparation uses `sharp` as a required build dependency to create static WebP
derivatives under `public/_images/`. Keep optional npm packages enabled when
installing (`npm ci`), as Next's SWC and sharp's native encoders need them. The
original files and URLs under `src/` are copied unchanged, so downloads,
full-resolution modal targets, archival pages, and external images retain their
original content. SVG, GIF, and animated WebP/PNG files are not converted.

Images use their intrinsic aspect ratio without cropping or upscaling. Icon
candidates are 32/64/96/160/320px, project thumbnails 160/320/480/640/960px,
and other raster images 320/640/960/1280/1920px, capped at the source width.
PNG graphics use WebP quality 90 to retain text and linework; photographs use
quality 84, with alpha quality 100. A derivative larger than its source is
discarded. Responsive `sizes`/`srcset` let the browser choose for its layout and
pixel density. Full-resolution originals remain available for closer inspection.

The full manifest in `site/generated/images.json` is build-only. Each page gets
only the image entries used by its rendered markup, rather than adding the
all-site image list to a shared browser bundle. Intrinsic dimensions, fallback
source URLs, and stable content-addressed derivative URLs travel with those
page entries. `npm run typecheck` only ensures a tiny manifest placeholder on a
fresh checkout; `npm run build` always creates the real manifest and outputs.

`.cache/site-images/` is a disposable, ignored incremental cache that survives
`npm run clean`. Each entry hashes the original bytes, resize/encoding settings,
pipeline version, and all sharp/libvips encoder versions. An unchanged input
needs no decode/resize/encode on a warm build. Missing or damaged entries are
regenerated, and a cache miss never prevents a complete export. Every successful
pass removes obsolete entries and rebuilds the public derivative directory, so
deleted or changed sources do not accumulate there. Remove `.cache/site-images/`
explicitly to test a completely cold build.

Both publishing workflows restore/save this directory with `actions/cache`.
Exact keys cover the source image set, platform, lockfile, and image pipeline;
prefix restores reuse unchanged entries when images are added or edited. Pure
text changes reuse the same snapshot. Only current content remains in each
snapshot; GitHub manages older immutable snapshots under its cache retention
and storage limits. Derivatives, cache data, and generated manifests are not
committed to Git. The build log reports image transforms, cache hits, and
pruned entries. Cache/invalidation coverage is included in `npm test`.

## Blog redirects

Normal builds use `scripts/blog-redirections.json` to generate the 87 historical
blog redirects without contacting the blog. Refresh that snapshot explicitly:

```sh
npm run assets -- --refresh-redirects
```

Review and commit the updated JSON, then rebuild. If the fetch fails, the current
snapshot is retained with a warning; a missing or invalid snapshot fails the build.

## Migration parity

Build the original Pug site at commit `4a40653` in a separate worktree so it
cannot overwrite the React build or require old templates in this branch:

```sh
git worktree add --detach ../arcatdmz.github.io-baseline 4a40653
(cd ../arcatdmz.github.io-baseline && npm ci --omit=optional && npm run build)
npm run build
npm run test:parity
```

The original build contacts the blog for redirects, so check that step succeeded.
The default baseline is `../arcatdmz.github.io-baseline/dist`. An existing baseline
can be supplied explicitly:

```sh
npm run test:parity -- --baseline /path/to/baseline/dist --json parity-report.json
```

The default comparison remains strict. For the responsive-image and React-widget
optimizations, opt into the separately tested contracts:

```sh
npm run test:parity -- --optimized --baseline /path/to/baseline/dist --json parity-report.json
```

Both modes compare full rendered text, metadata, authored links/data attributes,
inline styles, stylesheet order, public assets, feeds, redirects and URL targets.
The optimized mode validates each allowed change before comparison:

- Responsive image originals, intrinsic dimensions, fallback and every `srcset`
  candidate must match `site/generated/images.json` and that route's serialized
  image props. Added `sizes`, loading/decoding and avatar priority must match their
  component/layout contract. Authored dimensions, styles, alt text and download
  links remain strict. Original and derivative URLs must exist in the export.
- Widget accessibility/state attributes and classes are checked only on their
  documented sidebar, dropdown, popup, modal, clipboard and history elements.
  Inline popup IDs must match their triggers; all original content stays compared.
- An empty `data-url` embed may gain only the exact icon and placeholder image
  specified by its unchanged parent data. No arbitrary children are discarded.
- Only the two Live Tuning illustrations may replace their exact `display:none`
  hover style with the reviewed opacity rules. The exact Design stylesheet link
  may be added immediately after the main stylesheet for client navigation.
- Every baseline CSS rule must remain in its original relative order. Reviewed
  widget rules must be present and unchanged; unreviewed overrides of existing or
  approved selectors fail. Additional retained vendor selectors remain listed in
  the report. Archival HTML, CSS and scripts remain byte-identical.
- Each SSG route's complete exported JSON props must equal its HTML's serialized
  props, covering client-navigation data as well as initial document content.

Use the supported Next export renderer (`npm run build`) before verification.
The old `--render` shortcut is explicitly unsupported: it bypassed `getStaticProps`,
`_app` providers and router context. Browser behavior still needs the browser
suite; markup parity does not simulate interaction.

Verifier unit tests do not need a baseline: `npm run test:verifier`. Existing
broken links are reported separately from regressions. The only content-link
exception is that five existing translation links now point to their replacement
`pages/**/index.tsx` source on the same GitHub `main` branch instead of the removed
Pug files.

Time-dependent server-rendered content uses the generated build clock, including
project year ranges and relative dates, so an old export hydrates consistently
after a calendar-year change. Rebuild to refresh these values.

## See also

- [arcatdmz/blog](https://github.com/arcatdmz/blog): blog.junkato.jp source code

---

https://github.com/arcatdmz/arcatdmz.github.io
