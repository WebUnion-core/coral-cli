// reducer其实也是个方法而已，参数是state和action，返回值是新的state，注意一定要返回一个state值
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_HOME_DATA':
            return state = {
                homeData: { ...action.homeData }
            };
        default:
            return state = {
                homeData: {
                    title: 'USER_NAME',
                    scrollList: [
                        { link: '/', text: 'ITEM_NAME' },
                        { link: '/', text: 'ITEM_NAME' },
                        { link: '/', text: 'ITEM_NAME' },
                        { link: '/', text: 'ITEM_NAME' },
                    ],
                    halfSideList: [
                        [
                            { link: '/', text: 'ITEM_NAME' },
                            { link: '/', text: 'ITEM_NAME' },
                        ],
                        [
                            { link: '/', text: 'ITEM_NAME' },
                            { link: '/', text: 'ITEM_NAME' },
                        ]
                    ],
                    fullRowList: [
                        { link: '/', text: 'ITEM_NAME' },
                        { link: '/', text: 'ITEM_NAME' },
                        { link: '/', text: 'ITEM_NAME' },
                    ],
                    topIconList: [
                        { icon: 'icon-clock', text: 'CLOCK', link: '/clock' },
                        { icon: 'icon-head-phone', text: 'MUSIC', link: '/' },
                        { icon: 'icon-key-board', text: 'KEY_BOARD', link: '/' },
                    ],
                    settingLink: '/setting'
                }
            };
    }
}
