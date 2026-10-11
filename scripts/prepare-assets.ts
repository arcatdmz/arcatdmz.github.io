/**
 * Build the public assets and metadata used by Next's static export.
 * No page renderer or Pug compiler is invoked here. Fomantic's existing vendor
 * tasks are retained to keep its JavaScript and font output unchanged.
 *
 * The checked-in blog redirect snapshot makes normal builds network-independent.
 * Refresh it explicitly with: npm run assets -- --refresh-redirects
 */
import { createRequire } from "node:module";
import * as fs from "node:fs/promises";
import path from "node:path";
import type { Configuration } from "webpack";

const root = process.cwd();
const require = createRequire(path.join(root, "package.json"));
const publicDirectory = path.join(root, "public");
const buildDirectory = path.join(root, "build");
const website = require("./website.json") as {
  protocol: string;
  domain: string;
  rootPath: string;
};

type Categories = { [name: string]: boolean | Categories };
type Redirections = {
  articles: { old: string; new: string }[];
  categories: Categories;
};

async function filesIn(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const filename = path.join(directory, entry.name);
      return entry.isDirectory() ? filesIn(filename) : [filename];
    }),
  );
  return nested.flat().sort();
}

async function write(
  filename: string,
  contents: string | Buffer,
): Promise<void> {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, contents);
}

async function copySourceAssets(): Promise<void> {
  const sourceDirectory = path.join(root, "src");
  let count = 0;
  for (const source of await filesIn(sourceDirectory)) {
    const relative = path.relative(sourceDirectory, source);
    if (/\.(?:pug|ts|less)$/.test(relative)) continue;
    // The TypeScript source tree is bundled below, not published as source code.
    if (relative.startsWith(`javascripts${path.sep}`)) continue;
    const destination = path.join(publicDirectory, relative);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.copyFile(source, destination);
    count++;
  }
  await fs.cp(
    path.join(root, "node_modules/devicon/fonts"),
    path.join(publicDirectory, "stylesheets/fonts"),
    { recursive: true },
  );
  // Pin the historical CDN version locally so menu initialization works offline.
  await write(
    path.join(publicDirectory, "javascripts/vendor/jquery.min.js"),
    await fs.readFile(
      path.join(root, "node_modules/jquery/dist/jquery.min.js"),
    ),
  );
  console.log(
    `Copied ${count} source assets, including historic HTML documents.`,
  );
}

async function prepareBibliography(): Promise<void> {
  const bibtex = require("@orcid/bibtex-parse-js") as {
    toJSON(source: string): unknown[];
  };
  const entries = bibtex.toJSON(
    await fs.readFile(path.join(root, "src/junkato.bib"), "utf8"),
  );
  // Match the former public JSON representation; this remains a download URL.
  const json = JSON.stringify(entries);
  await Promise.all([
    write(path.join(publicDirectory, "data/publications.json"), json),
    write(path.join(root, "site/generated/publications.json"), json),
  ]);
  console.log(`Prepared ${entries.length} bibliography records.`);
}

async function buildSemantic(): Promise<void> {
  const config = require("./semantic/tasks/config/user");
  const outputDirectory = path.join(publicDirectory, "semantic");
  // These vendor tasks share this exported config object. Redirect generated
  // output before loading the tasks; do not rewrite semantic.json or use dist.
  Object.assign(config.paths.output, {
    packaged: outputDirectory,
    uncompressed: path.join(outputDirectory, "components"),
    compressed: path.join(outputDirectory, "components"),
    themes: path.join(outputDirectory, "themes"),
  });
  const gulp = require("gulp");
  await new Promise<void>((resolve, reject) => {
    gulp.parallel(
      require("./semantic/tasks/build/javascript"),
      require("./semantic/tasks/build/assets"),
    )((error?: Error) => (error ? reject(error) : resolve()));
  });
  // Vendor plumber may log rather than throw; fail on missing essential output.
  await fs.access(path.join(outputDirectory, "semantic.min.js"));
}

async function compileStyles(): Promise<void> {
  const less = require("less") as {
    render(
      source: string,
      options: { filename: string; compress: boolean; paths: string[] },
    ): Promise<{ css: string }>;
  };
  const postcss = require("postcss") as typeof import("postcss").default;
  const autoprefixer = require("autoprefixer");
  const deviconDirectory = path.join(root, "node_modules/devicon");
  for (const name of await fs.readdir(deviconDirectory)) {
    if (!name.endsWith(".css")) continue;
    const contents = (
      await fs.readFile(path.join(deviconDirectory, name), "utf8")
    )
      .split("url('fonts/")
      .join("url('/fonts/");
    await write(path.join(buildDirectory, "stylesheets", name), contents);
  }
  for (const source of await filesIn(path.join(root, "src/stylesheets"))) {
    if (!source.endsWith(".less")) continue;
    const output = path.join(
      publicDirectory,
      "stylesheets",
      path
        .relative(path.join(root, "src/stylesheets"), source)
        .replace(/\.less$/, ".css"),
    );
    const rendered = await less.render(await fs.readFile(source, "utf8"), {
      filename: source,
      compress: false,
      paths: [],
    });
    const prefixed = await postcss([autoprefixer()]).process(rendered.css, {
      map: false,
      from: output,
      to: output,
    });
    for (const warning of prefixed.warnings()) console.warn(warning.toString());
    await write(output, prefixed.css);
  }
}

async function bundleLegacyInteractions(): Promise<void> {
  const ts = require("typescript") as typeof import("typescript");
  const webpack = require("webpack") as typeof import("webpack");
  const sourceDirectory = path.join(root, "src");
  const temporarySource = path.join(buildDirectory, "legacy-source");
  await fs.rm(temporarySource, { recursive: true, force: true });
  await fs.cp(
    path.join(sourceDirectory, "data"),
    path.join(temporarySource, "data"),
    {
      recursive: true,
    },
  );
  for (const source of await filesIn(
    path.join(sourceDirectory, "javascripts"),
  )) {
    if (!source.endsWith(".ts") || source.endsWith(".d.ts")) continue;
    const result = ts.transpileModule(await fs.readFile(source, "utf8"), {
      fileName: source,
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        allowSyntheticDefaultImports: true,
      },
    });
    await write(
      path.join(
        temporarySource,
        path.relative(sourceDirectory, source).replace(/\.ts$/, ".js"),
      ),
      result.outputText,
    );
  }

  const original = require("./webpack.config.js") as Configuration;
  const entries = Object.fromEntries(
    (await filesIn(path.join(temporarySource, "javascripts/views")))
      .filter(
        (filename) =>
          filename.endsWith(".js") && path.basename(filename) !== "library.js",
      )
      .map((filename) => [path.basename(filename, ".js"), filename]),
  );
  const config: Configuration = {
    ...original,
    entry: entries,
    output: { ...original.output, path: publicDirectory },
    module: {
      ...original.module,
      rules: original.module?.rules?.map((rule) =>
        rule && typeof rule === "object" && "include" in rule
          ? { ...rule, include: [temporarySource] }
          : rule,
      ),
    },
    resolve: {
      ...original.resolve,
      alias: {
        ...original.resolve?.alias,
        // Keep the historical source import working from its temporary tree.
        "../../../dist/semantic/semantic.min$": path.join(
          publicDirectory,
          "semantic/semantic.min.js",
        ),
      },
    },
  };
  await new Promise<void>((resolve, reject) => {
    const compiler = webpack(config);
    if (!compiler) return reject(new Error("Could not initialize webpack."));
    compiler.run((error, stats) => {
      compiler.close((closeError) => {
        if (error || closeError) return reject(error || closeError);
        if (!stats || stats.hasErrors()) {
          return reject(
            new Error(
              stats?.toString({ all: false, errors: true }) ||
                "webpack produced no output.",
            ),
          );
        }
        console.log(stats.toString({ colors: false, preset: "minimal" }));
        resolve();
      });
    });
  });
}

async function prepareFeeds(): Promise<void> {
  // Import only after the bibliography JSON exists, including on a fresh clone.
  const { getSiteData } = await import("../site/data");
  const data = getSiteData();
  const RSS = require("rss");
  const { SitemapStream, streamToPromise } = require("sitemap");
  const host = `${data.protocol}://${data.domain}`;
  const base = data.rootPath.endsWith("/")
    ? data.rootPath
    : `${data.rootPath}/`;
  for (const language of ["en", "ja"] as const) {
    const languageBase = language === "ja" ? `${base}ja/` : base;
    const feed = new RSS({
      title: "junkato.jp updates",
      feed_url: `${host}${languageBase}rss.xml`,
      site_url: `${host}${languageBase}`,
      language,
    });
    for (const entry of data.histories[language] || []) {
      feed.item({
        title: entry.getDateString(language, true),
        description: entry.text,
        url: `${host}${languageBase}timeline/#${entry.date.getFullYear()}`,
        date: entry.date,
      });
    }
    await write(
      path.join(publicDirectory, language === "ja" ? "ja/rss.xml" : "rss.xml"),
      feed.xml({ indent: true }),
    );
  }

  type SitemapEntry = {
    url: string;
    priority?: number;
    links: { lang: string; url: string }[];
  };
  const entries: SitemapEntry[] = [];
  // Explicit navigation replaces extracting links from a rendering template.
  for (const segment of [
    "",
    "projects",
    "publications",
    "design",
    "activities",
    "timeline",
    "collaborations",
  ]) {
    const english = `${base}${segment ? `${segment}/` : ""}`;
    const japanese = `${base}ja/${segment ? `${segment}/` : ""}`;
    const links = [
      { lang: "en", url: english },
      { lang: "ja", url: japanese },
    ];
    entries.push(
      { url: english, priority: 1, links },
      { url: japanese, priority: 1, links },
    );
  }
  for (let year = new Date().getFullYear(); year >= 2011; year--) {
    const english = `${base}timeline/${year}/`;
    const japanese = `${base}ja/timeline/${year}/`;
    const links = [
      { lang: "en", url: english },
      { lang: "ja", url: japanese },
    ];
    entries.push({ url: english, links }, { url: japanese, links });
  }
  const oldestJapaneseYear = `${base}ja/timeline/2010/`;
  entries.push({
    url: oldestJapaneseYear,
    links: [{ lang: "ja", url: oldestJapaneseYear }],
  });
  const sortedProjects = data.projects
    .slice()
    .sort((a, b) => (b.year?.from || 0) - (a.year?.from || 0));
  for (const project of sortedProjects) {
    const english = project.getLink("en", base);
    const japanese = project.getLink("ja", `${base}ja/`);
    const internalEnglish =
      typeof english === "string" && english.startsWith(base);
    const internalJapanese =
      typeof japanese === "string" && japanese.startsWith(`${base}ja/`);
    const links: SitemapEntry["links"] = [];
    if (internalEnglish) links.push({ lang: "en", url: english });
    if (internalJapanese) links.push({ lang: "ja", url: japanese });
    if (internalEnglish) entries.push({ url: english, links });
    if (internalJapanese) entries.push({ url: japanese, links });
  }
  const sitemap = new SitemapStream({ hostname: host, xmlns: { xhtml: true } });
  const sitemapResult = streamToPromise(sitemap);
  for (const entry of entries.sort((a, b) => a.url.localeCompare(b.url)))
    sitemap.write(entry);
  sitemap.end();
  await write(path.join(publicDirectory, "sitemap.xml"), await sitemapResult);
  console.log(
    `Generated EN/JA RSS feeds and ${entries.length} sitemap entries.`,
  );
}

function validateRedirections(value: unknown): asserts value is Redirections {
  if (!value || typeof value !== "object")
    throw new Error("Invalid blog redirect snapshot.");
  const candidate = value as Partial<Redirections>;
  const safePath = (value: unknown): value is string =>
    typeof value === "string" && /^(?:[\w-]+\/)*[\w-]+$/.test(value);
  if (!Array.isArray(candidate.articles) || candidate.articles.length === 0) {
    throw new Error("Blog redirect snapshot has no articles.");
  }
  for (const article of candidate.articles) {
    if (!safePath(article.old) || !safePath(article.new))
      throw new Error("Unsafe blog redirect path.");
  }
  const validateCategories = (categories: unknown): void => {
    if (
      !categories ||
      typeof categories !== "object" ||
      Array.isArray(categories)
    ) {
      throw new Error("Invalid blog redirect categories.");
    }
    for (const [key, child] of Object.entries(categories)) {
      if (!safePath(key) || key.includes("/"))
        throw new Error("Unsafe blog category path.");
      if (typeof child !== "boolean") validateCategories(child);
    }
  };
  validateCategories(candidate.categories);
}

async function prepareRedirections(): Promise<void> {
  const cache = path.join(root, "scripts/blog-redirections.json");
  if (process.argv.includes("--refresh-redirects")) {
    try {
      const response = await fetch(
        "https://blog.junkato.jp/redirections.json",
        {
          signal: AbortSignal.timeout(5_000),
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const fresh: unknown = await response.json();
      validateRedirections(fresh);
      await write(cache, `${JSON.stringify(fresh, null, 2)}\n`);
      console.log("Updated the checked-in blog redirect snapshot.");
    } catch (error) {
      console.warn(
        `Blog redirect refresh failed; using checked-in snapshot: ${String(
          error,
        )}`,
      );
    }
  }
  // A missing or malformed cache is fatal: never publish without old redirects.
  const redirections: unknown = JSON.parse(await fs.readFile(cache, "utf8"));
  validateRedirections(redirections);
  const blogDirectory = path.join(publicDirectory, "ja/blog");
  let count = 1;
  await write(
    path.join(blogDirectory, "index.html"),
    '<html><head><meta http-equiv="refresh" content="0;URL=\'https://blog.junkato.jp/ja/\'" /></head></html>',
  );
  const redirect = async (relativePath: string, url: string): Promise<void> => {
    await write(
      path.join(blogDirectory, relativePath, "index.html"),
      `<html><head><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0;URL='${url}'" /></head></html>`,
    );
    count++;
  };
  for (const article of redirections.articles) {
    await redirect(
      article.old,
      `https://blog.junkato.jp/ja/posts/${article.new}/`,
    );
  }
  const traverseCategories = async (
    categories: Categories,
    basePath: string,
  ): Promise<void> => {
    for (const [key, value] of Object.entries(categories)) {
      await redirect(
        `${basePath}${key}`,
        `https://blog.junkato.jp/ja/tags/${key}/`,
      );
      if (typeof value !== "boolean")
        await traverseCategories(value, `${basePath}${key}/`);
    }
  };
  await traverseCategories(redirections.categories, "category/");
  console.log(
    `Generated ${count} legacy blog redirects from the checked-in snapshot.`,
  );
}

async function main(): Promise<void> {
  // public is entirely generated; original static content lives under src.
  await fs.rm(publicDirectory, { recursive: true, force: true });
  await fs.mkdir(publicDirectory, { recursive: true });
  await fs.mkdir(buildDirectory, { recursive: true });
  await copySourceAssets();
  await prepareBibliography();
  const buildNow = new Date();
  await write(path.join(root, "site/generated/build-info.json"), JSON.stringify({ timestamp: buildNow.toISOString(), year: buildNow.getFullYear() }, null, 2) + "\n");
  await buildSemantic();
  await Promise.all([
    compileStyles(),
    bundleLegacyInteractions(),
    prepareFeeds(),
    prepareRedirections(),
  ]);
  await write(path.join(publicDirectory, ".nojekyll"), "");
  await write(path.join(publicDirectory, "CNAME"), `${website.domain}\n`);
  console.log("Public assets are ready for Next.js.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
