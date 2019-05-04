const os = require('os');

const baseConfig = require('./config/base.config.js');
const setProdMode = require('./config/prod.config.js');
const setDevMode = require('./config/dev.config.js');

const mode = process.env.ENV || 'NODE';
const webpackConfig = baseConfig;

process.env.HOST_NAME = (function () {
    const regExp = /"address":"[0-9]{0,3}(\.[0-9]{0,3}){3}"/g;
    const ipArr = JSON.stringify(os.networkInterfaces()).match(regExp);
    let hostName = '127.0.0.1';

    for (let i = 0; i < ipArr.length; i++) {
        const e = ipArr[i];
        const s = e.substr(11, e.length - 12);
        if (s !== '127.0.0.1') {
            hostName = s;
            break;
        }
    }

    return hostName;
})()

switch (mode) {
    case 'PROD':
        setProdMode(webpackConfig);
        break;
    case 'DEV':
        setDevMode(webpackConfig);
        break;
    default:
}

module.exports = webpackConfig;
