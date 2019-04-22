(function ($) {
    $.public = {
        init: function () {
            //右上角点击弹出设置
            $('.top-nav-info .rightIcon').click(function () {
                $.public.showSettingsDialog();
                var $dom = $('.settingDialog');
                $.public.initModalDialog($dom);
                var $domModal = $dom.find('.commonModalDialog');
                //弹出模态框
                $domModal.modal('show');
            });
        },

        /**
         * Ajax请求
         * @param data  参数，须包含请求地址url，即data.url
         * @param callback  回调函数
         * @param async 异步，默认是false，即同步
         * @param dateType  返回数据类型，默认json
         * @param winFlag   需要遮罩层标识，即true：需要，false：不需要
         * @param type  请求方式，默认为get
         * @constructor
         */
        AjaxRequest: function (data, callback, async, dateType, winFlag, type) {
            var async1 = false;
            var dateType1 = "json";
            var type1 = "post";
            if (async && async == true) {
                async1 = async;
            }
            if (dateType && dateType.length > 0) {
                dateType1 = dateType;
            }
            if (type && type.length > 0) {
                type1 = type
            }
            if (winFlag == true) {
                $.public.loadingAdd();
            }
            $.ajax({
                async: async1,
                timeout: "10000",
                url: data.url,
                data: data,
                type: type1,
                cache: false,
                dataType: dateType1,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    callback(data);
                    if (winFlag == true) {
                        $.public.loadingRemove();
                    }
                },
                error: function (data) {
                    if (winFlag == true) {
                        $.public.loadingRemove();
                    }
                }
            });
        },

        AjaxRequestForHtml: function (data, callback) {
            var async1 = false;
            $.ajax({
                async: async1,
                timeout: 10000,// 超时时间限制为5秒
                url: data.url,
                dataType: "html",
                success: function (data) {
                    callback(data);
                },
                error: function () {
                    alert("没有相对应的页面，请联系相关人员！");
                }
            });
        },

        /**
         * 获取浏览器地址中参数
         * @returns {Object}
         * name 为需要获取的参数 例如 http://localhost:81/demo/index.html?code=123
         *                           name即为code
         *                           如果name参数不传即返回所有的参数
         */
        getUrlParam: function (name) {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            if (name) {
                return theRequest[name];
            }
            return theRequest;
        },

        //初始化模态框
        initModalDialog: function ($dom) {
            // $dom.show();
            $dom.css('display','block');
            var $domModal = $dom.find('.commonModalDialog');
            $domModal.modal({
                keyboard: false,//按键esc 自动关闭
                backdrop: 'static',
                show: false
            });
            //关闭按钮
            $domModal.find('.modal-header .btnClose').click(function () {
                $dom.hide();
                $dom.find('.commonModalDialog').modal('hide');
            });

            //同时监听浏览器后退事件
            $.public.BrowserBackEvent($dom);
        },

        //监听浏览器后退事件
        BrowserBackEvent: function ($dom) {
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function () {
                    window.history.pushState('forward', null, '#');
                    window.history.forward(1);
                    //关闭模态框
                    $dom.hide();
                    $dom.find('.commonModalDialog').modal('hide');
                });
            }
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        },

        //右上角的设置弹出框
        showSettingsDialog: function () {
            var htmls = '<div id="settingDialog" class="settingDialog">\n' +
                '    <div class="commonModalDialog modal fade" tabindex="-1" role="dialog">\n' +
                '        <div class="modal-dialog" role="document">\n' +
                '            <div class="modal-content container" style="width: 100%">\n' +
                '                <div class="modal-body">\n' +
                '                    <div class="setting">\n' +
                '                        <div class="perItem">\n' +
                '                            <div class="tagIcon">\n' +
                '                                <i class="glyphicon glyphicon-share-alt text-icon"></i>\n' +
                '                            </div>\n' +
                '                            <span class="text">Share the Set</span>\n' +
                '                        </div>\n' +
                '                        <div class="perItem">\n' +
                '                            <div class="tagIcon">\n' +
                '                                <i class="glyphicon glyphicon-question-sign text-icon"></i>\n' +
                '                            </div>\n' +
                '                            <span class="text">Help</span>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';


            if ($("#settingDialog").length == 0) {
                $('body').append(htmls);
            }
            var $dom = $('#settingDialog');
            $dom.show();
            $dom.find('.maskCoverDialog-cont').slideDown('slow');

            //点击空白处 关闭
            $dom.click(function (e) {
                e.stopPropagation();
                $dom.hide();
                $dom.find('.commonModalDialog').modal('hide');
            });
        }
    }
})(jQuery);