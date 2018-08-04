const data = require('./../static/home_list.json');

export default (ctx, next) => {
    ctx.body = JSON.stringify(data);
};
