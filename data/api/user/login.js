const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const ammunition = require('ammunition-storage');

module.exports = function(version, api) {
    api.post(`/${version}/user/login`, async (ctx, next) => {
        const { response, request } = ctx;
        const User = mongoose.model('User');
        const data = { ...request.body };

        await User.find({
            name: data.name,
            password: ammunition.md5(data.password)
        }, function (err, resData) {
            if (err) {
                throw new Error(err);
            } else {
                // 设置响应头
                ctx.set({
                    'Access-Control-Allow-Methods': 'POST',
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8'
                });

                if (resData.length === 0) {
                    ctx.body = {
                        result: -1,
                        msg: '查无此人'
                    };
                } else {
                    const cacheFilePath = './../../static/login_token.json';
                    const loginTokenCache = require(cacheFilePath);
                    const token = resData[0]['_id'];

                    // 将登录签名保存到cookie
                    ctx.cookies.set(
                        'login_token',
                        token,
                        {
                            maxAge: 10 * 60 * 1000, // cookie有效时长
                            expires: new Date('2018-09-01'), // cookie失效时间
                            httpOnly: false, // 是否只用于http请求中获取
                            overwrite: true // 是否允许重写
                        }
                    );

                    // 反馈页面
                    ctx.body = {
                        result: 1
                    };

                    // 将登录签名和UA保存到Cache
                    loginTokenCache[token] = data['user_agent'];
                    fs.writeFileSync(
                        path.resolve(__dirname, cacheFilePath),
                        JSON.stringify(loginTokenCache, null, 4),
                        'utf-8'
                    );
                }
            }
        });
    });
};
