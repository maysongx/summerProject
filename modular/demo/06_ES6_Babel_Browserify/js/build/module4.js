'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//默认暴露一个对象
exports.default = {
  msg: 'hello world',
  foo: function foo() {
    console.log('我是默认暴露里面的回调函数：' + this.msg.toUpperCase());
  }
};