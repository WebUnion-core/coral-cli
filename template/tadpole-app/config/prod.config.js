const path = require('path');
const config = require('./config.json');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * 生产模式打包配置
 * @param {Object} webpackConfig webpack配置对象
 */
module.exports = function setProdMode(webpackConfig) {
    const filename = path.resolve(__dirname, './../dist/index.html');
    const template = path.resolve(__dirname, './../public/template.ejs');

    // 模式
    webpackConfig.mode = 'production';

    // 插件
    webpackConfig.plugins.push(
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[name].[hash:8].css'
        }),
    );

    // 设置打包出口
    webpackConfig.output = {
        path: path.resolve(__dirname, './../dist'),
        publicPath: '/',
        filename: '[name].[hash:8].js',
        chunkFilename: '[name].[hash:8].js'
    };

    // 设置vendor
    webpackConfig.entry['vendor'] = config['vendor'];

    // 配置页面模板
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            title: config.title,
            filename: filename,
            template: template,
            hash: false,
            minify: true,
            favicon: false,
            version: config.version,
        }),
    );

    // 设置打包入口
    webpackConfig.entry = function () {
        return {
            bundle: [
                path.resolve(__dirname, './../src/entry.js'),
            ],
        };
    };
};
