import anime from 'animejs'
import React from 'react';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    // 点击跳转登录
    clickSigInText = (event) => {
        const formElem = document.getElementById('account-content');

        formElem.style.visibility = 'hidden';
        anime({
            targets: formElem,
            translateY: '-100%',
        });

        setTimeout(() => {
            formElem.style.visibility = 'visible';
            this.props.toggleContent('SIGIN', () => {
                anime({
                    targets: formElem,
                    translateY: '100%',
                    delay: 500
                });
            });
        }, 500);
    }

    render() {
        return (
            <form className="fillin-form">
                <img className="logo" src={ require('./../../../images/logo.png') } />
                <input className="input" type="text" placeholder="请输入手机号" />
                <input className="input" type="text" placeholder="请输入验证码" />
                <input className="input" type="password" placeholder="请输入密码" />
                <p className="register-text" onClick={ this.clickSigInText }>点击前往登录</p>
                <button className="btn">获取验证码</button>
                <button className="btn">注册</button>
            </form>
        )
    }
}
