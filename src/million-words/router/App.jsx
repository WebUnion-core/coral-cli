import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Setting from './Setting';
import Clock from './Clock';
import Account from './Account';
import OwnMsg from './OwnMsg';

// 公共模块
import request from './../common/modules/request.js';
import cookieUtil from './../common/modules/cookie-util.js';

/*
 * router说明:
 * 1. 使用HashRouter: import { HashRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/' component={ Home } />
 * 2. 使用BrowserRouter: import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 *    写法为: <Route path='/million-words' component={ Home } exact />
 */
export default class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            routerType: 'HIDE'
        };
    }

    componentWillMount () {
        // 请求数据
        request({
            method: 'POST',
            url: `http://${ window.Waydua.site }/${ window.Waydua.version }/user/check_token`,
            data: {
                'user_agent': window.Waydua.userAgent,
                'login_token': cookieUtil.get('login_token')
            },
            success: (data) => {
                if (data['result'] !== 1) {
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
                return <Router><Route path="/" component={ Account } /></Router>
            case 'NORMAL':
                return (
                    <Router>
                        <section>
                            <Switch>
                                <Route path="/" component={ Home } exact />
                                <Route path="/setting/" component={ Setting } exact />
                                <Route path="/clock/" component={ Clock } exact />
                                <Route path="/account/" component={ Account } exact />
                                <Route path="/own_msg/" component={ OwnMsg } exact />
                            </Switch>
                        </section>
                    </Router>
                );
            default:
                return '';
        }
    }

    render () {
        return this.renderRouter();
    }
}
