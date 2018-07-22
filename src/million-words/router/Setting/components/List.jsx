import React from 'react';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    // 点击清除缓存
    clickCleanCache() {
        const { setSettingData } = this.props;

        Object.keys(window.localStorage).forEach((item, index) => {
            delete window.localStorage[item];
        });

        setSettingData({
            toastCtrler: {
                ifShow: true,
                text: '成功清除缓存'
            }
        }, this.props.store);
    }

    render() {
        const { settingData } = this.props.store;

        return (
            <ul className="setting-list">
                <li className="setting-item">
                    <input className="input-text" type="text" placeholder="修改用户名" />
                    <input className="confirm-btn" type="button" value="保存" />
                </li>

                <li className="setting-item" onClick={ () => this.clickCleanCache() }>清除缓存</li>
            </ul>
        )
    }
}
