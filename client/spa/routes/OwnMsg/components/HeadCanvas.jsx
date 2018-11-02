import React from 'react';
import { Link } from 'react-router-dom';

import cookieUtil from 'modules/cookie-util.js';

export default class HeadCanvas extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { publicData } = window.Waydua;
        return (
            <header className="head-canvas-container">
                <figure className="avatar-container"
                    style={{
                        backgroundImage: `url("${publicData['avator_url']}")`
                    }} />

                <Link to="/user_info/">
                    <i className="edit-icon icon-151-edit" />
                </Link>

                <div className="info-cont">
                    <strong className="name">{
                        publicData['user_name']
                    }</strong>
                    <small className="id">ID: {
                        cookieUtil.get('login_token')
                    }</small>
                    <p className="intro">"日行上千里，不抵日移一厘。"</p>
                </div>
            </header>
        )
    }
}
