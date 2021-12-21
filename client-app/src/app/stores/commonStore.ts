import {makeAutoObservable, reaction} from "mobx";
import {AxiosError} from "axios";

export default class CommonStore {
    error: AxiosError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded: boolean = false
    calculationCoefficient: number = 0;
    constructor() {
        makeAutoObservable(this);
        reaction(() => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            });
    }

    setServerError = (error: AxiosError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    
}