const request = require("superagent");

/**
 * 封装请求参数说明:
 * method: String，请求方式
 * test: Boolean，是否请求本地接口
 * url: String，请求url
 * data: Object，发送数据
 * success: Function，请求成功调用函数
 * fail: Function，请求失败调用函数
 */
export default function(config) {
    if (typeof config.method !== 'string') {
        throw new Error('method参数错误');
    }

    let origin = window.location.protocol + '//cf3329a7-2a1e-4aec-be9d-d88e14e0d074.coding.io';

    if (window.location.origin !== origin) {
        // 需要跨域(应使用JSONP，未实现，暂用简单的跨域手段)
        try {
            let script = document.createElement('script'),
                src = window.location.href.replace(/\/react-dev.+/, config.url);

            window.Waydua.jsonpCallback1 = (data) => {
                config.success && config.success(data);
            }

            if (config.method.toUpperCase() !== 'GET') {
                // 若为POST，则拼接参数
                src += '?if_cross_domain=1&callback=jsonpCallback1&data=' + encodeURI(JSON.stringify(config.data || {}));
            }
            script.setAttribute('src', src);
            document.body.appendChild(script);
        } catch (err) {
            config.fail && config.fail(err);
        }
    } else {
        if (config.method.toUpperCase() === 'GET') {
            // 使用GET
            request
                .get(origin + config.url + '?if_cross_domain=0')
                .end((err, res) => {
                    if (err) {
                        config.fail && config.fail(err);
                    } else {
                        config.success && config.success(res.text);
                    }
                });
        } else {
            // 默认使用POST
            request
                .post(origin + config.url)
                .send({
                    if_cross_domain: 0,
                    data: JSON.stringify(config.data)
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
}
