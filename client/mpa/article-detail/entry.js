import React from 'react';
import { render } from 'react-dom';
import 'style/reset.scss';
import './../style/reset.scss';

//导入组件
import App from './index.jsx';

render(
    <App />,
    document.getElementById('app')
);

// 热更新通知
if (module.hot){
    module.hot.accept();
}
