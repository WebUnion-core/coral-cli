import Public from './Public.js';

const config = require('./../data.json');
const actions = {
    ...Public
};

config.menus.forEach((item) => {
    Object.assign(actions, {
        ...(require('./' + item.name + '.js').default)
    });
});

export default actions;
