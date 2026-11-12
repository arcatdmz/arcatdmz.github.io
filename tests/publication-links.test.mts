import test from "node:test";
import assert from "node:assert/strict";

import { publicationProjectLinks } from "../site/publication-links";

function project(
  key: string,
  publications: string[],
  link: string | boolean = `/${key}/`,
  privateProject = false,
) {
  return {
    project: key,
    getPublications: () => publications,
    getTitle: () => key,
    getLink: (language: string) =>
      language === "ja" && typeof link === "string" ? `/ja${link}` : link,
    isPrivateProject: () => privateProject,
  };
}

test("cross-project links require both an external paper and another representative project", () => {
  const current = project("current", ["own", "shared", "unrepresented"]);
  const other = project("other", ["own", "shared"]);
  const publications = {
    own: { entryTags: { project: "current" } },
    shared: { entryTags: { project: "other" } },
    unrepresented: { entryTags: { project: "other" } },
  };
  const links = publicationProjectLinks(
    current,
    [current, other],
    publications,
    "en",
    "/",
  );
  assert.deepEqual(links, { shared: { href: "/other/", title: "other" } });
  assert.deepEqual(
    publicationProjectLinks(
      current,
      [current, other],
      publications,
      "ja",
      "/ja/",
    ),
    { shared: { href: "/ja/other/", title: "other" } },
  );
});

test("owner wins among multiple representative projects; private or unlinked targets are skipped", () => {
  const current = project("current", ["paper"]),
    first = project("first", ["paper"]),
    owner = project("owner", ["paper"]);
  const publications = { paper: { entryTags: { project: "owner" } } };
  assert.equal(
    publicationProjectLinks(
      current,
      [current, first, owner],
      publications,
      "en",
      "/",
    ).paper.href,
    "/owner/",
  );
  assert.equal(
    publicationProjectLinks(
      current,
      [current, first, project("owner", ["paper"], false)],
      publications,
      "en",
      "/",
    ).paper.href,
    "/first/",
  );
  assert.deepEqual(
    publicationProjectLinks(
      current,
      [current, project("owner", ["paper"], "/owner/", true)],
      publications,
      "en",
      "/",
    ),
    {},
  );
});
