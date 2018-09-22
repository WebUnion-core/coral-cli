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
 * 2. data
 *    1. avator_url -> 图片URL
 */

const fs = require('fs');
const path = require('path');
const { server } = require('./../../common');
const mongoose = require('mongoose');

const FILE_PATH = path.join(__dirname, './../../static/avators');
const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function (version, api) {
    api.post(`/${version}/file/upload_avator`, async (ctx, next) => {
        const { response, request: { files, body } } = ctx;
        const User = mongoose.model('User');

        // 请求参数
        const file = files['image'];
        const token = body['user_token'];
        const avatorUrl = `http://${server.host}:${server.port}/avator/${token}?v=${new Date().valueOf()}`;

        const newPath = path.resolve(
            FILE_PATH,
            `${token}.png`
        );

        ctx.set(resHeader); // 设置响应头

        // 更新数据库用户头像
        await User.updateOne(
            { '_id': token },
            {
                $set: { 'avator_url': avatorUrl }
            },
            function(err) {
                if (err) {
                    throw new Error(err);
                }

                // 创建读写流
                const reader = fs.createReadStream(file.path);
                const writer = fs.createWriteStream(newPath);
                reader.pipe(writer);

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
