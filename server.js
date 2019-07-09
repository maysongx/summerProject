/*
 * res.writeHead(200,{"Content-type":"text/blain"});是指向客户端发送一个响应头部 200即是HTTP状态码
 * Content-type代表文档类型，text/blain代表具体的文档类型
 *
 * https://www.cnblogs.com/bossliu/p/5043631.html
 */

var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

//var express = require("express");
//var app = express();
//app.use(express.static("/")).listen(7777);
//return;

http.createServer(function(req, res) {
	var pathname = __dirname + url.parse(req.url).pathname;
	if(path.extname(pathname) == "") {
		pathname += "/";
	}
	if(pathname.charAt(pathname.length - 1) == "/") {
		pathname += "index.html";
	}

	fs.exists(pathname, function(exists) {
		if(exists) {
			switch(path.extname(pathname)) {
				case ".html":
					res.writeHead(200, {
						"Content-Type": "text/html;charset=utf-8"
					});
					break;
				case ".js":
					res.writeHead(200, {
						"Content-Type": "text/javascript"
					});
					break;
				case ".css":
					res.writeHead(200, {
						"Content-Type": "text/css"
					});
					break;
				case ".gif":
					res.writeHead(200, {
						"Content-Type": "image/gif"
					});
					break;
				case ".jpg":
					res.writeHead(200, {
						"Content-Type": "image/jpeg"
					});
					break;
				case ".png":
					res.writeHead(200, {
						"Content-Type": "image/png"
					});
					break;
				default:
					res.writeHead(200, {
						"Content-Type": "application/octet-stream"
					});
			}

			fs.readFile(pathname, function(err, data) {
				res.end(data);
			});
		} else {
			res.writeHead(404, {
				"Content-Type": "text/html"
			});
			res.end("<h1>404 Not Found</h1>");
		}
	});
}).listen(7777); //设置服务器的端口号

console.log("服务器在本地开启成功！");