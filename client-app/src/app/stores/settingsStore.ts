import {SettingsModel} from "../models/settingsModel";
import {makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { success } from "../common/utils/toasterMessage";
import CommonStore from "./commonStore";

export default class SettingsStore{
    settings: SettingsModel[] = [];
    loading: boolean = false;
    loadingInitial: boolean = false;
    calculationCoefficient: number = 0;
    constructor() {
        makeAutoObservable(this);
    }
    
    loadSettings = async () => {
        this.setLoadingInitial(true);
        try{
            this.settings = await agent.Settings.getSettings();
            this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    updateSettings = async({settings}: any) => {
        if(!settings) return;
        this.setLoading(true);
        try{
            await agent.Settings.saveSettings(settings);
            this.settings = settings;
            this.updateCalculationCoefficient(settings);
            this.setLoading(false);
            success("Successfully saved the changes");
        }catch(error){
            this.setLoading(false);
            throw error;
        }
    }

    getCalculationCoefficient = async()=>{
        this.setLoadingInitial(true);
        try{
            this.calculationCoefficient = await agent.Settings.getCoefficient();
            this.setLoadingInitial(false);
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    updateCalculationCoefficient = (settings: SettingsModel[])=>{
        try{
            const setting = settings.find((x:any) => x.key === 'CalculationCoefficient');
            if(!setting || !setting.value) return;
            this.calculationCoefficient = Number(setting?.value);
        } catch(error) {
            console.log(error);
        }
    }
    
    setLoading = (state: boolean) => {
        this.loading = state;
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}