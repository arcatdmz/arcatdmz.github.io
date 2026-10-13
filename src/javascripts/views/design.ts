import type { PageScope } from "./scope";

export function initializeDesign(scope: PageScope) {
  scope.on($("a.ui.for-modal.image"), "click touch", function () {
    const $a = $(this),
      $title = $a.parents(".ui.segment").find("h3.ui.header"),
      $img = $a.find("img"),
      $modal = $(".ui.modal"),
      $modalHeader = $modal.find(".header"),
      $modalImg = $modal.find("img");
    $modalHeader.html($title.html());
    $modalImg.attr("src", <string>$img.attr("src"));
    $modal.modal("refresh").modal("show");
  });
}
