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
            <header className="head-bar-container">
                <div className="head-bar">
                    <i onClick={ () => window.history.back() }
                        className="icon icon-151-back" />
                    <span>{ title || 'BAR_TITLE' }</span>
                </div>
            </header>
        )
    }
}
