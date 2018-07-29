import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TabsFooter from './../common/components/tabs-footer';

import Home from './Home';
import Setting from './Setting';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = [
            { name: 'INDEX', link: '/million-words/', icon: 'icon-home' },
            { name: 'SETTING', link: '/million-words/setting', icon: 'icon-setting' }
        ];
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/million-words/' component={ Home } exact />
                        <Route path='/million-words/setting' component={ Setting } exact />
                    </Switch>

                    <TabsFooter list={ this.tabs } clickHandle={ () => { console.log('click') } } />
                </div>
            </Router>
        )
    }
}
