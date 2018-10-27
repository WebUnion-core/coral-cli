import request from './../common/modules/request.js';
import cookieUtil from './../common/modules/cookie-util.js';

const result = {};

// 检查token
function requestCheckToken (resolve, reject) {
    const { site, version, userAgent } = window.Waydua;
    request({
        method: 'POST',
        url: `http://${site}/mw/${version}/user/check_token`,
        data: {
            'user_agent': userAgent,
            'login_token': cookieUtil.get('login_token')
        },
        success: (data) => {
            resolve(data);
        },
        fail: (err) => {
            console.error(err);
        }
    });
}

// 请求首页数据
function requestMainList (resolve, reject) {
    const { site, version, userAgent } = window.Waydua;
    request({
        method: 'GET',
        url: `http://${site}/mw/${version}/home/main_list`,
        success: (data) => {
            resolve(data);
        },
        fail: (err) => {
            console.error(err);
        }
    });
}

// 请求登录
function requestLogin (resolve, reject) {
    const { site, version, userAgent } = window.Waydua;
    request({
        method: 'POST',
        url: `http://${site}/mw/${version}/user/login`,
        data: {
            'login_token': cookieUtil.get('login_token'),
            'user_agent': userAgent
        },
        success: (data) => {
            resolve(data);
        },
        fail: (err) => {
            console.error(err);
        }
    });
}

export default (callback = () => {}) => {
    new Promise(requestCheckToken)
        .then((data) => {
            Object.assign(result, data);
            return new Promise(requestMainList);
        })
        .then((data) => {
            Object.assign(result, data);
            return new Promise(requestLogin);
        })
        .then((data) => {
            Object.assign(result, data);
            callback(result);
        });
}
