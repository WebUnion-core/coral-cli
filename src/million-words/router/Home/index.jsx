import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';
import Swiper from 'swiper';

// 公共模块
import request from './../../common/modules/request.js';

// 通用组件
import TabsFooter from './../../common/components/tabs-footer';

// 子组件
import Nav from './components/Nav.jsx';
import FullRowList from './components/FullRowList.jsx';
import ScrollList from './components/ScrollList.jsx';
import HalfSideList from './components/HalfSideList.jsx';
import TopIconList from './components/TopIconList.jsx';

// 入口前缀
const prefix = 'Home';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { setHomeData } = this.props;

        // 请求数据
        request({
            method: 'GET',
            url: '/v1/home_list',
            success: (data) => {
                setHomeData(data, this.props[prefix]);

                const swiper = new Swiper('.scroll-list-container', {
                    slidesPerView: 2.5,
                    spaceBetween: 20
                });
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    render() {
        const { homeData } = this.props[prefix],
            { footTabs } = this.props['Public'].publicData;

        console.log(`${prefix} props => `, this.props);

        return (
            <div className="container main-container">
                <Nav store={ homeData } />
                <TopIconList store={ homeData } />
                <ScrollList store={ homeData } />
                <HalfSideList store={ homeData } />
                <FullRowList store={ homeData } />

                <TabsFooter list={ footTabs } defaultIndex={ 0 } />
            </div>
        )
    }
}

// 将state对应值绑定到props上
function mapStateToProps(state) {
    return {
        [prefix]: state[prefix],
        ['Public']: state['Public']
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
