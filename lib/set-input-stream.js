const chalk = require('chalk');

let counter = 0;
const dataContainer = {};

module.exports = function (inputContainer, callback) {
    console.log(chalk.blue(inputContainer[counter].text));
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', function (data) {
        let chunk = process.stdin.read();

        if (chunk) {
            const field = inputContainer[counter];
            chunk = chunk.slice(0, -2);

            if (field) {
                dataContainer[field.key] = chunk;
                if (counter === inputContainer.length - 1) {
                    callback(dataContainer);
                }
            }

            counter++;
            console.log(chalk.blue(inputContainer[counter].text));
        }
    });
}
