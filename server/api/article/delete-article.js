/**
 * api: /article/delete_article
 * 功能: 文章删除
 *
 * 请求参数:
 * 1. id -> 文章ID
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 */

const mongoose = require('mongoose');
const config = require('./../../../config/config.json');

const respHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

// 数据库查询
const queryMongoDB = async (id, ctx) => {
    const Article = mongoose.model('Article');
    let total;

    // 删除指定ID文章，https://blog.csdn.net/u012810020/article/details/54582051
    await Article.deleteOne(
        { '_id': id },
        (err) => {
            if (err) {
                ctx.body = {
                    'result': 0,
                    'msg': err.message
                };
            } else {
                ctx.body = {
                    'result': 1,
                    'msg': '删除成功'
                };
            }
        }
    );
}

module.exports = function (version, api) {
    api.post(`/${version}/article/delete_article`, async (ctx, next) => {
        const { response, request: { body } } = ctx;

        ctx.set(respHeader); // 设置响应头

        if (config.replyDatabase) {
            await queryMongoDB(body['id'], ctx);
        } else {
            ctx.body = {
                'result': 1,
                'msg': '删除成功'
            };
        }
    });
};
