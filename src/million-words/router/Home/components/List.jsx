import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { list } = this.props.store;

        return (
            <ul className="article-list-container">
            {
                list.map((item, index) => {
                    return (
                        <Link key={ index } to={ item.link }>
                            <li className="article-list-item">{ item.text }</li>
                        </Link>
                    )
                })
            }
            </ul>
        )
    }
}
