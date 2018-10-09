import React from 'react';
import { Link } from 'react-router-dom';
import IScroll from 'iscroll/build/iscroll-probe';
import LazyLoad from 'react-lazyload';

import { bindScroll } from './../../../common/modules/tools.js';

export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articleList: [
                {
                    style: 'single-image-style',
                    img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
                },
                {
                    style: 'single-image-style',
                    img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
                },
                {
                    style: 'single-image-style',
                    img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
                },
                {
                    style: 'single-image-style',
                    img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
                },
                {
                    style: 'single-image-style',
                    img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
                }
            ]
        };
    }

    componentDidMount () {
        bindScroll(() => {
            const { articleList } = this.state;
            articleList.push({
                style: 'single-image-style',
                img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
            });
            this.setState({
                articleList
            });
        });
    }

    render () {
        const { remFontSize } = window.Waydua;

        return (
            <div className="article-list-container">
                <ul className="article-list" ref="articleList">
                {
                    this.state.articleList.map((item, index) => {
                        const { img, style, title } = item;
                        return (
                            <li key={ index }
                                className={ `article-list-item ${ style }` }>
                                <LazyLoad width={ 4.5 * remFontSize }
                                    height={ 4.5 * remFontSize } >
                                    <img className="img" src={ img } />
                                </LazyLoad>
                                <p className="title">{ title }</p>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}
