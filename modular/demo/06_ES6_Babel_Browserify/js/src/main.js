/*主文件模块*/
/*
* 如果模块文件采用的是  分别暴露或统一暴露对象  的方式（就是常规暴露），
* 那么引入模块的时候，需要使用 对象的解构赋值的方式  引入模块
*       import {foo, bar, dataArr} from './module1';
        import {fun1, fun2} from './module2';
*  */
//采用常规暴露的方式：引入模块的方法
import {foo, bar, DATA_ARR} from './module1';
import {fun1, fun2} from './module2';

fun1();
fun2();
foo();
bar();
console.log(DATA_ARR);
//采用默认暴露的方式：引入模块的方法
import module3 from './module3'

module3();
import module4 from './module4'

module4.foo();
//引入第三方模块
import $ from 'jquery';

$('body').css('background', 'red')
