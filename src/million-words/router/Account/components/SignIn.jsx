import anime from 'animejs'
import React from 'react';

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

    render() {
        return (
            <form className="fillin-form">
                <img className="logo" src={ require('./../../../images/logo.png') } />
                <input className="input" type="text" placeholder="请输入用户名或手机号码" />
                <input className="input" type="password" placeholder="请输入密码" />
                <p className="register-text" onClick={ this.clickRegisterText }>点击前往注册</p>
                <button className="btn">登录</button>
            </form>
        )
    }
}
