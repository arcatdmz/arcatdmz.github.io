/** Preserve the template's prefix matching, including its inactive home link. */
export function getItemClass(me: string, path: string): string | undefined {
  return me && path.indexOf(me) === 0 ? "active" : undefined;
}
