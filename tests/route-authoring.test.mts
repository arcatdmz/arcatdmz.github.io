import test from "node:test";
import { createElement } from "react";
import { ProjectPage } from "../site/components/ProjectPage";
import type { PageDataProps } from "../site/page-data";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { prepareRoutes } from "../scripts/prepare-routes";
import { localizedPageProps } from "../site/page-props.server";

const routeSource = (route: string) => `
import Content from "@/components/example";
import { localizedPageProps as pageProps } from "@/site/page-props.server";
export default Content;
export const getStaticProps = pageProps(Content, "${route}");
`;

test("one authored route creates the other locale, registers navigation, and cleans up after removal", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "project-routes-"));
  try {
    await mkdir(path.join(root, "pages/example"), { recursive: true });
    await mkdir(path.join(root, "site"));
    await writeFile(path.join(root, "site/routes.json"), "[]");
    const source = path.join(root, "pages/example/index.tsx");
    const generated = path.join(root, "pages/ja/example/index.localized.tsx");
    await writeFile(source, routeSource("/example/"));
    await prepareRoutes(root);
    assert.match(await readFile(generated, "utf8"), /locale: "ja"/);
    assert.match(
      await readFile(generated, "utf8"),
      /from "@\/components\/example"/,
    );
    const routes = JSON.parse(
      await readFile(path.join(root, "site/generated/routes.json"), "utf8"),
    );
    assert.deepEqual(
      routes.map((route: { path: string }) => route.path),
      ["example/index.tsx", "ja/example/index.tsx"],
    );
    await prepareRoutes(root);
    await rm(source);
    await prepareRoutes(root);
    await assert.rejects(access(generated));
    assert.deepEqual(
      JSON.parse(
        await readFile(path.join(root, "site/generated/routes.json"), "utf8"),
      ),
      [],
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("Japanese-first routes also generate English entries and explicit counterpart pages take precedence", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "project-routes-"));
  try {
    await mkdir(path.join(root, "pages/ja/example"), { recursive: true });
    await mkdir(path.join(root, "site"));
    await writeFile(path.join(root, "site/routes.json"), "[]");
    await writeFile(
      path.join(root, "pages/ja/example/index.tsx"),
      routeSource("/ja/example/"),
    );
    const generated = path.join(root, "pages/example/index.localized.tsx");
    await prepareRoutes(root);
    assert.match(await readFile(generated, "utf8"), /locale: "en"/);
    const explicit = path.join(root, "pages/example/index.tsx");
    await writeFile(explicit, "// An independently authored override.\n");
    await prepareRoutes(root);
    assert.equal(
      await readFile(explicit, "utf8"),
      "// An independently authored override.\n",
    );
    await assert.rejects(access(generated));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("the shared props factory scopes data by locale without copying project references", () => {
  const Page = ({ pageData }: PageDataProps) =>
    createElement(ProjectPage, {
      pageData,
      project: "deployground",
      children: createElement("p", null, "New project content"),
    });
  const props = localizedPageProps(Page, "/deployground/", {
    projects: ["deployground"],
    publicationProjects: ["deployground"],
  });
  for (const language of ["en", "ja"] as const) {
    const data = props({ locale: language }).props.pageData;
    assert.equal(data.language, language);
    assert.ok(data.projects.some((project) => project.key === "deployground"));
    assert.ok(data.publicationList.includes("vlhcc2018-kato-deployground"));
  }
});
