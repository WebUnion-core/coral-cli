import React from 'react';
import { Link } from 'react-router-dom';

export default class ClockDisplayer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="clock-displayer-container">
                <img className="clock-bg" src={ require('./../../../images/clock.png') } />
            </section>
        )
    }
}
