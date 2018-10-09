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
 */

 const resHeader = {
     'Access-Control-Allow-Methods': 'POST',
     'Access-Control-Allow-Origin': '*',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json;charset=UTF-8'
 };

 module.exports = function (version, api) {
     api.post(`/${version}/home/home_article_list`, async (ctx, next) => {
         const { response, request: { body } } = ctx;
         const Article = mongoose.model('Article');

         ctx.set(resHeader); // 设置响应头
     });
 };
