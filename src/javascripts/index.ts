
import(/* webpackChunkName: "library" */ './library').then(TestLib => {
  const testLib = new TestLib.default();
  console.log('dynamically loaded library: 1+2=', testLib.test(1, 2));

  $('a.sns').on('click touch', () => {
    $('.sns.list').transition('jiggle');
    return true;
  });
});

import(/* webpackChunkName: "history" */ './history').then(history => {
  const historyLoader = new history.default();
  historyLoader.onLoad((histories) => {
    const lang: string = (<any>self)["lang"];
    const entries = histories[lang];
    const num = 5;
    var cursor = num;
    $('a.more')
      .removeClass('disabled')
      .on('click touch', () => {
        const es = entries.slice(cursor, cursor + num)
          , $historyList = $('.ui.segment.history>.ui.list');
        for (const e of es) {
          const $item = $('<div class="item"><i class="right triangle icon"></i><div class="content"><div class="header"></div><div class="description"></div></div></div>');
          $item.find('.header').html(e.text);
          $item.find('.description').text(e.getDateString(lang));
          $historyList.append($item);
        }
        cursor += num;
        if (cursor > entries.length) {
          $('a.more').addClass('disabled');
        }
      });
  });
});
