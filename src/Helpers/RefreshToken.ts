import Manifest from '../mainifest';
import { logout } from './LogOut';
import axios from 'axios';

export interface IServerClasorResult<T> {
    data: T;
    referenceNumber?: number;
    pageInfo?: {
        itemsPerPage: number;
        totalCount: number;
    };
}

export const adminPanelAxiosInstance = axios.create();
adminPanelAxiosInstance.defaults.baseURL = Manifest.local;

let waitForRefreshToken = false;
export const RefreshToken = async () => {
    if (!waitForRefreshToken) {
        waitForRefreshToken = true;
        const refreshToken = window.localStorage.getItem('POD_APP:REFRESH_TOKEN');
        if (refreshToken) {
            // delay for new refresh requests
            await AddDelayBeforRequest();
            return adminPanelAxiosInstance
                .get('http://192.168.220.147:8080/api/pod/refreshToken', {headers: {"refreshToken": refreshToken}})
                .then(
                    (
                        result: IServerClasorResult<{
                            result: {
                                accessToken: string;
                            };
                        }>,
                    ) => {
                        if (result.data.result.accessToken) {
                            for (const [key, value] of Object.entries(result.data.result)) {
                                if (key === 'expiresIn') {
                                    window.localStorage.setItem('POD_APP:EXPIRE_TIME', `${+new Date()}`);
                                } else if (key === 'refreshToken') {
                                    window.localStorage.setItem('POD_APP:REFRESH_TOKEN', value);
                                } else if (key === 'accessToken') {
                                    window.localStorage.setItem('POD_APP:ACCESS_TOKEN', value);
                                }
                            }
                            waitForRefreshToken = false;
                        } else logout();
                    },
                )
                .catch(() => logout());
        } else {
            logout();
            return 'ERROR';
        }
    } else {
        await WaitForRefresh();
    }
};

const AddDelayBeforRequest = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            resolve();
        }, 1000);
    });
};

const WaitForRefresh = (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            if (waitForRefreshToken) {
                await WaitForRefresh();
            }
            resolve();
        }, 100);
    });
};