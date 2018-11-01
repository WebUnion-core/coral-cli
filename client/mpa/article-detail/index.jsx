import './index.scss';
import React from 'react';
import { checkLogin } from './../common';
import request from 'modules/request.js';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AsideMenuList from 'pc-components/AsideMenuList';
import FloatCtrlButton from 'pc-components/FloatCtrlButton';

const platform = require('./../platform.json');

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' }
    }
});

const styles = theme => ({});

class ArticleDetail extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillMount () {
        checkLogin();
    }

    componentDidMount () {}

    render () {
        const { classes } = this.props;

        return (
            <div className="container article-detail-container">
                <MuiThemeProvider theme={myTheme}>
                    <AsideMenuList menuList={platform} activeIndex="1" />

                    <FloatCtrlButton />

                    <aside className="operate-platform"></aside>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(ArticleDetail);
