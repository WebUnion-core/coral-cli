import './style.scss';
import React from 'react';

/**
 * 说明: 顶部标题栏
 * props选项:
 * 1. title -> 标题文本
 */
export default class HeadBar extends React.Component {
    constructor(props) {
        super(props);
    }

    // 点击返回
    clickGoBack = () => {
        window.history.back();
    }

    render() {
        const { title } = this.props;

        return (
            <header className="head-bar-container">
                <div className="head-bar">
                    <i onClick={ this.clickGoBack }
                        className="icon icon-151-back" />
                    <span>{ title || '' }</span>
                </div>
            </header>
        )
    }
}
