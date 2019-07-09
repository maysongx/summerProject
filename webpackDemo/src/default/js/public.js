import $ from 'jquery';
(function ($) {
    $.public = {
        init: function () {
            console.log('public.js里面init方法');
            $.public.appendTopNav();
        },
        sayHello: function (name) {
            alert('你好：' + name);
        },
        appendTopNav: function () {
            var html = ` <div class="navTop">
					<ul>
						<li><a href="/dist/index.html">首页</a></li>
						<li><a href="/dist/about/index.html">关于我们</a></li>
						<li><a href="/dist/course/index.html">课程首页</a></li>
					</ul>
   				 </div>`;
            $('.navTop').length > 0 ? '' : $('body').prepend(html);
        }
    }
})(jQuery);
//初始化public.init()方法
$.public.init();
