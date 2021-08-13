import axios, {AxiosResponse} from "axios";
import {EyeGlass} from "../models/eyeGlass";

axios.defaults.baseURL = 'http://localhost:5000/api';

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