import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";

test("public slide downloads match the reviewed manifest and GitHub file limits", async () => {
  const slides = JSON.parse(await readFile("site/slides.json", "utf8"));
  assert.equal(slides.length, 5);
  assert.equal(new Set(slides.map((s) => s.id)).size, 5);
  for (const slide of slides) {
    assert.match(slide.id, /^[a-z]+(?:-[a-z]+)*$/);
    const bytes = await readFile(`src/slides/${slide.id}.pdf`);
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
    assert.equal(bytes.length, slide.bytes);
    assert.ok(bytes.length < 100 * 1024 * 1024);
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      slide.sha256,
    );
  }
  assert.deepEqual(
    (await readdir("src/slides")).sort(),
    [...slides.map((s) => s.id + ".pdf"), "home-hack.png"].sort(),
  );
});
