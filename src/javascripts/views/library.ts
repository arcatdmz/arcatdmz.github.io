/// <reference types='semantic-ui' />
/// <reference path='./clipboard.d.ts' />

import Clipboard from "clipboard";
import "../../../dist/semantic/semantic.min";
import { type PageScope } from "./scope";
let lang: "en" | "ja";
let basePath: string;

export function initializeLibrary(scope: PageScope) {
  lang = (<any>self).lang;
  basePath = (<any>self).basePath;
  const popups: JQuery[] = [];
  const modals = $(".ui.modal")
    .toArray()
    .map((element) => ({
      element,
      parent: element.parentNode,
      next: element.nextSibling,
    }));
  $(".ui.sidebar").sidebar({
    context: $("#__next").length ? "#__next" : "body",
  });
  scope.on($(".sidebar-button"), "click touch", (ev) => {
    ev.preventDefault();
    $(".ui.sidebar").sidebar("toggle");
    return false;
  });

  scope.on($(".ui.sidebar a[href]"), "click", () => {
    $(".ui.sidebar").sidebar("hide");
  });

  // initialize embed
  $("#body .ui.embed").embed();

  // initialize dropdown menus
  $(".ui.dropdown").dropdown();

  // initialize popup tiphelp if exists
  $(".with-popup").popup({
    hoverable: true,
    addTouchEvents: true,
  });

  // initialize popup menu if exists
  $(".publication .with-popup-menu").popup({
    inline: true,
    position: "top right",
    lastResort: "top right",
    hoverable: true,
    addTouchEvents: true,
  });

  // initialize left bottom popup menu if exists
  const $popupButton = $("a.popup-menu.button");
  $popupButton.removeClass("hidden").popup({
    inline: true,
    position: "top left",
    lastResort: "top left",
    hoverable: true,
    addTouchEvents: true,
  });

  if ($popupButton.is(":visible")) {
    $popupButton.transition("bounce");
  }

  // initialize tag popup
  const $tagLink = $("a.project.tag");
  if ($tagLink.length > 0) {
    var $currentTarget: JQuery | null = null,
      loading = false;
    scope.on($tagLink, "click touch", (ev) => {
      ev.preventDefault();

      // do not show anything when loading projects data in background
      if (loading) {
        return false;
      }

      if ($currentTarget) {
        // keep showing the current popup
        if ($currentTarget[0] === ev.currentTarget) {
          return false;
        }
        // immediately remove the previous popup
        $currentTarget.popup("hide");
      }

      // load project data
      loading = true;
      loadProjects().then((projects: any) => {
        if (!scope.active) return;
        // setup popup menu
        const $ct = $(ev.currentTarget);
        if (!$ct.data("initialized")) {
          var $content = listProjectsByTag(
            projects,
            $ct.data("tag"),
            $ct.parents("[data-project]").data("project"),
          );
          $("body").append($content);
          popups.push($content);
          $ct.popup({
            popup: $content,
            on: "click",
            hoverable: true,
            addTouchEvents: true,
          });
          $ct.data("initialized", true);
        }

        // show popup menu
        $ct.popup("show");
        $currentTarget = $ct;
        loading = false;
      });
      return false;
    });
  }

  // clipboard
  const copyText =
    lang === "en"
      ? "Copied the BibTeX entry to your clipboard!"
      : "BibTeXをクリップボードにコピーしました！";
  scope.on($("a.bibtex"), "click touch", (ev) => {
    const $a = $(ev.currentTarget);
    var closable = false;
    $a.popup("destroy")
      .popup(<any>{
        content: copyText,
        position: "left center",
        onHide: () => closable,
      })
      .popup("show");
    scope.timeout(() => {
      closable = true;
      $a.popup("hide");
    }, 1000);
  });

  const clipboard = new Clipboard("a.bibtex");

  return () => {
    clipboard.destroy();
    $("body,html").stop(true);
    $(".ui.sidebar").sidebar("destroy");
    $(".ui.dropdown").dropdown("destroy");
    $(
      ".with-popup, .with-popup-menu, a.popup-menu.button, a.project.tag, a.bibtex",
    ).each(function () {
      if ($(this).data("module-popup")) $(this).popup("destroy");
    });
    $("#body .ui.embed").embed("destroy");
    for (const { element, parent, next } of modals) {
      if ($(element).data("module-modal")) $(element).modal("destroy");
      if (parent && element.parentNode !== parent)
        parent.insertBefore(element, next?.parentNode === parent ? next : null);
    }
    popups.forEach((popup) => popup.remove());
    $("body > .ui.dimmer").remove();
    $("body").removeClass("dimmed dimmable blurring scrolling");
    $("#__next").removeClass("dimmed");
  };
}

function listProjectsByTag(projects: any, tag: string, currentProject: string) {
  const entries = projects.default;
  const tags = projects.tags;

  var header = '<div class="header"></div>';
  for (const p of entries) {
    if (p.project === tag) header = '<a class="header" href=""></a>';
  }
  const $popupContent = $(
    '<div class="ui hidden popup project tag">' +
      header +
      '<div class="content"><p></p><div class="ui divided list"></div></div></div>',
  );

  var tagTitle;
  if (lang === "ja" && tags[tag].ja && tags[tag].ja.title) {
    tagTitle = tags[tag].ja.title;
  } else {
    tagTitle = tags[tag].title ? tags[tag].title : tags[tag].label;
  }
  const $header = $popupContent.find(".header");
  $header.html(tagTitle);
  if (typeof $header.attr("href") !== "undefined") {
    $header.attr("href", basePath + tag);
  }

  const $list = $popupContent.find(".ui.list");
  var count = 0;
  for (const p of entries) {
    if (!Array.isArray(p.tags) || p.tags.indexOf(tag) < 0) {
      continue;
    }
    if (p.project === currentProject || p.project === tag) {
      // $list.append(`<div class="item">${p.getTitle(lang)}</div>`);
      continue;
    }
    $list.append(
      `<a class="item" href="${basePath}projects/#projects-${
        p.project
      }">${p.getTitle(lang)}</a>`,
    );
    count++;
  }

  $popupContent
    .find("p")
    .html(
      lang === "ja"
        ? count > 0
          ? `以下のプロジェクトも<strong>${tagTitle}</strong>に関するものです。`
          : `他に<strong>${tagTitle}</strong>に関するプロジェクトはありません。`
        : count > 0
          ? `Following projects are also tagged with <strong>${tags[tag].label}</strong>.`
          : `No other project is tagged with <strong>${tags[tag].label}</strong>.`,
    );
  $popupContent.find("a[href]").attr("data-site-navigation", "");
  return $popupContent;
}

var projects: any;
function loadProjects() {
  return new Promise((resolve, reject) => {
    if (projects) {
      return resolve(projects);
    }
    import(/* webpackChunkName: "projects" */ "../projects").then((module) => {
      projects = module;
      resolve(module);
    }, reject);
  });
}
