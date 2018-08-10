const koaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const config = require('./../../config/config.json');
const api = koaRouter();

// 接口
const Home = require('./home');

// HOME
Object.keys(Home).forEach((key) => {
    Home[key](config.version, api);
});

// 附加应用路由
config.apps.forEach((item) => {
    api.get(`/${item.name}`, (ctx) => {
        ctx.body = fs.readFileSync(
            path.resolve(
                __dirname,
                `./../../dist/${item.name}/index.html`
            ),
            'utf-8'
        );
    });
});

module.exports = api;
