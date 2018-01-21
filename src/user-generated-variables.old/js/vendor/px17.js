var params = parseQueryString(), taDomain = params['textalive'] || 'http://textalive.jp';
function parseQueryString() {
    var queryString = location.search;
    var parameters = {};
    if (queryString.charAt(0) !== '?') {
        return {};
    }
    var queries = queryString.substring(1).split('&');
    for (var i = 0; i < queries.length; i++) {
        var q = queries[i], key = q.substring(0, q.indexOf('=')), value = q.substring(key.length + 1);
        parameters[key] = value;
    }
    return parameters;
}
function createOverlay(e, onClick, text) {
    var $e = $(e), $overlay = $('<div></div>');
    $overlay.click(function () { return onClick($e, $overlay); });
    $overlay.addClass('iframe-overlay');
    var $overlayDiv = $('<div></div>');
    $overlay.append($overlayDiv);
    var $icon = $('<i></i>');
    $icon.addClass('fa fa-play-circle');
    $overlayDiv.append($icon);
    if (text) {
        var $text = $('<p></p>');
        $text.text(text);
        $overlayDiv.append($text);
    }
    $e.append($overlay);
    return $overlay;
}
function onRevealReady() {
    initSlide($(Reveal.getCurrentSlide()));
}
function initSlide($slide) {
    if (!!$slide.data('clickHandlerInitialized'))
        return;
    $slide.data('clickHandlerInitialized', true);
    var $code = $slide.find('code'), i = setInterval(function () {
        if (!$code.hasClass('hljs'))
            return;
        clearInterval(i);
        $slide.find('pre>code>.clickable.line').click(function (e) {
            var $target = $($(e.target).data('target'));
            if ($target.length <= 0)
                return;
            $target.fadeIn().removeClass('hidden');
            if (!!$target.data('dismissHandlerInitialized'))
                return;
            $target.data('dismissHandlerInitialized', true);
            $target.click(function () {
                return $target.fadeOut(function () {
                    return $target.addClass('hidden');
                });
            });
        });
    }, 100);
}
function init() {
    $('a').filter(function (i, e) { return !!$(e).attr('href'); }).each(function (i, el) {
        var $el = $(el);
        if (!$el.attr('href') || $el.attr('href').indexOf('#') === 0)
            return;
        $el.attr('target', '_blank');
    });
    if (Reveal.isReady()) {
        onRevealReady();
    }
    else {
        Reveal.addEventListener('ready', onRevealReady);
    }
    Reveal.addEventListener('slidechanged', function (e) {
        var $slide = $(e.currentSlide);
        initSlide($slide);
    });
    $('.live-demo').each(function (i, e) {
        if (e instanceof HTMLElement)
            createOverlay(e, function ($e, $overlay) {
                var $iframe = $('<iframe></iframe>');
                $iframe.css('width', '100%');
                $iframe.css('height', '100%');
                var src = $e.attr('data-src');
                if (src.indexOf('http://') < 0)
                    src = taDomain + src;
                $iframe.attr('src', src);
                $iframe.on('load', function () {
                    $overlay.fadeOut(function () { return $overlay.remove(); });
                });
                $e.append($iframe);
            });
    });
    $('#ugv-demo .live-demo .iframe-overlay').click(function () {
        $('#ugv-demo h1>span').addClass('label').text('for end-users');
    });
    $(window).on('message', function (e) {
        try {
            var message = JSON.parse(e.originalEvent.data);
            if (message.source !== 'textalive')
                return;
            if (message.event === 'onVariableDeclared') {
                $('#ugv-demo h1>span').text('for programmers');
                var $overlay = createOverlay($('#ugv-demo .live-demo')[0], function ($e, $overlay) {
                    $overlay.fadeOut(function () { return $overlay.remove(); });
                }, 'As a programmer, you are navigated to this page via Twitter messages ...');
                $overlay.fadeIn();
            }
            console.log('message received from TextAlive', message.event, message.data);
        }
        catch (e) { }
    });
}
init();
