import { useEffect, useId, useRef, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { Image, Modal } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { useTransition } from "@/site/hooks/useTransition";
import { useWidgets } from "@/site/hooks/useWidgets";

export function SiteModal({
  children,
  size = "large",
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
}) {
  const widgets = useWidgets();
  const modal = widgets?.modal;
  const motion = useTransition(!!modal, "scale", 500);
  const dimmerMotion = useTransition(!!modal, "fade", 500);
  const lastModal = useRef(modal);
  if (modal) lastModal.current = modal;
  const displayedModal = modal || lastModal.current;
  const element = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!motion.present || !displayedModal) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.current?.focus();
    return () => {
      document.body.style.overflow = oldOverflow;
      if (displayedModal.trigger.isConnected) displayedModal.trigger.focus();
    };
  }, [motion.present, displayedModal]);
  const content = displayedModal?.src ? (
    <>
      <Modal.Header id={titleId}>
        <HtmlContent html={displayedModal.title || ""} />
      </Modal.Header>
      <Modal.Content image>
        <Image ui={false} src={displayedModal.src} alt="" />
      </Modal.Content>
    </>
  ) : (
    children
  );
  if (!motion.present)
    return (
      <div
        {...props}
        className={`ui ${size} modal ${className}`}
        aria-hidden="true"
      >
        {children}
      </div>
    );
  return createPortal(
    <div
      className={`ui page modals dimmer active site-modal-dimmer ${dimmerMotion.className}`}
      style={dimmerMotion.style}
      onAnimationEnd={dimmerMotion.onAnimationEnd}
      aria-hidden={!modal}
      inert={!modal}
      onClick={(event) => {
        if (event.target === event.currentTarget) widgets?.setModal(null);
      }}
    >
      <div
        {...props}
        ref={element}
        className={`ui ${size} modal ${className} active ${motion.className}`}
        style={{ ...props.style, ...motion.style }}
        onAnimationEnd={motion.onAnimationEnd}
        role="dialog"
        aria-modal="true"
        aria-label={displayedModal?.src ? undefined : "Profile photo"}
        aria-labelledby={displayedModal?.src ? titleId : undefined}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const focusable = Array.from(
            element.current?.querySelectorAll<HTMLElement>(
              'a[href], button, input, textarea, [tabindex="0"]',
            ) || [],
          );
          const first = focusable[0],
            last = focusable[focusable.length - 1];
          if (!first) {
            event.preventDefault();
            return;
          }
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === element.current)
          ) {
            event.preventDefault();
            last.focus();
          } else if (
            !event.shiftKey &&
            (document.activeElement === last ||
              document.activeElement === element.current)
          ) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        {content}
      </div>
    </div>,
    document.body,
  );
}
