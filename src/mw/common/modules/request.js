const request = require('superagent');

// 处理接收到的数据
function handleData ({ fail, success }, err, res) {
    if (err) {
        fail(err);
    } else {
        const json = JSON.parse(res.text);
        if (json.result === '0') {
            fail(json.msg);
        } else {
            success(json.data);
        }
    }
    document.getElementById('loading-container').style.display = 'none';
}

/**
 * 封装请求
 * @param  {[String]}   method        请求方式，默认POST
 * @param  { String }   url           请求url
 * @param  {[Object]}   data          发送数据
 * @param  {[Function]} success       请求成功调用函数
 * @param  {[Function]} fail          请求失败调用函数
 * @param  {[String]}   type          请求数据的content-type，默认application/x-www-form-urlencoded
 * @param  {[Boolean]}  ifShowLoading 是否展示loading，默认true
 */
export default ({
    method = 'POST',
    url,
    data,
    success = () => {},
    fail = () => {},
    type,
    ifShowLoading = true
}) => {
    if (typeof method !== 'string') {
        throw new Error('method参数错误');
    }

    document.getElementById('loading-container').style.display = 'block';
    if (method.toUpperCase() === 'GET') {
        // 使用GET
        request
            .get(url)
            .end((err, res) => handleData({ fail, success }, err, res));
    } else {
        // 默认使用POST
        switch (type) {
            case 'multipart/form-data':
                request
                    .post(url)
                    .send(data)
                    .end((err, res) => handleData({ fail, success }, err, res));
                break;
            default:
                request
                    .post(url)
                    .send({ ...data })
                    .type('application/x-www-form-urlencoded')
                    .end((err, res) => handleData({ fail, success }, err, res));
        }
    }
}
