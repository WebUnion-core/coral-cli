import anime from 'animejs';
import React from 'react';

// 公共模块
import request from './../../../common/modules/request.js';
import cookieUtil from './../../../common/modules/cookie-util.js';

export default class Register extends React.Component {
    constructor (props) {
        super(props);
    }

    // 点击跳转登录
    clickSigInText = () => {
        const formElem = this.props.rootEl;

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

    // 点击注册
    clickRegister = () => {
        const { site, version, userAgent } = window.Waydua;
        const { phoneEl, codeEl, passwordEl } = this.refs;

        request({
            method: 'POST',
            url: `http://${site}/${version}/user/register`,
            data: {
                'phone': phoneEl.value,
                'code': codeEl.value,
                'user_agent': userAgent,
                'password': passwordEl.value
            },
            success: (res) => {
                if (res.result === 1) {
                    cookieUtil.set(
                        'login_token',
                        res.data['login_token'],
                        30
                    );
                    window.location.reload();
                }
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

                <input ref="phoneEl"
                    className="input"
                    type="text"
                    placeholder="请输入手机号" />

                <input ref="codeEl"
                    className="input"
                    type="text"
                    placeholder="请输入验证码" />

                <input ref="passwordEl"
                    className="input"
                    type="password"
                    placeholder="请输入密码" />

                <p className="register-text"
                    onClick={ this.clickSigInText }>点击前往登录</p>

                <button className="btn">获取验证码</button>

                <button className="btn"
                    onClick={ this.clickRegister }>注册</button>
            </form>
        )
    }
}
