import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Setting from './Setting';
import Clock from './Clock';

// 入口前缀
const prefix = 'App';

/*
 * router说明:
 * 1. 使用HashRouter: import { HashRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/' component={ Home } />
 * 2. 使用BrowserRouter: import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/million-words' component={ Home } exact />
 */
export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/" component={ Home } exact />
                        <Route path="/setting/" component={ Setting } exact />
                        <Route path="/clock/" component={ Clock } exact />
                    </Switch>
                </div>
            </Router>
        )
    }
}
