import Public from './Public.js';
import Home from './Home.js';
import Setting from './Setting.js';
import Clock from './Clock.js';
import Account from './Account.js';
import OwnMsg from './OwnMsg.js';

const actions = {};

Object.assign(actions, {
    ...Public,
    ...Home,
    ...Setting,
    ...Clock,
    ...Account,
    ...OwnMsg
});

export default actions;
