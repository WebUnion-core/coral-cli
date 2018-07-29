import React from 'react';
import { Link } from 'react-router-dom';

export default class TopIconList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="top-icon-list-container">
                <ul className="top-icon-list">
                    <li className="top-icon-item">
                        <p><i className="icon icon-head-phone"></i></p>
                        <p><span className="text">MUSIC</span></p>
                    </li>
                    <li className="top-icon-item">
                        <p><i className="icon icon-key-board"></i></p>
                        <p><span className="text">KEY_BOARD</span></p>
                    </li>
                </ul>
            </div>
        )
    }
}
