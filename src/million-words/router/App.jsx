import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home/Home.jsx';
import ArticleCont from './ArticleCont/ArticleCont.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(__DEV__);
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/million-words/' component={ Home } exact />
                        <Route path='/million-words/article' component={ ArticleCont } exact />
                    </Switch>

                    <footer className="footer">FOOTER</footer>
                </div>
            </Router>
        )
    }
}
