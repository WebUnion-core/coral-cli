import './style.scss';
import React from 'react';
import NormalDialog, { ButtonList } from './../NormalDialog';
import {
    getBaseUrl, getTransformResultSize, getCutImageData
} from './../../modules/image-util';

/**
 * 说明: 上传图片弹窗
 * props选项:
 * 1. title -> 标题文本
 * 2. receiveParams -> 图片数据接收回调
 */
export default class UploadImgDialog extends NormalDialog {
    constructor (props) {
        super(props);
        this.state = {
            ifShowVerIcon: false,
            ifShowHorIcon: false,
            formData: null,
            size: 0,
            context: null,
            btns: null
        };
    }

    componentDidMount () {
        const btns = [
            {
                id: 'selectImg',
                text: '选择图片',
                ifAutoClose: false,
                listener: () => this.refs.selectFile.click()
            },
            {
                text: '上传',
                listener: this.receiveImage
            }
        ];
        this.setState({ btns });
    }

    // 接收图像
    receiveImage = () => {
        const previewBody = this.refs.previewBody;
        const offsetX = previewBody.scrollLeft;
        const offsetY = previewBody.scrollTop;
        const { size, context } = this.state;

        getCutImageData({
            oriCanvas: context,
            width: size,
            height: size,
            offsetX,
            offsetY,
            callback: (imgData) => {
                const formData = new FormData();
                formData.append('image', imgData);
                this.props.receiveParams({
                    ...this.state,
                    formData
                });
            }
        });
    }

    // 选择图片
    changeSelectImg = () => {
        const { selectFile, previewBody, drawing } = this.refs;
        const imgData = selectFile.files[0]; // 获取文件流数据
        const tgtSize = previewBody.offsetWidth;
        const context = drawing.getContext('2d');

        getBaseUrl(imgData, (img) => {
            const { width, height } = getTransformResultSize(
                tgtSize,
                img.width, img.height
            );
            const size = width <= height ? width : height;

            this.setState({
                ifShowVerIcon: width <= height,
                ifShowHorIcon: width > height,
                size,
                context
            });

            // 绘图
            Object.assign(drawing, { width, height });
            context.drawImage(img, 0, 0, width, height);
        });
    }

    render () {
        const { title = '' } = this.props;
        const {
            ifShowDialog, ifShowVerIcon, ifShowHorIcon,
            btns
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

                    {
                        btns &&
                            <ButtonList btns={ btns }
                                clickListener={ this.clickBtn } />
                    }

                    <input className="hide"
                        ref="selectFile"
                        type="file"
                        onChange={ this.changeSelectImg } />
                </div>
            </section>
        )
    }
}
