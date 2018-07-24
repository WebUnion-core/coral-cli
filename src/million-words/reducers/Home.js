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
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        },
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        },
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        },
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        },
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        }
                    ],
                    halfSideList: [
                        [
                            {
                                link: '/million-words/',
                                text: 'ITEM_NAME'
                            },
                            {
                                link: '/million-words/',
                                text: 'ITEM_NAME'
                            }
                        ],
                        [
                            {
                                link: '/million-words/',
                                text: 'ITEM_NAME'
                            },
                            {
                                link: '/million-words/',
                                text: 'ITEM_NAME'
                            }
                        ]
                    ],
                    fullRowList: [
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        },
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        },
                        {
                            link: '/million-words/',
                            text: 'ITEM_NAME'
                        }
                    ],
                    settingLink: '/million-words/setting'
                }
            };
    }
}