//定义没有依赖的模块
define(function () {
  let msg = 'dataService.js'

  function getMsg() {
    return msg.toUpperCase()
  }

  //返回大写的 HELLO WORLD
  return {getMsg}
})