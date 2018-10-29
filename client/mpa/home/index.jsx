import './index.scss';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import AsideMenuList from 'pc-components/AsideMenuList';
const platform = require('./../platform.json');

// https://material-ui.com/customization/themes/
const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#eac925' }
    }
});

// https://material-ui.com/demos/app-bar/#-----------
const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),

        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',

        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto'
        }
    },
    searchIcon: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: 0,
        bottom: 0,
        margin: 'auto 0',
        display: 'inline-block'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit * 1.2,
        paddingBottom: theme.spacing.unit * 1.2,
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 7,
        transition: theme.transitions.create('width'),
        width: '100%',
        border: '1px solid #434343',
        fontSize: '0.9rem',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 180
            }
        }
    }
});

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
                        <AppBar position="absolute">
                            <Toolbar>
                                <div className={classes.search}>
                                    <i className={`${classes.searchIcon} icon-152-search`} />
                                    <InputBase
                                        placeholder="请输入搜索内容"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput
                                        }} />
                                </div>
                            </Toolbar>
                        </AppBar>
                    </aside>
                </MuiThemeProvider>

                <figure className="ctrl-btn">
                    <i className="icon icon-21-menu" />
                </figure>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
