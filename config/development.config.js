const path = require('path');
const config = require('./config.json');
const devServer = config.devServer;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DIST_PATH = path.resolve(__dirname, './../dist');
const HOST = require('./../lib/getHost.js')();

/**
 * 开发模式打包配置
 * @param {Object} webpackConfig webpack配置对象
 */
module.exports = function setDevMode(webpackConfig) {
    webpackConfig.plugins.push(
        // CSS提取
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    );

    // dev工具
    webpackConfig.devtool = 'cheap-module-eval-source-map';

    // 设置打包出口
    webpackConfig.output = {
        path: DIST_PATH,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    };

    // 设置vendor
    webpackConfig.entry['vendor'] = config['vendor'];

    config.apps.forEach(function(item) {
        const filename = path.resolve(
            __dirname, './../dist/' + item.name + '/index.html'
        );
        const template = path.resolve(
            __dirname, './../client/' + item.name + '/template.ejs'
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
                site: HOST + ':' + devServer.port,
                cdn: config.imgcdn
            })
        );

        // 设置打包入口
        webpackConfig.entry[item.name + '/bundle'] = [
            path.resolve(__dirname, './../client/' + item.name + '/entry.js')
        ];
    });
}
