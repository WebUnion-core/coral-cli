import './style.scss';
import React from 'react';

/*
 * props选项
 * 1. title => 标题文本
 * 2. btns => { text => 按钮文本, listener => 按钮点击回调 }
 * 3. closeListener => 点击关闭回调
 * 4. content => 展示内容
 */
export default class NormalDialog extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            ifShowDialog: Boolean(this.props.ifShowDialog)
        }
    }

    // 更新外传状态
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

    render () {
        const {
            title = '',
            content = '',
            btns
        } = this.props;
        const { ifShowDialog } = this.state;

        return (
            <section className="normal-dialog-container"
                style={{ display: ifShowDialog ? 'block' : 'none' }}>
                <div className="dialog-body">
                    <h2 className="title">
                        <div className="text"
                            dangerouslySetInnerHTML={{ __html: title }} />
                        <i className="icon close-icon" />
                    </h2>
                    <div className="content"
                        dangerouslySetInnerHTML={{ __html: content }} />
                    <ul className="btn-list">
                        {
                            btns.map((item, index) => {
                                const { text, listener = () => {} } = item;
                                return (
                                    <li key={ index } className="btn-item">
                                        <button
                                            className="btn"
                                            onClick={ listener }>
                                            { text }
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}
