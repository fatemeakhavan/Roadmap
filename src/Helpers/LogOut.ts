import Axios from 'axios';
import Manifest from '../mainifest';

export const logout = () => {
    const token = window.localStorage.getItem('access_token');
    Axios.delete(`${Manifest.local}oauth2/token?token=${token}&tokenType=access_token`);
    window.localStorage.clear();
    setTimeout(() => window.location.assign(`/`), 1500);
};
