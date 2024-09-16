const lang: "en" | "ja" = (<any>self)["lang"];

const $avatar = $("#avatar");
if (Math.random() > 0.5) {
  const altSrc = <string>$avatar.attr("data-alt-src");
  $avatar.attr("src", altSrc);
}

$("a.sns").on("click touch", (_ev) => {
  setTimeout(() => $("#sns").transition("jiggle"), 700);
});

import(/* webpackChunkName: "library" */ "./library").then((Library) => {
  var anchor: HTMLAnchorElement | null = null;

  Library.setSidebarHiddenListener(function () {
    // console.log('sidebar is hidden', this);
    if (anchor) {
      // console.log('scroll to', anchor);
      Library.doSmoothScroll(anchor);
    }
    anchor = null;
  });

  $(".ui.sidebar.menu a").on("click touch", function (ev) {
    const a = <HTMLAnchorElement>this;
    if (!Library.checkSmoothScrollable(a)) {
      // console.log('anchor unscrollable', a);
      return;
    }
    ev.preventDefault();
    anchor = a;
    $(".ui.sidebar").sidebar("hide");
    // console.log('anchor scrollable', a);
  });

  $avatar.on("click touch", function () {
    const $modal = $(".ui.modal");
    $modal.modal("refresh").modal("show");
  });
});

const num = 5;
const $moreButton = $("a.more");
var cursor = num,
  entries: any[] | undefined;
$moreButton.removeClass("disabled").on("click touch", () => {
  if (entries) {
    return handleEntries(entries);
  }
  $moreButton.addClass("loading disabled");
  import(/* webpackChunkName: "histories" */ "../histories").then(
    (histories) => {
      $moreButton.removeClass("loading disabled");
      entries = histories.default[lang];
      if (entries) handleEntries(entries);
    }
  );
});

function handleEntries(entries: any[]) {
  const es = entries.slice(cursor, cursor + num),
    $historyList = $("#history .ui.feed");
  var $added = null;
  for (const e of es) {
    const $item = $(
      '<div class="event"><div class="content"><div class="date"></div><div class="header"></div></div></div>'
    );
    $item.find(".date").text(e.getDateString(lang, true));
    $item.find(".header").html((e.text as string).replace("${rootPath}", "/"));
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
