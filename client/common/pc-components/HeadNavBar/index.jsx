import './style.scss';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' }
    }
});

const styles = theme => ({
    headNavBtn: {
        border: '1px solid #434343'
    }
});

class HeadNavBar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { classes } = this.props;
        const { btnList } = this.props;
        return (
            <ul className="head-nav-bar">
                {
                    btnList.map((item, index) =>
                        <li key={index}
                            className="nav-bar-item">
                            <Button className={classes.headNavBtn}
                                onClick={item.clickListener}>{item.text}</Button>
                        </li>
                    )
                }
            </ul>
        )
    }
}

export default withStyles(styles)(HeadNavBar);
