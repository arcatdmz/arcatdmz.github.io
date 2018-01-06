/// <reference types='semantic-ui' />
/// <reference path='./clipboard.d.ts' />

import Clipboard from 'clipboard';
import '../../../dist/semantic/semantic.min';
const lang: 'en'|'ja' = (<any>self)["lang"];

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
    hoverable: true,
    addTouchEvents: true
  });

if ($popupButton.is(':visible')) {
  $popupButton.transition('bounce');
}

// smooth scroll when possible
$('a[href*=\\#]').on('click touch', function(ev){
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
