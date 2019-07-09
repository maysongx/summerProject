//1. 引入 required 模块
var http = require('http');

/*
* 2. 创建服务器  request接收数据 response响应数据
* HTTP 状态值 200 : OK    404：找不到  500：服务器错误
* */
http.createServer(function (request, response) {
  // 发送 HTTP 头部
  response.writeHead(200, {
    // 内容类型: text/plain
    'Content-Type': 'text/html;charset="utf-8"'
  });
  // 发送响应数据 "Hello World"
  // response.end('<h1>Hello World</h1>');
}).listen(7777);

// 终端打印如下信息
console.log('服务器运行在7777端口上');