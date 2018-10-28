import React from 'react';
import cookieUtil from 'modules/cookie-util.js';

export default class FirstLevelList extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            toggleEditTextDialog,
            toggleUploadImgDialog,
            avatorUrl,
            userName
        } = this.props;

        return (
            <ul className="list-container">
                <li className="list-item avator-container"
                    onClick={ () => toggleUploadImgDialog(true) }>
                    <span className="field">头像</span>
                    {
                        avatorUrl &&
                            <figure className="right figure"
                                style={{
                                    backgroundImage: `url("${avatorUrl}")`
                                }} />
                    }
                </li>
                <li className="list-item"
                    onClick={ () => toggleEditTextDialog(true) }>
                    <span className="field">昵称</span>
                    <span className="right value">{ userName }</span>
                </li>
                <li className="list-item">
                    <span className="field">ID</span>
                    <span className="right value">
                        {
                            cookieUtil.get('login_token')
                        }
                    </span>
                </li>
            </ul>
        )
    }
}
