const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const spriteSourcePath = path.resolve(__dirname, './../public');
const spriteStorePath = path.resolve(__dirname, './../src/common');
const spriteSource = fs.readdirSync(spriteSourcePath);
const spriteConfig = [];

/**
 * 雪碧图制作
 * "/public"目录下，以"sprite-原图尺寸-rem转换值-编号"规则命名目录，
 * 其中的图片资源必须为png格式，建议以字母或数字组合的形式给每个图片加上前缀，使其唯一化
 * 重新启动webpack打包后，还要执行reset-sprite命令去将生成的css文件中的px值转为rem
 * 之后就可以在页面中用"icon-图标名"的形式引用图标了
 */
spriteSource.forEach(function (item) {
    const itemPath = path.resolve(spriteSourcePath, './' + item);
    const isDir = fs.statSync(itemPath).isDirectory();
    const image = path.resolve(spriteStorePath, './images/' + item + '.png');
    const css = path.resolve(spriteStorePath, './style/sprite/' + item + '.css');

    if (isDir && (item.indexOf('sprite') >= 0)) {
        spriteConfig.push({
            // 目标小图标
            src: {
                cwd: itemPath,
                glob: '*.png',
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: image,
                css: css,
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: './../../images/' + item + '.png',
            },
            spritesmithOptions: {
                algorithm: 'top-down',
            },
        });
    }
});

/**
 * 设置打包基本配置
 * @type {Object} webpack基本配置对象
 */
const webpackConfig = {
    entry: function () {
        return {};
    },
    module: {
        rules: [
            {
                // 脚本打包
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader?cacheDirectory=true',
                    // 'eslint-loader'
                ],
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './../src')
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
            path.resolve(__dirname, './../node_modules'),
            path.resolve(__dirname, './../src'),
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
            __DEV__: process.env.ENV === 'DEV'
        })
    ]
};

// 雪碧图插件
spriteConfig.forEach(function (item) {
    webpackConfig.plugins.push(new SpritesmithPlugin(item));
});

module.exports = webpackConfig;
