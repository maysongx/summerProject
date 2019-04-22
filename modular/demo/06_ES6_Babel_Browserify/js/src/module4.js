//默认暴露一个对象
export default {
  msg: 'hello world',
  foo() {
    console.log('我是默认暴露里面的回调函数：'+this.msg.toUpperCase())
  }
}