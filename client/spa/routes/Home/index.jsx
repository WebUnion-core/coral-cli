import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions.js';
import Swiper from 'swiper';

// 公共模块
import cookieUtil from 'modules/cookie-util.js';

// 通用组件
import TabsFooter from 'components/TabsFooter';

// 子组件
import TopIconList from './components/TopIconList.jsx';
import ArticleList from './components/ArticleList.jsx';

// 入口前缀
const prefix = 'Home';

class Container extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { homeData } = this.props[prefix];
        const { footTabs } = window.Waydua.publicData;

        return (
            <div className="container main-container">
                <nav className="nav-container">
                    <figure className="bg-container">
                        <img className="bg-img"
                            src={ `${window.Waydua.cdn}w1.jpg` } />
                    </figure>
                </nav>
                <TopIconList store={ homeData } />
                <ArticleList />
                <TabsFooter list={ footTabs } defaultIndex={ 0 } />
            </div>
        )
    }
}

// 将state对应值绑定到props上
function mapStateToProps(state) {
    return {
        [prefix]: state[prefix]
    }
}

// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
