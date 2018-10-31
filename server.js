const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaBodyParser = require('koa-bodyparser');
const koaJson = require('koa-json');
const koaLogger = require('koa-logger');
const koaCors = require('koa-cors');
const convert = require('koa-convert');

const api = require('./server/api');
const config = require('./config/config.json');
const cron = require('./server/cron');
const server = require('./lib').server;
const HOST = server.host;
const PORT = server.port;

if (config.replyDatabase) {
    require('./server/model')();
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
app.listen(PORT, HOST, function(err) {
    if (err) {
        throw new Error(err);
    }

    // 启动定时任务
    cron.crawlArticles();
    console.log(`The server is listening in => http://${HOST}:${PORT}`);
});
