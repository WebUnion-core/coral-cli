import './style/index.scss';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions.js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// 入口前缀
const prefix = 'Home';

// https://material-ui.com/customization/themes/
const theme = createMuiTheme({
    palette: {
        primary: { main: '#38b49d' },
        secondary: { main: '#11cb5f' }
    }
});

// https://material-ui.com/demos/app-bar/#-----------
const styles = theme => ({
    paper: {
        maxWidth: '350px',
        margin: `${theme.spacing.unit * 10}px auto 0`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 1.5,
        color: '#ffffff'
    }
});

class Container extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { loginData } = this.props[prefix];
        const { classes } = this.props;

        return (
            <div className="container login-container">
                <MuiThemeProvider theme={theme}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">请登录账号</Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="user-id">账号</InputLabel>
                                <Input id="user-id"
                                    name="user-id"
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">密码</InputLabel>
                                <Input name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password" />
                            </FormControl>
                            <FormControlLabel control={
                                    <Checkbox value="remember" color="primary" />
                                }
                                label="记住账号" />
                            <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>登 录</Button>
                        </form>
                    </Paper>
                </MuiThemeProvider>
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
