import { cloneElement, isValidElement, type CSSProperties, type ReactNode } from "react";
import { attributesToProps } from "html-react-parser";

/** Small compatibility helpers for the site's existing content conventions. */
export function classNames(...values: unknown[]): string | undefined {
  const names: string[] = [];
  const append = (value: unknown): void => {
    if (Array.isArray(value)) value.forEach(append);
    else if (value && typeof value === "object") {
      for (const [name, enabled] of Object.entries(value)) if (enabled) names.push(name);
    } else if (value) names.push(String(value));
  };
  values.forEach(append);
  return names.length ? names.join(" ") : undefined;
}
export function style(value: string | undefined): CSSProperties | undefined {
  return value ? (attributesToProps({ style: value }).style as CSSProperties) : undefined;
}
export function text(value: unknown): string {
  return value == null ? "" : String(value);
}
export function keyed(children: ReactNode[]): ReactNode[] {
  return children.map((child, index) => isValidElement(child) ? cloneElement(child, { key: child.key ?? index }) : child);
}
export function href(value: string | boolean | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function attribute(value: unknown): string | undefined { return value == null ? undefined : String(value); }
