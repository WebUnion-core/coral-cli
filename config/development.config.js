const webpack = require('webpack');
const path = require('path');
const base = require('./data.json');

// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, './../dist');

// 开发模式打包配置
module.exports = function setDevMode(webpackConfig) {
    webpackConfig.plugins.push(
        // 热更新
        new webpack.HotModuleReplacementPlugin(),

        // CSS提取
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    );

    // dev工具
    webpackConfig.devtool = 'cheap-module-eval-source-map';

    // 开发模式server
    webpackConfig.devServer = {
        contentBase: DIST_PATH,
        host: base.host,
        port: base.port,
        historyApiFallback: true,
        inline: true,
        hot: true
    };

    // 设置打包出口
    webpackConfig.output = {
        path: DIST_PATH,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    };

    base.apps.forEach(function(item) {
        // 配置页面模板
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                title: item.title,
                filename: path.resolve(__dirname, './../dist/' + item.name + '/index.html'),
                template: path.resolve(__dirname, './../src/' + item.name + '/template.ejs'),
                hash: false,
                minify: false
            })
        );

        // 设置打包入口
        webpackConfig.entry[item.name + '/bundle'] = [
            path.resolve(__dirname, './../src/' + item.name + '/entry.js'),
            'react-hot-loader/patch',
            'babel-polyfill',
            'webpack-dev-server/client',
            'webpack/hot/only-dev-server'
        ];
    });
}
