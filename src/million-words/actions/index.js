import Home from './Home.js';
import Setting from './Setting.js';

let actions = {};
Object.assign(actions, {
    ...Home,
    ...Setting
});

export default actions;
