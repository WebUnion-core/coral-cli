#!/usr/bin/env node
const align = require('align-text');
const chalk = require('chalk');
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
    'Tadpole Cli                               ',
    'Version: 0.0.1                            ',
    'Author: WebUnion                          ',
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
    'Param list: ',
    '1. init: initialize the tadpole project to current directory; ',
].join('\n');

// 首命令符校验
switch (params[0]) {
    case 'help':
        // 帮助提示
        console.log(chalk.yellow(helpInfo));
        break;
    default:
        // 默认提示
        console.log(chalk.green(align(defaultInfo, centerAlign)));
}
