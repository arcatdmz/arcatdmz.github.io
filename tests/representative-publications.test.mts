import test from "node:test";
import assert from "node:assert/strict";

import projects from "../src/javascripts/projects";
import { getPageData } from "../site/page-data.server";
import { hydratePageData } from "../site/page-data";
import {
  awardsForPublications,
  awardSummary,
  awardHref,
} from "../site/publication-awards";

test("representative references normalize strings, arrays, duplicates and locale overrides", () => {
  const original = ((projects as any).default || projects).find(
    (p) => p.project === "griffith",
  )!;
  const p = Object.create(Object.getPrototypeOf(original));
  p.data = { publication: "one", ja: {} };
  assert.deepEqual(p.getPublications(), ["one"]);
  p.data.publication = ["one", "two", "one"];
  assert.deepEqual(p.getPublications(), ["one", "two"]);
  assert.equal(p.publication, "one");
  assert.equal(p.getPublication("ja"), "one");
  p.data.ja.publication = [];
  assert.deepEqual(p.getPublications("ja"), []);
  assert.equal(p.hasPublication("ja"), false);
  p.data.ja.publication = "three";
  assert.deepEqual(p.getPublications("ja"), ["three"]);
  delete p.data.publication;
  assert.deepEqual(p.getPublications(), []);
});

test("shared representatives preserve ownership and identical award sets across languages", () => {
  const ids: string[][] = [];
  for (const prefix of ["/", "/ja/"]) {
    const data = hydratePageData(
      getPageData(`${prefix}textalive/`, {
        projects: ["textalive"],
        publicationProjects: ["textalive"],
      }),
    );
    const project = data.projectsTable.textalive;
    assert.deepEqual(project.getPublications(), [
      "chi2015-kato-textalive",
      "chi2023-kato-lyric-app-framework",
    ]);
    assert.equal(
      data.publicationsTable["chi2023-kato-lyric-app-framework"].entryTags
        .project,
      "lyric-app-framework",
    );
    assert.equal(project.getPublication(), "chi2015-kato-textalive");
    const awards = awardsForPublications(
      data.linkedAwards,
      project.awardPublicationKeys,
    );
    ids.push(awards.map((a) => a.id));
    assert.deepEqual(
      awards.map((a) => a.id),
      [
        "chi2015-honorable-mention",
        "wiss2014-best-paper",
        "sigmus104-best-presentation",
      ],
    );
    assert.ok(
      !awards.some((a) =>
        a.publications.includes("chi2023-kato-lyric-app-framework"),
      ),
    );
    assert.equal(
      awardsForPublications([...awards, ...awards], project.getPublications())
        .length,
      awards.filter((a) =>
        a.publications.some((k) => project.getPublications().includes(k)),
      ).length,
    );
  }
  assert.deepEqual(ids[0], ids[1]);
});

test("award summaries count international and domestic awards independently of paper venue", () => {
  const awards = [
    { id: "a", publications: ["paper"], year: 2025, text: "A", label: "A" },
    {
      id: "b",
      publications: ["paper"],
      year: 2026,
      text: "B",
      label: "B",
      entryType: "domestic",
    },
  ];
  assert.equal(awardSummary(awards, "ja"), "2件受賞（国際1件, 国内1件）");
  assert.equal(awardSummary(awards, "en"), "2 awards in total");
  assert.equal(awardHref("b", "ja"), "/ja/publications/#award-b");
  assert.deepEqual(awardsForPublications(awards, []), []);
});

test("header switches from individual links to summary only above five awards", async () => {
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { RouterContext } =
    await import("next/dist/shared/lib/router-context.shared-runtime");
  const page = await import("../pages/griffith/index");
  for (const count of [0, 1, 5, 6]) {
    const { props } = page.getStaticProps();
    props.pageData.linkedAwards = Array.from({ length: count }, (_, i) => ({
      id: `fixture-${i}`,
      publications: ["chi2024-kato-griffith"],
      year: 2026,
      text: `Award ${i}`,
      label: `Award ${i}`,
    }));
    const router = {
      route: "/griffith/",
      pathname: "/griffith/",
      asPath: "/griffith/",
      query: {},
      basePath: "",
      isFallback: false,
      isReady: true,
      events: { on() {}, off() {}, emit() {} },
    };
    const html = renderToStaticMarkup(
      createElement(
        RouterContext.Provider,
        { value: router as any },
        createElement(page.default, props),
      ),
    );
    assert.equal(html.includes("project-awards-summary"), count > 5);
    assert.equal(/\/publications\/?#award-fixture-0/.test(html), count > 0);
  }
});

test("award labels support one language and validate explicit reference integrity", async () => {
  const { awardLabel, validatePublicationData } =
    await import("../site/publication-awards");
  assert.equal(
    awardLabel({ en: "International award" }, "ja", "Description"),
    "International award",
  );
  assert.equal(awardLabel({ ja: "国内賞" }, "en", "Description"), "国内賞");
  assert.equal(
    awardLabel({ en: "Award", ja: "受賞" }, "ja", "Description"),
    "受賞",
  );
  assert.equal(
    awardLabel(undefined, "en", "<b>Description</b>"),
    "Description",
  );
  const record = {
    data: {
      id: "award",
      publications: ["paper"],
      text: { en: "Award", ja: "受賞" },
      label: { en: "Award" },
    },
  };
  const keys = new Set(["paper"]);
  assert.doesNotThrow(() => validatePublicationData([], [record], keys));
  assert.throws(
    () => validatePublicationData([], [record, record], keys),
    /duplicate award id/,
  );
  assert.throws(
    () =>
      validatePublicationData(
        [{ project: "example", getPublications: () => ["unknown"] }],
        [],
        keys,
      ),
    /Unknown publication unknown in project example/,
  );
  assert.throws(
    () => validatePublicationData([], [record], new Set()),
    /Unknown publication paper in award award/,
  );
  assert.throws(
    () =>
      validatePublicationData(
        [],
        [{ data: { id: "award", text: { en: "Missing Japanese" } } }],
        keys,
      ),
    /Missing award translation/,
  );
});

test("structured award descriptions preserve outcome wording independently of names", async () => {
  const { awardText, compactAwardLabel } =
    await import("../src/javascripts/award-records");
  const record = {
    id: "example",
    date: "2026",
    kind: "honor" as const,
    en: { label: "Example Award", url: "https://example.org/" },
    ja: { after: " 採択" },
  };
  assert.equal(
    awardText(record, "ja"),
    '<a href="https://example.org/">Example Award</a> 採択',
  );
  assert.equal(compactAwardLabel(record, "ja"), "Example Award");
  const source = (await import("../site/data")).getSiteData();
  for (const [id, word] of [
    ["msra2012-fellowship", "採択"],
    ["jsps-dc1", "採択"],
    ["mitoh2008", "採択"],
    ["nistep2024", "選定"],
    ["aist2025-best-paper", "受賞"],
    ["chi2023-honorable-mention", "受賞"],
    ["chi2015-honorable-mention", "受賞"],
    ["chi2013-honorable-mention", "受賞"],
    ["siggraph2009-laval", "受賞"],
    ["chi2009-src", "1st Place 受賞"],
  ]) {
    const award = source.awards.find((a) => a.data.id === id)!;
    assert.ok(award.getText("ja").includes(word));
  }
  assert.equal(
    source.awards.find((a) => a.data.id === "msra2012-fellowship")!.data.kind,
    "honor",
  );
  assert.throws(
    () => awardText({ ...record, en: { label: "Missing URL" } }, "en"),
    /Missing award name\/link/,
  );
});
