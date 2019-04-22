//定义有依赖的模块：依赖项dataService jquery
define(['dataService', 'jquery'], function (dataService, $) {
  let name = 'alert.js'

  function showMsg() {
    $('body').css('background', 'red')
    alert(dataService.getMsg() + ', ' + name)
  }

  return {showMsg}
})