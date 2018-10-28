import './style/index.scss';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions.js';
import Button from '@material-ui/core/Button';

// 入口前缀
const prefix = 'Home';

class Container extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { homeData } = this.props[prefix];

        return (
            <div className="container main-container">
                <Button variant="contained" color="primary">Hello World</Button>
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
