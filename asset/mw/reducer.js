// reducer其实也是个方法而已，参数是state和action，返回值是新的state，注意一定要返回一个state值
export default (state = {}, action) => {
    const key = '<MODULE_NAME_FIRST_LOWWER />Data';
    switch (action.type) {
        case 'SET_<MODULE_NAME />_DATA':
            state = {
                [key]: { ...action[key] }
            };
            return state;
        default:
            state = {
                [key]: {}
            };
            return state;
    }
}
