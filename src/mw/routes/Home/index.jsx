import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';
import Swiper from 'swiper';

// 公共模块
import request from './../../common/modules/request.js';
import cookieUtil from './../../common/modules/cookie-util.js';

// 通用组件
import TabsFooter from './../../common/components/TabsFooter';

// 子组件
import TopIconList from './components/TopIconList.jsx';

// 入口前缀
const prefix = 'Home';

class Container extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            footTabs: []
        };
    }

    componentWillMount () {
        const { setHomeData } = this.props;
        const { site, version, userAgent } = window.Waydua;

        // 请求数据
        request({
            method: 'GET',
            url: `http://${site}/${version}/home/main_list`,
            success: (res) => {
                const { footTabs, topIconList } = res.data;
                setHomeData({ topIconList }, this.props[prefix]);
                localStorage['footTabs'] = JSON.stringify(footTabs);
                this.setState({ footTabs });
            },
            fail: (err) => {
                console.error(err);
            }
        });

        // 请求登录
        request({
            method: 'POST',
            url: `http://${site}/${version}/user/login`,
            data: {
                'login_token': cookieUtil.get('login_token'),
                'user_agent': userAgent
            },
            success: (res) => {
                if (res.result === 1) {
                    Object.assign(localStorage, {
                        userName: res.data['user_name'],
                        avatorUrl: res.data['avator_url']
                    });
                }
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    render () {
        const { homeData } = this.props[prefix];
        const { footTabs } = this.state;

        return (
            <div className="container main-container">
                <nav className="nav-container">
                    <figure className="bg-container">
                        <img className="bg-img"
                            src={ `${window.Waydua.cdn}w1.jpg` } />
                    </figure>
                </nav>
                <TopIconList store={ homeData } />
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
