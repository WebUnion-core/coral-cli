import React from 'react';

export default class HeadTabs extends React.Component {
    render() {
        return (
            <header className="head-tabs-container">
                <i className="icon icon-151-back"
                    onClick={ () => window.history.back() }></i>
                <ul className="head-tabs-list">
                    <li className="head-tabs-item active">闹钟</li>
                    <li className="head-tabs-item">倒计时</li>
                </ul>
            </header>
        )
    }
}
