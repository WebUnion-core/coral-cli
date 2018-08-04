import './style/index.scss';

import anime from 'animejs'
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 入口前缀
const prefix = 'Account';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(`${prefix} props => `, this.props);
    }

    componentDidMount() {
        anime({
            targets: this.refs['accountContent'],
            translateY: '100%',
            delay: 1000
        });
    }

    render() {
        const { setAccountData } = this.props;
        const { clockData } = this.props[prefix];

        return (
            <div className="account-container">
                <div ref="accountContent" className="account-content">
                    <form className="fillin-form">
                        <img className="logo" src={ require('./../../images/logo.png') } />
                    </form>
                </div>
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
