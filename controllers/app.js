import Koa from 'koa';
import koaBody from 'koa-body';
import koaBodyParser from 'koa-bodyparser';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';
import koaCors from 'koa-cors';
import convert from 'koa-convert';

import api from './api';

const app = new Koa()
    .use(convert(require('koa-static')(__dirname + './../dist')))
    .use(convert.compose(
        koaBody({ multipart: true }),
        koaBodyParser(),
        koaJson(),
        koaLogger(),
        koaCors(),
    ))
    .use(async (ctx, next) => {
        await next();
    })
    .use(api.routes(), api.allowedMethods());

export default app;
