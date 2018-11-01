/**
 * api: /article/search_article
 * 功能: 文章搜索
 *
 * 请求参数:
 * 1. page -> 分页计数，由1计起
 * 2. amount -> 一页返回记录数
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 * 3. data
 *    1. total_page -> 总页数
 *    2. articles -> 文章数据集合
 */

const mongoose = require('mongoose');

const respHeader = {
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

// 数据库查询
const getMongoData = async (body, ctx) => {
    const page = parseInt(body['page'], 10);
    const amount = parseInt(body['amount'], 10);
    const Article = mongoose.model('Article');
    let total;

    // 获取记录总数
    await Article.count(
        {},
        (err, res) => {
            if (err) {
                throw new Error(err);
            }
            total = res;
        }
    );

    // 查询数据, https://www.jianshu.com/p/554a5bf67b31
    await Article.find(
        // 筛选条件
        {},

        // 过滤字段, 0为屏蔽, 1为不屏蔽
        {
            'title': 1,
            'guide_image_url': 1,
            'content': 1,
            'publish_date': 1,
            'author': 1
        },

        {
            // 限制返回记录条数
            limit: amount,

            // 排序
            sort: {
                'public_date': 1
            },

            // 略过前几条数据
            skip: (page - 1) * amount
        },

        // 结束回调
        (err, res) => {
            if (err) {
                throw new Error(err);
            }
            ctx.body = {
                'result': 1,
                'data': {
                    'articles': res,
                    'total_page': total
                }
            };
        }
    );
}

module.exports = function (version, api) {
    api.post(`/${version}/article/search_article`, async (ctx, next) => {
        const { response, request: { body } } = ctx;
        ctx.set(respHeader); // 设置响应头
        getMongoData(body, ctx);
    });
};
