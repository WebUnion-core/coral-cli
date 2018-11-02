const koaRouter = require('koa-router');
const path = require('path');
const fs = require('fs');
const config = require('./../../config/config.json');
const api = koaRouter();
const pages = [config.spa].concat(config.mpa.pages);

// 接口
config.apis.forEach((apiName) => {
    require(`./${apiName}`).forEach((request) => {
        request(config.version, api);
    });
});

// 页面路由
pages.forEach((page) => {
    api.get(`/${page.path}`, (ctx) => {
        ctx.body = fs.readFileSync(
            path.resolve(__dirname, `./../../dist/${page.path}/index.html`),
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
