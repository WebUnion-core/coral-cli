export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_HOME_DATA':
            __DEV__ && console.log('SET_HOME_DATA', action.homeData);
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
