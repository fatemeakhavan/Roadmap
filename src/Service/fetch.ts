import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { IServerResult } from "../Interface/ServerResult.interface";
import { ERequest } from "../Enum/App.enums";
/*import { logout } from "./logout";
import { RefreshToken } from "./refreshToken";*/

export const ClientAxiosInstance = axios.create();
ClientAxiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
ClientAxiosInstance.defaults.timeout = 36_000_000; // 10min

let timeout: number;
const showError = (messages: string[] | string) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
        toast.error(typeof messages === "string" ? messages : messages.join(" "));
    }, 100);
};

const delay = async (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

const Fetch = async <T>(FetchConfig: {
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
    disableErrorMessage?: boolean;
    fileRequest?:boolean;
    responseType?:
        | "arraybuffer"
        | "blob"
        | "document"
        | "json"
        | "text"
        | "stream";
    signal?: AbortSignal;
}): Promise<IServerResult<T>> => {
    return new Promise(async (resolve, reject) => {
        const expireTime = window.localStorage.getItem("CLASOR:EXPIRE_TIME");
        if (expireTime && Date.now() - Number.parseInt(expireTime, 10) > 800_000) {
           /* await RefreshToken();*/
        }

        const token = window.localStorage.getItem("CLASOR:ACCESS_TOKEN");
        const request: AxiosRequestConfig = {
            method: FetchConfig.method,
            url: FetchConfig.url,
            data: FetchConfig.data,
            params: FetchConfig.params,
            headers: {
                ...FetchConfig.headers,
                "Content-Type": FetchConfig.fileRequest ? "multipart/form-data; boundary=<calculated when request is sent>" : "application/json;charset=utf-8",
                "Accept-Language": "fa-IR,fa;q=0.9",
            },
            responseType: FetchConfig.responseType,
            signal: FetchConfig.signal,
        };

        if (request.method === ERequest.GET) {
            await delay();
        }

        if (token && request.headers) {
            request.headers.Authorization = `Bearer ${token}`;
            request.headers._token_ = `${token}`;
            request.headers._token_issuer_ = "1";
        }

        await ClientAxiosInstance(request)
            .then((res) => {
                resolve(res.data as IServerResult<T>);
            })
            .catch(async (error) => {
                if (
                    error.response
                    && error.response.data
                    && error.response.status === 401
                ) {
                    /*const refreshResult = await RefreshToken();
                    // retry after refresh token
                    if (refreshResult) {
                        try {
                            resolve(await Fetch(FetchConfig));
                            return;
                        } catch (retryError) {
                            reject(retryError);
                            return;
                        }
                    }

                    logout();
                    return;
               */ }
                if (
                    !FetchConfig.disableErrorMessage
                    && error.response?.data?.messages
                ) {
                    showError(error.response.data.messages);
                }
                reject(error);
            });
    });
};
export default Fetch;
