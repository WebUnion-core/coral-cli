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
 * 3. login_token -> 登录token，交给客户端保存
 */

const mongoose = require('mongoose');
const ammunition = require('ammunition-storage');

const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function(version, api) {
    api.post(`/${version}/user/register`, async (ctx, next) => {
        const { response, request: { body } } = ctx;
        const User = mongoose.model('User');

        // 指定数据加密
        Object.assign(body, {
            password: ammunition.md5(body.password),
            name: body.phone
        });

        ctx.set(resHeader); // 设置响应头

        const user = new User(body);
        const saveInfo = await user.save(); // 保存数据

        if (saveInfo) {
            ctx.body = {
                'result': 1,
                'login_token': ''
            };
        } else {
            ctx.body = {
                'result': 0,
                'msg': '保存失败'
            };
        }
    });
};
