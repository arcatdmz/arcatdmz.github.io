/** Finalize Next's static export at the existing GitHub Pages dist/ destination. */
import * as fs from "node:fs/promises";
import path from "node:path";
import { gzip } from "node:zlib";
import { promisify } from "node:util";
import { PurgeCSS } from "purgecss";

const compress = promisify(gzip);
const root = process.cwd();
const exportDirectory = path.join(root, "out");
const destination = path.join(root, "dist");

async function filesIn(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const filename = path.join(directory, entry.name);
        return entry.isDirectory() ? filesIn(filename) : [filename];
      }),
    )
  )
    .flat()
    .sort();
}

async function main(): Promise<void> {
  // Check the completed export before touching the previous deployment output.
  await fs.access(path.join(exportDirectory, "index.html"));
  await fs.rm(destination, { recursive: true, force: true });
  await fs.cp(exportDirectory, destination, { recursive: true });

  // Next exports this route as a directory; keep the long-standing .html URL.
  // A build without the resume page must not publish an empty or stale alias.
  try {
    await fs.copyFile(
      path.join(destination, "resume/index.html"),
      path.join(destination, "resume.html"),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  const files = await filesIn(destination);
  const styles = files.filter(
    (filename) =>
      filename.startsWith(path.join(destination, "stylesheets") + path.sep) &&
      filename.endsWith(".css"),
  );
  // The legacy interaction bundles contain all dynamically inserted Fomantic
  // classes. Next's framework internals retain unrelated selectors by accident;
  // rendered HTML already contains the classes in our statically exported JSX.
  const content = files.filter(
    (filename) =>
      /\.(?:html|js)$/.test(filename) &&
      !filename.includes(`${path.sep}_next${path.sep}`),
  );
  const purged = await new PurgeCSS().purge({
    css: styles,
    content,
    safelist: ["house", "procedures"],
  });
  for (const stylesheet of purged) {
    if (!stylesheet.file)
      throw new Error("PurgeCSS returned an unnamed stylesheet.");
    await fs.writeFile(stylesheet.file, stylesheet.css);
  }
  await Promise.all(
    files
      .filter((filename) => /\.(?:js|css)$/.test(filename))
      .map(async (filename) => {
        await fs.writeFile(
          `${filename}.gz`,
          await compress(await fs.readFile(filename)),
        );
      }),
  );
  await fs.writeFile(path.join(destination, ".nojekyll"), "");
  const website = JSON.parse(
    await fs.readFile(path.join(root, "website.json"), "utf8"),
  ) as { domain: string };
  await fs.writeFile(path.join(destination, "CNAME"), `${website.domain}\n`);
  console.log(
    `Finalized ${files.length} files in dist; purged ${purged.length} stylesheets and generated gzip assets.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
