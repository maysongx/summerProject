//常规暴露：暴露模块方式二：统一暴露
let data = 'module2 data'

function fun1() {
  console.log('module2 fun1() ' + data);
}

function fun2() {
  console.log('module2 fun2() ' + data);
}

//统一暴露对象
export {fun1, fun2}