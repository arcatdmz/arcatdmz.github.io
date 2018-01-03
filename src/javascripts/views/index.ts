
$('a.sns').on('click touch', (ev) => {
  setTimeout(() => $('.sns.list').transition('jiggle'), 700);
  return true;
});

import(/* webpackChunkName: "library" */ './library').then(TestLib => {
  const testLib = new TestLib.default();
  console.log('dynamically loaded library: 1+2=', testLib.test(1, 2));
});

import(/* webpackChunkName: "histories" */ '../histories').then(histories => {
  const lang: 'en'|'ja' = (<any>self)["lang"];
  const entries = histories.default[lang];
  const num = 5;
  var cursor = num;
  $('a.more')
    .removeClass('disabled')
    .on('click touch', () => {
      const es = entries.slice(cursor, cursor + num)
        , $historyList = $('.ui.segment#history .ui.list')
      var $added = null;
      for (const e of es) {
        const $item = $('<div class="item"><i class="right triangle icon"></i><div class="content"><div class="header"></div><div class="description"></div></div></div>');
        $item.find('.header').html(e.text);
        $item.find('.description').text(e.getDateString(lang));
        $historyList.append($item);
        if (!$added) $added = $item;
        else $added = $added.add($item);
      }
      cursor += num;
      if (cursor > entries.length) {
        $('a.more').addClass('disabled');
      }
      if ($added) $added.transition('jiggle');
    });
});
