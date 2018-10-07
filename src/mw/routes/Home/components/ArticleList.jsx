import React from 'react';
import { Link } from 'react-router-dom';
import IScroll from 'iscroll/build/iscroll-probe';
import LazyLoad from 'react-lazyload';

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
        // this.iScroll = new IScroll("#article-list", {
        //     mouseWheel: true,
        //     bounce: false,
        //     scrollbars: false
        // });
        // this.iScroll.on('scrollEnd', () => {
        //     const { articleList } = this.state;
        //     articleList.push({
        //         style: 'single-image-style',
        //         img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
        //         title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
        //     });
        //     this.setState({
        //         articleList
        //     });
        // });

        const articleListEl = document.body;
        const { scrollTop, scrollHeight, offsetHeight } = articleListEl;
        articleListEl.addEventListener('scroll', () => {
            console.log(scrollTop, scrollHeight - offsetHeight);
            if (scrollTop >= scrollHeight - offsetHeight) {
                const { articleList } = this.state;
                articleList.push({
                    style: 'single-image-style',
                    img: 'https://raw.githubusercontent.com/WebUnion-core/bona-storm/master/asset/img/default-avator.png',
                    title: '文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題文章標題'
                });
                this.setState({
                    articleList
                });
            }
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
                                <LazyLoad offset={ 4.5 * remFontSize }
                                    placeholder={ <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAC1CAYAAACUEju4AAAACXBIWXMAAAsSAAALEgHS3X78AAAAa0lEQVR4nO3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALgbVCQAAR6U1/8AAAAASUVORK5CYII=" alt=""/> } >
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
