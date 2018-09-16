const baseConfig = require('./config/base.config.js');
const setDevMode = require('./config/development.config.js');
const setProdMode = require('./config/production.config.js');
const setDebugMode = require('./config/debug.config.js');
const setOther = require('./config/other.config.js');

const MODE = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'none';
const webpackConfig = baseConfig;

switch (MODE) {
    case 'development':
        setDevMode(webpackConfig);
        break;
    case 'production':
        setProdMode(webpackConfig);
        break;
    case 'debug':
        setDebugMode(webpackConfig);
        break;
    default:
        setOther(webpackConfig);
}

module.exports = webpackConfig;
