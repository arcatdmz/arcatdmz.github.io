# Google Analytics

The React site uses GA4 measurement ID `G-W5KXWN8CJD`. `SiteRuntime` loads the
Google tag once per document and creates a tracker from `site/analytics.ts`.

The tracker calls `config` once with `send_page_view: false`, then sends an
explicit `page_view` after each committed page change. Repeating `config` does
not provide reliable SPA page tracking; Google specifies that it should be
[called once per tag](https://developers.google.com/tag-platform/gtagjs/configure).

Each view includes the absolute URL (including query parameters, excluding the
fragment), the committed document title, and the previously tracked page URL as
its referrer. The initial view uses `document.referrer`. Metadata is also set for
subsequent interaction events. Hash navigation, repeated renders, pending routes,
and cancelled navigation do not add views. Returning to a previously visited
page does add a view. Commands queue while the tag is loading.

This integration owns page-view events. When changing GA4 enhanced measurement
settings, avoid additionally enabling automatic history-based page views.
Google documents that this feature is independent of `send_page_view` and can
[duplicate manually sent views](https://developers.google.com/analytics/devguides/collection/ga4/views).

## Validation

`npm test` checks command ordering, initialization, URL normalization, referrers,
duplicate suppression, and return visits. After a production build, run:

```sh
npx playwright test tests/browser/analytics.spec.ts
```

These desktop/mobile tests cover delayed and blocked tag loading, cold URLs with
queries and fragments, localized titles, history navigation, and cancellation.
They replace or block external scripts so no test events reach Analytics.

The fix was also checked with the actual Google tag: the initial page and three
client transitions produced four `page_view` requests with the expected URLs,
titles, and referrers; fragment-only navigation produced no additional view.
Collection requests were intercepted before reaching Google. This verifies
client request generation; ingestion and reporting require access to the GA4
property's Realtime report or DebugView after deployment.
