import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 通用组件
import HeadBar from './../../common/components/head-bar';

// 子组件
import Nav from './components/Nav.jsx';
import FullRowList from './components/FullRowList.jsx';
import ScrollList from './components/ScrollList.jsx';
import HalfSideList from './components/HalfSideList.jsx';

// 入口前缀
const prefix = 'Home';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { homeData } = this.props[prefix];

        return (
            <div className="main-container">
                <Nav store={ homeData } />
                <ScrollList store={ homeData } />
                <HalfSideList store={ homeData } />
                <FullRowList store={ homeData } />
            </div>
        )
    }
}

// 将state对应值绑定到props上
function mapStateToProps(state) {
    return {
        [prefix]: state[prefix],
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
)(Home);
