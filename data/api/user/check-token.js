module.exports = function(version, api) {
    api.post(`/${version}/user/check_token`, (ctx, next) => {
        const cacheFilePath = './../../static/login_token.json';
        const loginTokenCache = require(cacheFilePath);
        const { response, request } = ctx;
        const data = { ...request.body };

        // 设置响应头
        ctx.set({
            'Access-Control-Allow-Methods': 'POST',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8'
        });

        if (loginTokenCache[data['login_token']] === data['user_agent']) {
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
