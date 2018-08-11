import anime from 'animejs'
import React from 'react';

// 公共模块
import request from './../../../common/modules/request.js';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }

    // 点击跳转注册
    clickRegisterText = (event) => {
        const formElem = document.getElementById('account-content');

        formElem.style.visibility = 'hidden';
        anime({
            targets: formElem,
            translateY: '-100%'
        });

        setTimeout(() => {
            formElem.style.visibility = 'visible';
            this.props.toggleContent('REGISTER', () => {
                anime({
                    targets: formElem,
                    translateY: '100%',
                    delay: 500
                });
            });
        }, 500);
    }

    // 点击登录
    clickSignIn() {
        request({
            method: 'POST',
            url: `http://${ window.Waydua.site }/${ window.Waydua.version }/user/login`,
            data: {
                'name': this.refs['userName'].value,
                'password': this.refs['password'].value
            },
            success: (data) => {
                console.log(data);
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    render() {
        return (
            <form className="fillin-form">
                <img className="logo" src={ require('./../../../images/logo.png') } />
                <input ref="userName" className="input" type="text" placeholder="请输入用户名" />
                <input ref="password" className="input" type="password" placeholder="请输入密码" />
                <p className="register-text" onClick={ this.clickRegisterText }>点击前往注册</p>
                <button className="btn" onClick={ () => this.clickSignIn() }>登录</button>
            </form>
        )
    }
}
