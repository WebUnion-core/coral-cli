import Public from './Public.js';
import Home from './Home.js';
import Setting from './Setting.js';
import Clock from './Clock.js';

const actions = {};
Object.assign(actions, {
    ...Public,
    ...Home,
    ...Setting,
    ...Clock
});

export default actions;
