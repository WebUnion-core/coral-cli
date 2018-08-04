import React from 'react';
import { Link } from 'react-router-dom';

export default class FullRowList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { fullRowList } = this.props.store;

        return fullRowList
                ? (
                    <div className="full-row-list-container">
                        <ul className="full-row-list">
                        {
                            fullRowList.map((item, index) => {
                                return (
                                    <Link key={ index } to={ item.link }>
                                        <li className="full-row-item">
                                            <figure className="figure flex-center">IMG</figure>
                                            <span className="text">{ item.text }</span>
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
