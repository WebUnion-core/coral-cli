import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './../common/style/reset.scss';

// 组件
import Account from './Account';

// 公共模块
import request from './../common/modules/request.js';
import cookieUtil from './../common/modules/cookie-util.js';
const config = require('./../data.json');

// 整合菜单
const menuModules = [];
config.menus.forEach((item) => {
    menuModules.push(require('./' + item.name + '/index.jsx').default);
});

/*
 * router说明:
 * 1. 使用HashRouter: import { HashRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/' component={ Home } />
 * 2. 使用BrowserRouter: import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/mw' component={ Home } exact />
 */
export default class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            routerType: 'HIDE'
        };
    }

    componentWillMount () {
        const { site, version, userAgent } = window.Waydua;

        // 请求数据
        request({
            method: 'POST',
            url: `http://${site}/${version}/user/check_token`,
            data: {
                'user_agent': userAgent,
                'login_token': cookieUtil.get('login_token')
            },
            success: (data) => {
                if (data['status'] !== 1) {
                    this.setState({
                        routerType: 'ONLY_LOGIN'
                    });
                } else {
                    this.setState({
                        routerType: 'NORMAL'
                    });
                }
            },
            fail: (err) => {
                console.error(err);
            }
        });
    }

    // 配置路由
    renderRouter () {
        switch (this.state.routerType) {
            case 'ONLY_LOGIN':
                return <Route path="/" component={ Account } />
            case 'NORMAL':
                return (
                    <Switch>{
                        config.menus.map((item, index) =>
                            <Route key={ index }
                                path={ item.route }
                                component={ menuModules[index] }
                                exact />
                        )
                    }</Switch>
                );
            default:
                return '';
        }
    }

    render () {
        return <Router><section>{ this.renderRouter() }</section></Router>;
    }
}
