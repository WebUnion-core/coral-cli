const data = require('./../../static/home_list.json');

module.exports = function(version, api) {
    api.get(`/${version}/home_list`, (ctx, next) => {
        const { response, request } = ctx;

        /**
         * 响应头设置
         * 设置缓存 -> Cache-Control, https://blog.csdn.net/alan19931103/article/details/78319422
         * 设置MIME类型 -> Content-Type
         */
        ctx.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8'
        });

        ctx.body = JSON.stringify(data);
    });
};
