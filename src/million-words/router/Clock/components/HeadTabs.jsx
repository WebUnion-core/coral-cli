import React from 'react';
import { Link } from 'react-router-dom';

export default class HeadTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="head-tabs-container">
                <ul className="head-tabs-list">
                    <li className="flex-center head-tabs-item active">时间</li>
                    <li className="flex-center head-tabs-item">闹钟</li>
                    <li className="flex-center head-tabs-item">倒计时</li>
                </ul>
            </header>
        )
    }
}
