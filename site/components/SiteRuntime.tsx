import { runDeferredScripts } from "@/site/deferred-scripts";
import { useEffect } from "react";
import { useRouter } from "next/router";

type SiteWindow = Window & {
  lang: "en" | "ja";
  en: boolean;
  basePath: string;
  dataLayer?: unknown[];
  Typekit?: { load: (options: unknown) => void };
  $?: unknown;
};
function loadScript(src: string, async = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.body.appendChild(script);
  });
}

/** A small compatibility boundary for the site's existing Fomantic interactions. */
export function SiteRuntime() {
  const router = useRouter();
  useEffect(() => {
    if (!document.querySelector("#pusher")) return;
    document.getElementById("__next")?.classList.add("pushable");
    const site = window as unknown as SiteWindow;
    const lang = document.documentElement.lang === "ja" ? "ja" : "en";
    site.lang = lang;
    site.en = lang === "en";
    site.basePath = site.en ? "/" : "/ja/";
    let cancelled = false;
    const run = async () => {
      try {
        await loadScript("/javascripts/vendor/jquery.min.js");
        if (cancelled) return;
        const pathname = router.pathname.replace(/^\/ja(?=\/|$)/, "");
        const view =
          !pathname || pathname === "/"
            ? "index"
            : pathname === "/design"
              ? "design"
              : "default";
        await loadScript(`/javascripts/views/${view}.js`);
        if (!cancelled) void runDeferredScripts(document);
      } catch (error) {
        console.error("Site interactions could not initialize", error);
      }
    };
    void run();
    const html = document.documentElement;
    html.classList.add("wf-loading");
    const timer = window.setTimeout(() => {
      html.classList.remove("wf-loading");
      html.classList.add("wf-inactive");
    }, 3000);
    void loadScript("https://use.typekit.net/tor0txx.js", true)
      .then(() => {
        window.clearTimeout(timer);
        try {
          site.Typekit?.load({
            kitId: "tor0txx",
            scriptTimeout: 3000,
            async: true,
          });
        } catch {
          /* Original Typekit fallback. */
        }
      })
      .catch(() => {
        /* Font fallback becomes active after the original 3-second timeout. */
      });
    site.dataLayer = site.dataLayer || [];
    // Preserve the existing analytics property without blocking rendering.
    function gtag(..._args: unknown[]) {
      site.dataLayer!.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-W5KXWN8CJD");
    void loadScript(
      "https://www.googletagmanager.com/gtag/js?id=G-W5KXWN8CJD",
      true,
    ).catch(() => {});
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [router.pathname]);
  return null;
}
