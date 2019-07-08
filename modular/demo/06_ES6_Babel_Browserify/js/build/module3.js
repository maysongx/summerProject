'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

//默认暴露：可以暴露任意数据类型，暴露什么数据，就可以接收什么数据
//默认暴露只能暴露一个

//默认暴露一个箭头函数
exports.default = function () {
  console.log('我是默认暴露的箭头函数');
};