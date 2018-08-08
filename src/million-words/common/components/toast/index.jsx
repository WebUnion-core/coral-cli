import './style.scss';
import React from 'react';

/*
 * props选项
 * 1. text => 提示文本
 * 2. ifShow => 展示提示信号
 */
export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }

    render() {
        const {
            text,
            ifShow,
            toastPrefix,
            toggleCallback,
            store
        } = this.props;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            toggleCallback({
                [toastPrefix]: {
                    ifShow: false,
                    text: ''
                }
            }, store);
            this.timer = null;
        }, 3000);

        return (
            <span className="toast-text"
                style={{
                    display: ifShow
                        ? 'inline-block'
                        : 'none'
                }}>
                { text || '空' }
            </span>)
    }
}
