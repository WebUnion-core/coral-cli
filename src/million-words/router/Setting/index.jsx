import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 通用组件
import Toast from './../../common/components/toast';
import TabsFooter from './../../common/components/tabs-footer';

// 子组件
import List from './components/List.jsx';

// 入口前缀
const prefix = 'Setting';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`${prefix} props => `, this.props);
    }

    render() {
        const { setSettingData } = this.props,
            { settingData } = this.props[prefix],
            { footTabs } = this.props['Public'].publicData,
            { text, ifShow } = settingData.toastCtrler;

        return (
            <div className="container setting-container">
                <List store={ this.props[prefix] }
                    setSettingData={ setSettingData } />

                <Toast text={ text }
                    ifShow={ ifShow }
                    toastPrefix='toastCtrler'
                    toggleCallback={ setSettingData }
                    store={ this.props[prefix] } />

                <TabsFooter list={ footTabs } defaultIndex={ 1 } />
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
