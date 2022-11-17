import fetch from "node-fetch";
import mkdirp from "mkdirp";
import fs from "fs";

mkdirp("dist/ja/blog/").then(() => {
  fs.writeFileSync(
    `dist/ja/blog/index.html`,
    `<html><head><meta http-equiv="refresh" content="0;URL='https://blog.junkato.jp/ja/'" /></head></html>`
  );
});

fetch("https://blog.junkato.jp/redirections.json").then(async (res) => {
  const redirections = await res.json();
  return Promise.all(
    redirections.map(async (redirection) => {
      const dirPath = `dist/ja/blog/${redirection.old}`;
      await mkdirp(dirPath);
      fs.writeFileSync(
        `${dirPath}/index.html`,
        `<html><head><meta http-equiv="refresh" content="0;URL='https://blog.junkato.jp/ja/posts/${redirection.new}/'" /></head></html>`
      );
    })
  );
});
