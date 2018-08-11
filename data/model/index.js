const mongoose = require('mongoose');
const config = require('./../../config/config.json');

module.exports = function() {
    require('./user.js');

    if (config.dbPath) {
        mongoose.set('debug', true);

        mongoose.connect(config.dbPath, { useNewUrlParser: true });

        mongoose.connection.on('disconnected', () => {
            mongoose.connect(config.dbPath);
        });

        mongoose.connection.on('error', err => {
            console.error(err);
        });

        mongoose.connection.on('open', async () => {
            console.log('Connected to MongoDB => ', config.dbPath);
        });
    }
}
