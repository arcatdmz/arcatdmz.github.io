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
rendering. This first migration keeps Fomantic and locally bundled jQuery 3.2.1
behind a React effect bridge (`site/components/SiteRuntime.tsx`). Existing menus
and widgets still use the original interaction code; they have not all been
rewritten as React components.

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

The verifier compares rendered markup, metadata, styles, public assets, redirects,
and URL targets while ignoring framework-only differences. Its unit tests do not
need a baseline: `npm run test:verifier`. Existing broken links are reported
separately from regressions. The only content-link exception is that five existing
translation links now point to their replacement `pages/**/index.tsx` source on
the same GitHub `main` branch instead of the removed Pug files.

Time-dependent server-rendered content uses the generated build clock, including
project year ranges and relative dates, so an old export hydrates consistently
after a calendar-year change. Rebuild to refresh these values.

## See also

- [arcatdmz/blog](https://github.com/arcatdmz/blog): blog.junkato.jp source code

---

https://github.com/arcatdmz/arcatdmz.github.io
