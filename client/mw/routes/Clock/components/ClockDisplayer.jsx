import React from 'react';
import { Link } from 'react-router-dom';

export default class ClockDisplayer extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }

    componentDidMount() {
        const { secondEl, minuteEl, hourEl } = this.refs;

        this.timer = setInterval(() => {
            const dateTime = new Date();
            const second = dateTime.getSeconds();
            const minute = dateTime.getMinutes();
            const oriHour = dateTime.getHours();
            const hour = oriHour > 12 ? (oriHour - 12) : oriHour;

            const secondDeg = 90 + second * 6;
            const minuteDeg = 90 + minute * 6;
            const hourDeg = 90 + hour * 30;

            if (secondEl && minuteEl && hourEl) {
                // 秒针转动
                Object.assign(secondEl.style, {
                    'transform': `rotate(${secondDeg}deg)`,
                    '-ms-transform': `rotate(${secondDeg}deg)`,
                    '-moz-transform': `rotate(${secondDeg}deg)`,
                    '-webkit-transform': `rotate(${secondDeg}deg)`,
                    '-o-transform': `rotate(${secondDeg}deg)`
                });

                // 分针转动
                Object.assign(minuteEl.style, {
                    'transform': `rotate(${minuteDeg}deg)`,
                    '-ms-transform': `rotate(${minuteDeg}deg)`,
                    '-moz-transform': `rotate(${minuteDeg}deg)`,
                    '-webkit-transform': `rotate(${minuteDeg}deg)`,
                    '-o-transform': `rotate(${minuteDeg}deg)`
                });

                // 时针转动
                Object.assign(hourEl.style, {
                    'transform': `rotate(${hourDeg}deg)`,
                    '-ms-transform': `rotate(${hourDeg}deg)`,
                    '-moz-transform': `rotate(${hourDeg}deg)`,
                    '-webkit-transform': `rotate(${hourDeg}deg)`,
                    '-o-transform': `rotate(${hourDeg}deg)`
                });
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    render() {
        return (
            <section className="clock-displayer-container">
                <figure className="clock-bg">
                    <div ref="hourEl" className="abs hour">
                        <hr className="color-line" />
                    </div>
                    <div ref="minuteEl" className="abs minute">
                        <hr className="color-line" />
                    </div>
                    <div ref="secondEl" className="abs second">
                        <hr className="color-line" />
                    </div>
                </figure>
                <div className="btn-container left">
                    <span className="text">添加</span>
                    <i className="icon icon-151-add" />
                </div>
                <div className="btn-container right">
                    <span className="text">设置</span>
                    <i className="icon icon-151-setting" />
                </div>
            </section>
        )
    }
}
