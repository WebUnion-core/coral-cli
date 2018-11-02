const HOST = require('./getHost.js')();
const config = require('./../config/config.json');
const mode = ['development', 'debug'];
let server;

if (JSON.stringify(mode).indexOf(process.env.NODE_ENV) > 0) {
    server = config.devServer;
} else {
    server = config.prodServer;
}

server.host = HOST;

module.exports = {
    server
};
