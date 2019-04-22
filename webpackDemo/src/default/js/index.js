//引入scss样式文件
import '../css/index.scss';

//引入public.js
import './public.js'

(function($) {
	$.index = {
		init: function() {
			console.log('index.js里面init方法345')
		},
	}
})(jQuery);
//初始化index.init()方法
$.index.init();

import "babel-polyfill";
let arr = [1, 2, 4];
let arrB = arr.map(item => item * 2);
console.log("可以使用ES6语法："+arrB.includes(8));



