import './index.scss';
import React from 'react';
import { checkLogin } from './../common';
import request from 'modules/request.js';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AsideMenuList from 'pc-components/AsideMenuList';
import FloatCtrlButton from 'pc-components/FloatCtrlButton';
import HeadNavBar from 'pc-components/HeadNavBar';
import SearchFilterBoard from './components/SearchFilterBoard';
import ArticleList from './components/ArticleList';

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

// 列表工作板
const ListBoard = ({
    btnList,
    ifShowFilterBoard,
    articleList,
    checked,
    handleToggle,
    totalPage,
    perPageAmount,
    requestDeleteArticle
}) =>
    <aside className="operate-platform">
        <HeadNavBar btnList={btnList} />

        <SearchFilterBoard displayStatus={ifShowFilterBoard} />

        <ArticleList articleList={articleList}
            checked={checked}
            handleToggle={handleToggle}
            totalPage={totalPage}
            perPageAmount={perPageAmount}
            requestDeleteArticle={requestDeleteArticle} />
    </aside>

class ArticlePlatform extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ifShowFilterBoard: false,
            checked: [],
            articleList: [],
            currentPage: 1,
            totalPage: 0
        };
        this.perPageAmount = 20;
    }

    componentWillMount () {
        checkLogin();
    }

    componentDidMount () {
        this.requestArticleList();
    }

    // 请求文章列表
    requestArticleList = () => {
        const { site, version } = window.Waydua;
        request({
            method: 'POST',
            url: `http://${site}/${version}/article/search_article`,
            data: {
                'page': 1,
                'amount': this.perPageAmount
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

    // 删除指定ID文章
    requestDeleteArticle = id => () => {
        const { site, version } = window.Waydua;
        request({
            method: 'POST',
            url: `http://${site}/${version}/article/delete_article`,
            data: { id },
            success: (data) => {
                console.info('删除成功！');
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
    }

    render () {
        const { classes } = this.props;
        const {
            ifShowFilterBoard, articleList,
            checked, totalPage
        } = this.state;

        return (
            <div className="container article-container">
                <MuiThemeProvider theme={myTheme}>
                    <AsideMenuList menuList={platform} activeIndex="1" />

                    <FloatCtrlButton />

                    <ListBoard ifShowFilterBoard={ifShowFilterBoard}
                        articleList={articleList}
                        checked={checked}
                        handleToggle={this.handleToggle}
                        totalPage={totalPage}
                        perPageAmount={this.perPageAmount}
                        requestDeleteArticle={this.requestDeleteArticle}
                        btnList={
                            [
                                {
                                    text: '搜索',
                                    clickListener: this.handleSearch
                                }
                            ]
                        } />

                </MuiThemeProvider>
            </div>
        )
    }
}

export default withStyles(styles)(ArticlePlatform);
