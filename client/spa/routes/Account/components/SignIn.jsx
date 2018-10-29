import anime from 'animejs';
import React from 'react';

// 公共模块
import request from 'modules/request.js';
import cookieUtil from 'modules/cookie-util.js';

export default class SignIn extends React.Component {
    constructor (props) {
        super(props);
    }

    // 点击跳转注册
    clickRegisterText = () => {
        const formElem = this.props.rootEl;

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
    clickSignIn = () => {
        const { site, version, userAgent } = window.Waydua;
        const { userNameEl, passwordEl } = this.refs;

        request({
            method: 'POST',
            url: `http://${site}/${version}/user/login`,
            data: {
                'name': userNameEl.value,
                'password': passwordEl.value,
                'user_agent': userAgent
            },
            success: (data) => {
                cookieUtil.set(
                    'login_token',
                    data['login_token'],
                    30
                );
                window.location.reload();
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    render () {
        return (
            <form className="fillin-form">
                <img className="logo"
                    src={ `${window.Waydua.cdn}logo.png` } />

                <input ref="userNameEl"
                    className="input"
                    type="text"
                    placeholder="请输入用户名或手机号"
                    autoComplete="off" />

                <input ref="passwordEl"
                    className="input"
                    type="password"
                    placeholder="请输入密码"
                    autoComplete="off" />

                <p className="register-text"
                    onClick={ this.clickRegisterText }>点击前往注册</p>

                <button className="btn"
                    onClick={ this.clickSignIn }>登录</button>
            </form>
        )
    }
}
