'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//常规暴露：暴露模块方式二：统一暴露
var data = 'module2 data';

function fun1() {
  console.log('module2 fun1() ' + data);
}

function fun2() {
  console.log('module2 fun2() ' + data);
}

//统一暴露对象
exports.fun1 = fun1;
exports.fun2 = fun2;