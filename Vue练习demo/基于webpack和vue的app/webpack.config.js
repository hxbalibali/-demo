//按照Node的写法
const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

//vue-loader在15.之后，都需要伴生vueloaderplugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: "bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: "index.html"
        }),
        new VueLoaderPlugin()
    ],
    module: { //配置所有第三方loader模块的
        rules: [
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.vue$/, use: 'vue-loader'},
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' },//处理图片路径/字体文件的loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }

        ]
    }
}