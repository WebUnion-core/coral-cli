const os = require('os');

/**
 * 获取本机IP地址
 * @return {[STRING]} IP地址
 */
module.exports = function () {
    const ipArr = JSON.stringify(os.networkInterfaces())
       .match(/"address":"[0-9]{0,3}(\.[0-9]{0,3}){3}"/g);
    let host;

    for (let i = 0; i < ipArr.length; i++) {
       const e = ipArr[i];
       const s = e.substr(11, e.length - 12);
       if (s !== '127.0.0.1') {
           host = s;
           break;
       }
    }

    return host;
}
