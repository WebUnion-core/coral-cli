// 入口文件(index.js)不会被babel编译，其中require的文件才会被编译
require('babel-polyfill');

const config = require('./config/config.json').dataServer;
let app;

if (process.env.NODE_ENV === 'development') {
    require('babel-register');
    app = require('./controllers/app.js').default;
} else {
    app = require('./build/app.js').default;
}

app.listen(config.port, config.host, function(err) {
    if (err) {
        throw new Error(err);
    } else {
        console.log('The server is listening in => http://' + config.host + ':' + config.port);
    }
});
