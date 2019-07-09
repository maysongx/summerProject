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
    3. 卸载模块       
         npm uninstall express，卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用npm ls命令查看：
    4. 更新模块  npm update express      
    5. 搜索模块  npm search express   
    6. 创建模块  npm init，会自动生成package.json包文件   

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

#### 查看所有全局安装的模块
    npm list -g         

#### 查看某个模块的版本号
    npm list grunt   
    
# 使用package.json    
    package.json 位于模块的目录下，用于定义包的属性
    name - 包名。
    version - 包的版本号。
    description - 包的描述。
    homepage - 包的官网 url 。
    author - 包的作者姓名。
    contributors - 包的其他贡献者姓名。
    dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
    repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
    main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
    keywords - 关键字

#版本号
    使用NPM下载和发布代码时都会接触到版本号。NPM是使用语义版本号来管理代码
    语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
         a. 如果只是修复bug，需要更新Z位。
         b. 如果是新增了功能，但是向下兼容，需要更新Y位。
         c. 如果有大变动，向下不兼容，需要更新X位。
    版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。
 
# npm 常用命令
    NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。
    使用npm help <command>可查看某条命令的详细帮助，例如npm help install。
    在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。
    使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。
    使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。
    使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
    使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。 

# 使用淘宝npm镜像
    国内直接使用 npm 的官方镜像是非常慢的，所以推荐使用淘宝 NPM 镜像
    安装：npm install -g cnpm --registry=https://registry.npm.taobao.org
    使用：cnpm install [name]

