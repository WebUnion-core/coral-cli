import React from 'react';
import { Link } from 'react-router-dom';

import { bindScroller, removeScroller } from 'modules/tools.js';
import request from 'modules/request.js';

export default class ArticleList extends React.Component {
    constructor (props) {
        super(props);
        this.perPageAmount = 5;
        this.state = {
            pageCount: 1,
            totalAmount: null,
            articleList: []
        };
    }

    addArticle () {
        const { site, version } = window.Waydua;
        const { articleList, pageCount, totalAmount } = this.state;
        const { perPageAmount } = this;

        if (totalAmount && ((pageCount - 1) * perPageAmount >= totalAmount)) {
            return;
        }

        request({
            method: 'POST',
            url: `http://${site}/${version}/home/home_article_list`,
            data: {
                'page': pageCount,
                'amount': this.perPageAmount
            },
            success: (data) => {
                const { articles } = data;
                articles.forEach((item) => {
                    const { title } = item;
                    articleList.push({
                        style: 'single-image-style',
                        img: item['guide_image_url'],
                        title
                    });
                });
                this.setState({
                    articleList,
                    totalAmount: data['total_page'],
                    pageCount: pageCount + 1
                });
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    componentDidMount () {
        this.addArticle();
        bindScroller('ARTICLE_LIST_SCROLLER', () => {
            setTimeout(() => {
                this.addArticle();
            }, 500);
        });
    }

    componentWillUnmount() {
        removeScroller('ARTICLE_LIST_SCROLLER');
    }

    render () {
        const { remFontSize } = window.Waydua;
        const { pageCount } = this.state;

        return (
            <div className="article-list-container">
                <ul className="article-list" ref="articleList">
                    {
                        this.state.articleList.map((item, index) => {
                            const { img, style, title } = item;
                            return (
                                <li key={ index }
                                    className={`article-list-item ${ style }`}>
                                    <figure className='img-container'>
                                        <img className="img" src={img} />
                                    </figure>
                                    <p className="title">{title}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
