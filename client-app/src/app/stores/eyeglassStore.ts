import {makeAutoObservable} from "mobx";
import {EyeGlass} from "../models/eyeGlass";
import agent from "../api/agent";

export default  class EyeglassStore {
    eyeGlasses: EyeGlass[] = [];
    loading: boolean = false;
    loadingInitial: boolean = false;
    
    constructor() {
        makeAutoObservable(this);    
    }
    
    loadEyeglasses = async () => {
        this.setLoadingInitial(true);
        try{
            this.eyeGlasses = await agent.EyeGlasses.listAll();
            this.setLoadingInitial(false);
        } catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}