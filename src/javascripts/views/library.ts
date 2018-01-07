/// <reference types='semantic-ui' />
/// <reference path='./clipboard.d.ts' />

import Clipboard from 'clipboard';
import '../../../dist/semantic/semantic.min';
const lang: 'en'|'ja' = (<any>self)["lang"];
const basePath: string = (<any>self)["basePath"];

// initialize dropdown menus
$('a.dropdown.item')
  .dropdown()
  .on('click touch', (ev) => {
    ev.preventDefault();
    return false;
  });

// initialize popup menu if exists
$('.with-popup').popup({
  addTouchEvents: true
});

const $popupButton = $('a.popup-menu.button');
$popupButton
  .removeClass('hidden')
  .popup({
    position: 'top right',
    lastResort: 'top right',
    addTouchEvents: true
  });

if ($popupButton.is(':visible')) {
  $popupButton.transition('bounce');
}

// initialize tag popup
const $tagLink = $('a.project.tag');
const $tagPopup = $('.ui.popup.project.tag');
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
      $currentTarget.popup('destroy');
    }

    // load project data
    loading = true;
    loadProjects().then((projects: any) => {

      // setup popup menu
      const $ct = $(ev.currentTarget);
      listProjectsByTag(projects, $ct.data('tag'));
      $currentTarget = $ct;
      $currentTarget.popup({
        popup: $tagPopup,
        onHidden: () => { $currentTarget = null; },
        onShow: () => { $currentTarget = $ct; },
        addTouchEvents: true
      });

      // show popup menu
      $currentTarget.popup('show');
      loading = false;
    });
    return false;
  });
}

function listProjectsByTag(projects: any, tag: string) {
  const entries = projects.default;
  const tags = projects.tags;
  $tagPopup.empty();
  $tagPopup.append('<div class="header"></div><div class="content"><div class="ui divided list"></div></div>');
  $tagPopup.find('.header').html(tags[tag].title ? tags[tag].title : tags[tag].label);
  const $list = $tagPopup.find('.ui.list');
  for (const p of entries) {
    if (p.tags.indexOf(tag) < 0) {
      continue;
    }
    $list.append(`<a class="item" href="${basePath}#projects-${p.project}">${p.getTitle(lang)}</div>`);
  }
  setSmoothScroll($list.find('a'));
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
setSmoothScroll($('a[href*=\\#]'));

function setSmoothScroll($e: JQuery) {
  $e.on('click touch', function(ev){
    const a = <HTMLAnchorElement>this;
    if (location.pathname === a.pathname) {
      const offset = $(a.hash).offset();
      if (offset) {
        ev.preventDefault();
        $('html,body').animate({
          scrollTop: offset.top - 64
        }, 700, () => {
          history.pushState({}, '', a.href);
        });
        return false;
      }
    }
    return true;
  });
}

// clipboard
const clipText = lang === 'en'
  ? 'Click to copy the BibTeX entry to your clipboard'
  : 'クリックでBibTeXをクリップボードにコピーします';
const copyText = lang === 'en'
  ? 'Copied!'
  : 'コピーしました！';
$('a.bibtex.button')
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
    position: 'left center',
    addTouchEvents: true
  });

new Clipboard('a.bibtex.button');

export default class TestLib {
  constructor() {
    //
  }
  test(a: number, b: number) {
    return a + b;
  }
}
