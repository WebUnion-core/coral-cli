import './style/index.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';

export default class ArticleCont extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {}

    render() {
        return (
            <section className="article-content-container" >
                <h1 className="head-bar">
                    <Link to="/million-words/"><i className="icon-arrow-left back-icon"></i></Link>
                    <span>BAR_TITLE</span>
                </h1>
            </section>
        )
    }
}
