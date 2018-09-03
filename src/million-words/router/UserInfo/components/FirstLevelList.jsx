import React from 'react';

export default class FirstLevelList extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { toggleShow } = this.props;

        return (
            <ul className="list-container">
                <li className="list-item avator-container">
                    <span className="field">头像</span>
                    <figure className="right figure"></figure>
                </li>
                <li className="list-item" onClick={ () => toggleShow(true) }>
                    <span className="field">昵称</span>
                    <span className="right value">WJT20</span>
                </li>
                <li className="list-item">
                    <span className="field">ID</span>
                    <span className="right value">123</span>
                </li>
            </ul>
        )
    }
}
