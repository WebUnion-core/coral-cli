import './style.scss';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' },
        secondary: { main: '#11cb5f' }
    }
});

const styles = theme => ({
    active: {
        backgroundColor: '#eac925'
    },
    dialog: {
        minWidth: '300px'
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DialogContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ifDisplayDialog: false,
            alertText: ''
        };
    }

    render () {
        const {
            ifDisplayDialog, alertText,
            handleOpen, handleClose,
            classes
        } = this.props;

        return (
            <MuiThemeProvider theme={myTheme}>
                <Dialog open={ifDisplayDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
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
                        <Button onClick={handleClose}
                            color="primary">确定</Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(DialogContainer);
