import './index.scss';
import React from 'react';

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

// https://material-ui.com/customization/themes/
const myTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
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
    }
});

class Container extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { classes } = this.props;

        return (
            <div className="container login-container">
                <MuiThemeProvider theme={myTheme}>
                    <Paper className={classes.paper}>
                        <Typography component="h1"
                            variant="h5">请登录账号</Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal"
                                required
                                fullWidth>
                                <InputLabel htmlFor="user-id">账号</InputLabel>
                                <Input id="user-id"
                                    name="user-id"
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal"
                                required
                                fullWidth>
                                <InputLabel htmlFor="password">密码</InputLabel>
                                <Input name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password" />
                            </FormControl>
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />}
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

export default withStyles(styles)(Container);
