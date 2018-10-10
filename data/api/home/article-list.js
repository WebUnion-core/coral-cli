/**
 * api: /home/home_article_list
 * 功能: 首页文章列表
 *
 * 请求参数:
 * 1. page -> 分页计数，由1计起
 * 2. amount -> 一页返回记录数
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. data
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

 module.exports = function (version, api) {
     api.post(`/${version}/home/home_article_list`, async (ctx, next) => {
         const { response, request: { body } } = ctx;
         const Article = mongoose.model('Article');
         const page = parseInt(body['page'], 10);
         const amount = parseInt(body['amount'], 10);
         let total;

         // await Article.create({
         //     "title": "ARTICLE_TITLE",
         //     "guide_image_url": "https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png",
         //     "content": "Article contentttttttttt...........................",
         //     "publish_date": Date.now(),
         //     "author": "WJT20"
         // });
         //
         // const data = [];
         // for (let i = 0; i < amount; i++) {
         //     data.push({
         //         "title": "ARTICLE_TITLE",
         //         "guide_image_url": "https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png",
         //         "content": "Article contentttttttttt...........................",
         //         "publish_date": Date.now(),
         //         "author": "WJT20"
         //     });
         // }
         // await Article.insertMany(data);

         // 获取记录总数
         await Article.count({}, function (err, resData) {
             if (err) {
                 throw new Error(err);
             }
             total = resData;
         });

         // 查询数据
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
             function (err, resData) {
                 if (err) {
                     throw new Error(err);
                 }

                 ctx.set(respHeader); // 设置响应头

                 ctx.body = {
                     'result': 1,
                     'data': {
                         'articles': resData,
                         'total_page': total
                     }
                 };
             }
         );
     });
 };
