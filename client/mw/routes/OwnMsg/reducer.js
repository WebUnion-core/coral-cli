// reducer其实也是个方法而已，参数是state和action，返回值是新的state，注意一定要返回一个state值
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_OWNMSG_DATA':
            state = {
                ownMsgData: { ...action.ownMsgData }
            };
            return state;
        default:
            state = {
                ownMsgData: {}
            };
            return state;
    }
}
