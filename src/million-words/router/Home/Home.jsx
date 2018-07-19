import './style/index.scss';

import React from 'react';

import Nav from './components/Nav.jsx';
import List from './components/List.jsx';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-container">
                <Nav />
                <List />
            </div>
        )
    }
}
