import parse from "html-react-parser";
import type { ReactNode } from "react";

/** Render only trusted, repository-authored rich-text fragments. */
export function richText(value: string | undefined): ReactNode {
  return parse(value || "");
}
