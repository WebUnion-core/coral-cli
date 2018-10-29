import './index.scss';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import AsideMenuList from 'pc-components/AsideMenuList';
const platform = require('./../platform.json');

// https://material-ui.com/customization/themes/
const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#38b49d' },
        secondary: { main: '#11cb5f' }
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
                <MuiThemeProvider theme={myTheme}>
                    <AsideMenuList menuList={platform} activeIndex="0" />
                    <aside className="operate-platform">
                        <h1 className="title">Home......</h1>
                    </aside>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
