import { combineReducers } from 'redux';
import Public from './Public.js';

const config = require('./../data.json');
const reducer = {
    Public
}

config.menus.forEach((item) => {
    const { name } = item;
    reducer[name] = require('./' + name + '.js').default;
});

// 使用redux的combineReducers方法将所有reducer打包起来
export default combineReducers(reducer);
