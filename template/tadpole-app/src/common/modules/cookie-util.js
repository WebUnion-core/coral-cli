/* eslint-disable */
const cookieUtil = {
    // 设置
    set: function (key, val, day, domain, path) {
        var exp = new Date();
        exp.setDate(exp.getDate() + day);

        document.cookie = encodeURI(key) + '=' + encodeURI(val)
                          + ';expires=' + exp.toGMTString()
                          + ';domain=' + (domain ? domain : location.hostname)
                          + ';path=' + (path ? domain : location.pathname);
    },

    // 获取
    get: function(key) {
        var name = encodeURI(key) + '=',
            start = document.cookie.indexOf(name);

        if (start > -1) {
            var end = document.cookie.indexOf(';', start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return decodeURI(
                document.cookie.substring(start + name.length, end)
            );
        } else {
            return null;
        }
    },

    // 删除
    unset: function(key, domain, path) {
        this.set(key, '', -1, domain, path);
    },

    // 清除
    clear: function(domain, path) {
        const arr = document.cookie.match(/;{0,1}\w+\=/g);//获取所有键名(带等于号)
        for(let i = 0; i < arr.length; i++) {
            this.unset(
                decodeURI(arr[i].slice(0, arr[i].length - 1)),
                (domain ? domain : location.hostname),
                (path ? domain : location.pathname)
            );
        }
    }
}

export default cookieUtil;
