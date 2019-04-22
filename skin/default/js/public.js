(function ($) {
    $.public = {
        member: null,
        MOBILEURL: '/mobile',
        loginMsg: "登录已失效，请" + '<a herf="javascript:void(0)" onclick="$.public.login_dialog()">重新登录</a>',
        init: function () {

        },
        loadCommonStyle: function () {
            $.public.AjaxRequest({
                url: "/commonStyle.html"
            }, function (data) {
                $('body').prepend(data);
            }, 'false', 'html', null, 'get');

        },


        //使用js截取字段，多余的字段显示...
        cutTxt: function ($dom, length) {
            //显示.... 使用js实现
            var get_txt = $dom;
            var original_txt = get_txt ? get_txt : "";
            var brief_txt = original_txt.length > length ? original_txt.substr(0, length) + '....' : original_txt;
            return brief_txt;
        },

        /**
         * 主要用于免登陆考虑，跳转时有code和openID时带着
         * 跳转公用方法，url是跳转地址(必填)，isnewtab(选填)：0本窗口跳转  1新窗口跳转
         */
        opennewurl: function (url, isnewtab) {
            if (url == undefined || url == "") {
                return;
            }
            var $url = url;
            var $code = $.public.GetUrlParam("code");
            var $openid = $.public.GetUrlParam("openid");
            var strcode = "";
            var stropenid = "";
            if ($code != undefined && $code != "") {
                if ($url.indexOf("?") != -1) {
                    $url += "&code=" + $code;
                } else {
                    $url += "?code=" + $code;
                }
            }
            if ($openid != undefined && $openid != "") {
                if ($url.indexOf("?") != -1) {
                    $url += "&openid=" + $openid;
                } else {
                    $url += "?openid=" + $openid;
                }
            }
            if (isnewtab == undefined || isnewtab == 0) {
                window.location.href = $url;
            } else {
                window.open($url);
            }
        },
        initLoginPanel: function () {
            var html = '<div class="messageLogin">' +
                '<a href="/mobile/login/login.html?typeid=2" class="cont">' +
                '<span>注册后可以查看更多内容</span>' +
                '<div class="btnAction">前往注册</div>' +
                '</a>' +
                '<div class="btnClose"></div>' +
                '<div class="cover"></div>' +
                '</div>';
            if (!$.public.islogin().success) {
                if ($(".messageLogin").length <= 0) {
                    $("body").append(html);
                }
                if (!(window.location.pathname.indexOf('/login/login.html') != -1))
                    $(".messageLogin").show();
                else
                    $(".messageLogin").hide();

            } else {
                $(".messageLogin").hide();
            }

            $(".messageLogin").on("click", ".btnClose", function () {
                $(".messageLogin").hide();
            })
            var isFooter = $("body").find(".footer").length;
            if (isFooter == '0') {
                $(".messageLogin").css('bottom', '0px');
            }
        },
        //wap端跳转支付界面
        goPay: function (pid, retunurl) {
            if (!pid || pid <= 0) {
                $.public.showMsg('产品无效！');
            }
            retunurl = (!retunurl || retunurl.length <= 0) ? $.public.GetUrlRelativePath() : retunurl;
            var url = $.public.MOBILEURL + '/payorder/payconfirm.html?pid=' + pid + '&returnurl=' + retunurl;
            window.open(url);
        },
        /**
         * 登录跳转
         * @param type 登录方式 0账号密码登录  1快速登录  2注册  3重置密码  默认为0
         * @param url 登录完成后返回的页面地址 如果为空 则显示
         */
        login_dialog: function (type, url) {
            var callbackurl = (url && url.length > 0) ? url : encodeURIComponent($.public.GetUrlRelativePath());
            if (callbackurl.indexOf('%2Flogin%2Flogin.html') != -1 || callbackurl.indexOf('/login/login.html') != -1) callbackurl = $.public.MOBILEURL + '/index.html';
            var type2 = (type && type > 0) ? type : 0;
            var url22 = $.public.MOBILEURL + "/login/login.html?typeid=" + type2 + "&returnurl=" + callbackurl;
            window.location.href = $.public.MOBILEURL + "/login/login.html?typeid=" + type2 + "&returnurl=" + callbackurl;
        },
        //获取页面地址的相对路径
        GetUrlRelativePath: function () {
            //encodeURIComponent
            //decodeURIComponent
            var url = document.location.toString();
            var arrUrl = url.split("//");
            var start = arrUrl[1].indexOf("/");
            var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
            return relUrl;
        },
        /**
         * 添加加载图标
         * @param $dom
         */
        loadingAdd: function () {
            if (!$('.loading'))
                return;
            var html = "<div class='loading'>" +
                "<div class='loading-container container1'><div class='circle1'></div><div class='circle2'></div><div class='circle3'></div><div class='circle4'></div></div>" +
                "<div class='loading-container container2'><div class='circle1'></div><div class='circle2'></div><div class='circle3'></div><div class='circle4'></div></div>" +
                "<div class='loading-container container3'><div class='circle1'></div><div class='circle2'></div><div class='circle3'></div><div class='circle4'></div></div>" +
                "<div class='loading-container container4'><div class='circle1'></div><div class='circle2'></div><div class='circle3'></div><div class='circle4'></div></div></div>";
            var loadingModal = '<div class="loading-modal"></div>';
            $('body').append(loadingModal);
            $('.loading-modal').append(html);
            var width = $('.loading').width();
            var height = $('.loading').height();
            $('.loading').css({
                left: $(window).width() / 2 - width / 2,
                top: $(window).height() / 2 - height
            });
        },
        /**
         * 移除加载图标
         * @param $dom
         */
        loadingRemove: function () {
            $('body').find(".loading-modal").remove();
            $('body').find(".loading").remove();
        },
        /*消息弹出框：msg--消息正文 */
        showMsg: function (msg) {
            var htmls = '<div id="showMsg_dialog" class="showMsg_dialog commonDialog">' +
                '<div class="Msg_body">' + msg + '</div>' +
                '<div class="btnDialogClose">知道了</div></div>';

            $("#showMsg_dialog").length == 0 ? $("body").append(htmls) : $("#showMsg_dialog .Msg_body").html(msg);
            $.public.showDialogBox($("#showMsg_dialog"));
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
            ;
            if (winFlag == true) {
                $.public.loadingAdd();
            }

            $.ajax({
                async: async1,
                timeout: "20000",
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
        /**
         * 判定是否登录
         */
        islogin: function () {
            if ($.public.member == null) {
                $.ajax({
                    cache: false,
                    async: false,
                    dataType: "json",
                    "url": "/52crm/app/index.php?method52=b.member.getmember",
                    type: "get"
                })
                    .done(function (result) {
                        if (!result.success && result.code == "-30001") {
                            var $user = $.cookie('user');
                            var $pswd = $.cookie('pswd');
                            if ($user != null && $pswd != null) {
                                var pass = strDec($pswd, "52");
                                if (pass == "") {
                                    pass = $pswd;
                                }
                                $.public.Login($user, pass);
                                //$.public.Login($user, $pswd);
                                return;
                            } else {
                                $.public.member = result;
                            }
                        } else {
                            $.public.member = result;
                        }
                    });
            }
            return $.public.member;
        },
        /**
         * 获取浏览器地址中参数
         * @returns {Object}
         * name 为需要获取的参数 例如 http://localhost:81/demo/index.html?code=123
         *                           name即为code
         *                           如果name参数不传即返回所有的参数
         */
        GetUrlParam: function (name) {
            var url = location.search; //获取url中"?"符后的字串

            var theRequest = new Object();
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
        /**
         * 更改头部状态栏的选中状态
         * @param type type为选中位置或者关键词
         */
        changeHeadNavigationStatus: function (type) {
            if (typeof type == 'undefined' || type == null) {
                $('.footer .active').removeClass('active');
                $('.footer .nav').eq($.public.indexOfNavigation()).addClass('active');
            } else {
                var indexInt = parseInt(type);
                if (isNaN(indexInt)) {
                    $('.footer .active').removeClass('active');
                    $('.footer .nav').eq($.public.indexOfNavigation(type)).addClass('active');
                } else {
                    $('.footer .active').removeClass('active');
                    $('.head-nav-item').eq(indexInt).addClass('active');
                }
            }
        },

        /**
         * 获取导航栏位置  匹配url关键词
         * @param keywords 关键词，若没有则从url获取
         * @returns {number}
         */
        indexOfNavigation: function (keywords) {
            var url = window.location.href;
            var indexSelected = 0;
            var keywordsArr = [['home'], ['live', 'showback', 'jpkecheng'], ['jczhishi', 'pindu', 'shequ', 'hddayi'], ['grzhongxin']];
            if (typeof keywords != 'undefined' || keywords != null) {
                for (var index = 0; index < keywordsArr.length; index++) {
                    for (var indexx = 0; indexx < keywordsArr[index].length; indexx++) {
                        if (keywords == keywordsArr[index][indexx]) {
                            indexSelected = index;
                            break;
                        }
                    }
                }
                if (indexSelected >= 0)
                    return indexSelected;
            }
            for (var index = 0; index < keywordsArr.length; index++) {
                for (var indexx = 0; indexx < keywordsArr[index].length; indexx++) {
                    if (url.indexOf(keywordsArr[index][indexx]) >= 0) {
                        indexSelected = index;
                        break;
                    }
                }
            }
            return indexSelected;
        },

        /**
         * 监听屏幕翻转
         * @param callback true：横屏，false：竖屏
         */
        monitoringScreenRotate: function (callback) {
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
                if (window.orientation === 180 || window.orientation === 0) {
                    //竖屏
                    callback(true);
                }
                if (window.orientation === 90 || window.orientation === -90) {
                    //横屏
                    callback(false);
                }
            }, false);
        },


        /*SwiperTan内容设置*/
        swiperTab: function ($dom) {
            var tabsSwiper;
            var tabs = $dom.find(".tabs");
            tabsSwiper = new Swiper('.swiper-container', {
                speed: 500,
                onSlideChangeStart: function () {
                    tabs.find(".active").removeClass('active');
                    tabs.find(".part").eq(tabsSwiper.activeIndex).addClass('active');
                }
            });

            tabs.find(".part").on('touchstart mousedown', function (e) {
                e.preventDefault()
                tabs.find(".active").removeClass('active');
                $(this).addClass('active');
                tabsSwiper.swipeTo($(this).index());

            });

            tabs.find(".part").click(function (e) {
                e.preventDefault();
            });
        },

        /*swiperLable标签切换*/
        swiperLables: function ($dom) {
            var domObj = $($dom);
            var swiper = new Swiper($dom, {
                slidesPerView: '3',
                paginationClickable: true,
                freeMode: true
            });

            //滑动到当前选中项
            var activeIndex = parseInt(domObj.find('.swiper-slide.active').index());
            swiper.slideTo(activeIndex, 1000, false);
        },

        //BlockUI弹出框
        showDialogBox: function ($dom) {
            var left_offset = (parseInt($(window).width()) - parseInt($dom.width())) / 2 + "px";
            var top_offset = (parseInt($(window).height()) - parseInt($dom.height())) / 2 + "px";
            $.blockUI({
                message: $dom,
                css: {
                    width: $dom.width(),
                    height: $dom.height(),
                    top: top_offset,
                    left: left_offset,
                    cursor: "default",
                    "border-radius": 20,
                    border: 0
                },
                overlayCSS: {
                    cursor: "default"
                },
                baseZ: 99999,
                focusInput: false //,onOverlayClick: $.unblockUI
            });
            //关闭按钮事件
            $dom.find(".btnDialogClose").click(function () {
                $.unblockUI();
            });
        },

        gettimebydate: function (datetime) {
            var str = datetime;
            date = new Date(Date.parse(str.replace(/-/g, "/")));
            date = date.getTime();
            return date;
        },

        /*分类和排序中--设置遮罩层的高度等*/
        setHeight: function () {
            var $dom = $(".topTypeSort");
            var documentHeight = $(document).height();
            var SortContHeight = $dom.offset().top + $dom.height() + 10;
            //弹出排序框的位置
            $dom.find(".SortCont").css("top", SortContHeight);
            //弹出遮罩层的位置
            $(".TypeDialogCont").css("top", $(".topTypeSort").offset().top + $(".topTypeSort").height());


            //分类点击下拉事件
            var flag = $("").attr("flag");
            $(".topTypeSort a.Type").click(function () {
                var SortFlag = $dom.find(".TypeDialogCont").attr("flag");
                if (SortFlag == "false") {
                    $(".TypeDialogCont").slideDown("slow");
                    $dom.find(".TypeDialogCont").attr("flag", "true");
                    $(this).find(".topsmallIcon").css("transform", "rotate(180deg)");
                } else if (SortFlag == "true") {
                    $(".TypeDialogCont").slideUp();
                    $dom.find(".TypeDialogCont").attr("flag", "false");
                    $(this).find(".topsmallIcon").css("transform", "rotate(0deg)");
                    $('.TypeDialogCont .mask').unbind('touchmove');
                }
            });
            $(".TypeDialogCont .mask,.TypeDialogCont .cont a").click(function () {
                $(".TypeDialogCont").slideUp();
                $dom.find(".TypeDialogCont").attr("flag", "false");
                $(this).find(".topsmallIcon").css("transform", "rotate(0deg)");
                $('.TypeDialogCont .mask').unbind('touchmove');
            });


            //排序点击事件
            //点击排序按钮事件 下拉排序内容
            $(".topTypeSort a.Sort").click(function () {
                var SortFlag = $dom.find(".SortCont").attr("flag");
                if (SortFlag == "false") {
                    $dom.find(".SortCont").slideDown();
                    $dom.find(".SortCont").attr("flag", "true");

                } else if (SortFlag == "true") {
                    $dom.find(".SortCont").slideUp();
                    $dom.find(".SortCont").attr("flag", "false");
                }
            });

            $(".topTypeSort").find(".SortCont a").click(function () {
                $(".topTypeSort").find(".SortCont").slideUp();
                $dom.find(".SortCont").attr("flag", "false");

            });
        },


        /**
         * 下拉刷新、上拉加载方法，此方法通用
         * @param domId  作用元素id
         * @param refreshFunctionName 下拉刷新的方法名字（注意：不带括号）
         * @param loadMoreFunctionName 上拉加载更多的方法名字（注意：不带括号）
         */
        loadRefreshMore: function (domId, refreshFunctionName, loadMoreFunctionName) {
            $('#' + domId).css({
                'cssText': 'overflow-y: auto!important',
                'height': '100%',
                '-webkit-overflow-scrolling': 'touch'
            });
            var s = new MeScroll(domId, {
                down: {
                    auto: false,
                    callback: refreshFunctionName
                },
                up: {
                    auto: true,
                    callback: loadMoreFunctionName
                }
            });
            $.public.pullRefresh = s;
            //刷新成功，请在各自方法里面调用$.public.pullRefresh.endSuccess()
        },

        /*收藏和取消收藏        
        dataShoucang：收藏服务以及参数
        dataCancel：取消收藏服务以及参数
        $dom：dom结构
        */
        shoucang: function (dataShoucang, dataCancel, $dom) {
            var flag = $dom.hasClass("finish");
            if (!flag) {
                $dom.addClass("finish");
                $dom.addClass("animate");
                $dom.find("img").attr("src", "/mobile/skin/default/images/colection3.png");
                $dom.find("span").text("已收藏");
                $.public.AjaxRequest(dataShoucang, function (data) {
                    if (data && data.success) {
                    } else {
                        $.public.showMsg(data.reason);
                    }
                }, true, 'json', true);
            } else {
                //取消收藏
                $dom.removeClass("finish");
                $dom.removeClass("animate");
                $dom.find("img").attr("src", "/mobile/skin/default/images/colection4.png");
                $dom.find("span").text("收藏");

                $.public.AjaxRequest(dataCancel, function (data) {
                    if (data && data.success) {
                    } else {
                        $.public.showMsg(data.reason);
                    }
                }, true, 'json', true);
            }
        },

        /*点赞
        data：点赞服务
        $dom：dom结构
        */
        zan: function (data, $dom) {
            var zanObj = $dom;
            var flag = zanObj.hasClass("finish");
            if (!flag) {
                $.public.AjaxRequest(data, function (data) {
                    if (data && data.success) {
                        var zanNum = parseInt(zanObj.text()) + 1;
                        zanObj.find("span").text(zanNum);
                        zanObj.addClass("finish");
                        zanObj.addClass("animate");
                        zanObj.find("img").attr("src", "/mobile/skin/default/images/good2.png");
                    } else {
                        $.public.showMsg(data.reason);
                    }
                }, true, 'json', true);
            } else {
                $.public.showMsg("您已经点过赞了哦^_^");
                zanObj.removeClass("animate");
                return;
            }
        },

        /**
         * 输入框的动态设置
         */
        sendMsgWrapModify: function () {
            $('.sendMsgWrap .textarea textarea').on('input propertychange', function () {
                $('.sendMsgWrap .textarea').css('height', $('.sendMsgWrap .textarea textarea')[0].scrollHeight);
            });
            setInterval(function () {
                if ($.trim($('.sendMsgWrap .textarea textarea').val()) == 0) {
                    $('.sendMsgWrap .textarea').css('cssText', 'height:0.93333rem');
                }
            }, 300);
        },


        /**
         * 分享配置 （qq空间、微博使用百度一键分享，微信朋友圈和qq使用微信自带分享）
         */
        shareConfigure: function () {
            $('.shareWrap .detail .d2Share').addClass('bdsharebuttonbox');
            $('.shareWrap .detail .d2Share').attr('data-tag', 'share_1');
            $('.shareWrap .detail .d2Share').attr('data-bd-bind', '1502180840186');

            $('.shareWrap .detail .d2Share .qq').attr({
                'data-cmd': 'qzone',
                'href': '#'
            });
            $('.shareWrap .detail .d2Share .weibo').attr('data-cmd', 'tsina');

            with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
            $('.shareWrap .detail .d2Share a').css({
                'background-size': '0%'
            });
            if ($('.shareWrap').length) {
                $('.shareWrap').show();
                $('.shareWrap .detail').height($('.shareWrap .detail')[0].scrollHeight);
                $('.shareWrap').bind('touchmove', function (e) {
                    e.preventDefault();
                });

                $('.shareWrap .detail').height($('.shareWrap .detail')[0].scrollHeight);
                $('.shareWrap .cancel,.shareWrap .bg').on('click', function () {
                    $('.shareWrap .detail').height(0);
                    $('.shareWrap .detailCopy').height(0);
                    $('.shareWrap .arrow').hide();
                    setTimeout(function () {
                        $('.shareWrap').hide();
                    }, 300);
                });
            }

            /**
             * 如果在微信中，将配置分享到微信朋友圈和qq
             */
            if ($.public.isWX()) {
                wx.ready(function () {
                    // 在这里调用 API
                    // wx.checkJsApi({
                    //     jsApiList: ['onMenuShareQQ','onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    //     success: function(res) {
                    //         alert(JSON.stringify(res));
                    //     },
                    //     fail:function (res) {
                    //         alert(JSON.stringify(res));
                    //     }
                    // });
                    setTimeout(function () {
                        wx.onMenuShareTimeline({
                            // title: '微信朋友圈分享', // 分享标题
                            // link: 'http://52investing.com/index.html', // 分享链接
                            // imgUrl: 'http://52investing.com/52crm/avator/default.jpg', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                alert(JSON.stringify(data))
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                alert(JSON.stringify(data))
                            },
                            fail: function (data) {
                                alert(JSON.stringify(data))
                            }
                        });
                        wx.onMenuShareQQ({
                            // title: 'QQ分享', // 分享标题
                            // link: 'http://52investing.com/index.html', // 分享链接
                            // imgUrl: 'http://52investing.com/52crm/avator/default.jpg', // 分享图标
                            // desc: '这是一条qq分享测试',
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                alert(JSON.stringify(data))
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                alert(JSON.stringify(data))
                            },
                            fail: function (data) {
                                alert(JSON.stringify(data))
                            }
                        });
                    }, 2000);
                });
                //微信朋友圈分享点击事件
                $('.shareWrap .d2Share .wx').on('click', function () {
                    $('.shareWrap .arrow').show();
                })

            } else {
                //微信朋友圈点击分享事件
                $('.shareWrap .d2Share .wx').on('click', function () {
                    $('.shareWrap .detail').height(0);
                    $('.shareWrap .detailCopy').height($('.shareWrap .detailCopy')[0].scrollHeight);
                })
            }

        },

        /**
         * 判断是否在微信中
         */
        isWX: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger")
                return true;
            return false;
        },

        /**
         * 初始化头部事件
         */
        initHead: function () {
            //头像
            var member = $.public.islogin();
            if (member != undefined && member.success) {
                $.public.member = member;
                if ($.public.member.avator) {
                    $('.login .avatar').attr('src', $.public.member.data.avator);
                } else {
                    $('.login .avatar').attr('src', $.public.MOBILEURL + '/skin/default/images/default.jpg');
                }
            }
            $('.login .avatar').on('click', function () {
                if ($('.head-func').height() == 0) {
                    $('.head-func').height($('.head-func')[0].scrollHeight);
                } else {
                    $('.head-func').height(0);
                }
            });

            //添加跳链
            $('.userItem').eq(0).attr('href', $.public.MOBILEURL + '/jpkecheng/home.html');
            $('.userItem').eq(1).attr('href', $.public.MOBILEURL + '/grzhongxin/myOrders.html');

            $('.head-func .tab a').on('click', function () {
                $('.head-func').height(0);
            });

            //登陆
            $('.head .logout .l').on('click', function () {
                $.public.login_dialog('0');
            });

            //注册
            $('.head .logout .r').on('click', function () {
                $.public.login_dialog('2');
            });

            //退出
            $('.head-func .tab .userItem').eq(2).on('click', function () {
                $.public.logout();
            });

            //搜索
            $('.search img').on('click', function () {
                var searchText = $('.search input').val();
                if ($.trim(searchText).length > 0) {
                    window.location.href = 'http://zhannei.baidu.com/cse/search?q=' + searchText + '&click=1&s=11397429407839216736&nsid=&qq-pf-to=pcqq.c2c';
                }
            });

            $('body').on('touchstart', function (event) {
                event = event ? event : window.event;
                var obj = event.srcElement ? event.srcElement : event.target;
                if (!$(obj).hasClass('userItem') && !$(obj).hasClass('avatar')) {
                    $('.head-func').height(0);
                }
            });

            var loginInfo = $.public.islogin();
            if (loginInfo.data && loginInfo.success) {
                $('.head .logout').hide();
                $('.head .login').show();
            }
        },

        logout: function () {
            if (!($.public.islogin().success)) {
                $.cookie('usertokenid', null, {
                    path: "/"
                });
                $.cookie('loginname', null, {
                    path: "/"
                });
                $.cookie('avator', null, {
                    path: "/"
                });
                $.cookie('mid', null, {
                    path: "/"
                });
                $.cookie('grade', null, {
                    path: "/"
                });
                $.cookie('user', null, {
                    path: "/"
                });
                $.cookie('pswd', null, {
                    path: "/"
                });
                window.location.href = "/";
            } else {
                var params = {};
                params.url = "/52crm/app/index.php?method52=b.access.logout";
                params.tokenid = $.cookie("usertokenid");
                $.public.AjaxRequest(params, function (data) {
                    if (data.success) {
                        $.cookie('mobile', null, {
                            path: "/"
                        });
                        $.cookie('password', null, {
                            path: "/"
                        });
                        $.cookie('usertokenid', null, {
                            path: "/"
                        });
                        $.cookie('loginname', null, {
                            path: "/"
                        });
                        $.cookie('avator', null, {
                            path: "/"
                        });
                        $.cookie('mid', null, {
                            path: "/"
                        });
                        $.cookie('user', null, {
                            path: "/"
                        });
                        $.cookie('pswd', null, {
                            path: "/"
                        });
                        $.cookie('member_type', null, {
                            path: "/"
                        });
                        window.location.href = $.public.MOBILEURL + "/";
                    }
                });
            }
        }


    }
})(jQuery);