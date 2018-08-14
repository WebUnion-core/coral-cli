const mongoose = require('mongoose');
const ammunition = require('ammunition-storage');

module.exports = function(version, api) {
    api.post(`/${version}/user/register`, async (ctx, next) => {
        const { response, request } = ctx;
        const User = mongoose.model('User');
        const data = { ...request.body };

        // 指定数据加密
        Object.assign(data, {
            password: ammunition.md5(data.password),
            name: data.phone
        });

        const user = new User(data);
        const saveInfo = await user.save(); // 保存数据

        ctx.set({
            'Access-Control-Allow-Methods': 'POST',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8'
        });

        if (saveInfo) {
            ctx.body = {
                result: 1
            };
        } else {
            ctx.body = {
                result: -1,
                msg: '保存失败'
            };
        }
    });
};
