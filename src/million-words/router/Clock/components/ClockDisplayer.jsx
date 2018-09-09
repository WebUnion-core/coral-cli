import React from 'react';
import { Link } from 'react-router-dom';

export default class ClockDisplayer extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const dateTime = new Date();
            const second = dateTime.getSeconds();
            const minute = dateTime.getMinutes();
            const hour = dateTime.getHours() > 12 ? (dateTime.getHours() - 12) : dateTime.getHours();
            const secondDeg = second * 6;
            const minuteDeg = minute * 6;
            const hourDeg = hour * 30;

            if (this.refs.second && this.refs.minute && this.refs.hour) {
                // 秒针转动
                Object.assign(this.refs.second.style, {
                    'transform': `rotate(${90 + secondDeg}deg)`,
                    '-ms-transform': `rotate(${90 + secondDeg}deg)`,
                    '-moz-transform': `rotate(${90 + secondDeg}deg)`,
                    '-webkit-transform': `rotate(${90 + secondDeg}deg)`,
                    '-o-transform': `rotate(${90 + secondDeg}deg)`
                });

                // 分针转动
                Object.assign(this.refs.minute.style, {
                    'transform': `rotate(${90 + minuteDeg}deg)`,
                    '-ms-transform': `rotate(${90 + minuteDeg}deg)`,
                    '-moz-transform': `rotate(${90 + minuteDeg}deg)`,
                    '-webkit-transform': `rotate(${90 + minuteDeg}deg)`,
                    '-o-transform': `rotate(${90 + minuteDeg}deg)`
                });

                // 时针转动
                Object.assign(this.refs.hour.style, {
                    'transform': `rotate(${90 + hourDeg}deg)`,
                    '-ms-transform': `rotate(${90 + hourDeg}deg)`,
                    '-moz-transform': `rotate(${90 + hourDeg}deg)`,
                    '-webkit-transform': `rotate(${90 + hourDeg}deg)`,
                    '-o-transform': `rotate(${90 + hourDeg}deg)`
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
                    <div ref="hour" className="abs hour"><hr className="color-line" /></div>
                    <div ref="minute" className="abs minute"><hr className="color-line" /></div>
                    <div ref="second" className="abs second"><hr className="color-line" /></div>
                </figure>
                <div className="flex-center btn-container left">
                    <span className="text">添加</span>
                    <i className="icon icon-151-add" />
                </div>
                <div className="flex-center btn-container right">
                    <span className="text">设置</span>
                    <i className="icon icon-151-setting" />
                </div>
            </section>
        )
    }
}
