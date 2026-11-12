import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { formatImports, importSourceFiles } from "../scripts/format-imports";

test("package imports precede local imports with one blank line", () => {
  const source =
    'import { x } from "@/site/x";\nimport { y } from "react";\nimport "react/style.css";\nimport "./style.css";\n\nexport const z = x;\n';
  const expected =
    'import { y } from "react";\nimport "react/style.css";\n\nimport { x } from "@/site/x";\nimport "./style.css";\n\nexport const z = x;\n';
  assert.equal(formatImports(source, "example.ts"), expected);
  assert.equal(formatImports(expected, "example.ts"), expected);
});

test("repository imports follow the package/local grouping rule", () => {
  const violations = importSourceFiles().filter((filename) => {
    const source = readFileSync(filename, "utf8");
    return source !== formatImports(source, filename);
  });
  assert.deepEqual(
    violations,
    [],
    "Run npm run prettify to format import groups",
  );
});
