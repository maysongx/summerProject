(function ($) {
    $.slideCard = {
        mySwiper: '',
        isAutoSlide: false,
        init: function () {
            //初始化汉字描红
            $.slideCard.HanziWriter();

            //初始化swiper插件
            $.slideCard.initSwiper();

            //反面点击字体 弹出对话框
            $(".card-container .card-back").on("click", ".card-back-cont .top-font", function (e) {
                e.stopPropagation();
                var $dom = $('.zuciModalDialog');
                $.public.initModalDialog($dom);
                var $domModal = $dom.find('.commonModalDialog');
                //弹出模态框
                $domModal.modal('show');

                var $domCuziCont = $domModal.find('.cuziCont');
                var $domCiZuList = $domCuziCont.find('.ciyuList');
                //点击 加号 减号 展开收起数据
                $domCiZuList.off('click', '.perItem .title-tag .addMinus').on('click', '.perItem .title-tag .addMinus', function () {
                    var $curDom = $(this).parents('.perItem');
                    var flag = $curDom.attr('flag');
                    if ($curDom.find('.subdetails').length > 0) {
                        if (flag == 'add') {
                            $curDom.attr('flag', 'minus');
                            $curDom.find('.title-tag .addMinus').attr('class', 'glyphicon glyphicon-minus text-icon addMinus');
                            $curDom.find('.subdetails').slideDown();
                        } else if (flag == 'minus') {
                            $curDom.attr('flag', 'add');
                            $curDom.find('.title-tag .addMinus').attr('class', 'glyphicon glyphicon-plus text-icon addMinus');
                            $curDom.find('.subdetails').slideUp();
                        }
                    }
                });
                //点击 加号 减号 后面的播放按钮 播放声音
                $domCiZuList.off('click', '.perItem .title-tag .btn-vol').on('click', '.perItem .title-tag .btn-vol', function () {
                    var $curDom = $(this).parents('.perItem');
                    var text = $curDom.find('span').text();
                    alert(text);
                });
                //大按钮点击事件
                $domCuziCont.find('.btnOpen').click(function () {
                    alert('依次播放声音，同时还有什么功能呢');
                    $domCiZuList.find('.perItem').each(function (index, perItem) {
                        var $curDom = $(perItem);
                        var flag = $curDom.attr('flag');

                        if ($curDom.find('.subdetails').length > 0) {
                            if (flag == 'add') {
                                $curDom.attr('flag', 'minus');
                                $curDom.find('.title-tag .addMinus').attr('class', 'glyphicon glyphicon-minus text-icon addMinus');
                                $curDom.find('.subdetails').slideDown();
                            }
                        }
                    });
                });
                //最上面点击事件
                $domCuziCont.find('.title1 i.text-icon').click(function () {
                    var $curDom = $(this).parents('.title1');
                    alert($curDom.find('span').text());
                });
            });

            //正面字体事件
            $(".card-container").on("click", ".swiper-slide .card-front span", function (e) {
                e.stopPropagation();
                var $dom = $('.show-myModal');
                $.public.initModalDialog($dom);
                //弹出模态框
                var $domModal = $dom.find('.commonModalDialog');
                $domModal.modal('show');
                //默认显示第一个tab的内容
                $.slideCard.showTabByIndex(0);
            });

            //监听浏览器退格
            $.public.BrowserBackEvent($('.show-myModal,.zuciModalDialog'));

            //开始 按钮
            $('.card-container').off('click', '.swiper-button .btnPlay').on('click', '.swiper-button .btnPlay', function () {
                var $dom = $(this);
                $.slideCard.autoSlideCard($dom);
            });

            //停止 按钮
            $('.card-container').off('click', '.swiper-button .btnStop').on('click', '.swiper-button .btnStop', function () {
                var $dom = $(this);
                $.slideCard.stopSlideCard($dom);
            });

            //翻到正面
            $(".card-container").off('"click", ".card-back"').on("click", ".card-back", function (e) {
                e.stopPropagation();
                var $dom = $(this).parents('.swiper-slide');
                $.slideCard.slideToFront($dom);
            })

            //翻到反面
            $(".card-container").off('"click", ".card-front"').on("click", ".card-front", function (e) {
                e.stopPropagation();
                var $dom = $(this).parents('.swiper-slide');
                $.slideCard.slideToBack($dom);
            });

            //切换正面和反面
            $(".card-container").off('"click", ".switchCard"').on("click", ".switchCard", function (e) {
                e.stopPropagation();
                var $dom = $(".card-container").find('.swiper-slide.swiper-slide-active');
                var status = $dom.attr('status');
                if (status == 'front') {
                    $.slideCard.slideToBack($dom);
                } else if (status == 'back') {
                    $.slideCard.slideToFront($dom);
                }
            });

            //enter按钮事件
            $(document).keyup(function (event) {
                //keyCode:13--enter键
                //keyCode:32--空格键
                //keyCode:37--方向键左键
                //keyCode:39--方向键右键
                if (event.keyCode == 32) {
                    var $dom = $(".card-container").find('.swiper-slide.swiper-slide-active');
                    var status = $dom.attr('status');
                    if (status == 'front') {
                        $.slideCard.slideToBack($dom);
                    } else if (status == 'back') {
                        $.slideCard.slideToFront($dom);
                    }
                }
                if (event.keyCode == 39) {
                    $(".card-container").find('.swiper-container .swiper-button .swiper-button-next').trigger("click");
                }
                if (event.keyCode == 37) {
                    $(".card-container").find('.swiper-container .swiper-button .swiper-button-prev').trigger("click");
                }
            });

            // tab切换
            $('.show-myModal .commonModalDialog').on('click', '.top-tabs .perTab span', function () {
                var $dom = $(this).parents('.perTab');
                var curIndex = $dom.index();
                $.slideCard.showTabByIndex(curIndex);
            });
        },
        //初始化swiper插件配置
        initSwiper: function () {
            $.slideCard.mySwiper = new Swiper('.card-container .swiper-container', {
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                observer: true,
                observeParents: true,
                autoplay: false,
                autoHeight: false,
                calculateHeight: true,
                simulateTouch: false,
                onInit: function (swiper) {
                    var thisIndex = swiper.activeIndex;
                    var totalNum = $('.card-container').find('.swiper-container .swiper-slide').length;
                    //设置顶部卡片数
                    $('.top-nav-info .top-nav-text').text((thisIndex + 1) + '/' + totalNum);
                },
                onSlideChangeStart: function (swiper) {
                    var thisIndex = swiper.activeIndex;
                    var totalNum = $('.card-container').find('.swiper-container .swiper-slide').length;
                    //设置顶部卡片数
                    $('.top-nav-info .top-nav-text').text((thisIndex + 1) + '/' + totalNum);
                    var isAutoSlide = $.slideCard.isAutoSlide;
                    var $dom = $('.card-container').find('.swiper-container .swiper-slide.swiper-slide-active');
                    var status = $dom.attr('status');
                    if (isAutoSlide) {
                        //如果是自动翻转卡片
                        setTimeout(function () {
                            if (status == 'front') {
                                $.slideCard.slideToBack($dom);
                            } else if (status == 'back') {
                                $.slideCard.slideToFront($dom);
                            }
                        }, 1000);
                    }
                    $.slideCard.recoveryCard();
                },
                onAutoplay: function (swiper) {
                    var thisIndex = swiper.activeIndex;
                    var totalNum = $('.card-container').find('.swiper-container .swiper-slide').length;
                    //设置顶部卡片数
                    $('.top-nav-info .top-nav-text').text((thisIndex + 1) + '/' + totalNum);
                    if (thisIndex == totalNum - 1) {
                        swiper.stopAutoplay();
                        $.slideCard.isAutoSlide = false;
                        var $dom = $('.card-container').find('.swiper-button .btnClickInfo');
                        $dom.removeClass('btnStop');
                        $dom.addClass('btnPlay');
                        $dom.find('i').removeClass('glyphicon-pause');
                        $dom.find('i').addClass('glyphicon-play');
                    }
                }
            });
            $.slideCard.mySwiper.on('slideChangeTransitionStart', function () {
                console.log('slide changed');
            });
        },
        //翻卡片到正面
        slideToFront: function ($dom) {
            $dom.attr('status', 'front');
            $dom.find('.card-front').css({
                'transform': 'rotateX(0deg)',
                'z-index': '1',
            });
            $dom.find('.card-back').css({
                'transform': 'rotateX(-180deg)',
                'z-index': '0',
            });
        },
        //翻卡片到反面
        slideToBack: function ($dom) {
            $dom.attr('status', 'back');
            $dom.find('.card-front').css({
                'transform': 'rotateX(180deg)',
                'z-index': '0',
            });
            $dom.find('.card-back').css({
                'transform': 'rotateX(0deg)',
                'z-index': '1',
            });
        },
        //自动翻转卡片  开始翻转卡片
        autoSlideCard: function ($dom) {
            $dom.removeClass('btnPlay');
            $dom.addClass('btnStop');
            $dom.find('i').removeClass('glyphicon-play');
            $dom.find('i').addClass('glyphicon-pause');
            $.slideCard.mySwiper.params.autoplay = 2000;
            $.slideCard.mySwiper.startAutoplay();
            $.slideCard.isAutoSlide = true;
        },
        //停止翻转卡片
        stopSlideCard: function ($dom) {
            $dom.removeClass('btnStop');
            $dom.addClass('btnPlay');
            $dom.find('i').removeClass('glyphicon-pause');
            $dom.find('i').addClass('glyphicon-play');
            $.slideCard.mySwiper.stopAutoplay();
            $.slideCard.isAutoSlide = false;
        },

        //恢复卡片状态
        recoveryCard: function () {
            var $dom = $('.card-container').find('.swiper-container .swiper-slide');
            $dom.each(function (index, perItem) {
                var status = $(perItem).attr('status');
                if (status == 'back') {
                    $.slideCard.slideToFront($dom);
                }
            });
        },

        //根据index显示tab
        showTabByIndex: function (curIndex) {
            var $dom = $('.show-myModal .modal-content');
            var $dom_top_tabs = $dom.find('.top-tabs');
            $dom_top_tabs.find('.perTab').removeClass('selected');
            $dom_top_tabs.find('.perTab').eq(curIndex).addClass('selected');
            var $dom_tab_cont = $dom.find('.tab-cont');
            $dom_tab_cont.find('.area').hide();
            $dom_tab_cont.find('.area').eq(curIndex).show();
        },

        //卡片描红
        HanziWriter: function () {
            var fontsArray = $('.card-container').find('.swiper-slide.swiper-slide-active .card-front .card-front-cont span').text();
            var writer = HanziWriter.create('character-target-div', '我', {
                width: 100,
                height: 100,
                padding: 5,
                strokeColor: '#EE00FF'
            });
            writer.animateCharacter();
        },


    }
})(jQuery);