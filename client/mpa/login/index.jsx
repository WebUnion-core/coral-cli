import './index.scss';
import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

// https://material-ui.com/customization/themes/
const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#38b49d' },
        secondary: { main: '#11cb5f' }
    }
});

// https://material-ui.com/demos/app-bar/#-----------
const styles = theme => ({
    paper: {
        maxWidth: '350px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
        transform: 'translateY(50%)'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 1.5,
        color: '#ffffff'
    },
    dialog: {
        minWidth: '300px'
    }
});

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.managerData = {
            userId: 'webunion',
            password: '2015'
        };
        this.state = {
            userId: '',
            password: '',
            ifRememberId: false,
            ifDisplayDialog: false,
            alertText: ''
        };
    }

    // 点击提交
    clickSubmit = (event) => {
        const { userId, password, ifRememberId } = this.state;

        if (!userId || !password) {
            return this.handleClickOpen('登录信息不能为空！');
        } else if (userId !== this.managerData.userId) {
            return this.handleClickOpen('账号不存在！');
        } else if (password !== this.managerData.password) {
            return this.handleClickOpen('密码不正确！');
        }

        if (ifRememberId) {
            Object.assign(window.sessionStorage, {
                userId, password
            });
        }

        window.location.href = '/mpa/home';
    }

    // 改变输入框内容
    changeInput (key, value) {
        this.setState({ [key]: value });
    }

    // 改变记住账号选择框
    changeSelectRememberId = (event, checked) => {
        this.setState({ ifRememberId: checked });
    }

    // 展开弹窗
    handleClickOpen = (alertText) => {
        this.setState({
            ifDisplayDialog: true,
            alertText
        });
    }

    // 关闭弹窗
    handleClose = () => {
        this.setState({ ifDisplayDialog: false });
    }

    render () {
        const { classes } = this.props;
        const { alertText, ifDisplayDialog } = this.state;

        return (
            <div className="container login-container">
                <MuiThemeProvider theme={myTheme}>
                    <Dialog open={ifDisplayDialog}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle id="alert-dialog-slide-title">提示</DialogTitle>
                        <DialogContent className={classes.dialog}>
                            <DialogContentText
                                id="alert-dialog-slide-description">{
                                    alertText
                                }</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}
                                color="primary">确定</Button>
                        </DialogActions>
                    </Dialog>

                    <Paper className={classes.paper}>
                        <h1 className="login-head-title">请登录账号</h1>
                        <div className={classes.form}>
                            <FormControl margin="normal"
                                required
                                fullWidth>
                                <InputLabel htmlFor="user-id">账号</InputLabel>
                                <Input id="user-id"
                                    name="user-id"
                                    autoFocus
                                    onChange={(event) => this.changeInput('userId', event.target.value)} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">密码</InputLabel>
                                <Input name="password"
                                    type="password"
                                    id="password"
                                    onChange={(event) => this.changeInput('password', event.target.value)} />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox value="remember"
                                        color="primary"
                                        onChange={this.changeSelectRememberId} />
                                }
                                label="记住账号，下次自动登录" />
                            <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.clickSubmit}>登 录</Button>
                        </div>
                    </Paper>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
