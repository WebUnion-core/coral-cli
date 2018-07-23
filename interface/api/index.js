import KoaRouter from 'koa-router';

const path = require('path');
const fs = require('fs');
const config = require('./../../config/data.json');
const api = KoaRouter();

api.get('/', (ctx, next) => {
        ctx.body = 'Home.';
    })
    .get('/about/:name', (ctx, next) => {
        // http://127.0.0.1:2015/about/WJT20 => "About WJT20"
        const { name } = ctx.params;
        ctx.body = `About ${ name || '' }`;
    });

// 附加应用路由
config.apps.forEach((item, index) => {
    api.get(`/${ item.name }`, (ctx, next) => {
        ctx.body = fs.readFileSync(
            path.resolve(__dirname, `./../../dist/${ item.name }/index.html`),
            'utf-8'
        );
    });
});

export default api;
