import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { createPageTracker, measurementId } from "@/site/analytics";
import { loadScript } from "@/site/load-script";

const displayDelay = 200;
const minimumVisibleTime = 200;

/** Mount once outside the keyed page so pending transitions share one bar. */
export function useRouteProgressAndTracking() {
  const router = useRouter();
  const pageKey = router.asPath.split("#")[0];
  const trackPage = useRef<ReturnType<typeof createPageTracker> | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    NProgress.configure({
      showSpinner: false,
      speed: reducedMotion ? 0 : 200,
      trickle: !reducedMotion,
    });

    let pendingUrl: string | null = null;
    let shownAt = 0;
    let showTimer: number | undefined;
    let finishTimer: number | undefined;

    const show = () => {
      if (pendingUrl === null) return;
      // NProgress removes its DOM asynchronously after done(). Wait for that
      // fade to finish so an old completion cannot remove a new route's bar.
      if (!NProgress.isStarted() && NProgress.isRendered()) {
        showTimer = window.setTimeout(show, 50);
        return;
      }
      NProgress.start();
      shownAt = performance.now();
      const progress = document.getElementById("nprogress");
      progress?.setAttribute("role", "progressbar");
      progress?.setAttribute(
        "aria-label",
        document.documentElement.lang === "ja"
          ? "ページを読み込み中"
          : "Loading page",
      );
      progress?.querySelector(".bar")?.setAttribute("aria-hidden", "true");
    };

    const start = (url: string, { shallow }: { shallow: boolean }) => {
      if (shallow) return;
      pendingUrl = url;
      window.clearTimeout(showTimer);
      window.clearTimeout(finishTimer);
      // Retain an already visible bar across consecutive transitions.
      if (!NProgress.isStarted())
        showTimer = window.setTimeout(show, displayDelay);
    };
    const finish = (url: string, { shallow }: { shallow: boolean }) => {
      if (shallow || url !== pendingUrl) return;
      pendingUrl = null;
      window.clearTimeout(showTimer);
      if (NProgress.isStarted()) {
        finishTimer = window.setTimeout(
          () => NProgress.done(),
          Math.max(0, minimumVisibleTime - (performance.now() - shownAt)),
        );
      }
    };
    const fail = (
      _error: unknown,
      url: string,
      options: { shallow: boolean },
    ) => finish(url, options);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", finish);
    router.events.on("routeChangeError", fail);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", finish);
      router.events.off("routeChangeError", fail);
      window.clearTimeout(showTimer);
      window.clearTimeout(finishTimer);
      NProgress.done();
    };
  }, [router.events]);

  // Route events can precede React and next/head committing the destination.
  // Track from an effect so pending/cancelled routes never count as page views.
  useEffect(() => {
    if (!router.isReady) return;
    const site = window as Window & { dataLayer?: unknown[] };
    if (!trackPage.current) {
      site.dataLayer = site.dataLayer || [];
      trackPage.current = createPageTracker(site.dataLayer);
      void loadScript(
        `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
      ).catch(() => {});
    }
    trackPage.current({
      location: window.location.href,
      title: document.title,
      referrer: document.referrer,
    });
  }, [router.isReady, pageKey]);
}
