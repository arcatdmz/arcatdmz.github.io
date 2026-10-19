import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

function sources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? sources(filename) : [filename];
  });
}

test("authored views use React primitives for standard Fomantic markup", () => {
  const violations: string[] = [];
  for (const filename of [
    "pages",
    "components",
    "site/components",
    "site/talks",
  ].flatMap(sources)) {
    if (!filename.endsWith(".tsx") || filename.endsWith(".localized.tsx"))
      continue;
    // This domain adapter centralizes the few documented stateful exceptions.
    if (filename === "site/components/SiteWidgets.tsx") continue;
    const source = ts.createSourceFile(
      filename,
      readFileSync(filename, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node: ts.Node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(source);
        if (/^[a-z]/.test(tag) || tag === "SiteLink") {
          const attribute = node.attributes.properties.find(
            (entry) =>
              ts.isJsxAttribute(entry) &&
              entry.name.getText(source) === "className",
          );
          if (
            attribute &&
            ts.isJsxAttribute(attribute) &&
            attribute.initializer
          ) {
            const value = ts.isJsxExpression(attribute.initializer)
              ? attribute.initializer.expression
              : attribute.initializer;
            const text =
              value &&
              (ts.isStringLiteral(value) ||
                ts.isNoSubstitutionTemplateLiteral(value))
                ? value.text
                : value && ts.isTemplateExpression(value)
                  ? value.head.text
                  : "";
            if (
              /(?:^|\s)ui(?:\s|$)/.test(text) ||
              (tag === "i" && /(?:^|\s)icon(?:\s|$)|icon-/.test(text)) ||
              text === "card" ||
              text === "basic segment"
            ) {
              const { line } = source.getLineAndCharacterOfPosition(
                node.getStart(source),
              );
              violations.push(
                `${filename}:${line + 1} <${tag} className=${JSON.stringify(
                  text,
                )}>`,
              );
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.deepEqual(
    violations,
    [],
    "Use the matching react-fomantic-ui component; see docs/FOMANTIC_UI_REVIEW.md",
  );
});
