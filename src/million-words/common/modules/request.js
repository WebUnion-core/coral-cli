const request = require("superagent");

/**
 * 封装请求参数说明:
 * method: String，请求方式
 * url: String，请求url
 * data: Object，发送数据
 * success: Function，请求成功调用函数
 * fail: Function，请求失败调用函数
 */
export default function(config) {
    if (typeof config.method !== 'string') {
        throw new Error('method参数错误');
    }

    if (config.method.toUpperCase() === 'GET') {
        // 使用GET
        request
            .get(config.url)
            .end((err, res) => {
                if (err) {
                    config.fail && config.fail(err);
                } else {
                    config.success && config.success(JSON.parse(res.text));
                }
            });
    } else {
        // 默认使用POST
        request
            .post(config.url)
            .send({
                ...config.data
            })
            .type('application/x-www-form-urlencoded')
            .end((err, res) => {
                if (err) {
                    config.fail && config.fail(err);
                } else {
                    config.success && config.success(JSON.parse(res.text));
                }
            });
    }
}
