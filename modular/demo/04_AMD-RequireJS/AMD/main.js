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