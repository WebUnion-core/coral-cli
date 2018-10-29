import './style/index.scss';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from './../../actions.js';

// 入口前缀
const prefix = 'UserInfo';

// 公共模块
import request from 'modules/request.js';
import cookieUtil from 'modules/cookie-util.js';

// 公共组件
import HeadBar from 'components/HeadBar';
import EditTextDialog from 'components/EditTextDialog';
import UploadImgDialog from 'components/UploadImgDialog';

// 子组件
import FirstLevelList from './components/FirstLevelList.jsx';

class Container extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            avatorUrl: '',
            userName: '',
            ifShowEditTextDialog: false,
            ifShowUploadImgDialog: false
        }
    }

    componentWillMount () {
        __DEV__ && console.log(`${prefix} props => `, this.props);
    }

    componentDidMount () {
        const { publicData } = window.Waydua;
        this.setState({
            avatorUrl: publicData['avator_url'],
            userName: publicData['user_name']
        });
    }

    // 上传头像数据
    postAvatorData = (receiveParams) => {
        const { formData } = receiveParams;
        const { site, version } = window.Waydua;
        const { width, height, offsetX, offsetY } = receiveParams;

        // 数据封装
        formData.append('user_token', cookieUtil.get('login_token'));

        request({
            method: 'POST',
            url: `http://${site}/mw/${version}/file/upload_avator`,
            data: formData,
            type: 'multipart/form-data',
            success: (data) => {
                const avatorUrl = data['avator_url'];
                window.Waydua.publicData['avator_url'] = avatorUrl;
                this.setState({
                    avatorUrl,
                    ifShowUploadImgDialog: false
                });
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    // 更新用戶名
    updateUserName = ({ name }) => {
        const { site, version } = window.Waydua;
        request({
            method: 'POST',
            url: `http://${site}/mw/${version}/user/update_name`,
            data: {
                'user_token': cookieUtil.get('login_token'),
                'user_name': name
            },
            success: (data) => {
                const userName = data['user_name'];
                window.Waydua.publicData['user_name'] = userName;
                this.setState({
                    userName,
                    ifShowEditTextDialog: false
                });
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    // 切换输入型对话框状态
    toggleEditTextDialog = (status) => {
        const { ifShowEditTextDialog } = this.state;
        this.setState({
            ifShowEditTextDialog: status || !ifShowEditTextDialog,
            ifShowUploadImgDialog: false
        });
    }

    // 切换上传图片型对话框状态
    toggleUploadImgDialog = (status) => {
        const { ifShowUploadImgDialog } = this.state;
        this.setState({
            ifShowEditTextDialog: false,
            ifShowUploadImgDialog: status || !ifShowUploadImgDialog
        });
    }

    render () {
        const {
            ifShowEditTextDialog,
            ifShowUploadImgDialog,
            avatorUrl,
            userName
        } = this.state;
        const uploadImgDialogProps = {
            ifShowDialog: ifShowUploadImgDialog,
            title: '修改头像',
            receiveParams: this.postAvatorData
        };
        const editTextDialogProps = {
            ifShowDialog: ifShowEditTextDialog,
            title: '修改昵称',
            btns: [
                { text: '取消' },
                {
                    text: '确定',
                    listener: this.updateUserName
                }
            ],
            exitTextList: [
                {
                    placeholder: '请输入昵称',
                    field: 'name',
                    type: 'text'
                }
            ]
        };

        return (
            <div className="user-info-container">
                <HeadBar title="个人信息" />

                <FirstLevelList
                    avatorUrl={ avatorUrl }
                    userName={ userName }
                    toggleEditTextDialog={ this.toggleEditTextDialog }
                    toggleUploadImgDialog={ this.toggleUploadImgDialog } />

                <UploadImgDialog { ...uploadImgDialogProps } />

                <EditTextDialog { ...editTextDialogProps } />
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
