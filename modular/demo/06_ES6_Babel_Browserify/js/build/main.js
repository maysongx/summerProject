'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

var _module5 = require('./module4');

var _module6 = _interopRequireDefault(_module5);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*主文件模块*/
/*
* 如果模块文件采用的是  分别暴露或统一暴露对象  的方式（就是常规暴露），
* 那么引入模块的时候，需要使用 对象的解构赋值的方式  引入模块
*       import {foo, bar, dataArr} from './module1';
        import {fun1, fun2} from './module2';
*
*
*
 *  */
//采用常规暴露的方式：引入模块的方法
(0, _module2.fun1)();
(0, _module2.fun2)();
(0, _module.foo)();
(0, _module.bar)();
console.log(_module.DATA_ARR);
//采用默认暴露的方式：引入模块的方法


(0, _module4.default)();


_module6.default.foo();
//引入第三方模块


(0, _jquery2.default)('body').css('background', 'red');