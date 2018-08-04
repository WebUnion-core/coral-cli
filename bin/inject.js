#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT_PATH = process.cwd();

const CONFIG = require('./../config/data.json');
const DIST_PATH = path.resolve(ROOT_PATH, './dist');
const DATA_PATH = path.resolve(DIST_PATH, './' + CONFIG.version);

// 在dist目录中放置静态数据
fs.mkdirSync(DATA_PATH);
const data = require('./../interface/static/home_list.json');
fs.writeFileSync(
    path.resolve(DATA_PATH, './home_list.json'),
    JSON.stringify(data, null, 4),
    'utf-8'
);

console.log('Have injected data to ' + DATA_PATH);
