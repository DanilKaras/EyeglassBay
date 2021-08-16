import axios, {AxiosError, AxiosResponse} from "axios";
import {EyeGlass} from "../models/eyeGlass";
import {toast} from "react-toastify";
import {history} from '../../index';
import {store} from "../stores/store";
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    return response; 
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
               history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            debugger;
            store.commonStore.setServerError(error);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const EyeGlasses = {
    listAll: () => request.get<EyeGlass[]>('/EyeGlasses'),
    getById: (id: string) => request.get<EyeGlass>('/EyeGlasses/{id}'),
    create: (eyeGlass: EyeGlass) => request.post<void>('/EyeGlasses', eyeGlass),
    update: (eyeGlass: EyeGlass) => request.put<void>(`/EyeGlasses/${eyeGlass.id}`, eyeGlass),
    delete: (id: string) => request.del<void>(`/EyeGlasses/${id}`),
}

const agent = {
    EyeGlasses
}

export default agent;