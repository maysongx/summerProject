(function ($) {
    $.index2 = {
        "init": function () {
            //demo6动画 jquery动画
            $('.demo6').click(function () {
                $(this).css({
                    "animation": "demo6 3s linear infinite",
                    "-webkit-animation": "demo6 3s linear infinite"
                });
            });
        }
    };
})(jQuery);