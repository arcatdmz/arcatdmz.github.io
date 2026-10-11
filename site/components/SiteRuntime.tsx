import { runDeferredScripts } from "@/site/deferred-scripts";
import { getDocumentMetadata, resolveReactHref } from "@/site/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/router";

type SiteWindow = Window & {
  lang: "en" | "ja";
  en: boolean;
  basePath: string;
  dataLayer?: unknown[];
  Typekit?: { load: (options: unknown) => void };
  siteInteractions?: {
    initialize: (view: "index" | "design" | "default") => () => void;
  };
  twttr?: { widgets?: { load: (root: HTMLElement) => void } };
  FB?: { XFBML?: { parse: (root: HTMLElement) => void } };
};
const scripts = new Map<string, Promise<void>>();
function loadScript(src: string): Promise<void> {
  const existing = scripts.get(src);
  if (existing) return existing;
  const loaded = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scripts.delete(src);
      script.remove();
      reject(new Error(`Unable to load ${src}`));
    };
    document.body.appendChild(script);
  });
  scripts.set(src, loaded);
  return loaded;
}
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Load the retained widget library once, then own one initialization per page. */
export function SiteRuntime() {
  const router = useRouter();
  const pageKey = router.asPath.split("#")[0];
  const dispose = useRef<(() => void) | undefined>(undefined);
  useBrowserLayoutEffect(() => {
    const metadata = getDocumentMetadata(router.pathname);
    document.documentElement.lang = metadata.language;
    document.body.classList.remove(
      "with-rail",
      "without-header-menu",
      "design",
    );
    if (metadata.bodyClass)
      document.body.classList.add(...metadata.bodyClass.split(" "));
    const root = document.getElementById("__next");
    root?.classList.toggle("pushable", !!document.querySelector("#pusher"));
    const site = window as unknown as SiteWindow;
    site.lang = metadata.language as "en" | "ja";
    site.en = site.lang === "en";
    site.basePath = site.en ? "/" : "/ja/";
  }, [router.pathname]);

  useEffect(() => {
    const cleanup = () => {
      dispose.current?.();
      dispose.current = undefined;
    };
    // Clean detached modal/popup nodes before React removes the previous page.
    const beforeNavigation = (url: string) => {
      if (url.split("#")[0] !== pageKey) cleanup();
    };
    router.events.on("routeChangeStart", beforeNavigation);
    return () => {
      router.events.off("routeChangeStart", beforeNavigation);
      cleanup();
    };
  }, [router.events, pageKey]);

  useEffect(() => {
    const root = document.getElementById("__next");
    if (!root?.querySelector("#pusher")) return;
    const controller = new AbortController();
    let cleanup: (() => void) | undefined;
    void (async () => {
      try {
        await loadScript("/javascripts/vendor/jquery.min.js");
        if (controller.signal.aborted) return;
        await loadScript("/javascripts/views/runtime.js");
        if (controller.signal.aborted) return;
        const pathname = router.pathname.replace(/^\/ja(?=\/|$)/, "");
        const view =
          !pathname || pathname === "/"
            ? "index"
            : pathname === "/design"
              ? "design"
              : "default";
        cleanup = (
          window as unknown as SiteWindow
        ).siteInteractions?.initialize(view);
        await runDeferredScripts(document, controller.signal);
        if (controller.signal.aborted) return;
        const site = window as unknown as SiteWindow;
        site.twttr?.widgets?.load(root);
        site.FB?.XFBML?.parse(root);
      } catch (error) {
        if (!controller.signal.aborted)
          console.error("Site interactions could not initialize", error);
      }
    })();
    const stop = () => {
      controller.abort();
      cleanup?.();
      cleanup = undefined;
    };
    dispose.current = stop;
    return stop;
  }, [router.pathname, pageKey]);

  useEffect(() => {
    const navigateWidgetLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[data-site-navigation]")
          : null;
      if (
        !anchor ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      )
        return;
      const href = resolveReactHref(
        anchor.getAttribute("href") || undefined,
        router.asPath,
      );
      if (!href) return;
      event.preventDefault();
      void router.push(href);
    };
    document.addEventListener("click", navigateWidgetLink);
    return () => document.removeEventListener("click", navigateWidgetLink);
  }, [router]);

  // Fonts and analytics are document-level resources, not page-level widgets.
  useEffect(() => {
    const site = window as unknown as SiteWindow;
    const html = document.documentElement;
    html.classList.add("wf-loading");
    const fallback = () => {
      html.classList.remove("wf-loading");
      html.classList.add("wf-inactive");
    };
    const timer = window.setTimeout(fallback, 3000);
    void loadScript("https://use.typekit.net/tor0txx.js")
      .then(() => {
        try {
          site.Typekit?.load({
            kitId: "tor0txx",
            scriptTimeout: 3000,
            async: true,
          });
        } catch {
          fallback();
        }
      })
      .catch(fallback);
    site.dataLayer = site.dataLayer || [];
    function gtag(..._args: unknown[]) {
      site.dataLayer!.push(arguments);
    }
    gtag("js", new Date());
    void loadScript(
      "https://www.googletagmanager.com/gtag/js?id=G-W5KXWN8CJD",
    ).catch(() => {});
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const site = window as unknown as SiteWindow;
    site.dataLayer = site.dataLayer || [];
    // gtag reads array-like arguments objects from this queue.
    function gtag(..._args: unknown[]) {
      site.dataLayer!.push(arguments);
    }
    gtag("config", "G-W5KXWN8CJD", { page_path: router.asPath });
  }, [router.asPath]);
  return null;
}
