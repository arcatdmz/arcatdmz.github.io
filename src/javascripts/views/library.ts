/// <reference types='semantic-ui' />
/// <reference path='./clipboard.d.ts' />

import Clipboard from 'clipboard';
import '../../../dist/semantic/semantic.min';
const lang: 'en'|'ja' = (<any>self)["lang"];
const basePath: string = (<any>self)["basePath"];

// initialize sidebar
var onSidebarHidden: (this: JQuery) => void;
export function setSidebarHiddenListener(func: (this: JQuery) => void) {
  onSidebarHidden = func; 
}
$('.ui.sidebar').sidebar({
  onHidden: function() {
    // console.log('sidebar is hidden (library side)');
    if (onSidebarHidden) {
      onSidebarHidden.call(this);
    }
  }
});
$('.sidebar-button').on('click touch', (ev) => {
  ev.preventDefault();
  $('.ui.sidebar').sidebar('toggle');
  return false;
});

// initialize embed
$('#body .ui.embed').embed();

// initialize dropdown menus
$('.ui.dropdown').dropdown();

// initialize popup tiphelp if exists
$('.with-popup').popup({
  hoverable: true,
  addTouchEvents: true
});

// initialize popup menu if exists
$('.publication .with-popup-menu').popup({
  inline: true,
  position: 'top right',
  lastResort: 'top right',
  hoverable: true,
  addTouchEvents: true
});

// initialize left bottom popup menu if exists
const $popupButton = $('a.popup-menu.button');
$popupButton
  .removeClass('hidden')
  .popup({
    inline: true,
    position: 'top left',
    lastResort: 'top left',
    hoverable: true,
    addTouchEvents: true
  });

if ($popupButton.is(':visible')) {
  $popupButton.transition('bounce');
}

// initialize tag popup
const $tagLink = $('a.project.tag');
if ($tagLink.length > 0) {
  var $currentTarget: JQuery | null = null
    , loading = false;
  $tagLink.on('click touch', (ev) => {
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
      $currentTarget.popup('hide');
    }

    // load project data
    loading = true;
    loadProjects().then((projects: any) => {

      // setup popup menu
      const $ct = $(ev.currentTarget);
      if (!$ct.data('initialized')) {
        var $content = listProjectsByTag(projects
            , $ct.data('tag')
            , $ct.parents('[data-project]').data('project'));
        $('body').append($content);
        $ct.popup({
          popup: $content,
          on: 'click',
          hoverable: true,
          addTouchEvents: true
        });
        $ct.data('initialized', true);
      }

      // show popup menu
      $ct.popup('show');
      $currentTarget = $ct;
      loading = false;
    });
    return false;
  });
}

function listProjectsByTag(projects: any, tag: string, currentProject: string) {
  const entries = projects.default;
  const tags = projects.tags;

  var header =  '<div class="header"></div>';
  for (const p of entries) {
    if (p.project === tag) header = '<a class="header" href=""></a>';
  }
  const $popupContent = $('<div class="ui hidden popup project tag">' + header + '<div class="content"><p></p><div class="ui divided list"></div></div></div>');

  var tagTitle;
  if (lang === 'ja' && tags[tag].ja && tags[tag].ja.title) {
    tagTitle = tags[tag].ja.title;
  } else {
    tagTitle = tags[tag].title ? tags[tag].title : tags[tag].label;
  }
  const $header = $popupContent.find('.header');
  $header.html(tagTitle);
  if (typeof $header.attr('href') !== 'undefined') {
    $header.attr('href', basePath + tag);
  }

  const $list = $popupContent.find('.ui.list');
  var count = 0;
  for (const p of entries) {
    if (!Array.isArray(p.tags) || p.tags.indexOf(tag) < 0) {
      continue;
    }
    if (p.project === currentProject) {
      // $list.append(`<div class="item">${p.getTitle(lang)}</div>`);
      continue;
    }
    $list.append(`<a class="item" href="${basePath}#projects-${p.project}">${p.getTitle(lang)}</a>`);
    count ++;
  }

  $popupContent.find('p').html(lang === 'ja'
      ? (count > 0 ? `以下のプロジェクトも<strong>${tagTitle}</strong>に関するものです。` : `他に<strong>${tagTitle}</strong>に関するプロジェクトはありません。`)
      : (count > 0 ? `Following projects are also tagged with <strong>${tags[tag].label}</strong>.` : `No other project is tagged with <strong>${tags[tag].label}</strong>.`))
  setSmoothScroll($list.find('a'));
  return $popupContent;
}

var projects: any;
function loadProjects() {
  return new Promise((resolve, reject) => {
    if (projects) {
      return resolve(projects);
    }
    import(/* webpackChunkName: "projects" */ '../projects').then((projects) => {
      resolve(projects);
    });
  });
}

// smooth scroll when possible
setSmoothScroll(
    $('#pusher a[href*=\\#]')
      .add('#fixed-menu a[href*=\\#]')
      .add('#post-footer a[href*=\\#]'));

// clipboard
const clipText = lang === 'en'
  ? 'Click to copy the BibTeX entry to your clipboard'
  : 'クリックでBibTeXをクリップボードにコピーします';
const copyText = lang === 'en'
  ? 'Copied!'
  : 'コピーしました！';
$('a.bibtex')
  .on('click touch', (ev) => {
    const $a = $(ev.currentTarget);
    var closable = false;
    $a
      .popup('destroy')
      .popup(<any>{
        content: copyText,
        position: 'left center',
        onHide: () => closable,
        onHidden: () => {
          $a
            .popup('destroy')
            .popup({
              content: clipText,
              position: 'left center',
              addTouchEvents: true
            });
        }
      })
      .popup('show');
    setTimeout(() => {
      closable = true;
      $a.popup('hide');
    }, 1000);
  })
  .popup({
    content: clipText,
    addTouchEvents: true
  });

new Clipboard('a.bibtex');

export function setSmoothScroll($e: JQuery) {
  $e.on('click touch', function(ev){
    return doSmoothScroll(<HTMLAnchorElement>this, ev);
  });
}

export function doSmoothScroll(a: HTMLAnchorElement, ev?: JQuery.Event) {
  if (!checkSmoothScrollable(a)) {
    return true;
  }
  if (ev) {
    ev.preventDefault();
  }
  const offset = <JQuery.Coordinates>$(a.hash).offset();
  $('body,html').animate({
    scrollTop: offset.top - 64
  }, 700, () => {
    history.pushState({}, '', a.href);
  });
  return false;
}

export function checkSmoothScrollable(a: HTMLAnchorElement) {
  // console.log('check scrollability', a);
  return location.pathname === a.pathname
    && typeof $(a.hash).offset() !== 'undefined';
}

export default class Library {
  constructor() {
    // Do nothing.
  }
  test(a: number, b: number) {
    return a + b;
  }
}
