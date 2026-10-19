export const measurementId = "G-W5KXWN8CJD";

interface PageView {
  location: string;
  title: string;
  referrer: string;
}

/** One tracker per document; commands also work while gtag.js is downloading. */
export function createPageTracker(dataLayer: unknown[]) {
  // Google consumes array-like arguments objects, rather than ordinary arrays.
  function gtag(..._args: unknown[]) {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", measurementId, { send_page_view: false });

  let previousLocation: string | undefined;
  return (page: PageView) => {
    const location = new URL(page.location);
    location.hash = "";
    const pageLocation = location.href;
    if (pageLocation === previousLocation) return;

    const metadata = {
      page_location: pageLocation,
      page_title: page.title,
      page_referrer: previousLocation ?? page.referrer,
    };
    // Keep subsequent automatic interaction events on the current virtual page.
    gtag("set", metadata);
    gtag("event", "page_view", { ...metadata, send_to: measurementId });
    previousLocation = pageLocation;
  };
}
