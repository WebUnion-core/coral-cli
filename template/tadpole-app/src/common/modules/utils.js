// 注册滚动监听
export const bindScroller = (name, callback) => {
    const appNode = document.getElementById('app');
    window[name] = () => {
        const { scrollTop, scrollHeight, offsetHeight } = appNode;
        if ((scrollTop >= scrollHeight - offsetHeight) && callback) {
            callback();
        }
    };
    appNode.addEventListener('scroll', window[name]);
}

// 注销滚动监听
export const removeScroller = (name) => {
    const appNode = document.getElementById('app');
    appNode.removeEventListener('scroll', window[name]);
}
