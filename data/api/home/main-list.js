/**
 * api: /home/main_list
 * 功能: 获取首页菜单列表
 *
 * 响应参数:
 * 1. result -> 状态值 -> 1:成功, 0:失败
 * 2. msg -> 返回信息，result为0时必定返回
 * 3. data -> 列表数据
 */

const resHeader = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=UTF-8'
};

module.exports = function(version, api) {
    api.get(`/${version}/home/main_list`, (ctx) => {
        const homeList = require('./../../static/home_list.json');
        ctx.set(resHeader); // 设置响应头
        ctx.body = {
            'result': 1,
            'data': homeList
        };
    });
};
