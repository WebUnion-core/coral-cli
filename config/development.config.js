const path = require('path');
const config = require('./config.json');
const dataServer = config.dataServer;

// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, './../dist');

// 开发模式打包配置
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
        // 配置页面模板
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                title: item.title,
                filename: path.resolve(__dirname, './../dist/' + item.name + '/index.html'),
                template: path.resolve(__dirname, './../src/' + item.name + '/template.ejs'),
                hash: false,
                minify: false,
                version: config.version,
                site: dataServer.host + ':' + dataServer.port,
                cdn: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/'
            })
        );

        // 设置打包入口
        webpackConfig.entry[item.name + '/bundle'] = [
            path.resolve(__dirname, './../src/' + item.name + '/entry.js')
        ];
    });
}
