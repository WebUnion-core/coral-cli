import KoaRouter from 'koa-router';

// 接口
import requestHomeList from './home-list.js';

const path = require('path');
const fs = require('fs');
const config = require('./../../config/data.json');
const api = KoaRouter();

api.get(`/${ config.version }/home_list`, requestHomeList); // 首页列表

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
