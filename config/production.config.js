const webpack = require('webpack');
const path = require('path');
const config = require('./data.json');

// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, './../dist');

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
        })
    );

    // 设置打包出口
    webpackConfig.output = {
        path: path.resolve(__dirname, './../dist'),
        publicPath: '/',
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js'
    };

    config.apps.forEach(function(item) {
        // 配置页面模板
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                title: item.title,
                filename: path.resolve(__dirname, './../dist/' + item.name + '/index.html'),
                template: path.resolve(__dirname, './../src/' + item.name + '/template.ejs'),
                hash: false,
                minify: true
            })
        );

        // 设置打包入口
        webpackConfig.entry[item.name + '/bundle'] = [
            path.resolve(__dirname, './../src/' + item.name + '/entry.js')
        ];
    });
};
