import * as fs from "node:fs/promises";
import path from "node:path";

export const textAliveDeveloperUrl = "https://developer.textalive.jp/";

/** Explicit files preserve retired URLs on GitHub Pages without old content. */
export const legacyRedirects = [
  "textalive/embed/index.html",
  "textalive/embed/api/index.html",
  ...Array.from(
    { length: 6 },
    (_, index) => `textalive/embed/api/embed-${index + 1}.html`,
  ),
].map((filename) => ({ filename, destination: textAliveDeveloperUrl }));

export async function prepareLegacyRedirects(publicDirectory: string) {
  for (const { filename, destination } of [
    ...legacyRedirects,
    {
      filename: "user-generated-variables.old/index.html",
      destination: "/user-generated-variables/",
    },
  ]) {
    const preserveLocation = destination.startsWith("/");
    const redirectScript = preserveLocation
      ? `<script>location.replace(${JSON.stringify(
          destination,
        )} + location.search + location.hash);</script>`
      : "";
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${redirectScript}<meta http-equiv="refresh" content="0; URL=${destination}"><link rel="canonical" href="${destination}"><title>Content moved</title></head><body><p>This content has moved. <a href="${destination}">Continue to the current page</a>.</p></body></html>\n`;
    const output = path.join(publicDirectory, filename);
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, html);
  }
}
