const fs = require('fs');
const path = require('path');
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
    const package = require(filePath);
    package['name'] = data.name;
    package['author'] = data.author;
    package['version'] = data.version;
    package['description'] = data.description;
    fs.writeFileSync(filePath, JSON.stringify(package, null, 4), 'utf-8');
}

module.exports = function () {
    setInputStream(input, function (data) {
        copyDir(
            path.resolve(__dirname, './../../template/tadpole-app'),
            path.resolve(process.cwd(), './' + data.name)
        );
        rewritePackage(data);
        console.log(chalk.green('Initilize successfully. Now you can enjoy coding. '));
        process.exit();
    });
};
