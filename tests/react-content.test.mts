import assert from "node:assert/strict";
import test from "node:test";

import { decodeTitle } from "../site/components/layout/SiteHead";

test("page titles retain their text and decode entities without React string coercion", () => {
  assert.equal(decodeTitle("VisionSketch"), "VisionSketch");
  assert.equal(
    decodeTitle("<strong>Research</strong> &amp; Design"),
    "Research & Design",
  );
});
