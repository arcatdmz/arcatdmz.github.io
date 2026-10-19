import assert from "node:assert/strict";
import test from "node:test";
import { createPageTracker, measurementId } from "../site/analytics";

test("initialization disables the automatic initial view and queues an explicit view", () => {
  const queue: unknown[] = [];
  const track = createPageTracker(queue);
  track({
    location: "https://junkato.jp/projects/?source=test#research",
    title: "Projects | junkato.jp",
    referrer: "https://example.com/article",
  });
  assert.ok(queue.every((command) => !Array.isArray(command)));
  const commands = queue.map((command) => Array.from(command as IArguments));
  assert.equal(commands[0][0], "js");
  assert.deepEqual(commands[1], [
    "config",
    measurementId,
    { send_page_view: false },
  ]);
  const metadata = {
    page_location: "https://junkato.jp/projects/?source=test",
    page_title: "Projects | junkato.jp",
    page_referrer: "https://example.com/article",
  };
  assert.deepEqual(commands[2], ["set", metadata]);
  assert.deepEqual(commands[3], [
    "event",
    "page_view",
    { ...metadata, send_to: measurementId },
  ]);
});

test("hashes and repeat renders are ignored; queries and return visits are tracked", () => {
  const queue: unknown[] = [];
  const track = createPageTracker(queue);
  const page = { location: "https://junkato.jp/", title: "Home", referrer: "" };
  track(page);
  track(page);
  track({ ...page, location: "https://junkato.jp/#contact" });
  track({
    ...page,
    location: "https://junkato.jp/?source=test",
    title: "Query",
  });
  track({ ...page, location: "https://junkato.jp/ja/", title: "日本語" });
  track(page);
  const commands = queue.map((command) => Array.from(command as IArguments));
  assert.equal(commands.filter(([command]) => command === "config").length, 1);
  const views = commands.filter(
    ([command, event]) => command === "event" && event === "page_view",
  );
  assert.deepEqual(
    views.map(([, , data]) => data),
    [
      {
        page_location: page.location,
        page_title: "Home",
        page_referrer: "",
        send_to: measurementId,
      },
      {
        page_location: "https://junkato.jp/?source=test",
        page_title: "Query",
        page_referrer: page.location,
        send_to: measurementId,
      },
      {
        page_location: "https://junkato.jp/ja/",
        page_title: "日本語",
        page_referrer: "https://junkato.jp/?source=test",
        send_to: measurementId,
      },
      {
        page_location: page.location,
        page_title: "Home",
        page_referrer: "https://junkato.jp/ja/",
        send_to: measurementId,
      },
    ],
  );
});
