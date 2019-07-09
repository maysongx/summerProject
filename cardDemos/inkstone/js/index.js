(function ($) {
    $.index = {
        init: function () {
            $('.index').on('click', '.perItem', function (w) {
                var $dom = $('.index');
                $dom.find('.perItem').removeClass('initCard');
                $dom.find('.perItem').removeClass('curCard');
                $(this).addClass('prevCard');
                var mm = $dom.find('.perItem').length + 1;
                var htmls = '<div class="perItem curCard">' + mm + '</div>';
                $dom.append(htmls);

            })
        }
    }
})(jQuery);