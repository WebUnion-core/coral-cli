import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="article-list-container">
                <Link to="/million-words/article">
                    <li className="article-list-item">ITEM_NAME</li>
                </Link>
            </ul>
        )
    }
}
