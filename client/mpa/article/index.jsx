import './index.scss';
import React from 'react';
import { checkLogin } from './../common';
import request from 'modules/request.js';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AsideMenuList from 'pc-components/AsideMenuList';
import FloatCtrlButton from 'pc-components/FloatCtrlButton';
import SearchFilterBoard from './components/SearchFilterBoard';
import HeadNavBar from './components/HeadNavBar';

const platform = require('./../platform.json');

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' }
    }
});

const styles = theme => ({
    articleList: {
        position: 'absolute',
        top: '4rem',
        width: '100%',
        padding: 0
    },
    itemText: {
        fontSize: '1.2rem'
    }
});

class Article extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ifShowFilterBoard: false,
            checked: '',
            articleList: [],
            currentPage: 1,
            totalPage: 0
        };
    }

    componentWillMount () {
        checkLogin();
    }

    componentDidMount () {
        const { site, version, userAgent } = window.Waydua;

        request({
            method: 'POST',
            url: `http://${site}/${version}/article/search_article`,
            data: {
                'page': 1,
                'amount': 20
            },
            success: (data) => {
                this.setState({
                    articleList: data['articles'],
                    totalPage: data['total_page']
                });
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    // 点击搜索按钮
    handleSearch = event => {
        this.setState({
            ifShowFilterBoard: !this.state.ifShowFilterBoard
        });
    }

    // 点击选项
    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        }, () => {
            console.info(this.state.checked);
        });
    };

    render () {
        const { classes } = this.props;
        const { ifShowFilterBoard, articleList } = this.state;

        return (
            <div className="container article-container">
                <MuiThemeProvider theme={myTheme}>
                    <AsideMenuList menuList={platform} activeIndex="1" />
                    <FloatCtrlButton />

                    <aside className="operate-platform">
                        <HeadNavBar handleSearch={this.handleSearch} />
                        <SearchFilterBoard displayStatus={ifShowFilterBoard} />

                        <List className={classes.articleList}>
                            {
                                articleList.map((item, index) =>
                                    <li key={index}>
                                        <ListItem dense
                                            button
                                            onClick={this.handleToggle(index)}>
                                            <Checkbox checked={this.state.checked.indexOf(index) !== -1}
                                                tabIndex={index}
                                                disableRipple />
                                            <ListItemText className={classes.itemText}
                                                primary={item.title} />
                                        </ListItem>
                                        <Divider />
                                    </li>
                                )
                            }

                            <ul className="page-ctrler">
                                <li className="ctrler-item">
                                    <Button variant="outlined" disabled>上一页</Button>
                                </li>
                                <li className="ctrler-item">
                                    <span>第 <b>1</b> 页</span>
                                </li>
                                <li className="ctrler-item">
                                    <TextField id="tgt-page"
                                        placeholder="总共1000页"
                                        margin="dense"
                                        variant="outlined" />
                                    <i className="goto-btn icon-13751-goto" />
                                </li>
                                <li className="ctrler-item">
                                    <Button variant="outlined">下一页</Button>
                                </li>
                            </ul>
                        </List>
                    </aside>

                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(Article);
