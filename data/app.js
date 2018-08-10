const Koa = require('koa');
const koaBody = require('koa-body');
const koaBodyParser = require('koa-bodyparser');
const koaJson = require('koa-json');
const koaLogger = require('koa-logger');
const koaCors = require('koa-cors');
const convert = require('koa-convert');

const api = require('./api');

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

module.exports = app;
