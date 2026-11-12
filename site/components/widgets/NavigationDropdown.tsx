import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  useRef,
  type HTMLAttributes,
} from "react";
import { Dropdown, Menu, type MenuItemProps } from "react-fomantic-ui";

import { useBrowserLayoutEffect } from "@/site/hooks/useBrowserLayoutEffect";
import { useTransition } from "@/site/hooks/useTransition";
import { useWidgets } from "@/site/hooks/useWidgets";

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
            list.find((link) =>
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
