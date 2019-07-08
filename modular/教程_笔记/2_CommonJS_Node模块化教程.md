## Node.js模块化教程
####  1. 下载安装node.js
####  2. 创建项目结构
* 自定义创建modules目录以及module1.js module2.js module3.js app.js
#### 3. 初始化项目 npm init （会自动生成package.json）
  ```
  |-modules
    |-module1.js
    |-module2.js
    |-module3.js
  |-app.js
  |-package.json
    {
      "name": "commonJS-node",
      "version": "1.0.0"
    }
  ```

  
#### 4. 下载安装第三方模块   cnpm install uniq --save
  * 
####  5. 模块化编码
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
    ```
  * app.js 
    ```
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

    ```
#### 6. 通过node运行app.js
  * 命令: node app.js
  * 工具: 右键-->运行