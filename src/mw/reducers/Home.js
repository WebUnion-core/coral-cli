// reducer其实也是个方法而已，参数是state和action，返回值是新的state，注意一定要返回一个state值
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_HOME_DATA':
            __DEV__ && console.log(
                'SET_HOME_DATA',
                JSON.stringify(action.homeData)
            );
            state = {
                homeData: { ...action.homeData }
            };
            return state;
        default:
            state = {
                homeData: {}
            };
            return state;
    }
}
