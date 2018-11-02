#!/usr/bin/env node

/**
 * 版本发布器
 */

const fs = require('fs');
const path = require('path');

const INPUT = [
    {
        text: '请输入版本号 : ',
        key: 'version'
    }
];

let DATA = {};
let counter = 0;

// 修改文件涉及的版本号
function changeVersion () {
    const version = DATA.version;

    // 更新config.json
    const cffile = require('./../config/config.json');
    const cfpath = path.resolve(__dirname, './../config/config.json');
    cffile.version = 'v' + version;
    fs.writeFileSync(cfpath, JSON.stringify(cffile, null, 4), 'utf-8');
    console.log('Update success => ', cfpath);

    // 更新package.json
    const pgfile = require('./../package.json');
    const pgpath = path.resolve(__dirname, './../package.json');
    pgfile.version = version;
    fs.writeFileSync(pgpath, JSON.stringify(pgfile, null, 4), 'utf-8');
    console.log('Update success => ', pgpath);
}

// 输入监听器
console.log(INPUT[counter]['text']);
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    const chunk = process.stdin.read();

    if (chunk) {
        // 更新数据
        DATA[INPUT[counter]['key']] = chunk;
        counter++;

        if (INPUT[counter]) {
            console.log(INPUT[counter]['text']);
        } else {
            // 输入结束
            DATA = JSON.parse(JSON.stringify(DATA).replace(/\\[r|n]/g, ''));
            changeVersion();
            process.exit();
        }
    } else if (counter > 0) {
        process.exit();
    }
});
