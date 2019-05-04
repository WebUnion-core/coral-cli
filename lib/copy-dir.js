const fs = require('fs');
const path = require('path');

// 递归传输文件
function recurCreateAll(srcPath, tgtPath) {
    const tgtInner = fs.readdirSync(srcPath);

    tgtInner.forEach(function(item) {
        const itemPath = path.resolve(srcPath, './' + item);
        const toPath = path.resolve(tgtPath, './' + item);
        const isFile = fs.statSync(itemPath).isFile();
        const fileType = (/.\.[png|jpg]/g).test(item) ? 'base64' : 'utf-8';

        if (isFile) {
            const cont = fs.readFileSync(itemPath, fileType);
            fs.writeFileSync(toPath, cont, fileType);
        } else {
            fs.mkdirSync(toPath);
            recurCreateAll(itemPath, toPath);
        }
    });
}

/*
 * srcPath: 源路径
 * tgtPath: 目标路径
 */
module.exports = function(srcPath, tgtPath) {
    try {
        fs.mkdirSync(tgtPath);
        recurCreateAll(srcPath, tgtPath);
    } catch(e) {
        if (e.code === 'EEXIST') {
            const newTgtPath = tgtPath + '-' + (new Date()).valueOf();
            fs.mkdirSync(newTgtPath);
            recurCreateAll(srcPath, newTgtPath);
        }
    }
}
