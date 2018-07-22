import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 通用组件
import HeadBar from './../../common/components/head-bar';
import Toast from './../../common/components/toast';

// 子组件
import List from './components/List.jsx';

// 入口前缀
const prefix = 'Setting';

class Setting extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`${prefix} props => `, this.props);
    }

    render() {
        const { settingData } = this.props[prefix];
        const { text, ifShow } = settingData.toastCtrler;

        return (
            <div className="setting-container">
                <HeadBar title="SETTING" />

                <List store={ this.props[prefix] } setSettingData={ this.props.setSettingData } />

                <Toast text={ text }
                       ifShow={ ifShow }
                       toastPrefix='toastCtrler'
                       toggleCallback={ this.props.setSettingData }
                       store={ this.props[prefix] } />
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
)(Setting);
