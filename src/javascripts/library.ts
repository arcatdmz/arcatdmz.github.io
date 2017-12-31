/// <reference types='semantic-ui' />

import '../../dist/semantic/semantic.min';

$('a.dropdown.item')
  .dropdown()
  .on('click touch', (ev) => {
    ev.preventDefault();
    return false;
  });

export default class TestLib {
  constructor() {
    //
  }
  test(a: number, b: number) {
    return a + b;
  }
}
