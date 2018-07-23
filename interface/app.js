import Koa from 'koa';
import KoaBody from 'koa-body';
import KoaBodyParser from 'koa-bodyparser';
import KoaJson from 'koa-json';
import KoaLogger from 'koa-logger';
import KoaCors from 'koa-cors';
import convert from 'koa-convert';

import api from './api';

const app = new Koa()
    .use(convert(require('koa-static')(__dirname + './../dist')))
    .use(convert.compose(
        KoaBody({ multipart: true }),
        KoaBodyParser(),
        KoaJson(),
        KoaLogger(),
        KoaCors(),
    ))
    .use(async (ctx, next) => {
        await next();
    })
    .use(api.routes(), api.allowedMethods());

export default app;
