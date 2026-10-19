# React migration review

Baseline: `4a40653` (`main` at the start of the migration).
Working branch: `refactor/react-static-site`.
Initial validation: 2026-10-11. Content repair validation: 2026-10-14.

## Result

Current English/Japanese pages are editable React/TypeScript components, rendered
by Next.js static export. The production artifact remains `dist/` for GitHub
Pages; there is no production Node.js server. Original images, downloads, data,
BibTeX content, styles, and historical pages remain in the repository.

Pug templates and the Pug page-rendering pipeline have been removed. Shared
navigation, headers, footers, project/publication/timeline content, and rich-text
helpers live in `site/`; shared page content lives in `components/`, with routes
in `pages/`. See [CONTENT_AUTHORING.md](CONTENT_AUTHORING.md) for current editing
instructions.

The initial migration retained Fomantic/jQuery interactions behind a
post-hydration compatibility boundary. Current React pages use native React
widgets and Fomantic CSS without loading jQuery or Fomantic JavaScript. Historical
standalone sites and old documentation remain static HTML with their own styles
and vendor scripts.

## Automated checks

The following checks passed on the initial production export (2026-10-11).
The follow-up sections below record later changes and repairs.

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
legacy external redirects reached unavailable/certificate-failing destinations;
they were initially preserved, and browser security warnings were not bypassed.

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

The 2026-10-12 inventory found 60 broken local references across 19 pages, with
23 distinct destinations; 60 embed initialization errors across 40 pages; and
five entry routes leading to unavailable legacy external destinations. The two
counts of 60 describe separate problems. L1–L10, E1, and R1–R5 below are the
original issue identifiers; all are resolved.

### Local reference repairs (L1–L10)

| ID  | Original problem                                                                                   | Repair                                                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L1  | `/in-the-wild/` linked to `/ja/undefined` in three language controls                               | [Language-switch validation](../site/navigation.ts) hides switches when the page identifier or counterpart is missing; the homepage identifier `""` remains valid.                                                      |
| L2  | `/ja/timeline/2010/` linked to a nonexistent English year page in three places                     | The same validation hides all three switches for 2010 and retains them for years with both languages.                                                                                                                   |
| L3  | Two timeline links used `/ja/blog/2015/5/3/acm-chi2015-japan/`                                     | [History data](../src/data/histories.json) now points to the blog's `/ja/posts/2015-05-03-acm-chi2015-japan/` article. A separate unpadded external URL for the same article was also corrected.                        |
| L4  | Four references to missing f3.js presentation slides                                               | Restored [interaction2016-kato-f3js-slides.pdf](../src/publications/interaction2016-kato-f3js-slides.pdf), preserving the BibTeX destination.                                                                           |
| L5  | Eleven archival pages lacked `/css/bootstrap.min.css` and `/css/main.css` (22 references)          | Restored both stylesheets, `jp.png`/`us.png`, and five Glyphicons font formats under `src/css/` and `src/fonts/`. Affected pages were English/Japanese Fun, two `.old/` lecture pages, and seven TextAlive API samples. |
| L6  | Two old lectures and TextAlive `embed-6.html` lacked slider CSS (three references)                 | Restored `rangeslider.css` under both `src/talks/as-a-code/` and `src/talks/people-are-programmers/`.                                                                                                                   |
| L7  | Seven TextAlive API samples lacked syntax-highlighting CSS                                         | Restored `prism.css`, keeping their relative references.                                                                                                                                                                |
| L8  | Two old Japanese lecture pages linked to nonexistent English versions (four references)            | Removed their header/footer language links and empty menu items.                                                                                                                                                        |
| L9  | The old people-are-programmers page referenced a photograph and nine slides in the wrong directory | Corrected all ten image paths to `/ja/talks/people-are-programmers.old/`.                                                                                                                                               |
| L10 | UGV referenced an obsolete TextAlive demo and a missing thumbnail                                  | Replaced the demo with a TextAlive song-page link for “I think of you” and used `/images/thumbnails/live-tuning.png`. Interactive demo restoration remains deferred below.                                              |

L1–L4 were completed on 2026-10-13, reducing broken references from 60 to 48
(12 pages, 19 destinations). L5–L10 were completed on 2026-10-14, reducing the
remaining count to zero. Five CSS files, two flag images, and five font files
were recovered from the old VPS's `~/www/jk_old`; downloaded, source, and exported
copies matched byte for byte, and restored CSS referenced existing local assets.
Edit archival HTML and assets under `src/`, rather than their generated copies
in `public/`, `out/`, or `dist/`.

Restoring the lecture chapters exposed one additional missing download:
[spro2014-kato-live-condensed.pdf](../src/publications/spro2014-kato-live-condensed.pdf),
linked from people-are-programmers chapter 2. It was recovered from the old
VPS's `~/www/jk_old/publications/`. The final 2026-10-14 export contained 296 HTML
pages and 23,335 local references with zero missing targets. The original and
all source/export copies of that PDF had matching SHA-256 hashes; preview
responses for the chapter and PDF were HTTP 200 with the expected PDF content.

Desktop (1440×900) and phone (390×844) screenshots checked Fun, the two old
lectures, TextAlive API sample 6, and UGV's song link and thumbnail. External
widgets were blocked, so these checks establish local rendering and asset
availability, rather than external playback or restored demo functionality.

### Embed initialization repair (E1)

The old initializer called Fomantic's `.embed()` on wrappers that already held
iframes with nonempty `src` values but lacked `data-url` or `data-source`/`data-id`.
It added empty `.embed` children and logged `Embed: No URL specified`; the problem
was initialization, rather than missing video or slide URLs.

Native React widgets introduced in `02405a0` removed this mismatch.
[SiteRuntime](../site/components/SiteRuntime.tsx) no longer calls the legacy
initializer. A 2026-10-14 browser sweep of all 40 affected pages and 60 iframe
elements found zero such errors and zero extra empty embed children. English
and Japanese VisionSketch PDF embeds also created exactly one correctly sourced
iframe after activation and none before it. External playback was outside this
check; current embed authoring is documented in
[CONTENT_AUTHORING.md](CONTENT_AUTHORING.md#images-embeds-and-interactive-content).

### Local restoration of legacy entry routes (R1–R5)

The five routes formerly led, directly or through redirects, to
`http://junkato.digitalmuseum.jp/ja/talks/{slug}` or
`http://junkato.digitalmuseum.jp/user-generated-variables`. On 2026-10-14 they
were restored locally:

| ID  | Entry                               | Current destination                                                        |
| --- | ----------------------------------- | -------------------------------------------------------------------------- |
| R1  | `/ja/talks/as-a-code/`              | All three chapters restored from the old VPS's PHP sources as React pages. |
| R2  | `/ja/talks/people-are-programmers/` | All three chapters restored as React pages.                                |
| R3  | `/user-generated-variables/`        | Local PX/17 slides in their original Reveal.js format.                     |
| R4  | `/ja/user-generated-variables/`     | Internal redirect to `/user-generated-variables/`.                         |
| R5  | `/ugv/`                             | Internal redirect to `/user-generated-variables/`.                         |

The [lecture migration section](#follow-up-2015-lecture-pages) records chapter
URLs, `.old/` redirects, the Fomantic layout conversion, and restored
code-execution demos.

The [UGV document](../src/user-generated-variables/index.html) preserves slide
navigation and code-detail views, reusing styles, fonts, and scripts under
`/user-generated-variables.old/` at restoration time. Those assets were moved to
`/user-generated-variables/` on 2026-10-20; the old entry URL remains a redirect.
Script references are absolute and the external
font uses HTTPS. The obsolete HTTP f3.js iframe became a project link; the
TextAlive song link from L10 was retained. Project listings now link to the local
presentation, and `/user-generated-variables.old/` redirects there. Development
rewrites and static hosting expose the same presentation URL. The existing
`/science/` and `/user-interface-design/` internal redirects are unrelated to R1–R5.

The 2026-10-14 build and tests passed. Six desktop/phone
[UGV browser checks](../tests/browser/legacy-presentation.spec.ts) verified entry
routes, document navigation from project listings, slide controls, hash URLs,
code details, and the PDF link. Screenshots and development-server responses
were also checked. These changes restore local access without repairing the
former external server or its certificate.

### Archival cleanup (2026-10-20)

The owner retired English/Japanese Fun and all old TextAlive API samples. Fun
pages are removed. Historical `/textalive/embed/` entry and sample-page URLs
redirect to `https://developer.textalive.jp/` through generated static HTML;
development uses HTTP redirects. The API sample CSS/JavaScript is no longer
published. See [legacy-redirects.ts](../scripts/legacy-redirects.ts).

UGV was compared with the original `4a40653` document: all 33 sections and their
IDs/order, plus all 32 headings, match. Slide text differs only by the previously
added replacement links for the TextAlive and f3.js demos. The old index was
already a redirect, but the current presentation still used `.old/` assets.
Those assets were moved into `src/user-generated-variables/`, all references
were updated, and the old source directory was removed. Its historical entry
still redirects while retaining query parameters and the slide hash. The speaker
notes' missing Markdown script and unused conversion branch were removed because
the presentation has no Markdown notes; HTML notes remain supported.

### Deferred functionality

| Content                          | Remaining work                                                                 | Current fallback                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| people-are-programmers chapter 3 | Restore three TextAlive API demos: time input, petal count, and zoom controls. | Explanation and TextAlive links; see [TextAlive API demo details](#deferred-textalive-api-demos). |
| UGV presentation                 | Restore TextAlive variable proposals/code updates and the in-slide f3.js demo. | Links to the TextAlive song page and f3.js project.                                               |

The old UGV script `js/vendor/px17.js` prefixed its `/videos/new` URL with
`http://textalive.jp`; that relative URL was initially counted as a local missing
target. Reproducing its operations requires a separate implementation, possibly
using `textalive-api`. If private registry packages are needed, configure their
authentication through a GitHub Actions secret such as `TEXTALIVE_NPM_TOKEN`.
The link replacements introduced no private packages or authentication settings.

Improving UGV slides' phone readability is optional: the current Reveal.js layout
scales the original slide canvas down, leaving small text.

### External content and anchors

A subsequent 2026-10-14 audit checked 1,377 external URLs and 2,206 internal
anchor references. Two resume anchor targets were corrected; the rebuilt HTML
has no missing anchor targets. External failures, replacement URLs, and the
remaining playback or publication-setting tasks are recorded in
[EXTERNAL_CONTENT_AUDIT.md](EXTERNAL_CONTENT_AUDIT.md), with per-URL results in
[EXTERNAL_LINK_AUDIT.csv](EXTERNAL_LINK_AUDIT.csv).

That audit owns the individual link replacements, publication/access settings,
playback checks, retirement of old TextAlive API samples, and legacy script cleanup. It records 49 embedded URLs and seven API sample pages
alongside the URL inventory; these are inspection counts, rather than counts of
unresolved issues. Third-party maps, videos, and social widgets still depend on
external services. Initial settled Maps and TextAlive renders matched the
baseline, but do not establish every service's current availability.

### Rechecking content repairs

- After a build, use `localReferences` / `targetExists` in
  [verify-site.ts](../scripts/verify-site.ts) to inspect `dist/`. A baseline's
  `existingBrokenUrls` is a historical inventory, not an exemption for an
  unresolved defect. Check script loads separately; this reference scan excludes
  JavaScript script elements.
- Use `npm run preview` to inspect archival CSS, images, and layout, plus current
  language switches and document links.
- Check English/Japanese embeds and PDF activation for `Embed: No URL specified`
  and extra empty `.ui.embed > .embed` elements. Distinguish initialization and
  missing local resources from external playback; follow the external audit for
  service checks without bypassing certificate validation.
- Run `npm test` and the relevant browser checks, including
  `tests/browser/talks.spec.ts` and `tests/browser/legacy-presentation.spec.ts`
  for lecture or UGV changes.

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

## Follow-up: 2015 lecture pages

On 2026-10-14, all three chapters of each of the two lectures were restored from
the PHP sources under `~/www/jk_old` on the old VPS (accessible through `ssh dm`).
The saved `.old/index.html` documents contained only chapter 1, so chapters 2
and 3 were recovered from the original sources.

| Lecture                                              | Original source                                       | Current content                                                        |
| ---------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| \* as a Code                                         | `~/www/jk_old/talks/as-a-code/index.php`              | [as-a-code.tsx](../site/talks/as-a-code.tsx)                           |
| ぼくらのプログラミングから、みんなのプログラミングへ | `~/www/jk_old/talks/people-are-programmers/index.php` | [people-are-programmers.tsx](../site/talks/people-are-programmers.tsx) |

The Japanese PHP routes originally included those shared sources. The migration
retains the original prose and linked slides as editable JSX. Bootstrap
navigation, grids, labels, forms, and buttons now use Fomantic UI, with the site's
shared header, sidebar, and footer. Lecture-specific CSS is included in
`main.css` so it is available before client navigation. Neither lecture has an
English counterpart, so language switches are hidden.

### Lecture URLs

Both lectures use the following URL structure, with `slug` equal to `as-a-code`
or `people-are-programmers`:

| URL                                | Content                                                      |
| ---------------------------------- | ------------------------------------------------------------ |
| `/ja/talks/{slug}/` / `index.html` | Chapter 1                                                    |
| `/ja/talks/{slug}/p1.html`         | Redirect to chapter 1                                        |
| `/ja/talks/{slug}/p2.html`         | Chapter 2                                                    |
| `/ja/talks/{slug}/p3.html`         | Chapter 3                                                    |
| `/ja/talks/{slug}/?p=2` / `?p=3`   | Redirect to the requested chapter when JavaScript is enabled |
| `/ja/talks/{slug}.old/`            | Redirect to the migrated lecture                             |
| `/ja/talks/as-a-code/ide/`         | Restored simple IDE                                          |
| `/ja/talks/as-a-code.old/ide.html` | Redirect to the simple IDE                                   |

Chapter links use Next Link. The development server rewrites `index.html`, while
static hosting uses directory indexes. [finalize-export.ts](../scripts/finalize-export.ts)
normalizes Next's exported chapter filenames to these `.html` URLs. Images keep
using the existing files under the `.old/` directories.

### Code execution demos

The discontinued jsdo.it embeds, RawGit CDN, and old Ace/EaselJS/jQuery
dependencies were removed. `CodePlayground` provides a text editor and Canvas
for the chapter 2 static drawing demo and the simple IDE in chapter 3 and its
standalone page.

- A 128×128 drawing surface supports `color(r, g, b)`, `dot(x, y)`,
  `line(x, y, ex, ey)`, and `print(text)`.
- Editing runs the code automatically; the Run button also executes it.
- Each run uses a new Web Worker with a one-second timeout. Leaving the page
  releases the timer and Worker.
- Static drawings can be shared through `p2.html?code=...`; the simple IDE can
  save code in browser localStorage.
- A local, pinned copy of the original JS-Interpreter preserves the ES5 execution
  environment. Interpreted code has no DOM or network API access. Its license and
  recovery source are included under `src/talks/as-a-code/vendor/`.

The chapter 1 browser-console examples remain as historical lecture content;
they do not restore the old Twitter widgets.

### Deferred TextAlive API demos

Three API demos in `people-are-programmers/p3.html` remain deferred. Explanations
and TextAlive links replace the inactive controls; the existing YouTube demo
videos remain.

| Original element | Demo                                    | Original control                                    |
| ---------------- | --------------------------------------- | --------------------------------------------------- |
| `#tapl1`         | Render a video as a function of time    | Enter 0–15000 ms and render a frame with `v = f(t)` |
| `#tapl2`         | Adjust an effect through UI metadata    | Set the number of petals from 3 to 30, initially 5  |
| `#tapl3`         | Independent time and spatial resolution | Set zoom from 1 to 100 in steps of 0.001            |

The original implementation remains at the end of the VPS's
`talks/people-are-programmers/index.php`, under `if ($page == 3)`. It depends on
the HTTP `textalive.jp/javascripts/api/embed-v1.js` script and the old rangeslider.

### Lecture validation

On 2026-10-14, type checking, the static build, and six desktop/phone
[lecture browser checks](../tests/browser/talks.spec.ts) passed. Screenshots
confirmed the layout. Checks covered all six chapters, chapter links and Back
navigation, compatibility redirects, image loading and aspect ratios, and
horizontal overflow. Code execution checks covered drawing, shared URLs,
computed results, errors, infinite-loop interruption, and save/reload behavior.
