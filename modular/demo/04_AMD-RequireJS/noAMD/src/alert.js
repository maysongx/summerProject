(function (window, dataService) {
  let name = 'alert.js';

  function showMsg() {
    console.log(name + '====' + dataService.getMsg())
  }

  //向外暴露alert模块
  window.alert = {showMsg};
})(window, dataService)