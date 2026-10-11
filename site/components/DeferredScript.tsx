import type { ScriptHTMLAttributes } from "react";

/** Keep legacy widgets inert until React has hydrated the unchanged page DOM. */
export function DeferredScript({ src, type, async, ...props }: ScriptHTMLAttributes<HTMLScriptElement>) {
  return <script {...props} type="application/x-site-script" data-src={src} data-type={type || "text/javascript"} data-async={async ? "true" : undefined} />;
}
