import './style.scss';
import React from 'react';
import NormalDialog, { ButtonList } from './../NormalDialog';

export const EditTextItem = ({ data, changeListener }) => {
    const { placeholder = '请输入', type = 'text' } = data;
    return (
        <li className="edit-text-item">
            <input className="input"
                type={ type }
                placeholder={ placeholder }
                onChange={ (event) => changeListener(event, data) } />
        </li>
    );
}

export const EditTextList = ({
    exitTextList,
    changeListener
}) =>
    <ul className="edit-text-list">
        {
            exitTextList.map((item, index) => {
                return (
                    <EditTextItem data={ item }
                        changeListener={ changeListener } />
                )
            })
        }
    </ul>

/**
 * 说明: 附加文本框弹窗
 * props选项:
 * 1. title -> 标题文本
 * 2. btns -> 按钮组 -> [{
 *        1. text -> 按钮文本,
 *        2. listener -> 按钮点击回调,
 *        3. ifAutoClose -> 点击后是否自动关闭
 *    }]
 * 3. closeListener -> 点击关闭回调
 * 4. exitTextList -> 输入框组 -> [{
 *        1. placeholder -> 默认文本
 *        2. field -> 数据键
 *        3. type -> 输入框类型
 *    }]
 * 5. ifShowDialog -> 显示状态
 */
export default class EditTextDialog extends NormalDialog {
    constructor (props) {
        super(props);
    }

    // 改变输入文本
    changeInputText = (event, editTextItem) => {
        this.setState({
            [editTextItem.field]: event.target.value
        });
    }

    render () {
        const {
            title = '', btns, exitTextList
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

                    {
                        (exitTextList && exitTextList.length > 0) &&
                            <EditTextList exitTextList={ exitTextList }
                                changeListener={ this.changeInputText } />
                    }

                    <ButtonList btns={ btns } clickListener={ this.clickBtn } />
                </div>

            </section>
        )
    }
}
