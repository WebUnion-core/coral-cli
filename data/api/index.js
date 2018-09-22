const koaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const config = require('./../../config/config.json');
const api = koaRouter();

// 接口
config.apis.forEach((apiName) => {
    require(`./${apiName}`).forEach((request) => {
        request(config.version, api);
    });
});

// 页面路由
config.apps.forEach((item) => {
    api.get(`/${item.name}`, (ctx) => {
        ctx.body = fs.readFileSync(
            path.resolve(__dirname, `./../../dist/${item.name}/index.html`),
            'utf-8'
        );
    });
});

// 头像路由
fs.readdirSync(path.resolve(__dirname, './../static/avators'))
    .forEach((item) => {
        api.get(`/avator/${item.replace(/\..+/, '')}`, (ctx) => {
            ctx.set({
                'Content-Type': 'image/png'
            });
            ctx.body = fs.readFileSync(
                path.resolve(
                    __dirname,
                    `./../static/avators/${item}`
                )
            );
        });
    });

module.exports = api;
