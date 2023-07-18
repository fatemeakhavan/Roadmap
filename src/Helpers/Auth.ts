export const isAuth = (): Boolean => {
    // check some condition and return boolean
    const userToken = window.localStorage.getItem('POD_APP:ACCESS_TOKEN');
    return !!userToken;
};