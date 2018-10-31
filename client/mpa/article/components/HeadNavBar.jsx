import './../index.scss';
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
        this.state = {
            articleTitle: '',
            publistDate: (new Date()).toISOString().substr(0, 10),
            ifShowFilterBoard: false
        };
    }

    // 点击搜索按钮
    handleClickSearchBtn = event => {
        this.setState({
            ifShowFilterBoard: !this.state.ifShowFilterBoard
        });
    }

    render () {
        const { classes } = this.props;
        const { handleSearch } = this.props;
        return (
            <ul className="head-nav-bar">
                <li className="nav-bar-item">
                    <Button className={classes.headNavBtn}
                        onClick={handleSearch}>搜索</Button>
                </li>
                <li className="nav-bar-item">
                    <Button className={classes.headNavBtn}>发布资讯</Button>
                </li>
            </ul>
        )
    }
}

export default withStyles(styles)(HeadNavBar);
