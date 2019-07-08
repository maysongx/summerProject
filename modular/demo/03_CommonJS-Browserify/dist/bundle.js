(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],3:[function(require,module,exports){
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

},{"./module1":4,"./module2":5,"./module3":6,"fs":1,"uniq":2}],4:[function(require,module,exports){
//向外暴露一个对象
module.exports = {
  foo() {
    console.log('向外暴露一个对象：module1 foo()')
  }
}
},{}],5:[function(require,module,exports){
//向外暴露一个函数
module.exports = function () {
  console.log('向外暴露一个函数：module2()')
}
},{}],6:[function(require,module,exports){
// 分别向外暴露对象
exports.foo = function () {
  console.log('分别向外暴露对象：module3 foo()')
}

exports.bar = function () {
  console.log('分别向外暴露对象：module3 bar()')
}

exports.arrData=[1, 3, 1, 4, 3]
},{}]},{},[3]);
