import type { PageScope } from "./scope";

export function initializeHome(scope: PageScope) {
  const lang: "en" | "ja" = (<any>self).lang;

  const $avatar = $("#avatar");
  if (Math.random() > 0.5) {
    const altSrc = <string>$avatar.attr("data-alt-src");
    $avatar.attr("src", altSrc);
  }

  scope.on($("a.sns"), "click touch", (_ev) => {
    scope.timeout(() => $("#sns").transition("jiggle"), 700);
  });

  scope.on($avatar, "click touch", function () {
    $(".ui.modal").modal("refresh").modal("show");
  });

  const num = 5;
  const $moreButton = $("a.more");
  var cursor = num,
    entries: any[] | undefined;
  scope.on($moreButton.removeClass("disabled"), "click touch", () => {
    if (entries) {
      return handleEntries(entries);
    }
    $moreButton.addClass("loading disabled");
    import(/* webpackChunkName: "histories" */ "../histories").then(
      (histories) => {
        if (!scope.active) return;
        $moreButton.removeClass("loading disabled");
        entries = histories.default[lang];
        if (entries) handleEntries(entries);
      },
    );
  });

  function handleEntries(entries: any[]) {
    const es = entries.slice(cursor, cursor + num),
      $historyList = $("#history .ui.feed");
    var $added = null;
    for (const e of es) {
      const $item = $(
        '<div class="event"><div class="content"><div class="date"></div><div class="header"></div></div></div>',
      );
      $item.find(".date").text(e.getDateString(lang, true));
      $item
        .find(".header")
        .html((e.text as string).replace("${rootPath}", "/"));
      $item.find("a[href]").attr("data-site-navigation", "");
      $historyList.append($item);
      if (!$added) $added = $item;
      else $added = $added.add($item);
    }
    cursor += num;
    if (cursor > entries.length) {
      $("a.more").addClass("disabled");
    }
    if ($added) $added.transition("jiggle");
  }
}
