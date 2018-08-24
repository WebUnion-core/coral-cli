import React from 'react';

export default class HeadCanvas extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="head-canvas-container">
                <figure className="avatar-container"></figure>
                <i className="edit-icon icon-151-edit" />
                <div className="info-cont">
                    <strong className="name">WJT20</strong>
                    <small className="id">ID: 6588888</small>
                    <p className="intro">"日行上千里，不抵日移一厘。"</p>
                </div>
            </header>
        )
    }
}
