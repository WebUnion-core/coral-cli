import React from 'react';

export default class DetailList extends React.Component {
    constructor (props) {
        super(props);
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
                <li className="detail-item sigin-out-btn">退出登录</li>
            </ul>
        )
    }
}
