import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "react-fomantic-ui";

import { useBrowserLayoutEffect } from "@/site/hooks/useBrowserLayoutEffect";
import { playAttention, useTransition } from "@/site/hooks/useTransition";
import { useWidgets } from "@/site/hooks/useWidgets";

/** Keep the existing inline markup and CSS; only its visibility is React state. */
export function SitePopup({
  trigger,
  children,
  className = "",
  position = "top right",
  hover = true,
  onOpen,
  pinned = false,
  portal = false,
}: {
  trigger: ReactElement<any>;
  children?: ReactNode;
  className?: string;
  position?: string;
  hover?: boolean;
  onOpen?: (anchor: HTMLElement) => void;
  pinned?: boolean;
  portal?: boolean;
}) {
  const widgets = useWidgets();
  const id = useId();
  const open = widgets?.popup === id;
  const motion = useTransition(open, "scale", 200);
  const anchor = useRef<HTMLElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [style, setStyle] = useState<CSSProperties>({
    position: "fixed",
    visibility: "hidden",
  });
  const show = (target: HTMLElement) => {
    clearTimeout(timer.current);
    anchor.current = target;
    widgets?.setPopup(id);
    onOpen?.(target);
  };
  const hide = () => {
    if (!pinned)
      timer.current = setTimeout(
        () => widgets?.setPopup((current) => (current === id ? null : current)),
        180,
      );
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const classes = trigger.props.className?.split(/\s+/) || [];
    if (
      !classes.includes("popup-menu") ||
      !(trigger.type === Button || classes.includes("button"))
    )
      return;
    const element = document.querySelector<HTMLElement>(
      `[data-site-popup-trigger="${CSS.escape(id)}"]`,
    );
    if (element && element.getBoundingClientRect().width)
      return playAttention(element, "bounce");
  }, [id, trigger.props.className]);
  useBrowserLayoutEffect(() => {
    if (!open || !anchor.current || !popup.current) return;
    const positionPopup = () => {
      if (anchor.current && popup.current)
        setStyle(popupPosition(anchor.current, popup.current, position));
    };
    positionPopup();
    window.addEventListener("resize", positionPopup);
    window.addEventListener("scroll", positionPopup, true);
    return () => {
      window.removeEventListener("resize", positionPopup);
      window.removeEventListener("scroll", positionPopup, true);
    };
  }, [open, position, children, motion.present]);
  const popupContent = (
    <div
      ref={popup}
      id={id}
      data-site-popup={id}
      className={`ui popup ${className.replace(
        /\bhidden\b/g,
        "",
      )} ${position} ${motion.className}`}
      style={motion.present ? { ...style, ...motion.style } : undefined}
      onAnimationEnd={motion.onAnimationEnd}
      aria-hidden={!open}
      inert={!open}
      onMouseEnter={() => clearTimeout(timer.current)}
      onMouseLeave={hover ? hide : undefined}
      onClick={(event) => {
        if ((event.target as Element).closest("a[href]"))
          widgets?.setPopup(null);
      }}
    >
      {children}
    </div>
  );
  const triggerProps = trigger.props;
  return (
    <>
      {cloneElement(trigger, {
        "data-site-popup-trigger": id,
        "aria-expanded": open,
        "aria-controls": id,
        tabIndex: triggerProps.tabIndex ?? (triggerProps.href ? undefined : 0),
        role: triggerProps.role ?? (triggerProps.href ? undefined : "button"),
        className: (triggerProps.className || "")
          .replace(/\bhidden\b/g, "")
          .trim(),
        onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
          triggerProps.onMouseEnter?.(event);
          if (hover) show(event.currentTarget);
        },
        onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
          triggerProps.onMouseLeave?.(event);
          if (hover) hide();
        },
        onFocus: (event: React.FocusEvent<HTMLElement>) => {
          triggerProps.onFocus?.(event);
          if (hover) show(event.currentTarget);
        },
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          triggerProps.onClick?.(event);
          if (!triggerProps.href) event.preventDefault();
          show(event.currentTarget);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
          triggerProps.onKeyDown?.(event);
          if (
            (event.key === "Enter" || event.key === " ") &&
            !triggerProps.href
          ) {
            event.preventDefault();
            event.currentTarget.click();
          }
        },
      })}
      {portal
        ? motion.present
          ? createPortal(popupContent, document.body)
          : null
        : popupContent}
    </>
  );
}

function popupPosition(
  anchor: HTMLElement,
  popup: HTMLElement,
  preferred: string,
): CSSProperties {
  const bounds = anchor.getBoundingClientRect();
  const width = popup.offsetWidth;
  const height = popup.offsetHeight;
  let top = preferred.startsWith("bottom")
    ? bounds.bottom + 8
    : bounds.top - height - 8;
  let left = preferred.endsWith("right")
    ? bounds.right - width
    : preferred.endsWith("left")
      ? bounds.left
      : bounds.left + (bounds.width - width) / 2;
  if (preferred.startsWith("left")) {
    left = bounds.left - width - 8;
    top = bounds.top + (bounds.height - height) / 2;
  }
  if (top < 8) top = bounds.bottom + 8;
  return {
    position: "fixed",
    top: Math.max(8, Math.min(top, window.innerHeight - height - 8)),
    left: Math.max(8, Math.min(left, window.innerWidth - width - 8)),
    right: "auto",
    bottom: "auto",
  };
}
