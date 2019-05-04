const fs = require('fs');
const path = require('path');

// 递归传输文件
function recurCreateAll(srcPath, tgtPath) {
    const tgtInner = fs.readdirSync(srcPath);

    tgtInner.forEach(function(item) {
        const itemPath = path.resolve(srcPath, './' + item);
        const toPath = path.resolve(tgtPath, './' + item);
        const isFile = fs.statSync(itemPath).isFile();

        if (isFile) {
            const cont = fs.readFileSync(itemPath, 'utf-8');
            fs.writeFileSync(toPath, cont, 'utf-8');
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
