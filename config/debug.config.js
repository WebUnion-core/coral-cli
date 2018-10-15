const webpack = require('webpack');
const path = require('path');
const config = require('./config.json');
const debugServer = config.debugServer;
const dataServer = config.dataServer;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DIST_PATH = path.resolve(__dirname, './../dist');
const HOST = require('./../lib/getHost.js')();

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
        host: HOST,
        port: debugServer.port,
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

    config.apps.forEach(function(item) {
        const filename = path.resolve(
            __dirname, './../dist/' + item.name + '/index.html'
        );
        const template = path.resolve(
            __dirname, './../src/' + item.name + '/template.ejs'
        );

        // 配置页面模板
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                title: item.title,
                filename: filename,
                template: template,
                hash: false,
                minify: false,
                version: config.version,
                site: HOST + ':' + dataServer.port,
                cdn: config.imgcdn
            })
        );

        // 设置打包入口
        webpackConfig.entry[item.name + '/bundle'] = [
            path.resolve(__dirname, './../src/' + item.name + '/entry.js'),
            'react-hot-loader/patch',
            'webpack-dev-server/client',
            'webpack/hot/only-dev-server'
        ];
    });
}
