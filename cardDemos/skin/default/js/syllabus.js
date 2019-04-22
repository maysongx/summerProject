(function ($) {
    $.syllabus = {
        init: function () {
            $.syllabus.changePanelEvent();
        },
        //点击切换panel
        changePanelEvent: function () {
            $('.syllabus .accordion').find('.perPanel .title').click(function () {
                var $thisdom = $(this).parents('.perPanel');
                var thisflag = $thisdom.attr('flag');
                var $allDom = $('.syllabus .accordion').find('.perPanel');
                $allDom.each(function (index, perItem) {
                    var $curDom = $(perItem);
                    var flag = $curDom.attr('flag');
                    if (flag == thisflag) {
                        $thisdom.find('.title .btnOpenClose i').attr('class', 'glyphicon glyphicon-chevron-up  text-icon');
                        $thisdom.attr('flag', 'open');
                    } else {
                        $curDom.attr('flag', 'close');
                        $curDom.find('.cont').slideUp();
                        $curDom.find('.title .btnOpenClose i').attr('class', 'glyphicon glyphicon-chevron-down text-icon');
                    }
                });
                $thisdom.find('.title .btnOpenClose i').attr('class', 'glyphicon glyphicon-chevron-up text-icon');
                $thisdom.attr('flag', 'open');
                $thisdom.find('.cont').slideDown();
            });
        }
    }
})(jQuery);