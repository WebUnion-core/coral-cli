// 导出方法
const setPublicData = (newData = {}, props) => {
    const { publicData } = props;
    Object.assign(publicData, newData);

    return {
        type: 'SET_PUBLIC_DATA', // type属性一定要有
        publicData
    }
};

export default {
    setPublicData
};
