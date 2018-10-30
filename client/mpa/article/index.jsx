import './index.scss';
import React from 'react';
import { checkLogin } from './../common';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AsideMenuList from 'pc-components/AsideMenuList';
import FloatCtrlButton from 'pc-components/FloatCtrlButton';
const platform = require('./../platform.json');

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

class Article extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articleTitle: '',
            publistDate: ''
        };
    }

    componentWillMount () {
        checkLogin();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render () {
        const { classes } = this.props;

        return (
            <div className="container article-container">
                <MuiThemeProvider theme={myTheme}>
                    <AsideMenuList menuList={platform} activeIndex="1" />
                    <FloatCtrlButton />
                    <aside className="operate-platform">
                        <ul className="head-nav-bar">
                            <li className="nav-bar-item">
                                <Button className={classes.headNavBtn}>搜索</Button>
                            </li>
                            <li className="nav-bar-item">
                                <Button className={classes.headNavBtn}>发布资讯</Button>
                            </li>
                        </ul>

                        <ul className="search-filter-board">
                            <li className="filter-board-item">
                                <TextField id="article-name"
                                    label="标题"
                                    value={this.state.articleTitle}
                                    onChange={this.handleChange('articleTitle')}
                                    margin="dense" />
                            </li>
                            <li className="filter-board-item">
                                <TextField id="publist-date"
                                    label="发布时间"
                                    value={this.state.publistDate}
                                    onChange={this.handleChange('publistDate')}
                                    margin="dense" />
                            </li>
                        </ul>
                    </aside>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Article);
