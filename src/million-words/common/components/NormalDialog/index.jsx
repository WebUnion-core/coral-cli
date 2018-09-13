import './style.scss';
import React from 'react';

export const Button = ({ data, width, clickListener }) =>
    <li className="btn-item"
        style={{ width }}>
        <button className="btn"
            onClick={(event) => clickListener(event, data)}>
            { data.text }
        </button>
    </li>

export const ButtonList = ({ btns, clickListener }) => {
    const len = btns.length;
    return (
        <ul className="btn-list">
            {
                btns.map((item, index) => {
                    const width = `${(100 - (len - 1) * 5) / len}%`;
                    const btnProps = {
                        data: item,
                        width,
                        clickListener
                    };
                    return <Button key={ index } { ...btnProps } />
                })
            }
        </ul>
    )
}

/**
 * 说明: 一般弹窗
 * props选项:
 * 1. title -> 标题文本
 * 2. btns -> 按钮组 -> [{
 *        1. text -> 按钮文本,
 *        2. listener -> 按钮点击回调,
 *        3. ifAutoClose -> 点击后是否自动关闭
 *    }]
 * 3. closeListener -> 点击关闭回调
 * 4. content -> 展示内容
 * 5. ifShowDialog -> 显示状态
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
        let { ifShowDialog } = this.state;

        ifShowDialog = typeof status === 'undefined' ? !ifShowDialog : status;
        this.setState({ ifShowDialog });
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
            // 自动关闭
            this.toggleShow();
        }
        if (listener) {
            // 执行传入回调
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

    render () {
        const {
            title = '', content = '', btns, closeListener
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

                    <ButtonList btns={ btns } clickListener={ this.clickBtn } />
                </div>

            </section>
        )
    }
}
