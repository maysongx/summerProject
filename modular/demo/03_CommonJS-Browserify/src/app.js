/*主模块js文件*/
"use strict";
//引用模块
let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')
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
