import React from 'react';

export default class FuncBlocks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="func-blocks-list">
                <li className="block-item">
                    <div className="middle-cont">
                        <i className="icon icon-18751-chatgroup" />
                        <small className="item-title">群组</small>
                    </div>
                </li>
                <li className="block-item">
                    <div className="middle-cont">
                        <i className="icon icon-18751-credit-cards" />
                        <small className="item-title">信用卡</small>
                    </div>
                </li>
                <li className="block-item">
                    <div className="middle-cont">
                        <i className="icon icon-18751-shopcar" />
                        <small className="item-title">购物车</small>
                    </div>
                </li>
            </ul>
        )
    }
}
