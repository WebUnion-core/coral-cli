/**
 * api: /user/update_name
 * 功能: 更新用戶名
 *
 * 请求参数:
 * 1. login_token -> 用户token
 * 2. user_name -> 用户名
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 * 3. data
 *    1. user_name -> 用户名
 */

const mongoose = require('mongoose');

const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function(version, api) {
    api.post(`/${version}/user/update_name`, async (ctx, next) => {
        const { response, request: { body } } = ctx;
        const User = mongoose.model('User');

        ctx.set(resHeader); // 设置响应头

        // 更新数据库用户头像
        await User.updateOne(
            { '_id': body['user_token'] },
            {
                $set: { 'name': body['user_name'] }
            },
            function(err) {
                if (err) {
                    throw new Error(err);
                }

                ctx.body = {
                    'result': 1,
                    'data': {
                        'user_name': body['user_name']
                    }
                };
            }
        );
    });
};
