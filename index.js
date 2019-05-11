#!/usr/bin/env node
const package = require('./package.json');
const align = require('align-text');
const chalk = require('chalk');
const startAppMode = require('./lib/app');
let params;

// 参数获取
try{
    params = JSON.parse(process.env.npm_config_argv)
                 .original
                 .slice(2);
} catch(e) {
    params = process.argv.slice(2);
}

// 默认提示内容
const defaultInfo = [
    'version: ' + package.version + '                            ',
    'author: WebUnion                          ',
    '',
    'You can use "help" to know how to use it. ',
].join('\n');

// 居中函数
function centerAlign(len, longest, line, lines) {
    return {
        character: '',
        indent: Math.floor((longest - len) / 2),
        prefix: '* ',
    };
}

// 帮助提示内容
const helpInfo = [
    'All parameters: ',
    '1. app: use APP mode; ',
].join('\n');

// 首命令符校验
switch (params[0]) {
    case 'help':
        // 帮助提示
        console.log(chalk.green(helpInfo));
        break;
    case 'app':
        // app分支
        startAppMode(params.slice(1));
        break;
    default:
        // 默认提示
        console.log(chalk.green(align(defaultInfo, centerAlign)));
}
