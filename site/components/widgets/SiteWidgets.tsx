import { useRouter } from "next/router";
import { useEffect, useState, type ReactNode } from "react";

import {
  ModalState,
  WidgetContext,
} from "@/site/components/widgets/WidgetContext";

/** React owns all widget state. Pending/cancelled navigation leaves it untouched. */
export function SiteWidgets({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const [popup, setPopup] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest("[data-site-popup], [data-site-popup-trigger]"))
        setPopup(null);
      if (!target?.closest(".ui.sidebar, .sidebar-button")) setSidebar(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // A popup can contain keyboard-focusable links. Restore its trigger
        // before hiding those links, instead of stranding focus on the body.
        const active = document.activeElement;
        const popupId = active
          ?.closest("[data-site-popup]")
          ?.getAttribute("data-site-popup");
        if (popupId)
          document
            .querySelector<HTMLElement>(
              `[data-site-popup-trigger="${CSS.escape(popupId)}"]`,
            )
            ?.focus();
        if (active?.closest(".ui.sidebar"))
          document.querySelector<HTMLElement>(".sidebar-button")?.focus();
        setPopup(null);
        setSidebar(false);
        setModal(null);
      }
    };
    // Unlike routeChangeStart, this event occurs only when Next commits the route.
    const commit = (url: string) => {
      if (url.split("#")[0] !== router.asPath.split("#")[0]) {
        setPopup(null);
        setSidebar(false);
        setModal(null);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    router.events.on("beforeHistoryChange", commit);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
      router.events.off("beforeHistoryChange", commit);
    };
  }, [router.events, router.asPath]);
  return (
    <WidgetContext.Provider
      value={{ sidebar, setSidebar, popup, setPopup, modal, setModal }}
    >
      {children}
    </WidgetContext.Provider>
  );
}
