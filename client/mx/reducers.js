import { combineReducers } from 'redux';

const config = require('./data.json');
const reducer = {}

config.menus.forEach((item) => {
    const { name } = item;
    reducer[name] = require('./routes/' + name + '/reducer.js').default;
});

// 使用redux的combineReducers方法将所有reducer打包起来
export default combineReducers(reducer);
