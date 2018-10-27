const koaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const config = require('./../../config/config.json');
const api = koaRouter();

config.apps.forEach((app) => {
    // 接口
    app.apis.forEach((apiName) => {
        require(`./${app.name}/${apiName}`).forEach((request) => {
            request(config.version, api);
        });
    });

    // 页面路由
    api.get(`/${app.name}`, (ctx) => {
        ctx.body = fs.readFileSync(
            path.resolve(__dirname, `./../../dist/${app.name}/index.html`),
            'utf-8'
        );
    });
});

// 头像路由
fs.readdirSync(path.resolve(__dirname, './../static/avators'))
    .forEach((avator) => {
        api.get(`/avator/${avator.replace(/\..+/, '')}`, (ctx) => {
            ctx.set({
                'Content-Type': 'image/png'
            });
            ctx.body = fs.readFileSync(
                path.resolve(
                    __dirname,
                    `./../static/avators/${avator}`
                )
            );
        });
    });

module.exports = api;
