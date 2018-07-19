const webpack = require('webpack');
const path = require('path');

// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 生产模式打包配置
module.exports = function setProdMode(webpackConfig) {
    // 额外插件
    webpackConfig.plugins.push(
        // 清除打包源文件
        new CleanWebpackPlugin([ 'dist' ]),

        // CSS提取
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[name].[hash:8].css'
        }),

        // 配置页面模板
        new HtmlWebpackPlugin({
            title: '欢迎访问WJT20的博客',
            filename: path.resolve(__dirname, './index.html'),
            template: path.resolve(__dirname, './src/template.ejs'),
            hash: false,
            minify: false
        })
    );

    // TODO 设置打包入口，需优化
    webpackConfig.entry['home/index'] = [
        path.resolve(__dirname, './src/router/Home/entry.js')
    ];

    // 设置打包出口
    webpackConfig.output = {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'https://weijietao.github.io/wjt20/dist/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    };
};
