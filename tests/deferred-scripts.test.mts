import test from "node:test";
import assert from "node:assert/strict";
import { runDeferredScripts } from "../site/deferred-scripts";

function environment(async = false) {
  const inserted: any[] = [];
  const placeholders = [
    {
      dataset: {
        src: "https://example.com/widget.js",
        async: async ? "true" : undefined,
      },
      attributes: [],
      after(script: unknown) {
        inserted.push(script);
      },
    },
    {
      dataset: {},
      attributes: [],
      textContent: "initializeWidget()",
      after(script: unknown) {
        inserted.push(script);
      },
    },
  ];
  const document = {
    querySelectorAll: () => placeholders,
    createElement: () => ({ setAttribute() {} }),
  } as unknown as Document;
  return { inserted, document };
}

test("ordered inline widgets wait for their external dependency's actual load", async () => {
  const { inserted, document } = environment();
  const run = runDeferredScripts(document);
  assert.equal(inserted.length, 1);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(inserted.length, 1);
  inserted[0].onload();
  await run;
  assert.equal(inserted[1].textContent, "initializeWidget()");
  await runDeferredScripts(document);
  assert.equal(
    inserted.length,
    2,
    "already executed placeholders are not duplicated",
  );
});

test("an explicit load failure releases the queue for guarded inline widgets", async () => {
  const { inserted, document } = environment();
  const run = runDeferredScripts(document);
  inserted[0].onerror();
  await run;
  assert.equal(inserted.length, 2);
});

test("originally async social widgets do not delay the following scripts", async () => {
  const { inserted, document } = environment(true);
  await runDeferredScripts(document);
  assert.equal(inserted.length, 2);
});
