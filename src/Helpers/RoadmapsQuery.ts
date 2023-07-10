import axios, { AxiosRequestConfig } from 'axios';
import { ERequest } from '../Enum/App.enums';
import { RefreshToken } from './RefreshToken';
import Manifest from '../mainifest';
import { toast } from 'react-toastify';

export interface IRoadmapsResult<T> {
    result: T;
    errorUrl:string;
    total:number;
    referenceNumber:number;
    message:string;
    status:string;
    timestamp:number;

}

export const roadmapsAxiosInstance = axios.create();
roadmapsAxiosInstance.defaults.baseURL = Manifest.local;
const RoadmapsQuery = async <T>(FetchConfig: {
    url: string;
    method: ERequest;
    data?: {
        [key: string]: any;
    };
    params?: {
        [key: string]: any;
    };
    headers?: {
        [key: string]: string;
    };
    showMessage?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
}): Promise<IRoadmapsResult<T>> => {
    return new Promise(async (resolve, reject) => {
        FetchConfig.showMessage = FetchConfig.showMessage === undefined ? true : FetchConfig.showMessage; // default is true
        const expireTime = window.localStorage.getItem('POD_APPEXPIRE_TIME');
        if (expireTime && +new Date() - parseInt(expireTime) > 800000) {
            await RefreshToken();
        }
        const authorization = 'Bearer test';
        // const authorization = 'Bearer ' + window.localStorage.getItem('POD_APP:ACCESS_TOKEN');
        // localStorage.setItem('POD_APP:ACCESS_TOKEN', data?.token)
        const request: AxiosRequestConfig = {
            method: FetchConfig.method,
            url: FetchConfig.url,
            data: FetchConfig.data,
            params: FetchConfig.params,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: authorization,
                'Accept-Language': 'fa',
                // 'Accept-Language': 'fa-IR,fa;q=0.9',
                ...FetchConfig.headers,
            },
            responseType: FetchConfig.responseType,
        };

        return await roadmapsAxiosInstance(request)
            .then((res) => {
                resolve((res.data || { data: 'OK' }) as IRoadmapsResult<T>);
            })
            .catch(async (error) => {
                const message = error?.response?.data?.message;
                if (error.response && error.response.data && error.response.status === 401) {
                    const refreshResult = await RefreshToken();
                    // retry after refresh token
                    if (refreshResult !== 'ERROR') {
                        resolve(await RoadmapsQuery(FetchConfig));
                        return;
                    }
                }
                // if (FetchConfig.showMessage && error.response.status === 400) {
                //   showError(message || 'خطا در ورودی ها');
                // } else
                if (FetchConfig.showMessage) {
                    showError(message || 'خطا در برقراری ارتباط با سرور');
                }
                reject(error);
            });
    });
};

let timeout: ReturnType<typeof setTimeout>;
const showError = (message: string[] | string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        toast.error(typeof message === 'string' ? message : message.join(' '));
    }, 500);
};

export default RoadmapsQuery;
