import 'common/style/reset.scss';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from 'configureStore';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'actions';

const store = configureStore();
const config = require('./config.json');
const menuModules = [];

// 将state对应值绑定到props上
const mapStateToProps = (prefix) => (state) => {
    return {
        [prefix]: state[prefix],
    };
};

// 将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
config.routes.forEach((item) => {
    menuModules.push(connect(
        mapStateToProps(item.name),
        mapDispatchToProps
    )(require('./routes' + item.src).default));
});

/*
 * router说明:
 * 1. 使用HashRouter: import { HashRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/' component={ Home } />
 * 2. 使用BrowserRouter: import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/mw' component={ Home } exact />
 */
class App extends React.Component {
    render () {
        return (
            <Router>
                <Switch>
                {
                    config.routes.map((item, index) =>
                        <Route
                            key={index}
                            path={item.path}
                            component={menuModules[index]}
                            exact
                        />
                    )
                }
                </Switch>
            </Router>
        );
    }
}

render(
    <AppContainer>
        <Provider store={ store }>
            <App />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

// 热更新通知
if (module.hot){
    module.hot.accept();
}
