import React from 'react';
import { Link } from 'react-router-dom';

export default class SelectList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="select-list-container">
                <ul className="select-list">

                    <li className="select-item">
                        <div className="time">08:00</div>
                        <p className="info">睡觉<br/>周一 周二 周三 周四 周五</p>
                        <div className="button-container">
                            <input id="checked-box1"
                                type="checkbox"
                                className="switch" />
                            <label htmlFor="checked-box1" />
                        </div>
                    </li>

                    <li className="select-item">
                        <div className="time">08:00</div>
                        <p className="info">睡觉<br/>周一 周二 周三 周四 周五</p>
                        <div className="button-container">
                            <input id="checked-box2"
                                type="checkbox"
                                className="switch" />
                            <label htmlFor="checked-box2" />
                        </div>
                    </li>

                    <li className="select-item">
                        <div className="time">08:00</div>
                        <p className="info">睡觉<br/>周一 周二 周三 周四 周五</p>
                        <div className="button-container">
                            <input id="checked-box3"
                                type="checkbox"
                                className="switch" />
                            <label htmlFor="checked-box3" />
                        </div>
                    </li>
                </ul>
            </section>
        )
    }
}
