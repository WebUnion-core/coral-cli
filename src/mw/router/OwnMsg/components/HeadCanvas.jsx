import React from 'react';
import { Link } from 'react-router-dom';

import cookieUtil from './../../../common/modules/cookie-util.js';

export default class HeadCanvas extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {}

    render () {
        const { avatorUrl, userName } = localStorage;

        return (
            <header className="head-canvas-container">
                <figure className="avatar-container"
                    style={{ backgroundImage: `url("${avatorUrl}")` }} />

                <Link to="/userInfo/">
                    <i className="edit-icon icon-151-edit" />
                </Link>

                <div className="info-cont">
                    <strong className="name">{ userName }</strong>
                    <small className="id">ID: {
                        cookieUtil.get('login_token')
                    }</small>
                    <p className="intro">"日行上千里，不抵日移一厘。"</p>
                </div>
            </header>
        )
    }
}
