export default {
    set: function(key, val, day, domain, path) {
        var exp = new Date();
        exp.setDate(exp.getDate() + day);
        document.cookie = encodeURI(key) + "=" + encodeURI(val)
            + ";expires=" + exp.toGMTString()
            + ";domain=" + (domain ? domain : location.hostname)
            + ";path=" + (path ? domain : location.pathname);
    },
    get: function(key) {
        var name = encodeURI(key) + "=",
            start = document.cookie.indexOf(name);
        if (start > -1) {
            var end = document.cookie.indexOf(";", start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(start + name.length, end));
        } else {
            return null;
        }
    },
    unset: function(key, domain, path) {
        this.set(key, "", -1, domain, path);
    },
    clear: function(domain, path) {
        var pattern = /;{0,1}\w+\=/g;
        var arr = document.cookie.match(pattern);//获取所有键名(带等于号)
        for(var i = 0; i < arr.length; i++) {
            this.unset(decodeURI(arr[i].slice(0, arr[i].length - 1)), (domain ? domain : location.hostname), (path ? domain : location.pathname));
        }
    }
}
