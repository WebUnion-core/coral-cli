const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const setDevMode = require('./config/development.config.js');
const setProdMode = require('./config/production.config.js');
const setOther = require('./config/other.config.js');
const config = require('./config/config.json');

const MODE = process.env.NODE_ENV;
const IF_DEBUG = Boolean(process.env.NODE_ENV);

const webpackConfig = {
    mode: MODE || 'development',
    entry: {
        'vendor': [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    module: {
        rules: [
            {
                // 脚本打包
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                // CSS样式表打包
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                // 图像打包
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                // 字体及svg打包
                test: /\.(woff|ttf|tff|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {},
        extensions: ['.jsx', '.js', '.scss', '.css', '.png', '.jpg'], // 最常匹配的放在最前面，减少查找
        modules: [
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, './src/asset')
        ] // 直接指明第三方模块的绝对路径，减少查找
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 抽离第三方插件
                vendor: {
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    priority: -10 // 设置优先级，防覆盖
                }
            }
        },

        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // 注入常量
        new webpack.DefinePlugin({
            __DEV__: MODE === 'development',
            __VERSION__: config.version,
            __DEBUG__: IF_DEBUG
        })
    ]
}

switch (MODE) {
    case 'development':
        setDevMode(webpackConfig);
        break;
    case 'production':
        setProdMode(webpackConfig);
        break;
    default:
        setOther(webpackConfig);
}

module.exports = webpackConfig;
