(function ($) {
    $.carousel = {
        init: function () {
            var mySwiper = new Swiper('.swiper-container', {
                //autoplay: 5000,//可选选项，自动滑动
                speed: 300,
                pagination: '.swiper-pagination',
                paginationClickable :true,
            })

            return;
            $.carousel.mySwiper = new Swiper('.myCarousel .swiper-container', {
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
            $.carousel.mySwiper.on('slideChangeTransitionStart', function () {
                console.log('slide changed');
            });
        },
    }
})(jQuery);