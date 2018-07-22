// 导出方法
const setSettingData = (newData = {}, props) => {
    const { settingData } = props;
    Object.assign(settingData, newData);

    return {
        type: 'SET_SETTING_DATA', // type属性一定要有
        settingData
    }
};

export default {
    setSettingData
};
