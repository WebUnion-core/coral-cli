#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ammunition = require('ammunition-storage');

const ASSET_PATH = path.resolve(__dirname, './../asset/mw');
const SRC_PATH = path.resolve(__dirname, './../src/mw');
const CONFIG = require('./../src/mw/data.json');

let params;
let moduleName;
let moduleFirstLower;
let modulePath;
let tags;

// 参数截取
try{
    params = JSON.parse(process.env.npm_config_argv).original;
} catch(e) {
    params = process.argv;
}

// 初始化
moduleName = params[2];
moduleFirstLower = moduleName[0].toLowerCase() + moduleName.substr(1);
modulePath = '/' + moduleFirstLower + '/';
tags = [
    {
        key: '<MODULE_NAME />',
        value: moduleName
    },
    {
        key: '<MODULE_NAME_FIRST_LOWWER />',
        value: moduleFirstLower
    }
]

// 替换文件中的标签
function rewriteFile (filePath) {
    let content = fs.readFileSync(
        filePath,
        'utf-8'
    );

    tags.forEach((item) => {
        content = content.replace(
            new RegExp(item.key, 'g'),
            item.value
        );
    });

    fs.writeFileSync(
        filePath,
        content,
        'utf-8'
    );
}

// 复制文件
function copyFile (srcPath, tgtPath) {
    const content = fs.readFileSync(
        srcPath,
        'utf-8'
    );

    fs.writeFileSync(
        tgtPath,
        content,
        'utf-8'
    );
}

// 宏命令
const macro = function() {
    return {
        commandList: [],
        add: function(command) {
            this.commandList.push(command);
        },
        execute: function() {
            for (let i = 0; i < this.commandList.length; i++) {
                let command = this.commandList[i];
                command.execute();
            }
        }
    }
};

// 复制模板
const copyCommand = {
    execute: function () {
        // 模板目录
        ammunition.copyDir({
            srcPath: path.resolve(ASSET_PATH, './template'),
            tgtPath: path.resolve(SRC_PATH, './router/' + moduleName)
        });

        // action文件
        copyFile(
            path.resolve(ASSET_PATH, './action.js'),
            path.resolve(SRC_PATH, './actions/' + moduleName + '.js')
        );

        // reducer文件
        copyFile(
            path.resolve(ASSET_PATH, './reducer.js'),
            path.resolve(SRC_PATH, './reducers/' + moduleName + '.js')
        );
    },
    add: function() {
        throw new Error('叶对象不能添加子节点'); // 抛出错误提示
    }
}

// 装填数据
const fillinDataCommand = {
    execute: function () {
        CONFIG['menus'].push({
            name: moduleName,
            path: modulePath
        });

        fs.writeFileSync(
            path.resolve(SRC_PATH, './data.json'),
            JSON.stringify(CONFIG, null, 4),
            'utf-8'
        );
    },
    add: function() {
        throw new Error('叶对象不能添加子节点'); // 抛出错误提示
    }
};

// 替换标签
const replaceTagCommand = {
    execute: function () {
        rewriteFile(path.resolve(SRC_PATH, './router/' + moduleName + '/index.js'));
        rewriteFile(path.resolve(SRC_PATH, './actions/' + moduleName + '.js'));
        rewriteFile(path.resolve(SRC_PATH, './reducers/' + moduleName + '.js'));
    },
    add: function() {
        throw new Error('叶对象不能添加子节点'); // 抛出错误提示
    }
};

// 包装并执行宏命令
const macroCommand = macro();
macroCommand.add(copyCommand);
macroCommand.add(fillinDataCommand);
macroCommand.add(replaceTagCommand);
macroCommand.execute();
