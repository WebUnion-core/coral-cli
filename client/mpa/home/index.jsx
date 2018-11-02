import './index.scss';
import React from 'react';
import { checkLogin } from './../common';

import AsideMenuList from 'pc-components/AsideMenuList';
import FloatCtrlButton from 'pc-components/FloatCtrlButton';
const platform = require('./../platform.json');

export default class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillMount () {
        checkLogin();
    }

    render () {
        return (
            <div className="container home-container">
                <AsideMenuList menuList={platform} activeIndex="0" />
                <FloatCtrlButton />
                <aside className="operate-platform" />
            </div>
        )
    }
}
