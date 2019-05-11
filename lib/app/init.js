const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const setInputStream = require('./../set-input-stream.js');
const copyDir = require('./../copy-dir.js');

const input = [
    {
        text: 'What\'s the name of your project? ',
        key: 'name',
    },
    {
        text: 'The author? ',
        key: 'author',
    },
    {
        text: 'The version? ',
        key: 'version',
    },
    {
        text: 'Any description? ',
        key: 'description',
    },
];

// 重写package.json
function rewritePackage(data) {
    const filePath = path.resolve(process.cwd(), './' + data.name + '/package.json');
    const json = require(filePath);
    json['name'] = data.name;
    json['author'] = data.author;
    json['version'] = data.version;
    json['description'] = data.description;
    fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf-8');
}

// 根据当前系统设置环境设置关键字
function rewriteEnvSettingType(data) {
    const filePath = path.resolve(process.cwd(), './' + data.name + '/package.json');
    const settingType = os.type() === 'Darwin' ? 'export' : 'set';
    let fileData = fs.readFileSync(filePath, 'utf-8');
    fileData = fileData.replace(/\[\[SET_ENV_TYPE\]\]/g, settingType);
    fs.writeFileSync(filePath, fileData, 'utf-8');
}

module.exports = function () {
    setInputStream(input, function (data) {
        copyDir(
            path.resolve(__dirname, './../../template/tadpole-app'),
            path.resolve(process.cwd(), './' + data.name)
        );
        rewritePackage(data);
        rewriteEnvSettingType(data);
        console.log(chalk.green('Initilize successfully! Now you can enjoy coding. '));
        process.exit();
    });
};
