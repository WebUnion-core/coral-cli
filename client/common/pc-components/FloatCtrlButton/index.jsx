import './style.scss';
import React from 'react';

export default class FloatCtrlButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ifShowDialog: true,
            ifShowCtrlItems: false
        }
    }

    // 隐藏整个按钮
    clickHideBtn = () => {
        this.setState({
            ifShowDialog: false
        });
    }

    // 切换显示功能列表
    clickToggleCtrlHideItem = () => {
        this.setState({
            ifShowCtrlItems: !this.state.ifShowCtrlItems
        });
    }

    // 退出登录
    clickLogoutItem = () => {
        window.sessionStorage.clear();
        window.location.href = '/mpa/login';
    }

    render () {
        const { ifShowDialog, ifShowCtrlItems } = this.state;
        return (
            <figure className={ifShowDialog ? 'ctrl-btn' : 'hide'}
                onClick={this.clickToggleCtrlHideItem}>
                <i className="icon icon-21-menu" />
                <ul className={ifShowCtrlItems ? 'ctrl-menu-list' : 'hide'}>
                    <li className="ctrl-menu-item"
                        onClick={this.clickHideBtn}>暂时<br/>隐藏</li>
                    <li className="ctrl-menu-item"
                        onClick={this.clickLogoutItem}>退出<br/>登录</li>
                </ul>
            </figure>
        )
    }
}
