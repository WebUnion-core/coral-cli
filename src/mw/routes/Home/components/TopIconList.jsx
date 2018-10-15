import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ topIconList }) =>
    <ul className="top-icon-list">
        {
            topIconList.map((item, index) =>
                <Link key={ index } to={ item.link }>
                    <li className="top-icon-item">
                        <p><i className={ `icon ${item.icon}` } /></p>
                        <p><span className="text">{ item.text }</span></p>
                    </li>
                </Link>
            )
        }
    </ul>

export default class TopIconList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { topIconList } = window.Waydua.publicData;
        return topIconList
            ? (
                <div className="top-icon-list-container">
                    <List topIconList={ topIconList } />
                </div>
            )
            : ''
    }
}
