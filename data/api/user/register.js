const mongoose = require('mongoose');

module.exports = function(version, api) {
    api.post(`/${version}/user/register`, async (ctx, next) => {
        const { response, request } = ctx;
        const User = mongoose.model('User');

        const user = new User(request.body);
        const saveInfo = await user.save(); // 保存数据

        ctx.set({
            'Access-Control-Allow-Methods': 'POST',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8'
        });

        if (saveInfo) {
            ctx.body = {
                result: 1,
                data: {
                    phone: request.body.phone,
                    code: request.body.code,
                    password: request.body.password
                }
            };
        } else {
            ctx.body = {
                result: -1,
                msg: '保存失败'
            };
        }
    });
};
