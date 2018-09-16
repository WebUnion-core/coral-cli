// 导出方法
const setClockData = (newData = {}, props) => {
    const { clockData } = props;
    Object.assign(clockData, newData);

    return {
        type: 'SET_CLOCK_DATA', // type属性一定要有
        clockData
    }
};

export default {
    setClockData
};
