// reducer其实也是个方法而已，参数是state和action，返回值是新的state，注意一定要返回一个state值
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PUBLIC_DATA':
            return state = {
                publicData: { ...action.publicData }
            };
        default:
            return state = {
                publicData: {
                    footTabs: [
                        { name: 'INDEX', link: '/million-words/', icon: 'icon-11-home' },
                        { name: 'SETTING', link: '/million-words/setting', icon: 'icon-11-setting' }
                    ]
                }
            };
    }
}
