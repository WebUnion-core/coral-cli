// 入口文件(index.js)不会被babel编译，其中require的文件才会被编译
require('babel-polyfill');

const config = require('./config/data.json');
let root;

if (process.env.NODE_ENV === 'development') {
    require('babel-register');
    root = './interface/app.js';
} else {
    root = './build/app.js';
}

const app = require(root).default;

app.listen(config.port, config.host, function(err) {
    if (err)
        throw new Error(err);
    else
        console.log('The server is listening in => http://' + config.host + ':' + config.port);
});
