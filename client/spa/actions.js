const config = require('./data.json');
const actions = {};

config.menus.forEach((item) => {
    Object.assign(actions, {
        ...(require('./routes/' + item.name + '/action.js').default)
    });
});

export default actions;
