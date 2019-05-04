#!/usr/bin/env node

/**
 * 重写雪碧图样式文件
 */

const fs = require('fs');
const path = require('path');

const assetPath = path.resolve(__dirname, './../src/common/style');
const stylePath = path.resolve(assetPath, './sprite');

const files = [];

function reWriteEachSpriteFile(itemPath, itemName) {
    let data = fs.readFileSync(itemPath, 'utf-8');
    const spriteInfo = itemName.split('-');
    const originalSize = spriteInfo[1];
    const remSize = spriteInfo[2];
    const spriteAmount = data.match(/\.icon-/g).length;

    for (let i = 0; i < parseInt(spriteAmount, 10); i++) {
        data = data.replace(
            'background-position: 0px '
                + (-i * parseInt(originalSize, 10))
                + 'px;',
            'background-position: 0px '
                + (-i * parseFloat(remSize))
                + 'rem;\n  background-size: '
                + remSize
                + 'rem;'
        );
    }

    data = data.replace(
        /width: [0-9]+px;/g,
        'width: '
            + remSize
            + 'rem;'
    );

    data = data.replace(
        /height: [0-9]+px;/g,
        'height: '
            + remSize
            + 'rem;'
    );

    fs.writeFileSync(itemPath, data, 'utf-8');
}

// 重写雪碧图样式总入口文件
function rewriteAllSpriteEntry() {
    let importStr = '';
    files.forEach(function(item) {
        importStr += '@import url(\'./sprite/' + item + '\');\n';
    });
    fs.writeFileSync(
        path.resolve(assetPath, './all-sprite.scss'), importStr, 'utf-8'
    );
    console.log('success!');
}

// 遍历所有生成的雪碧图样式文件
const assetData = fs.readdirSync(stylePath);
assetData.forEach(function(item) {
    const itemPath = path.resolve(stylePath, './' + item);
    const isFile = fs.statSync(itemPath).isFile();
    if (isFile) {
        reWriteEachSpriteFile(itemPath, item);
        files.push(item);
    }
});

rewriteAllSpriteEntry();
