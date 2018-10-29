const webpack = require('webpack');
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
    let launchPages = [];
    let port;

    switch (config.launchType) {
        case 'spa':
            launchPages.push(config['spa']);
            port = config['spa'].port;
            break;
        case 'mpa':
            launchPages = launchPages.concat(config['mpa'].pages);
            port = config['mpa'].port;
            break;
        default:
    }

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
        port: port,
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

    for (let i = 0; i < launchPages.length; i++) {
        const page = launchPages[i];
        const filename = path.resolve(__dirname, './../dist/' + page.path + '/index.html');
        const template = path.resolve(__dirname, './../client/' + page.path + '/template.ejs');

        // 配置页面模板
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                title: page.title,
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
        webpackConfig.entry[page.path + '/bundle'] = [
            path.resolve(__dirname, './../client/' + page.path + '/entry.js'),
            'react-hot-loader/patch',
            'webpack-dev-server/client',
            'webpack/hot/only-dev-server'
        ];
    }
}
