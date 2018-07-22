import { combineReducers } from 'redux';
import Home from './Home.js';
import Setting from './Setting.js';

// 使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    Home,
    Setting
});

export default rootReducer;
