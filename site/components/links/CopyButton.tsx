import { useEffect, useRef, useState } from "react";
import {
  Button,
  Popup as FomanticPopup,
  type ButtonProps,
} from "react-fomantic-ui";

import { useTransition } from "@/site/hooks/useTransition";

/** Clipboard feedback follows the real operation, including a selectable fallback. */
export function CopyButton({
  children,
  as: Element = Button,
  ...props
}: ButtonProps & {
  "data-clipboard-text"?: string;
  lang?: "en" | "ja";
}) {
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);
  const motion = useTransition(!!status, "scale", 200);
  const lastStatus = useRef(status);
  if (status) lastStatus.current = status;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);
  const copy = async (anchor: HTMLAnchorElement) => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(props["data-clipboard-text"] || "");
        copied = true;
      }
    } catch {
      /* Browsers may deny the async API; retain the synchronous fallback. */
    }
    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = props["data-clipboard-text"] || "";
      textarea.style.cssText = "position:fixed;left:-9999px;top:0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        /* Leave truthful feedback. */
      }
      textarea.remove();
      anchor.focus();
    }
    if (!mounted.current) return;
    setStatus(copied ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), copied ? 1000 : 4000);
  };
  const { lang, ...anchorProps } = props;
  const ja = lang === "ja";
  return (
    <FomanticPopup
      open={motion.present}
      on={[]}
      position="left center"
      positionFixed
      role="status"
      className={motion.className}
      style={motion.style}
      onAnimationEnd={motion.onAnimationEnd}
      trigger={
        <Element
          as="a"
          {...anchorProps}
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.preventDefault();
            void copy(event.currentTarget);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.currentTarget.click();
            }
          }}
        >
          {children}
        </Element>
      }
    >
      {lastStatus.current === "copied"
        ? ja
          ? "BibTeXをクリップボードにコピーしました！"
          : "Copied the BibTeX entry to your clipboard!"
        : ja
          ? "コピーできませんでした。BibTeXを選択してコピーしてください。"
          : "Copy failed. Please select and copy the BibTeX text."}
    </FomanticPopup>
  );
}
