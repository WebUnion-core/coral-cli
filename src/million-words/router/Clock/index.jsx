import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 入口前缀
const prefix = 'Clock';

import HeadTabs from './components/HeadTabs.jsx';
import ClockDisplayer from './components/ClockDisplayer.jsx';
import SelectList from './components/SelectList.jsx';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`${prefix} props => `, this.props);
    }

    render() {
        const { setClockData } = this.props;
        const { clockData } = this.props[prefix];

        return (
            <div className="clock-container">
                <HeadTabs store={ clockData } />
                <ClockDisplayer store={ clockData } />
                <SelectList store={ clockData } />
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
)(Container);
