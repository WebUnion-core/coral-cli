import './style.scss';
import React from 'react';
import NormalDialog from './../NormalDialog';

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
 * 5. exitTextList => 输入框组 => [{
 *        1. placeholder => 默认文本
 *        2. field => 数据键
 *        3. type => 输入框类型
 *    }]
 */
export default class EditTextDialog extends NormalDialog {
    constructor (props) {
        super(props);

        this.state = {
            ifShowDialog: Boolean(this.props.ifShowDialog)
        }
    }

    // 改变输入文本
    changeInputText = (event, editTextItem) => {
        this.setState({
            [editTextItem.field]: event.target.value
        });
    }

    // 渲染文本框组
    renderEditTextList (exitTextList) {
        if (exitTextList && exitTextList.length > 0) {
            return (
                <ul className="edit-text-list">
                    {
                        exitTextList.map((item, index) => {
                            const {
                                placeholder = '请输入',
                                field,
                                type = 'text'
                            } = item;
                            return (
                                <li key={ index } className="edit-text-item">
                                    <input className="input"
                                        type={ type }
                                        placeholder={ placeholder }
                                        onChange={(event) => {
                                            this.changeInputText(event, item);
                                        }} />
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        return '';
    }

    render () {
        const {
            title = '', content = '',
            btns,
            closeListener,
            exitTextList
        } = this.props;
        const { ifShowDialog } = this.state;

        return (
            <section className="normal-dialog-style edit-text-dialog-style"
                style={{ display: ifShowDialog ? 'block' : 'none' }}
                ref="dialogBackground"
                onTouchStart={ this.touchBackground }>

                <div className="dialog-body">
                    <h2 className="title">
                        <div className="text"
                            dangerouslySetInnerHTML={{ __html: title }} />
                        <i className="icon close-icon icon-11-gray-close"
                            onClick={ this.clickClose } />
                    </h2>

                    { this.renderEditTextList(exitTextList) }

                    <ul className="btn-list">
                        { this.renderBtnsList(btns) }
                    </ul>
                </div>

            </section>
        )
    }
}
