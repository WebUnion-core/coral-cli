const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const SpritesmithPlugin = require('webpack-spritesmith');

const SRC_PATH = path.resolve(__dirname, './../asset/sprite');
const TARGET_PATH = path.resolve(__dirname, './../src/asset');

const spriteConfig = [];

// 其他打包配置
module.exports = function setOther(webpackConfig) {
    const srcData = fs.readdirSync(SRC_PATH);

    spriteConfig.push({
        // 目标小图标
        src: {
            cwd: path.resolve(__dirname, './../asset/intro'),
            glob: '*.png'
        },
        // 输出雪碧图文件及样式文件
        target: {
            image: path.resolve(__dirname, './../asset/intro1.png'),
            css: path.resolve(__dirname, './../asset/sprite-intro.scss')
        },
        // 样式文件中调用雪碧图地址写法
        apiOptions: {
            cssImageRef: './intro1.png'
        },
        spritesmithOptions: {
            algorithm: 'left-right'
        }
    });

    srcData.forEach(function(item) {
        const itemPath = path.resolve(SRC_PATH, './' + item);
        const isDir = fs.statSync(itemPath).isDirectory();

        if (isDir) {
            spriteConfig.push({
                // 目标小图标
                src: {
                    cwd: itemPath,
                    glob: '*.png'
                },
                // 输出雪碧图文件及样式文件
                target: {
                    image: path.resolve(TARGET_PATH, './images/' + item + '.png'),
                    css: path.resolve(TARGET_PATH, './style/' + item + '.css')
                },
                // 样式文件中调用雪碧图地址写法
                apiOptions: {
                    cssImageRef: './../images/' + item + '.png'
                },
                spritesmithOptions: {
                    algorithm: 'top-down'
                }
            });
        }
    })

    // 额外插件
    spriteConfig.forEach(function(item) {
        webpackConfig.plugins.push(new SpritesmithPlugin(item));
    });
};
