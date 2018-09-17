/**
* api: /user/check_token
* 功能: 自动登录校验
*
* 请求参数:
* 1. login_token -> 用户token
* 2. user_agent -> 用户设备信息
*
* 响应参数:
* 1. result -> 状态值 -> 1:成功, 0:失败
*/

const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function(version, api) {
    api.post(`/${version}/user/check_token`, (ctx, next) => {
        const loginTokenCache = require('./../../static/login_token.json');
        const { response, request: { body } } = ctx;

        // 请求参数
        const token = body['login_token'];
        const userAgent = body['user_agent'];

        ctx.set(resHeader); // 设置响应头

        if (loginTokenCache[token] === userAgent) {
            ctx.body = {
                'result': 1
            };
        } else {
            ctx.body = {
                'result': 0
            };
        }
    });
};
