import './style.scss';
import React from 'react';

/*
 * props选项
 * 1. title => 标题文本
 */
export default class HeadBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title } = this.props;

        return (
            <h1 className="head-bar">
                <i onClick={ () => window.history.back() } className="icon icon-back"></i>
                <span>{ title || 'BAR_TITLE' }</span>
            </h1>
        )
    }
}
