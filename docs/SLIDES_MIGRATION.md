# SlideShare archive

Five public presentations are served at `/slides/` and `/ja/slides/`. The existing
Home Hack presentation and the two historical SlideShare links now use local
PDFs. References to other authors' SlideShare presentations remain unchanged.

## Public content boundary

Only the visible slide pages were migrated. The source export contained three
PDFs, one PPT and one PPTX (28,789,207 bytes total). The two PowerPoint files
contain speaker notes, so they are deliberately **not** published. PowerPoint
exported their slides as PDF; neither deck had hidden slides. The original files
remain outside this repository and were verified against the acquisition hashes.

All five public PDFs were rebuilt from their pages with pdf-lib. Document-level
properties, metadata, attachments, non-link annotations and local file actions
are excluded, including unreferenced objects left by annotation removal. The
original export inventory, source service identifiers, user information, notes
and acquisition records are not part of the site or this repository.

`site/slides.json` contains only public titles, language, page counts, byte counts
and SHA-256 checksums. `src/slides/` is an explicit allowlist of five PDFs and one
Home Hack cover image. Tests verify the file set and download checksums.

The PDFs contain 18, 11, 29, 36 and 21 pages respectively. Their total size is
17,701,223 bytes. The largest file is 7,896,757 bytes, below GitHub's 50 MiB warning
threshold and 100 MiB hard limit. The verified complete `dist/` contains
523,527,515 bytes (including gzip assets), below the 1 GB GitHub Pages limit.
Recheck the complete output size before publishing future additions.

Sources for hosting limits:
- https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

PowerPoint-to-PDF conversion preserves static slide faces, not animation or
embedded media playback. Retain the private originals for future conversions.
Do not copy an export directory wholesale into `src/`: its contents are copied
to the public build by the asset pipeline.

## Validation

- TypeScript, six data unit tests and 70 verifier tests pass.
- Production build and static export pass; existing large-page-data warnings
  remain on five unrelated routes.
- The existing browser suite passes 64 tests with two predefined mobile skips.
  The new desktop and mobile archive tests both pass after correcting the
  decorative heading icon's accessible name.
- Browser checks cover all five PDF responses, actual downloads and checksums,
  English/Japanese pages, mobile overflow, Home Hack and menu navigation.
- All 115 PDF pages render; the two converted decks were reviewed page by page.
  PDF object inspection confirms there are no document properties, metadata,
  embedded files, JavaScript or local file actions.
- Prettier and `git diff --check` pass. This repository has no lint script.
