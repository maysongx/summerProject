# AMD require.js使用教程
#### 1. 下载require.js, 并引入
  * 官网: http://www.requirejs.cn/
  * github : https://github.com/requirejs/requirejs
  * 将require.js导入项目: js/libs/require.js 
#### 2. 创建项目结构
  ```
  |-js
    |-libs
      |-require.js
    |-modules
      |-alerter.js
      |-dataService.js
    |-main.js
  |-index.html
  ```
#### 3. 定义require.js的模块代码
  * dataService.js
    ```
    //定义没有依赖的模块
    define(function () {
      let msg = 'dataService.js'
    
      function getMsg() {
        return msg.toUpperCase()
      }
    
      //返回大写的 HELLO WORLD
      return {getMsg}
    })      
    ```
  * alert.js
    ```
    //定义有依赖的模块：依赖项dataService jquery
    define(['dataService', 'jquery'], function (dataService, $) {
      let name = 'alert.js'
    
      function showMsg() {
        $('body').css('background', 'red')
        alert(dataService.getMsg() + ', ' + name)
      }
    
      return {showMsg}
    })
    ```
#### 4. 应用主(入口)js: main.js
  ```
  (function () {
    //配置
    requirejs.config({
      //基本路径（相对于根目录）
      baseUrl: "js/",
      //模块标识名与模块路径映射
      paths: {
        "dataService": "modules/dataService",
        "alert": "modules/alert",
        //引入 第三方模块 （前提是jquery是支持AMD的，如果第三方库不支持AMD，则不可以引入）
        "jquery": "libs/jquery-3.3.1.min",
      }
    })
  
    //引入使用模块
    requirejs(['alert'], function (alert) {
      alert.showMsg()
    })
  })()
  ```
        
#### 5. 页面使用模块: 配置data-main属性和src属性
  `<script data-main="js/main" src="js/libs/require.js"></script>`
    
#### 6. 使用第三方基于require.js的框架(jquery)
  * 将jquery的库文件导入到项目: 
    * js/libs/jquery-1.10.1.js
  * 在main.js中配置jquery路径
    ```
    paths: {
              'jquery': 'libs/jquery-1.10.1'
          }
    ```
  * 在alerter.js中使用jquery
    ```
    define(['dataService', 'jquery'], function (dataService, $) {
        var name = 'xfzhang'
        function showMsg() {
            $('body').css({background : 'red'})
            alert(name + ' '+dataService.getMsg())
        }
        return {showMsg}
    })
    ```
------------------------------------------------------------------------

#### 7. 使用第三方不基于require.js的框架(angular)

  * 将angular.js导入项目      js/libs/angular.js
  * 在main.js中配置
    ```
    (function () {
      require.config({
        //基本路径
        baseUrl: "js/",
        //模块标识名与模块路径映射
        paths: {
          //第三方库
          'jquery' : './libs/jquery-1.10.1',
          'angular' : './libs/angular',
          //自定义模块
          "alerter": "./modules/alerter",
          "dataService": "./modules/dataService"
        },
        /*
         配置不兼容AMD的模块
         exports : 指定与相对应的模块名对应的模块对象
         */
        shim: {
          'angular' : {
            exports : 'angular'
          }
        }
      })
      //引入使用模块
      require( ['alerter', 'angular'], function(alerter, angular) {
        alerter.showMsg()
        console.log(angular);
      })
    })()
    ```
 