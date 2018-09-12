/**
 * api: /user/login
 * 功能: 请求登录
 *
 * 请求参数:
 * 1. login_token -> 用户token
 * 2. user_agent -> 用户设备信息
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 */

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const ammunition = require('ammunition-storage');
const loginTokenCache = require('./../../static/login_token.json');

const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};
const cachePath = path.resolve(__dirname, './../../static/login_token.json');

// 更新登录缓存文件
function updateTokenCache(token, userAgent) {
    // 将登录签名和UA保存到Cache
    if (process.env.NODE_ENV !== 'debug') {
        loginTokenCache[token] = userAgent;
        fs.writeFileSync(
            cachePath,
            JSON.stringify(loginTokenCache, null, 4),
            'utf-8'
        );
    }
}

module.exports = function(version, api) {
    api.post(`/${version}/user/login`, async (ctx, next) => {
        const { response, request: { body } } = ctx;
        const User = mongoose.model('User');

        // 请求参数
        const name = body['name'];
        const password = body['password'];
        const userAgent = body['user_agent'];

        await User.find({
            name,
            password: ammunition.md5(password)
        }, function (err, resData) {
            if (err) {
                throw new Error(err);
            } else {
                ctx.set(resHeader); // 设置响应头

                if (resData.length === 0) {
                    // 用户不存在
                    ctx.body = {
                        result: -1,
                        msg: '用户不存在'
                    };
                } else {
                    // 用户存在
                    const token = resData[0]['_id'];

                    // 反馈页面
                    ctx.body = {
                        'result': 1,
                        'login_token': token
                    };

                    updateTokenCache(token, userAgent);
                }
            }
        });
    });
};
