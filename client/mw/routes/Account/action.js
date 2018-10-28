// 导出方法
const setAccountData = (newData = {}, props) => {
    const { accountData } = props;
    Object.assign(accountData, newData);

    return {
        type: 'SET_ACCOUNT_DATA', // type属性一定要有
        accountData
    }
};

export default {
    setAccountData
};
