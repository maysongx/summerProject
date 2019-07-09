/**
 * IIFE模式增强 : 引入依赖
 * 这就是现代模块实现的基石
 */
//引入全局对象window和Jquery对象
(function (window, $) {
  let msg = 'module4';

  function foo() {
    console.log('foo()', msg)
  }

  //向外暴露foo函数  msg变量。相当于给window添加对象属性
  window.module4 = {foo, msg};
  $('body').css('background', 'red');
})(window, jQuery)

