const requestLogin = require('./login.js');
const requestRegister = require('./register.js');
const requestCheckToken = require('./check-token.js');

module.exports = [
    requestLogin,
    requestRegister,
    requestCheckToken
];
