let config;
const app = require('./data/app.js');

if (process.env.NODE_ENV === 'development') {
    config = require('./config/config.json').dataServer;
} else {
    config = require('./config/config.json').prodServer;
}

app.listen(config.port, config.host, function(err) {
    if (err) {
        throw new Error(err);
    } else {
        console.log('The server is listening in => http://' + config.host + ':' + config.port);
    }
});
