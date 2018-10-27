const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MODE = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'none';
const isKnownMode = ['production', 'development'].join(',').indexOf(MODE) >= 0;

/**
 * 设置打包基本配置
 * @type {Object} webpack基本配置对象
 */
module.exports = {
    mode: isKnownMode ? MODE : 'none',
    entry: {},
    module: {
        rules: [
            {
                // 脚本打包
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader?cacheDirectory=true',
                    'eslint-loader'
                ],
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './../client')
                ], // 要检查的目录
            },
            {
                // CSS样式表打包
                test: /\.(css|scss)$/,
                use: [
                    // CSS抽取
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                // 图像打包
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                // 字体、svg等打包
                test: /\.(woff|ttf|tff|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },

    // 直接指明第三方模块的绝对路径，减少查找
    resolve: {
        alias: {},

        // 最常匹配的放在最前面，减少查找
        extensions: ['.jsx', '.js', '.scss', '.css', '.png', '.jpg'],
        modules: [
            path.resolve(__dirname, './../node_modules')
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                // 抽离第三方插件
                vendor: {
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor' // 打包后的文件名，任意命名
                    // priority: 10 // 设置优先级，防覆盖
                }
            }
        },

        minimizer: [
            // JS压缩(混淆)
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),

            // CSS压缩(混淆)
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        // 注入常量
        new webpack.DefinePlugin({
            __DEV__: MODE === 'development' || MODE === 'debug'
        })
    ]
}
