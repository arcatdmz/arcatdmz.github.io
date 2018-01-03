/// <reference types='semantic-ui' />

import '../../dist/semantic/semantic.min';

// initialize dropdown menus
$('a.dropdown.item')
  .dropdown()
  .on('click touch', (ev) => {
    ev.preventDefault();
    return false;
  });

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

export default class TestLib {
  constructor() {
    //
  }
  test(a: number, b: number) {
    return a + b;
  }
}
