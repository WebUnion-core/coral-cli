const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, './../../static/avators');

/**
 * 1. user_token -> 用户token，用于命名图片
 * 2. image -> 图片文件数据
 */
module.exports = function (version, api) {
    api.post(`/${version}/file/upload_avator`, (ctx, next) => {
        const { response, request: { files, body } } = ctx;
        const file = files['image'];
        const newPath = path.resolve(
            FILE_PATH,
            body['user_token'] + '.png'
        );

        // 创建读写流
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(newPath);
        reader.pipe(writer);

        // 设置响应头
        ctx.set({
            'Access-Control-Allow-Methods': 'POST',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8'
        });

        ctx.body = {
            'result': 1
        };
    });
};
