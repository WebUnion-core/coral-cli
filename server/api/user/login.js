/**
 * api: /user/login
 * 功能: 登录
 *
 * 请求参数:
 * 1. login_token -> 可选，用户token
 * 2. user_agent -> 设备信息
 * 3. name -> 可选，用户名
 * 4. password -> 可选，密码
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 * 3. data
 *    1. login_token -> 登录token，交给客户端保存
 *    2. avator_url -> 用户头像
 *    3. user_name -> 用户名
 */

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const ammunition = require('ammunition-storage');

const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

// 更新登录缓存文件
function updateTokenCache(token, userAgent) {
    // 将登录签名和UA保存到Cache
    const loginTokenCache = require('./../../static/login_token.json');
    const cachePath = path.resolve(__dirname, './../../static/login_token.json');
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
        let token = body['login_token'];

        const condition = token
            ? { '_id': token }
            : { name, password: ammunition.md5(password) };

        ctx.set(resHeader); // 设置响应头

        await User.find(condition, function (err, resData) {
            if (err) {
                throw new Error(err);
            }

            if (resData.length === 0) {
                // 用户不存在
                ctx.body = {
                    result: 0,
                    msg: '用户不存在'
                };
            } else {
                // 用户存在
                token = resData[0]['_id'];
                const userName = resData[0]['name'];
                const avator = resData[0]['avator_url'];

                // 反馈页面
                ctx.body = {
                    'result': 1,
                    'data': {
                        'login_token': token,
                        'user_name': userName,
                        'avator_url': avator
                    }
                };

                updateTokenCache(token, userAgent);
            }
        });
    });
};
