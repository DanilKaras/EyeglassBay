import { makeAutoObservable } from "mobx";
import {AxiosError} from "axios";

export default class CommonStore {
    error: AxiosError | null = null;
    constructor() {
        makeAutoObservable(this);
        
    }

    setServerError = (error: AxiosError) => {
        debugger;
        this.error = error;
    }
}