/**
 * api: /file/upload_avator
 * 功能: 上传头像
 *
 * 请求参数:
 * 1. user_token -> 用户token，用于命名图片
 * 2. image -> 图片文件数据流
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 * 3. data
 *    1. avator_url -> 图片URL
 */

const fs = require('fs');
const path = require('path');
const { server } = require('./../../../common');
const mongoose = require('mongoose');

const FILE_PATH = path.join(__dirname, './../../../static/avators');
const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function (version, api) {
    api.post(`/mw/${version}/file/upload_avator`, async (ctx, next) => {
        const { response, request: { files, body } } = ctx;
        const User = mongoose.model('User');

        // 请求参数
        const file = files['image'];
        const token = body['user_token'];
        const avatorUrl = `http://${server.host}:${server.port}/avator/${token}`;
        const newPath = path.resolve(FILE_PATH, `${token}.png`);

        ctx.set(resHeader); // 设置响应头

        // 更新数据库用户头像
        await User.updateOne(
            { '_id': token },
            { $set: { 'avator_url': avatorUrl } },
            (err) => {
                if (err) {
                    throw new Error(err);
                }

                // 创建读写流
                const reader = fs.createReadStream(file.path);
                const writer = fs.createWriteStream(newPath);
                reader.pipe(writer);

                api.get(`/avator/${token}`, (ctx) => {
                    ctx.set({
                        'Content-Type': 'image/png'
                    });
                    ctx.body = fs.readFileSync(
                        path.resolve(
                            __dirname,
                            `./../../static/avators/${token}`
                        )
                    );
                });

                ctx.body = {
                    'result': 1,
                    'data': {
                        'avator_url': avatorUrl
                    }
                };
            }
        );
    });
};
