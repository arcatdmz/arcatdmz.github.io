import fetch from "node-fetch";
import { mkdirp } from "mkdirp";
import fs from "fs";

mkdirp("dist/ja/blog/").then(() => {
  fs.writeFileSync(
    `dist/ja/blog/index.html`,
    `<html><head><meta http-equiv="refresh" content="0;URL='https://blog.junkato.jp/ja/'" /></head></html>`
  );
});

fetch("https://blog.junkato.jp/redirections.json").then(async (res) => {
  const redirections = await res.json();

  const traverseCategories = (cat, basePath) => {
    const promises = [];
    Object.entries(cat, ([key, value]) => {
      const dirPath = `${basePath}${key}`;
      const url = `https://blog.junkato.jp/ja/tags/${key}/`;
      const promise = (async function () {
        await mkdirp(dirPath);
        fs.writeFileSync(
          `${dirPath}/index.html`,
          `<html><head><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0;URL='${url}'" /></head></html>`
        );
      })();
      promises.push(promise);
      if (typeof value === "boolean") {
        return;
      }
      promises.push(...traverseCategories(value, `${dirPath}/`));
    });
    return promises;
  };

  return Promise.all([
    ...redirections.articles.map(async (redirection) => {
      const dirPath = `dist/ja/blog/${redirection.old}`;
      const url = `https://blog.junkato.jp/ja/posts/${redirection.new}/`;
      await mkdirp(dirPath);
      fs.writeFileSync(
        `${dirPath}/index.html`,
        `<html><head><link rel="canonical" href="${url}"><meta http-equiv="refresh" content="0;URL='${url}'" /></head></html>`
      );
    }),
    ...traverseCategories(redirections.categories, "dist/ja/blog/category/")
  ]);
}).catch((err) => {
  console.error("Error setting up redirections:", err);
});
