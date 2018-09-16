let server;
const mode = ['development', 'debug'];

if (JSON.stringify(mode).indexOf(process.env.NODE_ENV) > 0) {
    server = require('./../../config/config.json').dataServer;
} else {
    server = require('./../../config/config.json').prodServer;
}

module.exports = {
    server
};
