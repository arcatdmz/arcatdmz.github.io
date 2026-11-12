import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}
test("shared components have one named component per file in a feature directory", () => {
  for (const file of files("site/components")) {
    assert.notEqual(path.dirname(file), "site/components", file);
    assert.notEqual(path.basename(file), "index.ts", file);
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const components: string[] = [];
    for (const node of source.statements) {
      if (ts.isFunctionDeclaration(node) && node.name)
        assert.doesNotMatch(
          node.name.text,
          /^use[A-Z]/,
          `${file}: hooks belong in site/hooks`,
        );
    }
    function visit(node: ts.Node) {
      if (
        (ts.isFunctionDeclaration(node) || ts.isVariableDeclaration(node)) &&
        node.name &&
        ts.isIdentifier(node.name) &&
        /^[A-Z]/.test(node.name.text)
      ) {
        let jsx = false;
        function check(n: ts.Node) {
          if (
            ts.isJsxElement(n) ||
            ts.isJsxSelfClosingElement(n) ||
            ts.isJsxFragment(n)
          )
            jsx = true;
          ts.forEachChild(n, check);
        }
        check(node);
        if (
          jsx ||
          (file.endsWith(".tsx") &&
            ts.isFunctionDeclaration(node) &&
            node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword))
        )
          components.push(node.name.text);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    if (file.endsWith(".tsx"))
      assert.deepEqual(components, [path.basename(file, ".tsx")], file);
    else assert.deepEqual(components, [], file);
  }
});
