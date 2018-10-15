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

export const removeScroller = (name) => {
    const appNode = document.getElementById('app');
    appNode.removeEventListener('scroll', window[name]);
}
