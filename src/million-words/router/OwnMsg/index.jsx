import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 通用组件
import TabsFooter from './../../common/components/TabsFooter';

// 入口前缀
const prefix = 'OwnMsg';

// 子组件
import HeadCanvas from './components/HeadCanvas.jsx';
import FuncBlocks from './components/FuncBlocks.jsx';
import DetailList from './components/DetailList.jsx';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`${prefix} props => `, this.props);
    }

    componentDidMount() {}

    render() {
        const { homeData } = this.props['Home'];
        const { footTabs = [] } = homeData;

        return (
            <div className="container ownmsg-container">
                <HeadCanvas />
                <FuncBlocks />
                <DetailList />
                <TabsFooter list={ footTabs } defaultIndex={ 1 } />
            </div>
        )
    }
}

// 将state对应值绑定到props上
function mapStateToProps(state) {
    return {
        'Home': state['Home'],
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
