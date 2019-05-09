# 介绍
    NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
    1. 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
    2. 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
    3. 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

# 判断是否安装成功
    npm -v 来测试是否成功安装，出现版本提示表示安装成功
    如果是旧版本，也可以通过npm命令升级 npm install npm -g （使用淘宝镜像的命令：cnpm install npm -g）

# 使用 npm 命令安装模块
    1. npm 安装 Node.js 模块语法格式如下： npm install <Module Name>  例如安装模块express：npm install express
    2. 安装好之后，express 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('express') 的方式就好，无需指定第三方包路径。
       var express = require('express')

# 全局安装和本地安装
    npm 的包安装分为本地安装（local）、全局安装（global）两种
    例如：npm install express          # 本地安装
    例如：npm install express -g       # 全局安装

#### 本地安装
    1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
    2. 可以通过 require() 来引入本地安装的包。    

#### 全局安装
    1. 将安装包放在 /usr/local 下或者你 node 的安装目录。
    2. 可以直接在命令行里使用。       