import React from 'react';
import Swiper from 'swiper';
import { Link } from 'react-router-dom';

export default class ScrollList extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { scrollList } = this.props.store;

        return scrollList
                ? (
                    <div className="scroll-list-container">
                        <ul className="swiper-wrapper scroll-list">
                        {
                            scrollList.map((item, index) => {
                                return (
                                    <li className="swiper-slide" key={ index }>
                                        <Link to={ item.link }>
                                            <div className="scroll-item">
                                                <figure className="img"></figure>
                                                <p className="text">{ item.text }</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                )
                : ''
    }
}
