import Public from './Public.js';
import Home from './Home.js';
import Setting from './Setting.js';
import Clock from './Clock.js';
import Account from './Account.js';

const actions = {};
Object.assign(actions, {
    ...Public,
    ...Home,
    ...Setting,
    ...Clock,
    ...Account
});

export default actions;
