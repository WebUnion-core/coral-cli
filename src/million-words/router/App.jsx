import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Setting from './Setting';
import Clock from './Clock';
import Account from './Account';

// 公共模块
import request from './../common/modules/request.js';

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
    }

    componentWillMount () {
        // // 请求数据
        // request({
        //     method: 'POST',
        //     url: `http://${ window.Waydua.site }/${ window.Waydua.version }/user/check_token`,
        //     data: {
        //
        //     },
        //     success: (data) => {
        //         console.log(data);
        //     },
        //     fail: (err) => {
        //         console.error(err);
        //     }
        // });
    }

    render () {
        return (
            <Router>
                <section>
                    <Switch>
                        <Route path="/" component={ Home } exact />
                        <Route path="/setting/" component={ Setting } exact />
                        <Route path="/clock/" component={ Clock } exact />
                        <Route path="/account/" component={ Account } exact />
                    </Switch>
                </section>
            </Router>
        )
    }
}
