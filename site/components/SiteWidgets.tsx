import { HtmlContent } from "./RichText";
import {
  Button,
  Dropdown,
  Image,
  Menu,
  type MenuItemProps,
  Modal,
  Sidebar as FomanticSidebar,
  type SidebarProps,
} from "react-fomantic-ui";

import { LinkedImage } from "./LinkedImage";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { SiteImage } from "./SiteImage";
import { useTransition, playAttention } from "./useTransition";

const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
type ModalState = { trigger: HTMLElement; title?: string; src?: string };
type WidgetState = {
  sidebar: boolean;
  setSidebar: (open: boolean) => void;
  popup: string | null;
  setPopup: Dispatch<SetStateAction<string | null>>;
  modal: ModalState | null;
  setModal: (modal: ModalState | null) => void;
};
const WidgetContext = createContext<WidgetState | null>(null);
export function useWidgets() {
  return useContext(WidgetContext);
}

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

export function SiteSidebarPanel({ children, ...props }: SidebarProps) {
  const widgets = useWidgets();
  return (
    <FomanticSidebar
      {...props}
      as={Menu}
      animation="uncover"
      direction="right"
      visible={!!widgets?.sidebar}
      id="site-sidebar"
      inert={!widgets?.sidebar}
      aria-label="Site navigation"
      onHide={() => widgets?.setSidebar(false)}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if ((event.target as Element).closest("a[href]"))
          widgets?.setSidebar(false);
      }}
    >
      {children}
    </FomanticSidebar>
  );
}

export function SidebarButton({ children, ...props }: MenuItemProps) {
  const widgets = useWidgets();
  return (
    <Menu.Item
      as="a"
      {...props}
      role="button"
      aria-controls="site-sidebar"
      aria-expanded={widgets?.sidebar || false}
      onKeyDown={(event) => {
        if (event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
      onClick={(event) => {
        event.preventDefault();
        widgets?.setSidebar(!widgets.sidebar);
      }}
    >
      {children}
    </Menu.Item>
  );
}
export function SitePusher(props: HTMLAttributes<HTMLDivElement>) {
  const widgets = useWidgets();
  return <FomanticSidebar.Pusher {...props} dimmed={!!widgets?.sidebar} />;
}

export function NavigationDropdown({
  children,
  className = "",
  ...props
}: MenuItemProps) {
  const widgets = useWidgets();
  const id = useId();
  const open = widgets?.popup === id;
  const motion = useTransition(open, "slide down", 200);
  const root = useRef<HTMLDivElement>(null);
  const search = useRef({ value: "", time: 0 });
  const pendingFocus = useRef<HTMLAnchorElement | null>(null);
  useBrowserLayoutEffect(() => {
    if (open && motion.present && pendingFocus.current) {
      pendingFocus.current.focus();
      pendingFocus.current = null;
    }
  }, [open, motion.present]);
  const focusItem = (item?: HTMLAnchorElement) => {
    if (!item) return;
    if (open) item.focus();
    else pendingFocus.current = item;
  };
  const items = () =>
    Array.from(
      root.current?.querySelectorAll<HTMLAnchorElement>(".menu a[href]") || [],
    );
  return (
    <Menu.Item
      as="div"
      {...props}
      ref={root}
      active={open}
      className={`ui dropdown ${className}${open ? " visible" : ""}`}
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={open}
      data-site-popup-trigger={id}
      onClick={(event) => {
        if ((event.target as Element).closest("a[href]"))
          widgets?.setPopup(null);
        else widgets?.setPopup(open ? null : id);
      }}
      onKeyDown={(event) => {
        const list = items();
        if (event.key === "Enter" || event.key === " ") {
          if (event.target === event.currentTarget) {
            event.preventDefault();
            widgets?.setPopup(open ? null : id);
          }
        } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          widgets?.setPopup(id);
          const index = list.indexOf(
            document.activeElement as HTMLAnchorElement,
          );
          focusItem(
            list[
              index < 0
                ? event.key === "ArrowDown"
                  ? 0
                  : list.length - 1
                : (index + (event.key === "ArrowDown" ? 1 : list.length - 1)) %
                  list.length
            ],
          );
        } else if (event.key === "Escape") {
          widgets?.setPopup(null);
          root.current?.focus();
        } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          search.current.value =
            (Date.now() - search.current.time > 700
              ? ""
              : search.current.value) + event.key.toLowerCase();
          search.current.time = Date.now();
          widgets?.setPopup(id);
          focusItem(
            list.find(
              (link) =>
                link.textContent
                  ?.trim()
                  .toLowerCase()
                  .startsWith(search.current.value),
            ),
          );
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          widgets?.setPopup(null);
      }}
    >
      {Children.map(children, (child) =>
        isValidElement<HTMLAttributes<HTMLDivElement>>(child) &&
        (child.type === Dropdown.Menu || child.props.className === "menu")
          ? cloneElement(child, {
              className: motion.className,
              style: { ...child.props.style, ...motion.style },
              onAnimationEnd: motion.onAnimationEnd,
              inert: !open,
              role: "menu",
            })
          : child,
      )}
    </Menu.Item>
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
export function ModalImage({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const widgets = useWidgets();
  return (
    <LinkedImage
      {...props}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault();
        const image = event.currentTarget.querySelector("img");
        widgets?.setModal({
          trigger: event.currentTarget,
          src: image?.getAttribute("data-original-src") || image?.src,
          title: event.currentTarget
            .closest(".ui.segment")
            ?.querySelector("h3.ui.header")?.innerHTML,
        });
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    >
      {children}
    </LinkedImage>
  );
}
export function Avatar({
  src,
  ...props
}: React.ComponentProps<typeof SiteImage> & { "data-alt-src"?: string }) {
  const widgets = useWidgets();
  const [alternate, setAlternate] = useState(false);
  useEffect(() => setAlternate(Math.random() > 0.5), []);
  return (
    <SiteImage
      {...props}
      src={alternate ? props["data-alt-src"] || src : src}
      loading="eager"
      role="button"
      tabIndex={0}
      onClick={(event) => widgets?.setModal({ trigger: event.currentTarget })}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      }}
    />
  );
}
