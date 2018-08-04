import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title } = this.props.store;

        return (
            <nav className="nav-container">
                <figure className="bg-container">
                    <img className="bg-img" src={ require('./../../../images/w1.jpg') } />
                </figure>

                <figure className="avator-container">
                    <img className="avator" src={ require('./../../../images/w2.png') } />
                    <strong className="user-name">{ title }</strong>
                </figure>
            </nav>
        )
    }
}
