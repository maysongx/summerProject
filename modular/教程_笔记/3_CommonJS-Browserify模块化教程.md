# Browserify模块化使用教程
#### 1. 创建项目结构
  ```
  |-js
    |-dist //打包生成文件的目录
    |-src //源码所在的目录
      |-module1.js
      |-module2.js
      |-module3.js
      |-app.js //应用主源文件
  |-index.html
  |-package.json
    {
      "name": "browserify-test",
      "version": "1.0.0"
    }
  ```
#### 2. 初始化项目 npm init （会自动生成package.json）
#### 3. 下载安装browserify
  * 全局安装: cnpm install browserify -g
  * 局部安装: cnpm install browserify --save-dev
  * 安装uniq：cnpm install uniq --save
#### 4. 定义模块代码
  * module1.js
    ```
     //向外暴露一个对象
     module.exports = {
       foo() {
         console.log('向外暴露一个对象：module1 foo()')
       }
     }
    ```
  * module2.js
    ```
       //向外暴露一个函数
         module.exports = function () {
           console.log('向外暴露一个函数：module2()')
         }
    ```
  * module3.js
    ```
     // 分别向外暴露对象
     exports.foo = function () {
       console.log('分别向外暴露对象：module3 foo()')
     }
     
     exports.bar = function () {
       console.log('分别向外暴露对象：module3 bar()')
     }
     
     exports.arrData=[1, 3, 1, 4, 3]
    ```
  * app.js (应用的主js)
    ```
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

    ```
#### 5. 打包处理js:
  * browserify ./src/app.js -o ./dist/bundle.js 
#### 6. 页面使用引入:
  ```
  <script type="text/javascript" src="./dist/bundle.js"></script> 
  ```