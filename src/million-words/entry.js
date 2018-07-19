import './common/style/reset.scss';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

//导入组件
import App from './router/App.jsx';

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);

// 热更新通知
if (module.hot && process.env.MODE === 'DEVELOPMENT'){
    module.hot.accept();
}
