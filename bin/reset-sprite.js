#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ASSET_PATH = path.resolve(__dirname, './../src/asset');
const STYLE_PATH = path.resolve(ASSET_PATH, './style');

// 重写文件数据
function reWriteFile(itemPath, itemName) {
    let data = fs.readFileSync(itemPath, 'utf-8');
    const spriteInfo = itemName.split('-');

    for (let i = 0; i < parseInt(spriteInfo[2], 10); i++) {
        data = data.replace(
            'background-position: 0px ' + (-i * parseInt(spriteInfo[1], 10)) + 'px;',
            'background-position: 0px ' + (-i * parseFloat(spriteInfo[3])) + 'rem;\n  background-size: ' + spriteInfo[3] + 'rem;'
        );
    }

    data = data.replace(
        /width: [0-9]+px;/g,
        'width: ' + spriteInfo[3] + 'rem;'
    );

    data = data.replace(
        /height: [0-9]+px;/g,
        'height: ' + spriteInfo[3] + 'rem;'
    );

    fs.writeFileSync(itemPath, data, 'utf-8');
}

const assetData = fs.readdirSync(STYLE_PATH);
assetData.forEach(function(item) {
    const itemPath = path.resolve(STYLE_PATH, './' + item);
    const isFile = fs.statSync(itemPath).isFile();

    if (isFile) {
        reWriteFile(itemPath, item);
    }
});
