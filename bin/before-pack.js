#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const MODE = process.env.NODE_ENV.toLowerCase();
const BABELRC_PATH = path.resolve(__dirname, './../.babelrc');
const babelRc = JSON.parse(fs.readFileSync(BABELRC_PATH, 'utf-8'));

// 移除目标
function deleteTarget(data, target) {
    data.forEach(function(item, index) {
        if (item === target) {
            data.splice(index, 1);
        }
    });

    return data;
}

// 添加目标
function addTarget(data, target) {
    let ifExist = false;

    data.forEach(function(item) {
        if (item === target) {
            ifExist = true;
        }
    });

    if (!ifExist) {
        data.push(target);
    }

    return data;
}

switch (MODE) {
    case 'development':
        babelRc['plugins'] = deleteTarget(babelRc['plugins'], 'react-hot-loader/babel');
        break;
    case 'production':
        babelRc['plugins'] = deleteTarget(babelRc['plugins'], 'react-hot-loader/babel');
        break;
    case 'debug':
        babelRc['plugins'] = addTarget(babelRc['plugins'], 'react-hot-loader/babel');
        break;
    default:
}

fs.writeFileSync(
    BABELRC_PATH,
    JSON.stringify(babelRc, null, 4),
    'utf-8'
);
