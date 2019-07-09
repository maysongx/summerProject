/*主模块js文件*/
/**
 1. 定义暴露模块:
 module.exports = value;
 exports.xxx = value;
 2. 引入模块:
 var module = require(模块名或模块路径);
 */
"use strict";
//引用模块
let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')
//引入uniq第三方包
let uniq = require('uniq')
let fs = require('fs')

//使用模块
module1.foo()
module2()
module3.foo()
module3.bar()
//使用第三方包（uniq数组去重）
console.log(uniq(module3.arrData))
