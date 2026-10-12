import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("a full asset build writes its generated inputs before page-data imports them", () => {
  const source = readFileSync(
    new URL("../scripts/prepare-assets.ts", import.meta.url),
    "utf8",
  );
  const fullBuild = source.slice(
    source.indexOf("// public is entirely generated"),
  );
  const bibliography = fullBuild.indexOf("await prepareBibliography()");
  const clock = fullBuild.indexOf('"site/generated/build-info.json"');
  const pageData = fullBuild.indexOf("await preparePageData(root)");
  assert.ok(bibliography >= 0 && clock >= 0 && pageData >= 0);
  assert.ok(
    bibliography < pageData,
    "bibliography must be generated before importing source models",
  );
  assert.ok(
    clock < pageData,
    "the new build clock must exist before importing source models",
  );
  assert.equal(fullBuild.match(/await preparePageData\(root\)/g)?.length, 1);
});
