var http = require('http');

http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK    404：找不到  500：服务器错误
    // 内容类型: text/plain
    response.writeHead(200, {
        'Content-Type': 'text/html;charset="utf-8"'
    });

    // 发送响应数据 "Hello World"
    response.end('<h1>Hello World</h1>');
}).listen(3333);

// 终端打印如下信息
//console.log('这个是终端打印的信息');