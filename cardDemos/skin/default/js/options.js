(function ($) {
    $.options = {
        init: function () {

            $('.options-title1 .setOptions .dropdownstyle .dropdown-menu li').click(function () {
                var $dom = $(this).parents('.options-title1');
                alert($(this).text());
            });
        },
    }
})(jQuery);