(function ($) {
    $.zhounian = {
        "init": function () {
            /*-------周年庆活动开始-------*/
            $.zhounian.zhounian_dialog();
            //金蛋设置
            setTimeout(function () {
                $('.zhounian .item .jindan').hide();
                $('.zhounian .item .jindan2').show();
            }, 3400);
            //气球设置
            setTimeout(function () {
                $('.zhounian .item .qiqiu_left').hide();
                $('.zhounian .item .qiqiu_left2').show();
            }, 1000);
            //气球设置
            setTimeout(function () {
                $('.zhounian .item .qiqiu_right').hide();
                $('.zhounian .item .qiqiu_right2').show();
            }, 1100);


            setTimeout(function () {
                $.unblockUI();
            }, 10000);

            /*-------周年庆活动结束-------*/

        },
        "zhounian_dialog": function () {
            $.blockUI({
                message: $("#zhounian"), css: {
                    width: '1200px',
                    height: '700px',
                    top: ($(window).height() - $("#zhounian").height()) / 2 + 'px',
                    left: ($(window).width() - $("#zhounian").width()) / 2 + 'px',
                    cursor: "default",
                    border: 0,
                    background: "none",
                }, overlayCSS: { cursor: "default" }, baseZ: 9999, focusInput: false /*, onOverlayClick: $.unblockUI*/
            });




        }

    }


})(jQuery);
