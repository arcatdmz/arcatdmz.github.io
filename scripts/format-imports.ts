import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

/** Keep declaration order within each group, including side-effect imports. */
export function formatImports(source: string, filename: string): string {
  const file = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  const imports = file.statements.filter(ts.isImportDeclaration);
  if (!imports.length) return source;
  const packages: string[] = [],
    local: string[] = [];
  let previousEnd = imports[0].getStart(file);
  for (const entry of imports) {
    const specifier = (entry.moduleSpecifier as ts.StringLiteral).text;
    const text = source.slice(previousEnd, entry.end).trim();
    (/^(?:@\/|\.|\/)/.test(specifier) ? local : packages).push(text);
    previousEnd = entry.end;
  }
  // Imports separated by executable statements must retain their placement.
  const first = file.statements.indexOf(imports[0]);
  if (
    !file.statements
      .slice(first, first + imports.length)
      .every(ts.isImportDeclaration)
  )
    throw new Error(
      `${filename}: import declarations must form a single block`,
    );
  const block = [packages.join("\n"), local.join("\n")]
    .filter(Boolean)
    .join("\n\n");
  return (
    source.slice(0, imports[0].getStart(file)) +
    block +
    source.slice(imports.at(-1)!.end)
  );
}

export function importSourceFiles(): string[] {
  function walk(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const filename = path.join(dir, entry.name);
      if (entry.isDirectory())
        return entry.name === "generated" ? [] : walk(filename);
      return /\.(?:ts|tsx|mts)$/.test(filename) &&
        !filename.endsWith(".localized.tsx")
        ? [filename]
        : [];
    });
  }
  return [
    "components",
    "pages",
    "site",
    "scripts",
    "tests",
    "src/javascripts",
  ].flatMap(walk);
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const write = process.argv.includes("--write");
  const changed: string[] = [];
  for (const filename of importSourceFiles()) {
    const source = readFileSync(filename, "utf8");
    const formatted = formatImports(source, filename);
    if (source === formatted) continue;
    changed.push(filename);
    if (write) writeFileSync(filename, formatted);
  }
  if (changed.length && !write) {
    console.error(
      `Import groups need formatting. Run npm run prettify:\n${changed.join("\n")}`,
    );
    process.exitCode = 1;
  }
}
