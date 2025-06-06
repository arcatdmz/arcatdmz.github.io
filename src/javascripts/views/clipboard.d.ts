// These type definitions are copied from the following URL:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/097d2acf711df3ffb7a3df62554769b216876275/types/clipboard/index.d.ts

declare class Clipboard {
  constructor(
    selector: string | Element | NodeListOf<Element>,
    options?: Clipboard.Options
  );

  /**
   * Subscribes to events that indicate the result of a copy/cut operation.
   * @param type Event type ('success' or 'error').
   * @param handler Callback function.
   */
  on(type: "success" | "error", handler: (e: Clipboard.Event) => void): this;
  on(type: string, handler: (...args: any[]) => void): this;

  /**
   * Clears all event bindings.
   */
  destroy(): void;

  /**
   * Checks if clipboard.js is supported
   */
  isSupported(): boolean;
}

declare namespace Clipboard {
  interface Options {
    /**
     * Overwrites default command ('cut' or 'copy').
     * @param elem Current element
     */
    action?(elem: Element): "cut" | "copy";

    /**
     * Overwrites default target input element.
     * @param elem Current element
     * @returns <input> element to use.
     */
    target?(elem: Element): Element;

    /**
     * Returns the explicit text to copy.
     * @param elem Current element
     * @returns Text to be copied.
     */
    text?(elem: Element): string;
  }

  interface Event {
    action: string;
    text: string;
    trigger: Element;
    clearSelection(): void;
  }
}

export default Clipboard;
