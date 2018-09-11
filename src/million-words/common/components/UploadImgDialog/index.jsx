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
            width: Math.floor(width / scale),
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
 * 2. closeListener => 点击关闭回调
 * 3. ifShowDialog => 显示状态
 */
export default class UploadImgDialog extends NormalDialog {
    constructor (props) {
        super(props);
        this.state = {
            ifShowVerIcon: false,
            ifShowHorIcon: false,
            formData: null,
            width: 0,
            height: 0
        };

        this.btns = [
            {
                id: 'selectImg',
                text: '选择图片',
                ifAutoClose: false,
                listener: () => {
                    this.refs.selectFile.click();
                }
            },
            {
                text: '上传',
                listener: () => {
                    const previewBody = this.refs.previewBody;
                    const offsetX = previewBody.scrollLeft;
                    const offsetY = previewBody.scrollTop;

                    this.props.receiveParams({
                        ...this.state,
                        offsetX,
                        offsetY
                    });
                }
            }
        ]
    }

    // 选择图片
    changeSelectImg = () => {
        const imgData = this.refs.selectFile.files[0]; // 获取文件流数据
        const tgtSize = this.refs.previewBody.offsetWidth;
        const drawing = this.refs.drawing;
        const context = drawing.getContext('2d');

        const formData = new FormData(); // 创建FormData对象
        formData.append('image', imgData); // 文件流数据转为FormData数据

        this.setState({
            formData
        });

        getBaseUrl(imgData, (img) => {
            const { width, height } = getTransformResultSize(
                tgtSize,
                img.width, img.height
            );

            this.setState({
                ifShowVerIcon: width <= height,
                ifShowHorIcon: width > height,
                width,
                height
            });

            // 绘图
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
            title = ''
        } = this.props;
        const {
            ifShowDialog,
            ifShowVerIcon,
            ifShowHorIcon
        } = this.state;

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
                        { this.renderBtnsList(this.btns) }
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
