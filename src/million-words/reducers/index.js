import { combineReducers } from 'redux';
import Public from './Public.js';
import Home from './Home.js';
import Setting from './Setting.js';
import Clock from './Clock.js';
import Account from './Account.js';
import OwnMsg from './OwnMsg.js';

// 使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    Public,
    Home,
    Setting,
    Clock,
    Account,
    OwnMsg
});

export default rootReducer;
