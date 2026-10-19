import type { ReactNode } from "react";
import { useSiteContext } from "./SiteContext";

/** Rich content inherits the default unless this locale supplies an override.
 * An explicit null override hides the block; only undefined means inherit.
 */
export function LocalizedContent({
  children,
  en,
  ja,
}: {
  children?: ReactNode;
  en?: ReactNode;
  ja?: ReactNode;
}) {
  const { lang } = useSiteContext();
  const override = lang === "ja" ? ja : en;
  return <>{override === undefined ? children : override}</>;
}
