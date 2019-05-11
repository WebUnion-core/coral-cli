const chalk = require('chalk');
const init = require('./init.js');

// 默认提示内容
const defaultInfo = [
    'I find you are using an unknown parameter. ',
    'Please use the following valid app-mode parameters: ',
    '1. init: initilize tadpole-app project in current directory; ',
].join('\n');

module.exports = function (params) {
    switch (params[0]) {
        case 'init':
            // 创建默认项目
            init();
            break;
        default:
            // 未知参数
            console.log(chalk.green(defaultInfo));
    }
}
