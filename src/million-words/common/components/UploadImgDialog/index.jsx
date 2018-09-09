import './style.scss';
import React from 'react';
import NormalDialog from './../NormalDialog';

// 获取图像的base64编码
function getBaseUrl(imgData, callback) {
    const reader = new FileReader(); // 调用FileReader对象
    const img = new Image();

    reader.readAsDataURL(imgData); // 通过DataURL的方式返回图像
    reader.onload = function(e) {
        img.src = e.target.result;
    }

    img.onload = function() {
        if (callback) {
            callback(img);
        }
    }
}

// 获取变化比例后的图片尺寸数据
function getTransformResultSize(tgtSize, width, height) {
    const trsResult = {};
    let scale;

    if (width > height) {
        // 宽大于高
        scale = height / tgtSize;
        Object.assign(trsResult, {
            width: width / scale,
            height: tgtSize
        });
    } else {
        // 宽小于高
        scale = width / tgtSize;
        Object.assign(trsResult, {
            width: tgtSize,
            height: Math.floor(height / scale)
        });
    }

    return trsResult;
}

/*
 * props选项
 * 1. title => 标题文本
 * 2. btns => 按钮组 => [{
 *        1. text => 按钮文本,
 *        2. listener => 按钮点击回调,
 *        3. ifAutoClose => 点击后是否自动关闭
 *    }]
 * 3. closeListener => 点击关闭回调
 * 4. ifShowDialog => 显示状态
 */
export default class UploadImgDialog extends NormalDialog {
    constructor (props) {
        super(props);
        this.state = {
            ifShowVerIcon: false,
            ifShowHorIcon: false
        };
    }

    // 选择图片
    changeSelectImg = () => {
        const formData = new FormData(); // 创建FormData对象
        const imgData = this.refs.selectFile.files[0]; // 获取文件流数据
        const tgtSize = this.refs.previewBody.offsetWidth;
        const drawing = this.refs.drawing;
        const context = drawing.getContext('2d');
        let ifShowVerIcon = false;
        let ifShowHorIcon = false;

        formData.append('image', imgData); // 文件流数据转为FormData数据

        getBaseUrl(imgData, (img) => {
            const { width, height } = getTransformResultSize(
                tgtSize,
                img.width,
                img.height
            );

            if (width > height) {
                ifShowHorIcon = true;
            } else {
                ifShowVerIcon = true;
            }
            this.setState({
                ifShowVerIcon,
                ifShowHorIcon
            });

            Object.assign(drawing, {
                width,
                height
            });
            context.drawImage(
                img,
                0, 0,
                width, height
            );
        });
    }

    render () {
        const {
            title = '',
            btns
        } = this.props;
        const {
            ifShowDialog,
            ifShowVerIcon,
            ifShowHorIcon
        } = this.state;

        if (btns[0].id !== 'selectImg') {
            btns.unshift({
                id: 'selectImg',
                text: '选择图片',
                ifAutoClose: false,
                listener: () => {
                    this.refs.selectFile.click();
                }
            });
        }

        return (
            <section className="normal-dialog-style upload-img-dialog-style"
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

                    <div className="preview-container">
                        <div className="outside-cont">
                            {
                                ifShowVerIcon &&
                                <i className="icon icon-self-top" />
                            }
                            {
                                ifShowHorIcon &&
                                <i className="icon icon-self-left" />
                            }
                            <figure className="preview-body"
                                ref="previewBody"
                                style={{
                                    overflowX: ifShowHorIcon
                                        ? 'auto'
                                        : 'hidden',
                                    overflowY: ifShowVerIcon
                                        ? 'auto'
                                        : 'hidden'
                                }}>
                                <canvas ref="drawing" className="drawing" />
                            </figure>
                        </div>
                    </div>

                    <ul className="btn-list">
                        { this.renderBtnsList(btns) }
                    </ul>

                    <input className="hide"
                        ref="selectFile"
                        type="file"
                        onChange={ this.changeSelectImg } />
                </div>

            </section>
        )
    }
}
