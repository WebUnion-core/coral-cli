import anime from 'animejs'
import React from 'react';

// 公共模块
import request from './../../../common/modules/request.js';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    // 点击跳转登录
    clickSigInText = () => {
        const formElem = document.getElementById('account-content');

        formElem.style.visibility = 'hidden';
        anime({
            targets: formElem,
            translateY: '-100%'
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

    // 点击登录
    clickRegister() {
        request({
            method: 'POST',
            url: `http://${ window.Waydua.site }/${ window.Waydua.version }/user/register`,
            data: {
                'phone': this.refs['phone'].value,
                'code': this.refs['code'].value,
                'user_agent': window.Waydua.userAgent,
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
                <img className="logo" src={ `${window.Waydua.cdn}logo.png` } />
                <input ref="phone" className="input" type="text" placeholder="请输入手机号" />
                <input ref="code" className="input" type="text" placeholder="请输入验证码" />
                <input ref="password" className="input" type="password" placeholder="请输入密码" />
                <p className="register-text" onClick={ this.clickSigInText }>点击前往登录</p>
                <button className="btn">获取验证码</button>
                <button className="btn" onClick={ () => this.clickRegister() }>注册</button>
            </form>
        )
    }
}
