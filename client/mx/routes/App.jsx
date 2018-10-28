import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'style/reset.scss';
import './reset.scss';

const config = require('./../data.json');

// 整合菜单
const menuModules = [];
config.menus.forEach((item) => {
    menuModules.push(require('./' + item.name + '/index.jsx').default);
});

/*
 * router说明:
 * 1. 使用HashRouter: import { HashRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/' component={ Home } />
 * 2. 使用BrowserRouter: import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/mw' component={ Home } exact />
 */
export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Router>
                <section className="main">
                    <Switch>
                        {
                            config.menus.map((item, index) =>
                                <Route key={ index }
                                    path={ item.route }
                                    component={ menuModules[index] }
                                    exact />
                            )
                        }
                    </Switch>
                </section>
            </Router>
        );
    }
}
