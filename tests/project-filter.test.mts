import test from "node:test";
import assert from "node:assert/strict";

import {
  isResearchProject,
  partitionProjectFilter,
  projectFilterTag,
  projectFilterHref,
} from "../site/project-filter";
import { getPageData } from "../site/page-data.server";
import { alternateLanguageHref } from "../site/navigation";

test("research filtering excludes design, conceptual, committee and private entries", () => {
  assert.equal(isResearchProject({ tags: ["music"] }), true);
  for (const category of ["private", "concept", "committee"])
    assert.equal(isResearchProject({ category }), false);
  assert.equal(isResearchProject({ private: true }), false);
});
test("query filters are validated and reset while preserving unrelated parameters and fragments", () => {
  const tags = [{ key: "music", label: "Music", title: "Music", count: 2 }];
  assert.equal(projectFilterTag("/projects/?tag=music", tags), "music");
  assert.equal(projectFilterTag("/projects/?tag=unknown", tags), "");
  assert.equal(projectFilterTag("/projects/", tags), "");
  assert.equal(
    projectFilterHref("/ja/projects/?note=keep&tag=music#research", "anime"),
    "/ja/projects/?note=keep&tag=anime#research",
  );
  assert.equal(
    projectFilterHref("/projects/?note=keep&tag=music#research", ""),
    "/projects/?note=keep#research",
  );
  assert.equal(
    alternateLanguageHref({
      rootPath: "/",
      en: true,
      me: "projects/",
      languageSearch: "?tag=music",
    }),
    "/ja/projects/?tag=music",
  );
});
test("filter counts match the visible localized research dataset and do not leak into other routes", () => {
  for (const prefix of ["/", "/ja/"]) {
    const data = getPageData(`${prefix}projects/`);
    const keys = new Set(data.projectList);
    const research = data.projects.filter(
      (p) => keys.has(p.key) && isResearchProject(p),
    );
    for (const tag of data.misc.projectFilterTags) {
      assert.equal(
        tag.count,
        research.filter((p) => p.tags?.includes(tag.key)).length,
      );
      assert.ok(tag.count > 0);
    }
    assert.equal(getPageData(prefix).misc.projectFilterTags, undefined);
  }
});

test("a matching topic is featured once without changing the remaining order", () => {
  const projects = [
    { project: "first", tags: ["topic"] },
    { project: "topic", tags: ["topic"] },
    { project: "last", tags: ["topic"] },
  ];
  const filtered = partitionProjectFilter(projects, "topic", projects[1]);
  assert.equal(filtered.featured, projects[1]);
  assert.deepEqual(
    filtered.projects.map((p) => p.project),
    ["first", "last"],
  );
  assert.deepEqual(partitionProjectFilter(projects, "", projects[1]), {
    featured: undefined,
    projects,
  });
  const overview = { project: "topic", category: "concept" };
  assert.equal(
    partitionProjectFilter(projects, "topic", overview).featured,
    overview,
  );
  assert.equal(
    partitionProjectFilter(projects, "topic", { ...overview, private: true })
      .featured,
    undefined,
  );
  assert.equal(
    partitionProjectFilter(projects, "topic", { project: "other" }).featured,
    undefined,
  );
});

test("pre-paint bootstrap masks only supported query filters, leaving the default static HTML alone", async () => {
  const { projectFilterBootstrap } = await import("../site/project-filter");
  const { runInNewContext } = await import("node:vm");
  for (const [search, pending] of [
    ["", false],
    ["?tag=unknown", false],
    ["?tag=music", true],
  ]) {
    const attributes = new Map();
    runInNewContext(projectFilterBootstrap(["music"]), {
      URLSearchParams,
      window: { location: { search } },
      document: {
        documentElement: {
          setAttribute: (key: string, value: string) =>
            attributes.set(key, value),
        },
      },
    });
    assert.equal(attributes.has("data-project-filter-pending"), pending);
  }
});
