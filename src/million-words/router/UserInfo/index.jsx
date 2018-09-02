import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions';

// 入口前缀
const prefix = 'UserInfo';

// 公共组件
import HeadBar from './../../common/components/HeadBar';
import NormalDialog from './../../common/components/NormalDialog';

// 子组件
import FirstLevelList from './components/FirstLevelList.jsx';

class Container extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ifShowDialog: false
        }
    }

    componentWillMount () {
        console.log(`${prefix} props => `, this.props);
    }

    // 切换状态
    toggleShow = (status) => {
        const { ifShowDialog } = this.state;
        this.setState({
            ifShowDialog: status || !ifShowDialog
        });
    }

    render () {
        const { ifShowDialog } = this.state;

        return (
            <div className="user-info-container">
                <HeadBar title="个人信息" />
                <FirstLevelList
                    toggleShow={ this.toggleShow } />
                <NormalDialog
                    ifShowDialog={ ifShowDialog }
                    title="修改昵称"
                    content="......"
                    btns={
                        [
                            { text: '取消', listener: () => alert('取消') },
                            { text: '确定', listener: () => alert('确定') }
                        ]
                    } />
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
