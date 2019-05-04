// 获取图像的base64编码
export const getBaseUrl = (imgData, callback) => {
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
export const getTransformResultSize = (tgtSize, width, height) => {
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

// 切割canvas图像
export const getCutImageData = (params) => {
    const {
        oriCanvas,
        width, height,
        offsetX, offsetY,
        callback
    } = params;
    const drawing = document.createElement('canvas');
    const context = drawing.getContext('2d');
    let cutData;

    Object.assign(drawing, {
        width, height
    });

    cutData = oriCanvas.getImageData(offsetX, offsetY, width, height);
    context.putImageData(cutData,0,0);

    drawing.toBlob(blob => {
        if (callback) {
            callback(blob);
        }
    });
}
