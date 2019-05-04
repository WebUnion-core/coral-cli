import { combineReducers } from 'redux';

const Home = (state = {}, action) => {
    switch (action.type) {
        case 'SET_THEME':
            __DEV__ && console.log(action);
            return Object.assign(state, {
                theme: action.theme,
            });
        default:
            return {
                theme: 'Day',
            };
    }
}

const reducer = {
    Home,
};

// 使用redux的combineReducers方法将所有reducer打包起来
export default combineReducers(reducer);
