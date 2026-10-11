/** Execute repository-authored widget placeholders only after hydration. */
export async function runDeferredScripts(document: Document) {
  const scripts = [
    ...document.querySelectorAll<HTMLScriptElement>(
      'script[type="application/x-site-script"]',
    ),
  ];
  for (const placeholder of scripts) {
    if (placeholder.dataset.executed) continue;
    placeholder.dataset.executed = "true";
    const script = document.createElement("script");
    for (const attribute of placeholder.attributes) {
      if (!attribute.name.startsWith("data-") && attribute.name !== "type")
        script.setAttribute(attribute.name, attribute.value);
    }
    script.type = placeholder.dataset.type || "text/javascript";
    script.async = placeholder.dataset.async === "true";
    if (placeholder.dataset.src) {
      script.src = placeholder.dataset.src;
      // Preserve parser-blocking dependency order, even on slow connections.
      // Site menus have already initialized independently.
      const loaded = new Promise<void>((resolve) => {
        script.onload = () => resolve();
        script.onerror = () => resolve();
      });
      placeholder.after(script);
      if (!script.async) await loaded;
    } else {
      script.textContent = placeholder.textContent;
      placeholder.after(script);
    }
  }
}
