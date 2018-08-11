module.exports = function(version, api) {
    api.post(`/${version}/user/login`, (ctx, next) => {
        const { response, request } = ctx;

        ctx.set({
            'Access-Control-Allow-Methods': 'POST',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8'
        });

        ctx.body = JSON.stringify({
            name: request.body.name,
            passwotd: request.body.password
        });
    });
};
