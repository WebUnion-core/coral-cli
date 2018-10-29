/**
 * api: /user/register
 * 功能: 注册
 *
 * 请求参数:
 * 1. phone -> 联系电话
 * 2. password -> 密码
 * 3. user_agent -> 设备信息
 * 4. name -> 用户名
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 * 3. data
 *    1. login_token -> 登录token，交给客户端保存
 */

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const ammunition = require('ammunition-storage');
const config = require('./../../../config/config.json');

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
    const cachePath = path.resolve(
        __dirname,
        './../../static/login_token.json'
    );
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
    api.post(`/mw/${version}/user/register`, async (ctx, next) => {
        const { response, request: { body } } = ctx;
        const User = mongoose.model('User');

        // 指定数据加密
        Object.assign(body, {
            'password': ammunition.md5(body.password),
            'name': body.phone,
            'avator_url': config.defaultAvator
        });

        const user = new User(body);
        const saveInfo = await user.save(); // 保存数据

        ctx.set(resHeader); // 设置响应头

        if (saveInfo) {
            const token = saveInfo['_id'];
            const userName = saveInfo['name'];
            const avator = saveInfo['avator_url'];
            ctx.body = {
                'result': 1,
                'data': {
                    'login_token': token,
                    'user_name': userName,
                    'avator_url': avator
                }
            };
            updateTokenCache(token, body['user_agent']);
        } else {
            ctx.body = {
                'result': 0,
                'msg': '保存失败'
            };
        }
    });
};
