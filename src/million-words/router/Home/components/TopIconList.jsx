import React from 'react';
import { Link } from 'react-router-dom';

export default class TopIconList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { topIconList } = this.props.store;

        return topIconList
            ? (
                <div className="top-icon-list-container">
                    <ul className="top-icon-list">
                        {
                            topIconList.map((item, index) => {
                                return (
                                    <Link key={ index } to={ item.link }>
                                        <li className="top-icon-item">
                                            <p><i className={ `icon ${ item.icon }` }></i></p>
                                            <p><span className="text">{ item.text }</span></p>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            )
            : ''
    }
}
