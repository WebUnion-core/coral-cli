const webpack = require('webpack');
const path = require('path');
const config = require('./config.json');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const mode = config.mode.dev;
const distPath = path.resolve(__dirname, './../dist');

/**
 * 开发模式打包配置
 * @param {Object} webpackConfig webpack配置对象
 */
module.exports = function setDevMode(webpackConfig) {
    const filename = path.resolve(__dirname, './../dist/index.html');
    const template = path.resolve(__dirname, './../public/template.ejs');

    // 模式
    webpackConfig.mode = 'development';

    // 插件
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    );

    // dev工具
    webpackConfig.devtool = 'cheap-module-eval-source-map';

    // 开发模式server
    webpackConfig.devServer = {
        contentBase: distPath,
        host: process.env.HOST_NAME,
        port: mode.port,
        historyApiFallback: true,
        inline: true,
        hot: true,
    };

    // 设置打包出口
    webpackConfig.output = {
        path: distPath,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    };

    // 配置页面模板
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            title: config.title,
            filename: filename,
            template: template,
            hash: false,
            minify: false,
            favicon: false,
            chunks: ['vendor', 'bundle'],

            // 注入常量
            version: config.version,
        }),
        new OpenBrowserPlugin({
            url: 'http://' + process.env.HOST_NAME + ':' + mode.port,
        }),
    );

    // 设置打包入口
    webpackConfig.entry.bundle = [
        path.resolve(__dirname, './../src/entry.js'),
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
    ];
}
