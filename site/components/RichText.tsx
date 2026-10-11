import parse from "html-react-parser";
import type { ReactNode } from "react";

/** Render only trusted, repository-authored rich-text fragments. */
export function richText(value: string | undefined): ReactNode {
  return parse(value || "");
}

/** Normalize block-rich descriptions before JSX so browser paragraph repair is stable. */
export function richParagraph(value: string | undefined): ReactNode {
  return parse(`<p>${value || ""}</p>`);
}
