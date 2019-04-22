//定义没有依赖的模块
(function (window) {
  let msg = 'dataService.js';

  function getMsg() {
    return msg.toUpperCase();
  }

//向外暴露dataService模块
  window.dataService = {getMsg};
})(window)
