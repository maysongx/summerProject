(function ($) {
    $.test = {
        init: function () {
            //点击弹出模态框 word-list
            $('.btnClick1').click(function () {
                var curId=112;
                var data = {};
                data.url = '../../word-list.html';
                $.public.AjaxRequestForHtml(data, function (dataHtml) {
                    if ($(".WordListModalDialog").length == 0) {
                        $('body').append(dataHtml);
                    }
                    var $WordListModalDialog_dom = $('.WordListModalDialog');
                    $.public.initModalDialog($WordListModalDialog_dom);
                    //弹出模态框
                    var $domModal = $WordListModalDialog_dom.find('.commonModalDialog');
                    $domModal.on('shown.bs.modal', function () {
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
                            var offset_top = $domModal.find('.modal-body .word-list').find('.perItem[id=' + curId + ']').offset().top-50;
                            $domModal.find('.modal-body')[0].scrollTop = offset_top;
                        }
                    });
                    $domModal.modal('show');
                });
            });

            //点击弹出模态框 options
            $('.btnClick2').click(function () {
                var data = {};
                data.url = '../../options.html';
                $.public.AjaxRequestForHtml(data, function (dataHtml) {
                    if ($(".SettingsOptionsModalDialog").length == 0) {
                        $('body').append(dataHtml);
                    }
                    var $SettingsOptionsModalDialog_dom = $('.SettingsOptionsModalDialog');
                    $.public.initModalDialog($SettingsOptionsModalDialog_dom);
                    //弹出模态框
                    var $domModal = $SettingsOptionsModalDialog_dom.find('.commonModalDialog');
                    $domModal.modal('show');
                });
            });

        },

    }
})(jQuery);