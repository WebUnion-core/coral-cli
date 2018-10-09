export const bindScroll = (callback) => {
    const appNode = document.getElementById('app');
    appNode.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, offsetHeight } = appNode;
        if ((scrollTop >= scrollHeight - offsetHeight) && callback) {
            callback();
        }
    });
}
