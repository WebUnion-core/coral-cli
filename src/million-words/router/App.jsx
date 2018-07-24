import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Setting from './Setting';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/million-words/' component={ Home } exact />
                        <Route path='/million-words/setting' component={ Setting } exact />
                    </Switch>

                    <footer className="footer">FOOTER</footer>
                </div>
            </Router>
        )
    }
}
