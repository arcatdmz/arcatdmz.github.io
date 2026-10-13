import assert from "node:assert/strict";
import test from "node:test";
import { gzipSync } from "node:zlib";
import { getSiteData } from "../site/data";
import { getPageData } from "../site/page-data.server";
import { hydratePageData } from "../site/page-data";
import { buildYear } from "../site/clock";

const source = getSiteData();

for (const lang of ["en", "ja"] as const) {
  const prefix = lang === "en" ? "/" : "/ja/";
  test(`${lang}: project viewmodels retain source formatting and links`, () => {
    const snapshot = getPageData(`${prefix}projects/`, {
      projects: source.projects.map((entry) => entry.project).filter(Boolean),
    });
    const data = hydratePageData(snapshot);
    for (const view of snapshot.projects) {
      const original = view.project
        ? source.projectsTable[view.project]
        : source.projects[Number(view.key.replace("anonymous-", ""))];
      const project = view.project
        ? data.projectsTable[view.project]
        : data.projects.find((entry) => entry.key === view.key);
      assert.ok(project, view.key);
      for (const method of [
        "getTitle",
        "getLongTitle",
        "getSubtitle",
        "getDescription",
        "getDesignTitle",
        "getDesignDescription",
        "getThumbnail",
        "getMembers",
        "getTags",
        "getDesignTags",
        "getPublication",
        "isPrivateProject",
      ] as const) {
        assert.deepEqual(
          project[method](lang),
          original[method](lang),
          `${view.key}.${method}`,
        );
      }
      assert.equal(
        project.getLink(lang, prefix),
        original.getLink(lang, prefix),
      );
      assert.equal(
        project.getYearString(lang, buildYear),
        original.getYearString(lang, buildYear),
      );
      assert.equal(
        Boolean(project.hasMembers(lang)),
        Boolean(original.hasMembers(lang)),
      );
      assert.equal(
        Boolean(project.hasPublication(lang)),
        Boolean(original.hasPublication(lang)),
      );
    }
    assert.deepEqual(
      data.products.map((entry) => entry.project),
      source.products.map((entry) => entry.project),
    );
    assert.deepEqual(
      data.headerProducts.map((entry) => entry.project),
      source.projects
        .filter((entry) => source.products.includes(entry))
        .map((entry) => entry.project),
    );
  });

  test(`${lang}: entries retain localized text, dates, awards and bibliography`, () => {
    const data = hydratePageData(getPageData(`${prefix}publications/`));
    for (const key of ["awards", "talks", "lectures"] as const) {
      for (const [index, entry] of data[key].entries()) {
        const original = source[key][index];
        assert.equal(entry.getText(lang), original.getText(lang));
        assert.equal(entry.getIconClass(), original.getIconClass());
        const originalDates =
          "dateObjs" in original ? original.dateObjs : [original];
        assert.deepEqual(
          entry.dates.map((date) => [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          ]),
          originalDates.map((entry) => [
            entry.date.getFullYear(),
            entry.date.getMonth(),
            entry.date.getDate(),
          ]),
        );
        for (const full of [false, true])
          assert.deepEqual(
            entry.getDatesString(lang, full),
            originalDates.map((date) => date.getDateString(lang, full)),
          );
        assert.equal(
          entry.isAward,
          /受賞|選定/.test(original.getText("ja") || ""),
        );
      }
    }
    for (const entry of data.publications) {
      const original = source.publicationsTable[entry.citationKey];
      for (const method of [
        "getAuthorsTags",
        "getEditorsTags",
        "getFundings",
        "getBibTeX",
        "getBookWithPages",
        "getDOIUrl",
      ] as const)
        assert.deepEqual(entry[method](), original[method]());
    }
    const originalMedia = source.mediaList.filter(
      (entry) =>
        !entry.private && !entry.draft && (lang === "ja" || entry.media?.en),
    );
    assert.equal(data.mediaList.length, originalMedia.length);
    data.mediaList.forEach((entry, index) => {
      const original = originalMedia[index];
      assert.equal(entry.getText(lang), original.getText(lang));
      assert.equal(entry.getMedia(lang), original.getMedia(lang));
      assert.equal(
        entry.getDateString(lang, true),
        original.getDateString(lang, true),
      );
      assert.deepEqual(entry.getTags(lang), original.getTags(lang));
    });
  });

  test(`${lang}: home and year routes do not ship unrelated site content`, () => {
    const home = getPageData(prefix);
    assert.equal(home.histories.length, 5);
    assert.equal(home.historyCount, source.histories[lang].length);
    assert.deepEqual(
      home.histories.map((entry) => entry.text),
      source.histories[lang].slice(0, 5).map((entry) => entry.text),
    );
    assert.equal(
      home.awards.length +
        home.talks.length +
        home.lectures.length +
        home.mediaList.length,
      0,
    );
    assert.equal(home.publicationList.length, 0);
    assert.ok(home.publications.length < 15);
    assert.equal(
      home.projects.length,
      new Set([...source.products, ...source.selectedProjects]).size,
    );
    assert.equal("moment" in home, false);
    assert.ok(
      gzipSync(JSON.stringify(home)).length < 12_000,
      "Home page data should remain below 12KB gzip, excluding image metadata",
    );
    for (let year = lang === "en" ? 2011 : 2010; year <= buildYear; year++) {
      const data = hydratePageData(getPageData(`${prefix}timeline/${year}/`));
      assert.ok(
        data.histories[lang].every(
          (entry) => entry.date.getFullYear() === year,
        ),
      );
      assert.ok(data.projects.every((entry) => entry.year.from === year));
      assert.ok(
        data.publications.every(
          (entry) => Number(entry.entryTags.year) === year,
        ),
      );
      assert.ok(
        data.mediaList.every((entry) => entry.date.getFullYear() === year),
      );
    }
  });

  test(`${lang}: design durations use the immutable build clock`, () => {
    const data = getPageData(`${prefix}design/`);
    for (const [key, value] of Object.entries(data.durations))
      assert.equal(
        value,
        source.moment(key.split(",").map(Number)).locale(lang).toNow(true),
      );
  });
}

test("a project page carries only relevant publications and references", () => {
  const data = getPageData("/textalive/", {
    projects: [
      "textalive",
      "creativity-support-environments",
      "lyric-app-framework",
    ],
    publicationProjects: ["textalive"],
  });
  const sourceKeys = source.publications
    .filter(
      (entry) =>
        entry.entryTags?.project?.includes("textalive") &&
        entry.entryTags.language !== "japanese",
    )
    .map((entry) => entry.citationKey);
  assert.deepEqual(data.publicationList, sourceKeys);
  assert.ok(data.publications.length < source.publications.length / 5);
  assert.deepEqual(data.histories, []);
  assert.deepEqual(
    data.mediaList,
    [],
    "a publication section must not implicitly include unrendered media",
  );
  assert.deepEqual(data.misc, {});
  assert.deepEqual(data.durations, {});
});

test("OpenPool requests its media explicitly, including original English logo names", () => {
  const data = hydratePageData(
    getPageData("/ja/openpool/", {
      projects: ["openpool"],
      publicationProjects: ["openpool"],
      mediaProjects: ["openpool"],
    }),
  );
  const expected = source.mediaList.filter(
    (entry) =>
      !entry.private && !entry.draft && entry.projects?.includes("openpool"),
  );
  assert.equal(data.mediaList.length, expected.length);
  data.mediaList.forEach((entry, index) => {
    assert.equal(entry.media.en, expected[index].media?.en);
    assert.equal(entry.text.en, expected[index].text?.en);
  });
});
