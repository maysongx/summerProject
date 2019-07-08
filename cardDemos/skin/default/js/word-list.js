(function ($) {
    $.wordList = {
        init: function () {
            $.wordList.loadModal();
        },
        loadModal:function () {
            var $WordListModalDialog_dom = $('.WordListModalDialog');
            $WordListModalDialog_dom.show();
            $.public.initModalDialog($WordListModalDialog_dom);
            //弹出模态框
            var $domModal = $WordListModalDialog_dom.find('.commonModalDialog');
            $domModal.modal('show');
            $domModal.on('shown.bs.modal', function () {
                var curId = $.public.getUrlParam('id');
                var top = $domModal.find('.modal-body .word-list').find('.perItem[id=' + curId + ']').offset().top-50;
                if (curId) {
                    var $dom = $('.word-list .perItem');
                    $dom.removeClass('selected');
                    $dom.each(function (index, perItem) {
                        var thisDom = $(perItem);
                        var flagid = thisDom.attr('id');
                        if (curId == flagid) {
                            thisDom.addClass('selected');
                        }
                    });
                    $domModal.find('.modal-body')[0].scrollTop = top;
                } else {
                    var $dom = $('.word-list .perItem');
                    $dom.removeClass('selected');
                    $dom.eq(0).addClass('selected');
                    $domModal.find('.modal-body')[0].scrollTop = 0;
                }
            });
        }
    }
})(jQuery);