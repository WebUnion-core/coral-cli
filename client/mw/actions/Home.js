// 导出方法
const setHomeData = (newData = {}, props) => {
    const { homeData } = props;
    Object.assign(homeData, newData);

    return {
        type: 'SET_HOME_DATA', // type属性一定要有
        homeData
    }
};

export default {
    setHomeData
};
