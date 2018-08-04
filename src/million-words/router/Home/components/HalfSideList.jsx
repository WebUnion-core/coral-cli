import React from 'react';
import { Link } from 'react-router-dom';

export default class HalfSideList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { halfSideList } = this.props.store;

        return halfSideList
                ? (
                    <div className="half-side-list-container">
                        <ul className="half-side-list">
                        {
                            halfSideList[0].map((item, index) => {
                                return (
                                    <Link key={ index } to={ item.link }>
                                        <div className="half-side-item">{ item.text }</div>
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
