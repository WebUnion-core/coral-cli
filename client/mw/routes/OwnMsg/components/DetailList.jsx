import React from 'react';

// 公共模块
import cookieUtil from './../../../common/modules/cookie-util.js';

export default class DetailList extends React.Component {
    constructor (props) {
        super(props);
    }

    // 点击注销
    clickLogout () {
        cookieUtil.unset('login_token');
        window.location.href = '/mw';
    }

    render () {
        return (
            <ul className="detail-list">
                <li className="detail-item">
                    <span className="text">清除缓存</span>
                    <i className="icon icon-11-black-arrow" />
                </li>
                <li className="detail-item">
                    <span className="text">用户反馈</span>
                    <i className="icon icon-11-black-arrow" />
                </li>
                <li className="detail-item">
                    <span className="text">基本设置</span>
                    <i className="icon icon-11-black-arrow" />
                </li>
                <li className="detail-item">
                    <span className="text">关于我们</span>
                    <i className="icon icon-11-black-arrow" />
                </li>
                <li className="detail-item">
                    <span className="text">开源许可</span>
                    <i className="icon icon-11-black-arrow" />
                </li>
                <li className="detail-item sigin-out-btn"
                    onClick={ () => this.clickLogout() }>退出登录</li>
            </ul>
        )
    }
}
