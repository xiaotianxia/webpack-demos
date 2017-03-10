var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        main: './src/script/main.js',  //需要打包的两个入口文件
        a: './src/script/a.js',
        b: './src/script/b.js',
        c: './src/script/c.js',
    },
    output: {
        path: './dist',
        filename: 'js/[name]-[chunkhash].js', // 打包后的文件名
        publicPath: 'http://www.cdn/' //线上路径
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',  //生成的html
            //filename: 'index-[hash].html',  //生成的html
            template: 'index.html',//基于的模板html
            // inject: 'head',  //注入的位置
            inject: false,  //不注入，手动在模板html设置
            //模板数据
            title: 'webpack data',
            date: new Date(),
            //压缩
            minify: {
                removeComments: true,
                // collapseWhitespace: true
            }
        }),

        //指定不同模板设置，进行多页面设置
        new htmlWebpackPlugin({
            filename: 'a.html',
            template: 'index.html',
            inject: false,
            title: 'this is a.html',
            chunks: ['main', 'a'], //指定需要引用的文件
            //excludeChunks: [], //除了指定文件外，其他都引入
            minify: {
                removeComments: true
            }
        }),

        new htmlWebpackPlugin({
            filename: 'b.html',
            template: 'index.html',
            inject: false,
            title: 'this is b.html',
            excludeChunks: ['c', 'a'],
            minify: {
                removeComments: true
            }
        }),

        new htmlWebpackPlugin({
            filename: 'c.html',
            template: 'index.html',
            inject: false,
            title: 'this is c.html',
            excludeChunks: ['a','b'],
            minify: {
                removeComments: true
            }
        })
    ]
}
