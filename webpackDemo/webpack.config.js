const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
// 设置开发模式：production生产环境 development开发环境
const devMode = process.CURRENT_ENV
// let config = env === "production"
console.log('哈哈哈：：：' + devMode);
console.log(process.CURRENT_ENV);

/*
* 消除html中不用的选择器，如果使用的话，在public里面append的html会找不到数据
* 进而不加载样式文件（待定问题）
* */
const purifycssWebpack = require('purifycss-webpack')
const glob = require('glob')

//压缩css插件
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//配置雪碧图
// let spritesConfig = {
//     spritePath: "./dist/images"
// };
module.exports = {
    // 开发模式
    mode: 'development',
    /*
    * 配置多个入口文件
    * */
    entry: {
        index: './src/default/js/index.js',
        about: './src/about/js/index.js',
        course: './src/course/js/index.js'
    },
    // 出口
    output: {
        filename: '[name]/js/[name].[hash].js',
        /*
        * filename:在使用webpack-dev-server模式时，如果要使用hash，是不可以使用chunkhash的，建议直接使用hash
        * path：输出路径必须是绝对路径， dist输出文件目录
        * publicPath：如果要设置热更新，必须要添加publicPath
        * */
        path: path.resolve(__dirname, 'dist'),
        //此处如果设置publicPath，那么热更新页面加载报错
        //如果不设置，热更新不起作用，还是需要刷新页面才可以
        //publicPath:'./'
    },
    /*
    * 配置webpack-dev-server
    * contentBase：设置基本目录结构
    * compress：是否开启服务器压缩
    * port：配置服务器端口号
    * host：服务器的IP地址，可以使用IP也可以使用localhost
    * open：是否自动打开浏览器
    * hot：是否开启热更新， 启用 HMR
    * hotOnly：是否只开启热更新，如果设置为true,只有热更新，就禁用了自动刷新功能
    * */
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        host: 'localhost',
        open: true,
        hot: true,
        //hotOnly: true,
    },
    // 模块配置
    module: {
        rules: [
            // 编译css scss sass文件
            {
                test: /\.(sa|sc|c)ss$/,
                /*
                * 从右向左编译
                * style-loader:将 JS 字符串生成为 style 节点
                * css-loader:将 CSS 转化成 CommonJS 模块
                * sass-loader:// 将 Sass 编译成 CSS
                * use: ['style-loader', 'css-loader', "postcss-loader", 'sass-loader']
                * */
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            singleton: false // 处理为单个style标签
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader'
                        // //postcss-sprites需要结合postcss-loader合成雪碧图
                        // options: {
                        //     ident: "postcss",
                        //     plugins: [require("postcss-sprites")(spritesConfig)]
                        // }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]

            },
            // 文本分离：配置scss
            {
                test: /\.scss$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},
                        {
                            loader: 'postcss-loader'
                            //postcss-sprites需要结合postcss-loader合成雪碧区、图
                            // options: {
                            //     ident: "postcss",
                            //     plugins: [require("postcss-sprites")(spritesConfig)]
                            // }
                        },
                        {loader: 'sass-loader'}
                    ]
                })
            },
            //配置babel
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            /*
            * url-loader：主要是图片处理和Base64编码（base64就是一串加密的字符串，而且base64编码过的图片是没有http请求的）
            * image-webpack-loader：主要是压缩图片
            * */
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name]/[name]-[hash:5].min.[ext]",
                            limit: 8192, // size <= 8KB
                             //publicPath: "../images2",
                            //相对根目录是dist，当前目录./就是dist
                            outputPath: "./images2"
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            //主要是处理html中的img标签的loader
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },
    // 插件配置
    plugins: [
        //热更新配置
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        //文本分离插件
        new extractTextWebpackPlugin({
            filename: '[name]/css/[name].[hash].css',
            allChunks: true
        }),
        /*
        * 配置html-webpack-plugin插件（配置多个html文件）
        * template：模板路径
        * filename：输出文件，可以是路径
        * minify.removeComments：打包后是否删除参数
        * minify.collapseWhitespace：打包后是否删除空格（压缩）
        * hash
        * chunks：包含的文件数组
        * */
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['index']
        }),
        new htmlWebpackPlugin({
            template: './src/about/index.html',
            filename: 'about/index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['about']
        }),
        new htmlWebpackPlugin({
            template: './src/course/index.html',
            //编译后路径是：dist/course/index.html
            filename: 'course/index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['course']
        }),
        new cleanWebpackPlugin('dist', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        // new purifycssWebpack({
        //   paths: glob.sync(path.resolve('./src/*.html')),
        //   paths: glob.sync(path.resolve('./src/*.js')),
        // }),
        // 配置jquery库的插件
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        //压缩css插件配置
        new optimizeCssAssetsWebpackPlugin()
        //暂时不起作用，后期研究
        // new optimizeCssAssetsWebpackPlugin({
        //     assetNameRegExp: /css\[name].[hash].css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //         preset: ['default', { discardComments: { removeAll: true } }],
        //     },
        //     canPrint: true  //是否将消息打印到控制台
        // })
    ],
    //优化
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             // 注意: priority属性
    //             // 其次: 打包业务中公共代码
    //             common: {
    //                 name: "common",
    //                 chunks: "all",
    //                 minSize: 1,
    //                 priority: 0
    //             },
    //             // 首先: 打包node_modules中的文件
    //             vendor: {
    //                 name: "vendor",
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: "all",
    //                 priority: 10
    //                 // enforce: true
    //             }
    //         }
    //     }
    // }
}