const setTheme = (theme = 'Day') => {
    return {
        type: 'SET_THEME',
        theme,
    }
};

export default {
    setTheme,
};
