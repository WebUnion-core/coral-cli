import './style.scss';
import React from 'react';

/*
 * props选项
 * 1. title => 标题文本
 * 2. btns => 按钮组 => [{
 *        1. text => 按钮文本,
 *        2. listener => 按钮点击回调,
 *        3. ifAutoClose => 点击后是否自动关闭
 *    }]
 * 3. closeListener => 点击关闭回调
 * 4. content => 展示内容
 * 5. ifShowDialog => 显示状态
 */
export default class NormalDialog extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            ifShowDialog: Boolean(this.props.ifShowDialog)
        }
    }

    // 更新外部传入的状态
    componentWillReceiveProps (nextProps) {
        this.setState({
            ifShowDialog: Boolean(nextProps.ifShowDialog)
        });
    }

    // 切换状态
    toggleShow = (status) => {
        const { ifShowDialog } = this.state;
        this.setState({
            ifShowDialog: status || !ifShowDialog
        });
    }

    // 点击关闭
    clickClose = (event) => {
        const { closeListener } = this.props;
        if (closeListener) {
            closeListener();
        }
        this.toggleShow();
        event.stopPropagation();
        event.preventDefault();
    }

    // 点击按钮
    clickBtn (event, btn) {
        const { listener, ifAutoClose = true } = btn;
        if (ifAutoClose) {
            this.toggleShow();
        }

        if (listener) {
            listener(this.state);
        }
        event.stopPropagation();
        event.preventDefault();
    }

    // 点击背景
    clickBackground = (event) => {
        if (event.target === this.refs.dialogBackground) {
            this.toggleShow(false);
        }
        event.stopPropagation();
        event.preventDefault();
    }

    // 渲染按钮列表
    renderBtnsList (btns) {
        const len = btns.length;

        return (
            btns.map((item, index) => {
                const { text } = item;
                const width = (100 - (len - 1) * 5) / len;

                return (
                    <li key={ index }
                        className="btn-item"
                        style={{ width: `${ width }%` }}>
                        <button
                            className="btn"
                            onClick={
                                (event) => this.clickBtn(event, item)
                            }>
                            { text }
                        </button>
                    </li>
                )
            })
        )
    }

    render () {
        const {
            title = '', content = '',
            btns,
            closeListener
        } = this.props;
        const { ifShowDialog } = this.state;

        return (
            <section className="normal-dialog-container"
                style={{ display: ifShowDialog ? 'block' : 'none' }}
                ref="dialogBackground"
                onClick={ this.clickBackground }>

                <div className="dialog-body">
                    <h2 className="title">
                        <div className="text"
                            dangerouslySetInnerHTML={{ __html: title }} />
                        <i className="icon close-icon icon-11-gray-close"
                            onClick={ this.clickClose } />
                    </h2>

                    <div className="content"
                        dangerouslySetInnerHTML={{ __html: content }} />

                    <ul className="btn-list">
                        { this.renderBtnsList(btns) }
                    </ul>
                </div>

            </section>
        )
    }
}
