import './style/index.scss';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

// 入口前缀
const prefix = 'Home';

// https://material-ui.com/demos/app-bar/#-----------
const styles = theme => ({
    root: {
        width: '100%'
    },
    grow: {
        flexGrow: 1
    },
    title: {},
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
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200
            }
        }
    }
});

class Container extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { homeData } = this.props[prefix];
        const { classes } = this.props;

        return (
            <div className="container main-container">
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography className={classes.title}
                                variant="h6"
                                color="inherit"
                                noWrap>MX-Box</Typography>
                            <div className={classes.grow} />
                            <div className={classes.search}>
                                <InputBase placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput
                                    }} />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )
    }
}

// 将state对应值绑定到props上
function mapStateToProps(state) {
    return {
        [prefix]: state[prefix]
    }
}

// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Container));
