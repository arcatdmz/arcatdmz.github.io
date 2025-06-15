// Gulp packages
const gulp = require("gulp");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const replace = require("gulp-replace");

// General packages
const path = require("path");
const fs = require("fs");
const through2 = require("through2");
const browserSync = require("browser-sync");
const moment = require("moment");
const RSS = require("rss");
const { SitemapStream, streamToPromise } = require("sitemap");

// Load website-wide config
const tsProjectFile = "./tsconfig.json";
const tsNodeProjectFile = "./tsconfig-node.json";
const webpackConfigFile = "./webpack.config";
const webpackDebugConfigFile = "./webpack-debug.config";
const bibtexFile = "./src/junkato.bib";

let website;
function loadConfig() {
  website = JSON.parse(fs.readFileSync("./website.json"));
}
loadConfig();

// Import Semantic UI tasks
gulp.task("semantic:js", require("./semantic/tasks/build/javascript"));
gulp.task("semantic:assets", require("./semantic/tasks/build/assets"));
gulp.task("semantic", gulp.parallel("semantic:js", "semantic:assets"));

// Clean up

// [del:js]
gulp.task("del:js", async function () {
  const { deleteAsync: del } = await import("del");
  return del(["src/javascripts/**/*.js", "dist/javascripts/**/*.js"]);
});

// [del:node]
gulp.task("del:node", async function () {
  const { deleteAsync: del } = await import("del");
  return del("build/**/*.js");
});

// [del:gzip]
gulp.task("del:gzip", async function () {
  const { deleteAsync: del } = await import("del");
  return del("dist/**/*.gz");
});

// [del]
gulp.task("del", gulp.parallel("del:js", "del:node", "del:gzip"));

// TypeScript & JavaScript compilation
const ts = require("gulp-typescript");
const tsProject = ts.createProject(tsProjectFile);
const tsNodeProject = ts.createProject(tsNodeProjectFile);
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// [ts] should be called after del:js
gulp.task("ts", function () {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(tsProject())
    .pipe(gulp.dest("src"));
});

// [ts:node] should be called after del:node
gulp.task("ts:node", function () {
  return gulp
    .src("src/javascripts/*.ts")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(tsNodeProject())
    .pipe(gulp.dest("build/javascripts"));
});

// [js] should be called after ts
gulp.task("js", function () {
  const webpackConfig = require(webpackConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest("dist"));
});

// [js:debug] should be called after ts
gulp.task("js:debug", function () {
  const webpackConfig = require(webpackDebugConfigFile);
  return webpackStream(webpackConfig, webpack)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest("dist"));
});

// Copy & replace
const bibtexParse = require("@orcid/bibtex-parse-js");

// [bibtex]
gulp.task("bibtex", function (callback) {
  const bibtexJSON = bibtexParse.toJSON(
    fs.readFileSync(bibtexFile, { encoding: "UTF-8" })
  );
  if (!fs.existsSync("dist")) fs.mkdirSync("dist");
  if (!fs.existsSync("dist/data")) fs.mkdirSync("dist/data");
  fs.writeFileSync(
    "dist/data/publications.json",
    JSON.stringify(bibtexJSON, "  ")
  );
  callback();
});

// [copy:bibtex] should be called after bibtex
gulp.task("copy:bibtex", function () {
  return gulp
    .src("dist/data/publications.json")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest("build/data"));
});

// [copy:fonts]
gulp.task("copy:fonts", function () {
  return gulp
    .src("node_modules/devicon/fonts/*", { base: "node_modules/devicon", encoding: false })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest("dist/stylesheets"));
});

// [copy:default]
gulp.task("copy:default-binary", function () {
  return gulp
    .src(
      [
        "src/**/*.{pdf,png,jpg}"
      ],
      { base: "src", encoding: false }
    )
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest("dist"));
});
gulp.task("copy:default-text", function () {
  return gulp
    .src(
      [
        "src/**/*.{bib,json,html,css,txt,package-list}",
        "src/.htaccess",
      ],
      { base: "src" }
    )
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest("dist"));
});
gulp.task("copy:default", gulp.parallel("copy:default-binary", "copy:default-text"));

// [copy]
gulp.task("copy", gulp.parallel("copy:bibtex", "copy:fonts", "copy:default"));

// [replace:node]
gulp.task("replace:node", function () {
  loadConfig();
  return gulp
    .src("src/**/*.json", { base: "src" })
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(replace("${rootPath}", website.rootPath))
    .pipe(gulp.dest("build"));
});

// [replace:devicon]
gulp.task("replace:devicon", function () {
  return gulp
    .src("node_modules/devicon/*.css", { base: "node_modules/devicon" })
    .pipe(replace("url('fonts/", "url('/fonts/"))
    .pipe(gulp.dest("build/stylesheets/"));
});

// HTML
const pug = require("gulp-pug");

// [html] should be called after ts:node, replace:node, copy:bibtex
// gulp.series('ts:node', 'replace:node', 'copy:bibtex')
gulp.task("html", function () {
  return compilePug(gulp.src(["src/**/*.pug", "!src/**/_*.pug"]), false);
});

// [html:debug] should be called after ts:node, replace:node, copy:bibtex
gulp.task("html:debug", function () {
  return compilePug(gulp.src(["src/**/*.pug", "!src/**/_*.pug"]), true);
});

// [html:meta] should be called after replace:node
// gulp.series('replace:node')
gulp.task("html:meta", function () {
  return compilePug(
    gulp.src([
      "src/{index.pug,activities/index.pug,timeline/index.pug,publications/index.pug,ja/index.pug,ja/activities/index.pug,ja/timeline/index.pug,ja/publications/index.pug}",
    ]),
    false
  );
});

function compilePug(stream, pretty) {
  return stream
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      pug({
        locals: setupLocals(),
        verbose: true,
        pretty,
      })
    )
    .pipe(gulp.dest("dist/"));
}

function setupLocals() {
  loadConfig();
  const histories = require("./build/javascripts/histories").default,
    awards = require("./build/javascripts/awards").default,
    talks = require("./build/javascripts/talks").default,
    lectures = require("./build/javascripts/lectures").default,
    projects = require("./build/javascripts/projects").default,
    publications = require("./build/javascripts/publications").parse(
      JSON.parse(fs.readFileSync("./build/data/publications.json"))
    ),
    media = require("./build/javascripts/media").default;
    misc = JSON.parse(fs.readFileSync("./build/data/misc.json"));

  // build projects table and list
  const projectsTable = {};
  for (const entry of projects) {
    projectsTable[entry.project] = entry;
  }
  const products = [];
  for (const key of website.products) {
    products.push(projectsTable[key]);
  }
  const selectedProjects = [];
  for (const key of website.selectedProjects) {
    selectedProjects.push(projectsTable[key]);
  }

  // build publications table and list
  const publicationsTable = {};
  for (const entry of publications) {
    publicationsTable[entry.citationKey] = entry;
  }
  const selectedPublications = [];
  for (const key of website.selectedPublications) {
    selectedPublications.push(publicationsTable[key]);
  }

  // build media list
  const flattenMedia = (m) => m.reduce((v, c) => {
    return v.concat(c, ...flattenMedia(c.related || []));
  }, []);
  const mediaList = flattenMedia(media).sort((a, b) => a.date > b.date ? 1 : -1);

  // merge locals with website options
  var locals = {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
  };
  for (var key in website) {
    if (typeof website[key] !== "string") continue;
    locals[key] = website[key];
  }

  locals.stripTags = function (text) {
    return text.replace(/(<([^>]+)>)/gi, "");
  };
  return locals;
}

// CSS
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const purgecss = require("gulp-purgecss");

// [css:bare]
gulp.task("css:bare", function () {
  return compileCSS(gulp.src("src/stylesheets/**/*.less"));
});

// [css:debug]
gulp.task("css:debug", gulp.series("replace:devicon", "css:bare"));

// [css] should be called after semantic, css:bare, js, html
gulp.task("css", function () {
  return gulp
    .src(["dist/stylesheets/**/*.css"], { base: "dist" })
    .pipe(purgecss({ content: ["dist/**/*.js", "dist/**/*.html"] }))
    .pipe(gulp.dest("dist"));
});

function compileCSS(stream) {
  return stream
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/stylesheets"))
    .pipe(browserSync.stream());
}

gulp.task("rss", function (cb) {
  const locals = setupLocals();
  const host = `${locals.protocol}://${locals.domain}`;

  for (const lang of ["en", "ja"]) {
    const feed = new RSS({
      title: "junkato.jp updates",
      feed_url:
        lang === "ja"
          ? `${host}${locals.rootPath}ja/rss.xml`
          : `${host}${locals.rootPath}rss.xml`,
      site_url:
        lang === "ja"
          ? `${host}${locals.rootPath}ja/`
          : `${host}${locals.rootPath}`,
      language: lang,
    });

    const entries = locals.histories[lang] || [];
    entries.forEach((entry) => {
      feed.item({
        title: entry.getDateString(lang, true),
        description: entry.text,
        url:
          lang === "ja"
            ? `${host}${locals.rootPath}ja/timeline/#${entry.date.getFullYear()}`
            : `${host}${locals.rootPath}timeline/#${entry.date.getFullYear()}`,
        date: entry.date,
      });
    });

    const dir = lang === "ja" ? path.join("dist", "ja") : "dist";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "rss.xml"),
      feed.xml({ indent: true })
    );
  }

  cb();
});

gulp.task("sitemap", function (cb) {
  const locals = setupLocals();
  const host = `${locals.protocol}://${locals.domain}`;
  const root = locals.rootPath.endsWith("/") ? locals.rootPath : `${locals.rootPath}/`;

  // extract top-level paths from layout
  const layoutSrc = fs.readFileSync("./src/_layout-components.pug", "utf8");
  const hrefRegex = /href=`\\${basePath}([^`#]*)`/g;
  const topSegments = new Set();
  let m;
  while ((m = hrefRegex.exec(layoutSrc))) {
    let p = m[1];
    if (p.endsWith("/")) p = p.slice(0, -1);
    if (p.length > 0) {
      topSegments.add(p);
    }
  }

  const entries = [];
  function pushTop(segment) {
    const enUrl = `${root}${segment ? `${segment}/` : ""}`;
    const jaUrl = `${root}ja/${segment ? `${segment}/` : ""}`;
    entries.push({
      url: enUrl,
      priority: 1.0,
      links: [
        { lang: "en", url: enUrl },
        { lang: "ja", url: jaUrl },
      ],
    });
    entries.push({
      url: jaUrl,
      priority: 1.0,
      links: [
        { lang: "en", url: enUrl },
        { lang: "ja", url: jaUrl },
      ],
    });
  }

  pushTop("");
  for (const seg of Array.from(topSegments)) pushTop(seg);

  const { projects } = locals;
  const sortedProjects = projects.slice().sort((a, b) => {
    const af = a.year && a.year.from ? a.year.from : 0;
    const bf = b.year && b.year.from ? b.year.from : 0;
    return bf - af;
  });
  for (const proj of sortedProjects) {
    const slug = proj.project || (proj.data && proj.data.project);
    if (!slug) continue;
    const baseEn = root;
    const baseJa = `${root}ja/`;
    const linkEn = proj.getLink("en", baseEn);
    const linkJa = proj.getLink("ja", baseJa);
    const internalEn =
      typeof linkEn === "string" && linkEn.startsWith(baseEn);
    const internalJa =
      typeof linkJa === "string" && linkJa.startsWith(baseJa);
    if (!internalEn && !internalJa) continue;
    const altLinks = [];
    if (internalEn) altLinks.push({ lang: "en", url: linkEn });
    if (internalJa) altLinks.push({ lang: "ja", url: linkJa });
    if (internalEn) {
      entries.push({ url: linkEn, links: altLinks });
    }
    if (internalJa) {
      entries.push({ url: linkJa, links: altLinks });
    }
  }

  const sm = new SitemapStream({ hostname: host, xmlns: { xhtml: true } });
  streamToPromise(sm)
    .then((data) => {
      if (!fs.existsSync("dist")) fs.mkdirSync("dist");
      fs.writeFileSync(path.join("dist", "sitemap.xml"), data.toString());
      cb();
    })
    .catch((err) => cb(err));

  for (const item of entries.sort((a, b) => a.url.localeCompare(b.url))) {
    sm.write(item);
  }
  sm.end();
});

// Post-process
const gzip = require("gulp-gzip");
let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error('npm module "sharp" not found -- images won\'t be resized.');
}
const File = require("vinyl");

// [gzip] should be called after js, css
// gulp.parallel('js', 'css')
gulp.task("gzip", function () {
  return gulp.src(["dist/**/*.{js,css}"]).pipe(gzip()).pipe(gulp.dest("dist"));
});

// [gzip:debug] should be called after js:debug, css:debug
// gulp.parallel('js:debug', 'css:debug')
gulp.task("gzip:debug", function () {
  return gulp.src(["dist/**/*.{js,css}"]).pipe(gzip()).pipe(gulp.dest("dist"));
});

// [sharp]
gulp.task("sharp", function (cb) {
  if (!sharp) {
    cb();
    return;
  }
  return gulp
    .src("dist/images/**/*.jpg", { encoding: false })
    .pipe(
      through2.obj(function (chunk, enc, cb) {
        if (chunk.isNull()) {
          this.push(chunk);
          return cb();
        }
        if (chunk.isStream()) {
          console.error("stream is not supported");
          return cb();
        }
        // chunk.isBuffer() === true
        const image = sharp(chunk.contents);
        image
          .metadata()
          .then(function (metadata) {
            // console.log(metadata);
            if (metadata.width < 200 || metadata.height < 200) {
              throw new Error(`[Skipped] ${chunk.path}`);
            }
            return image
              .resize(120, 120, { fit: "inside", withoutEnlargement: true })
              .toFormat(metadata.format)
              .toBuffer();
          })
          .then(function (data) {
            const fullPath = chunk.path;
            const dirName = path.dirname(fullPath);
            const ext = path.extname(fullPath);
            const baseName = path.basename(fullPath, ext);
            const newBasePath = path.resolve(__dirname, "dist");
            const newFilePath = path.join(dirName, `${baseName}-resized${ext}`);
            const newFile = new File({
              base: newBasePath,
              path: newFilePath,
              contents: data,
            });
            console.log(`[Resized] ${newFilePath}`);
            cb(null, newFile);
          })
          .catch(function (err) {
            console.error(err.message);
            return cb();
          });
      })
    )
    .pipe(gulp.dest("dist"));
});

// Lint
const htmlhint = require("gulp-htmlhint");
const pdfinfo = require("pdfinfo");

// [lint:html]
gulp.task("lint:html", function () {
  return gulp
    .src([
      "dist/**/*.html",
      "!dist/picode/docs/**/*.html",
      "!dist/ja/blog/**/*.html",
    ])
    .pipe(
      htmlhint({
        "attr-lowercase": ["viewBox"],
      })
    )
    .pipe(htmlhint.failAfterError());
});

// [lint:pdf]
gulp.task("lint:pdf", function () {
  return gulp.src("dist/**/*.pdf").pipe(
    through2.obj(function (chunk, enc, cb) {
      const pdf = pdfinfo(chunk.path, ["-enc", "UTF-8"]);
      pdf.info(function (err, meta) {
        // chunk.path
        // chunk.contents
        if (err) {
          console.error(chunk.path, err);
        } else {
          meta.file = chunk.path;
          console.log(meta);
          // example output of meta:
          // { title: 'プログラマ×デザイナ×エンドユーザのための三つ巴システム設計 +HCI系国際会議や研究インターンのご紹介\r',
          //   author: 'Jun Kato\r',
          //   creator: 'Acrobat PDFMaker 15 for PowerPoint\r',
          //   producer: 'Adobe PDF Library 15.0\r',
          //   created: '10/16/15 23:00:49\r',
          //   modified: '10/16/15 23:02:48\r',
          //   tagged: 'yes\r',
          //   form: 'none\r',
          //   pages: 15,
          //   encrypted: 'no\r',
          //   page_size: '960 x 540 pts (rotated 0 degrees)\r',
          //   file_size: '1771252 bytes\r',
          //   optimized: 'no\r',
          //   pdf_version: 1.6 }
        }
        cb(null, chunk);
      });
    })
  );
});

// Watch & sync
// [reload]
gulp.task("reload", function (cb) {
  browserSync.reload();
  cb();
});

// [browser-sync]
gulp.task("browser-sync", function (cb) {
  browserSync({
    port: 8080,
    server: {
      baseDir: "dist/",
    },
  });
  cb();
});

// [watch:html]
gulp.task("watch:html", function () {
  const watcher = gulp.watch("src/**/*.pug");

  const handler = function (fullPath, _stats) {
    const baseName = path.basename(fullPath);
    const basePath = path.resolve(__dirname, "src");
    const relPath = path.relative(basePath, fullPath);
    const relDirPath = path.relative(basePath, path.dirname(fullPath));
    let stream;

    // _layout.pug affects all pages
    if (baseName.indexOf("_layout") === 0) {
      if (relDirPath.length > 0) {
        stream = compilePug(
          gulp.src([
            `src/${relDirPath}/**/*.pug`,
            `!src/${relDirPath}/**/_*.pug`,
            `src/ja/${relDirPath}/**/*.pug`,
            `!src/ja/${relDirPath}/**/_*.pug`,
          ])
        );
      } else {
        stream = compilePug(gulp.src(["src/**/*.pug", "!src/**/_*.pug"]));
      }
    } else {
      const jaPath = path.resolve(basePath, "ja", relPath);
      if (relPath.indexOf("ja" + path.sep) < 0 && fs.existsSync(jaPath)) {
        // an English page that has a dependent Japanese page
        stream = compilePug(gulp.src([fullPath, jaPath], { base: basePath }));
      } else {
        // a Japanese pug page
        // or an English page that does not have a dependent Japanese page
        stream = compilePug(gulp.src([fullPath], { base: basePath }));
      }
    }

    stream.on("finish", browserSync.reload.bind(browserSync));
  };
  watcher.on("add", handler);
  watcher.on("change", handler);

  return watcher;
});

// [watch:semantic]
gulp.task("watch:semantic", function () {
  return gulp.watch(
    "semantic/**/*.{less,overrides,variables}",
    gulp.task("semantic:assets")
  );
});

// [watch:css]
gulp.task("watch:css", function () {
  return gulp.watch(
    "src/stylesheets/**/*.less",
    {
      events: ["add", "change"],
    },
    gulp.series("css:debug", (done) => {
      browserSync.reload();
      done();
    })
  );
});

// Build from scratch
// [site]
gulp.task(
  "site",
  gulp.series(
    "del",
    // build Semantic UI (Fomantic UI) and place them in dist/
    "semantic",
    gulp.parallel(
      // copy font files to dist/
      "copy:fonts",
      // copy other files to dist/
      "copy:default",
      gulp.series(
        gulp.parallel(
          // build publications.json and place it in build/
          gulp.series("bibtex", "copy:bibtex"),
          // build client-side JavaScript files and place them in src/
          "ts",
          // build utility JavaScript files and place them in build/
          "ts:node",
          // replace text in *.json and place them in build/
          "replace:node",
          // use devicon in *.less
          "replace:devicon"
        ),
        gulp.parallel("html", "rss", "sitemap", "js", "css:bare"),
        "css",
        "gzip"
      )
    )
  )
);
// [site:debug]
gulp.task(
  "site:debug",
  gulp.series(
    "del",
    // build Semantic UI (Fomantic UI) and place them in dist/
    "semantic",
    gulp.parallel(
      // copy font files to dist/
      "copy:fonts",
      // copy other files to dist/
      "copy:default",
      gulp.series(
        gulp.parallel(
          // build publications.json and place it in build/
          gulp.series("bibtex", "copy:bibtex"),
          // build client-side JavaScript files and place them in src/
          "ts",
          // build utility JavaScript files and place them in build/
          "ts:node",
          // replace text in *.json and place them in build/
          "replace:node",
          // use devicon in *.less
          "replace:devicon"
        ),
        gulp.parallel("html:debug", "rss", "sitemap", "js:debug", "css:debug"),
        "gzip:debug"
      )
    )
  )
);

// High-level tasks
gulp.task("default", gulp.task("site"));
gulp.task("debug", gulp.task("site:debug"));
gulp.task("test", gulp.task("lint:html"));
gulp.task(
  "json",
  gulp.series(gulp.parallel("ts", "ts:node", "replace:node"), "js")
);
gulp.task("dev", gulp.parallel("browser-sync", "watch:html", "watch:css"));
gulp.task(
  "dev:meta",
  gulp.series(
    gulp.parallel(gulp.series("bibtex", "copy:bibtex"), "replace:node"),
    "html:meta"
  )
);
