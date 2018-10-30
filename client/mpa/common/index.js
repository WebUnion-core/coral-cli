const DATA = {
    'MANAGER_ID': 'webunion',
    'MANAGER_PASSWORD': '2015'
};

export default DATA;

// 检测登录信息
export const checkLogin = () => {
    const { userId, password } = window.sessionStorage;
    if (
        userId !== DATA.MANAGER_ID
        && password !== DATA.MANAGER_PASSWORD
    ) {
        window.location.href = '/mpa/login';
    }
}
