export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOGIN_DATA':
            __DEV__ && console.log('SET_LOGIN_DATA', action.loginData);
            state = {
                loginData: { ...action.loginData }
            };
            return state;
        default:
            state = {
                loginData: {}
            };
            return state;
    }
}
