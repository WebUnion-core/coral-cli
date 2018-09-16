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
*    1. url -> 图片URL
*/

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, './../../static/avators');
const resHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function (version, api) {
    api.post(`/${version}/file/upload_avator`, (ctx, next) => {
        const { response, request: { files, body } } = ctx;

        // 请求参数
        const file = files['image'];
        const token = body['user_token'];

        const newPath = path.resolve(
            FILE_PATH,
            `${token}.png`
        );

        // 创建读写流
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(newPath);
        reader.pipe(writer);

        ctx.set(resHeader); // 设置响应头

        ctx.body = {
            'result': 1,
            'data': {
                // 'url':
            }
        };
    });
};
