const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaBodyParser = require('koa-bodyparser');
const koaJson = require('koa-json');
const koaLogger = require('koa-logger');
const koaCors = require('koa-cors');
const convert = require('koa-convert');

const api = require('./data/api');
let config;

require('./data/model')();

const mode = ['development', 'debug'];
if (JSON.stringify(mode).indexOf(process.env.NODE_ENV) > 0) {
    config = require('./config/config.json').dataServer;
} else {
    config = require('./config/config.json').prodServer;
}

const app = new Koa()
    .use(convert(
        require('koa-static')(path.resolve(__dirname, './dist'))
    ))
    .use(convert.compose(
        koaBody({
            multipart: true
        }),
        koaBodyParser(),
        koaJson(),
        koaLogger(),
        koaCors()
    ))
    .use(async (ctx, next) => {
        await next();
    })
    .use(api.routes(), api.allowedMethods());

app.listen(config.port, config.host, function(err) {
    if (err) {
        throw new Error(err);
    } else {
        console.log(`The server is listening in => http://${
            config.host
        }:${
            config.port
        }`);
    }
});
