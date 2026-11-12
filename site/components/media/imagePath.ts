export function imagePath(
  src: string | Blob | undefined,
  route = "/",
): string | undefined {
  if (typeof src !== "string" || !src || /^(?:data:|blob:)/i.test(src))
    return undefined;
  try {
    const url = new URL(src, `https://junkato.jp${route}`);
    return url.origin === "https://junkato.jp"
      ? decodeURI(url.pathname)
      : undefined;
  } catch {
    return undefined;
  }
}
