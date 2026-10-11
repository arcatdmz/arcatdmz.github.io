import { initializeLibrary } from "./library";
import { initializeHome } from "./index";
import { initializeDesign } from "./design";
import { createPageScope } from "./scope";

export function initialize(view: "index" | "design" | "default") {
  const scope = createPageScope();
  const cleanup = initializeLibrary(scope);
  if (view === "index") initializeHome(scope);
  if (view === "design") initializeDesign(scope);
  return () => {
    scope.dispose();
    cleanup();
  };
}
(self as any).siteInteractions = { initialize };
