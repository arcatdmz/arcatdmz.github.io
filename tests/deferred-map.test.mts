import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(
  new URL("../pages/ja/teaparty/2015/index.tsx", import.meta.url),
  "utf8",
);
const literal = source.match(
  /"function initializeMap\(\)\{(?:[^"\\]|\\.)*"/,
)?.[0];
assert.ok(literal, "the event page should retain an explicit map initializer");
const initializer = JSON.parse(literal);

function environment(readyState: string, apiAvailable = true) {
  const window = new EventTarget();
  let maps = 0;
  const context = {
    window,
    document: { readyState, getElementById: () => ({}) },
    ...(apiAvailable
      ? {
          google: {
            maps: {
              LatLng: function () {},
              Map: function () {
                maps += 1;
              },
              Marker: function () {},
            },
          },
        }
      : {}),
  };
  vm.runInNewContext(initializer, context);
  return { window, count: () => maps };
}

test("a deferred map initializes even when window.load has already fired", () => {
  assert.equal(environment("complete").count(), 1);
});

test("an early map initializer waits for load and runs once", () => {
  const result = environment("loading");
  assert.equal(result.count(), 0);
  result.window.dispatchEvent(new Event("load"));
  result.window.dispatchEvent(new Event("load"));
  assert.equal(result.count(), 1);
});

test("an unavailable external Maps API does not crash site interactions", () => {
  assert.equal(environment("complete", false).count(), 0);
});
