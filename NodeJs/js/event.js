//引入events模块
var events = require('events');
//实例化EventEmitter对象
var eventEmitter = new events.EventEmitter();

//eventEmitter对象注册了data_received事件的一个监听器(绑定data_received事件)
eventEmitter.on('data_received', function () {
    console.log('数据接收成功');
});

//eventEmitter对象注册了connection事件的一个监听器(绑定connection事件)
eventEmitter.on('connection', function () {
    console.log('连接成功');
    //触发data_received事件
    eventEmitter.emit('data_received');
});

// 触发 connection 事件
eventEmitter.emit('connection');
console.log("程序执行完毕。");

