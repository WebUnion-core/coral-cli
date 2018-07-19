export default function () {
    var str = location.search.slice(1),
        arr = str.split("&"),
        obj = {};

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i].split("="),
            key = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);//一般参数字符串都经过编码，使用decodeURIComponent()方法将键和值转为原始值
        obj[key] = value;
    }

    return obj;
}
