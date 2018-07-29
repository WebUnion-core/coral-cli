import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Setting from './Setting';
import Clock from './Clock';

// 入口前缀
const prefix = 'App';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/million-words/' component={ Home } exact />
                        <Route path='/million-words/setting' component={ Setting } exact />
                        <Route path='/million-words/clock' component={ Clock } exact />
                    </Switch>
                </div>
            </Router>
        )
    }
}
