import './index.scss';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AsideMenuList from 'pc-components/AsideMenuList';
import FloatCtrlButton from 'pc-components/FloatCtrlButton';
const platform = require('./../platform.json');

// https://material-ui.com/customization/themes/
const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' }
    }
});

// https://material-ui.com/demos/app-bar/#-----------
const styles = theme => ({});

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillMount () {
        const { userId, password } = window.sessionStorage;
        if (!userId || !password) {
            window.location.href = '/mpa/login';
        }
    }

    render () {
        const { classes } = this.props;
        return (
            <div className="container home-container">
                <AsideMenuList menuList={platform} activeIndex="0" />
                <FloatCtrlButton />

                <aside className="operate-platform">
                </aside>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
