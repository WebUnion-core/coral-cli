import React from 'react';
import Swiper from 'swiper';
import { Link } from 'react-router-dom';

export default class ScrollList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Swiper('.swiper-container', {
            slidesPerView: 2.5,
            spaceBetween: 20
        });
    }

    render() {
        const { scrollList } = this.props.store;

        return (
            <div className="swiper-container scroll-list-container">
                <ul className="swiper-wrapper scroll-list">
                {
                    scrollList.map((item, index) => {
                        return (
                            <li className="swiper-slide" key={ index }>
                                <Link to={ item.link }>
                                    <div className="scroll-item">{ item.text }</div>
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}
