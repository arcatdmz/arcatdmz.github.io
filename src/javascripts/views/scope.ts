/** Own page-specific listeners and timers across client-side route changes. */
export function createPageScope() {
  let active = true;
  const cleanups: (() => void)[] = [];
  const namespace = ".sitePage";
  return {
    get active() {
      return active;
    },
    on(
      target: JQuery,
      events: string,
      handler: (this: HTMLElement, event: JQuery.Event) => unknown,
    ) {
      target.on(
        events
          .split(" ")
          .map((event) => event + namespace)
          .join(" "),
        handler,
      );
      cleanups.push(() => target.off(namespace));
    },
    timeout(callback: () => void, delay: number) {
      const timer = window.setTimeout(() => {
        if (active) callback();
      }, delay);
      cleanups.push(() => window.clearTimeout(timer));
    },
    dispose() {
      active = false;
      cleanups.reverse().forEach((cleanup) => cleanup());
    },
  };
}
export type PageScope = ReturnType<typeof createPageScope>;
