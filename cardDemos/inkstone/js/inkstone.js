(function ($) {
    $.inkstone = {
        init: function () {
            var writer = HanziWriter.create('demo-container', '测', {
                width: 300,
                height: 300,
                showCharacter: false,
                padding: 5
            });
            writer.quiz();

            //返回顶部
            $('.backToTop').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 'slow');
            });
        }
    }
})(jQuery);