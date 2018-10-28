// 导出方法
const setHomeData = (newData = {}, props) => {
    const { loginData } = props;
    Object.assign(loginData, newData);
    return {
        type: 'SET_LOGIN_DATA', // type属性一定要有
        loginData
    }
};

export default { setHomeData };
