const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaBodyParser = require('koa-bodyparser');
const koaJson = require('koa-json');
const koaLogger = require('koa-logger');
const koaCors = require('koa-cors');
const convert = require('koa-convert');

const HOST = require('./lib/getHost.js')();
const api = require('./server/api');
const config = require('./config/config.json');
const cron = require('./server/cron');
let port;

require('./server/model')();

const mode = ['development', 'debug'];
if (JSON.stringify(mode).indexOf(process.env.NODE_ENV) > 0) {
    port = config.dataServer.port;
} else {
    port = config.prodServer.port;
}

// 挂载各种中间件
const app = new Koa()
    .use(convert(
        require('koa-static')(path.resolve(__dirname, './dist'))
    ))
    .use(convert.compose(
        koaBody({ multipart: true }),
        koaBodyParser(),
        koaJson(),
        koaLogger(),
        koaCors()
    ))
    .use(api.routes(), api.allowedMethods());

// 启动服务
app.listen(port, HOST, function(err) {
    if (err) {
        throw new Error(err);
    }

    // 启动定时任务
    cron.crawlArticles();
    console.log(`The server is listening in => http://${HOST}:${port}`);
});
